// app.js
require( './db' );
const express = require('express');
const flash = require("connect-flash");
const path = require("path");
const bcrypt = require('bcryptjs');
const passport = require('passport');
const session = require('express-session');
const Parser = require('icecast-parser');
const radioStation = new Parser({
    url: 'http://streaming.shoutcast.com/BurbanRadio', // URL to radio station
    keepListen: false, // don't listen radio station after metadata was received
    autoUpdate: true, // update metadata after interval
    errorInterval: 10 * 60, // retry connection after 10 minutes
    emptyInterval: 5 * 60, // retry get metadata after 5 minutes
    metadataInterval: 5 // update metadata after 5 seconds
});
var uuid = require('node-uuid');
const app = express();
var Stitle;
var favSong;
var mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Artist = mongoose.model('Artist');
const User = mongoose.model('User');
const Block = mongoose.model('Block');
const Song = mongoose.model('Song');
mongoose.Promise = global.Promise;
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, '/public')));
app.set('views', __dirname + '/views');
app.use(bodyParser.urlencoded({ extended: true }) );
app.use(session({secret: 'mySecretKey'}));
app.use(passport.initialize());
app.use(passport.session());
require('./passport')(passport);
app.use(flash());


const sesh = {
	secret: 'secret for signing session id',
	saveUninitialized: true,
	resave: true,
  cookie: { secure: false },
};


app.use(session(sesh));


app.get('/', function(req, res) {
  res.redirect('/login')
});

app.get('/logout', function(req, res) {
	req.logout();
	res.redirect('/login');
});

app.get('/home',isLoggedIn, function(req, res) {
	favSong = req.user.favoriteSongs;
  res.render('home.hbs',{user:req.user,favoritesongs:req.user.favoriteSongs,favoriteartists:req.user.favoriteArtists});
});

app.get('/error', function(req, res) {
			res.render('error.hbs');
});

app.post('/artist-delete/:id', function(req, res) {
	console.log("heyyyyyyyy")
	console.log(req.params.name)
	User.update({ email: req.user.email }, { "$pull": { "favoriteArtists":{ "_id": req.params.id } }}, { safe: true, multi:true }, function(err, obj) {
	});
});

app.post('/song-delete/:id', function(req, res) {
	console.log("heyyyyyyyy")
	console.log(req.params.id)
	User.update({ email: req.user.email }, { "$pull": { "favoriteSongs": { "_id": req.params.id } }}, { safe: true, multi:true }, function(err, obj) {
	});
});

app.get('/favsong', function(req, res) {
	console.log("AAAAAAA")
	console.log(req.user.favoriteSongs)
	res.json(req.user.favoriteSongs);
});

app.get('/favartist', function(req, res) {
	console.log("AAAAAAA")
	console.log(req.user.favoriteArtists)
	res.json(req.user.favoriteArtists);
});

app.get('/confirm',isLoggedIn, function(req, res) {
      res.render('confirm.hbs');
});

app.get('/login', function(req, res) {
			console.log("Sesh: "+req.session.id)
      res.render('login.hbs');
});


app.get('/radio',isLoggedIn, function(req, res) {
	radioStation.on('metadata', function(metadata) {
		 console.log('Here you will receive metadata each 10 seconds');
		 Stitle= metadata.StreamTitle;
	});
	if(Stitle === undefined){
		res.render('radio.hbs');
	}
	else{
	console.log(Stitle);
	var sarr = Stitle.split("-")
	var artist = String(sarr[0]);
	var song = String(sarr[1]);
	res.render('radio.hbs',{artist:artist,song:song});
	}
});

app.post('/favorite-artist', function(req, res) {
	const ruser = req.user;
	var favartist = new Artist()
	var sarr = Stitle.split("-")
	favartist.name = (String(sarr[0]))
	favartist.save(function(err) {
			if (err){
				throw err;
				console.log(err)
			}
	});
	ruser.favoriteArtists.push(favartist)
	ruser.save(function(err) {
			if (err){
				throw err;
				console.log(err)
			}
			res.redirect('/radio');
	});
});
app.post('/favorite-song', function(req, res) {
		const ruser = req.user;
		console.log("USER: "+ruser.username)
		var favsong = new Song()
		var sarr = Stitle.split("-")
		favsong.name = String(sarr[1]);
		favsong.artist = String(sarr[0]);
		favsong.save(function(err) {
				if (err){
					throw err;
					console.log(err)
				}
		});
		ruser.favoriteSongs.push(favsong)
		ruser.save(function(err) {
				if (err){
					throw err;
					console.log(err)
				}
				res.redirect('/radio');
		});
});

// app.use(cookieParser("80WoosterSt"));



app.post('/login-user', passport.authenticate('login', {
		successRedirect : '/home', // redirect to the secure profile section
		failureRedirect : '/error', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));


app.post('/register-user', passport.authenticate('register', {
		successRedirect : '/confirm', // redirect to the secure profile section
		failureRedirect : '/error', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));
	// if (req.body.email && req.body.user && req.body.pass &&req.body.passcon) {
  //   let sesh = req.session;
  //   const seshId = sesh.id;
  //   var data = {
  //     email: req.body.email,
  //     username: req.body.user,
  //     password: req.body.pass,
  //     seshid: seshId
  //   }
  //   User.create(data, function (err, user) {
  //     if (err) {
  //       console.log("ERRR: "+err)
  //          res.send(err);
  //     } else {
  //       console.log("Conn")
  //       return res.redirect('/confirm');
  //     }
  //   });
  //   }
  // else{
  //   console.log("ERR");
  // }
// })


function isLoggedIn(req, res, next) {
	if (req.isAuthenticated())
		return next();

	res.redirect('/error');
}


app.listen(process.env.PORT || 3000);

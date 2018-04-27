const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Song = new mongoose.Schema({
  name: {type: String, required: true},
  artist:{type: String, required: true},
});

const Artist = new mongoose.Schema({
  name:{type: String, required: true},
});
const UserSC = new mongoose.Schema({
  username: {type: String, lowercase: true, trim: true, unique: true, required: [true, "can't be blank"], index: true},
  email: {type: String, lowercase: true, unique: true, required: [true, "can't be blank"], index: true},
  password: { type: String, required: true},
  favoriteArtists: [Artist],
  favoriteSongs: [Song],
});

UserSC.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSC.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

// UserSC.pre('save', function (next) {
//   var user = this;
//   bcrypt.hash(user.password, 10, function (err, hash){
//     if (err) {
//       return next(err);
//     }
//     user.password = hash;
//     next();
//   })
// });


const Block = new mongoose.Schema({
  name: {type: String, required:true},
  TimeToStart: {type: String, required: true},
  TimeToEnd: {type: String, required: true},
  songs: [Song]
});

mongoose.model('Song', Song);
mongoose.model('Artist', Artist);
mongoose.model('Block', Block);

// UserSC.statics.authenticate = function (email, password, callback) {
//   mongoose.model('User', UserSC).findOne({ email: email })
//   .exec(function (err, user) {
//   if (err) {
//     console.log("NOT WORKS")
//     return callback(err)
//   } else if (!user) {
//     var err = new Error('User not found.');
//     err.status = 401;
//     return callback(err);
//   }
//     bcrypt.compare(password, user.password, function (err, result) {
//       if (result === true) {
//         console.log("WORKS")
//         return callback(null, user);
//       } else {
//         console.log("NOT WORKS")
//         return callback();
//         }
//     })
//   });
// }

mongoose.model('User', UserSC);

// is the environment variable, NODE_ENV, set to PRODUCTION?
let dbconf;
if (process.env.NODE_ENV === 'PRODUCTION') {
 // if we're in PRODUCTION mode, then read the configration from a file
 // use blocking file io to do this...
 const fs = require('fs');
 const path = require('path');
 const fn = path.join(__dirname, 'config.json');
 const data = fs.readFileSync(fn);

 // our configuration file will be in json, so parse it and set the
 // conenction string appropriately!
 const conf = JSON.parse(data);
 dbconf = conf.dbconf;
} else {
 // if we're not in PRODUCTION mode, then use
 dbconf = 'mongodb://localhost/knj228';
}

//mongoose.connect('mongodb://localhost/finalprofig');


 mongoose.connect(dbconf);

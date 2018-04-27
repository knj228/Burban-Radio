require( './db' );
var flash=require("connect-flash");
const mongoose = require('mongoose');
var LocalStrategy = require('passport-local').Strategy;
// load up the user model
const User = mongoose.model('User');

// expose this function to our app using module.exports
module.exports = function(passport) {
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    passport.use('register', new LocalStrategy({
        usernameField : 'username',
        passwordField : 'pass',
        emailField : 'email',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, username, pass, done) {
      console.log("USER: "+req.body.email)
             var newUser = new User();
             newUser.email = req.body.email;
             newUser.password = newUser.generateHash(pass); // use the generateHash function in our user model
             newUser.username = username;
             newUser.save(function(err) {
                 if (err){
                   throw err;
                   console.log(err)
                 }
                 return done(null, newUser);
             });
          }))

      passport.use('login', new LocalStrategy({
        usernameField : 'logemail',
        passwordField : 'logpass',
        passReqToCallback : true
    },
    function(req, logemail, logpass, done) {
      console.log("USER: "+logpass)
        User.findOne({ 'email' :  logemail }, function(err, user) {
          console.log(!user.validPassword(logpass));
             if (err)
                 return done(err);

             if (!user)
                 return done(null, false, req.flash('error', 'No user found.')); // req.flash is the way to set flashdata using connect-flash
            if (!user.validPassword(logpass))
                 return done(null, false, req.flash('error', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata

            return done(null, user);
        });

    }));
};

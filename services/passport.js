const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require('../config/keys');
const mongoose = require("mongoose");

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  done(null, user.id); //.id is the id in mongoDB _id property
});
passport.deserializeUser((userId, done) => {
  User.findById(userId).then(user => {
    done(null, user);
  })

});
passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback',
    proxy: true
  }, (accessToken, refreshToken, profile, done) => { //=> this gets called after you click your profile (google)
    User.findOne({ // SEARCH QUERY
      googleID: profile.id
    }).then(existingUser => {
      if(existingUser){
        //we already have a record with a given profile id
        done(null, existingUser);
      }else{//IF THERE'S NO USER FOUND ADD THIS
        new User({
          googleID: profile.id,
          name: profile.displayName
        }).save().then(user => done(null, user))
         //save the user's google info to the database
      }
    })
  })
);
//new GoogleStrategy() creates a new instance of google passport strategy

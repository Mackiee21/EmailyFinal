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
  }, 
  async (accessToken, refreshToken, profile, done) => { //=> this gets called after you click your profile (google)
    const existingUser = await User.findOne({ googleID: profile.id }) // SEARCH QUERY
    if(existingUser){
      //we already have a record with a given profile id
      return done(null, existingUser);
    }

    const user = await new User({
      googleID: profile.id,
      name: profile.displayName
    }).save(); //IF THERE'S NO USER FOUND, ADD THIS
    done(null, user);
  })
);
//new GoogleStrategy() creates a new instance of google passport strategy

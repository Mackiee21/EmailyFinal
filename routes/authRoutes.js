const passport = require("passport");
const path = require("path");
const mongoose = require("mongoose");
const User = mongoose.model("users");
module.exports = (app) => {
    app.get('/auth/google', passport.authenticate('google', {
        scope: ['profile', 'email']
      })
    );
    app.get('/auth/google/callback', passport.authenticate('google', {
      successRedirect: '/home',
      failureRedirect: '/'
    }));

    app.get('/logout', (req, res) => {
      req.logout()
      res.send("You have successfully logged out");
    })
    app.get('/home', (req, res) => {
      if(req.user){
        res.send(`${req.user.name} you are still logged in`);
      }else{
        res.send("Please log in first!");
      }
    });

    //HALAA MATAWAG RA D AY NI SIYA ONCE MO GET METHOD NATA SA DATA WHATTT
    app.get("/data", async (req, res) => {
      console.log("I AM RUNNING FIRST")
      const user = await User.findOne({name: "Mark Anthony Pandac"});
      res.json(user);
    });

    app.get("*", (_, res) => {
      res.sendFile(path.join(__dirname, "../client/dist/index.html"))
    });
}
 
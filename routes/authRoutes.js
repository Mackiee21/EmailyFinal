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
      successRedirect: '/',
      failureRedirect: '/login'
    }));

    app.get('/logout', (req, res) => {
      req.logout()
      res.redirect("/");
    })
    app.get('/home', (req, res) => {
      if(req.user){
        res.send(`${req.user.name} you are now logged in`);
      }else{
        res.send("Please log in first!");
      }
    });

    
    //HALAA MATAWAG RA D AY NI SIYA ONCE MO GET METHOD NATA SA DATA WHATTT
    //MATAWAG RA NI SIYA IF NAA KAY EVENT HANDLER NA NAG request og GET or any method
    //DLE D AY NI MATAWAG DAYON OI HAHAHAH
    app.get("/data", async (req, res) => {
      console.log("I AM RUNNING FIRST", req.user);
      const user = await User.findById(req.user);
      res.json(user);
    });

    app.get("*", (_, res) => {
      res.sendFile(path.join(__dirname, "../client/dist/index.html"))
    });
}
 
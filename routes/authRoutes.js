const passport = require("passport");
const path = require("path");
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
    app.get("*", (_, res) => {
      res.sendFile(path.join(__dirname, "../client/dist/index.html"))
    });
  
}
 
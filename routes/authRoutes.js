const passport = require("passport");
const path = require("path");
const mongoose = require("mongoose");
const User = mongoose.model("users");
const Survey = mongoose.model("surveys");
const Feedback = mongoose.model("feedback");
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
      console.log("request received")
      console.log("I AM RUNNING FIRST", req.user);
      const user = await User.findById(req.user);
      res.json(user);
    });//USER VERIFICATION ON PAGE VISIT

    app.post('/survey/data/temp', (req, res) => {
      const data = req.body;
      console.log("in post: ", data);
      req.session.data = data;
      res.send("Data saved and stored")
    });//WHEN USER CLICKS THE NEXT BUTTON ON SURVEY FORM

    app.get('/survey-data', (req, res) => {
      console.log('data in get: ', req.session.data)
      if (req.session.data) {
        const data = req.session.data;
        //delete req.session.data;  // Remove the data from the session (edit this delete it only once finished saving teh content)
        res.json(data);
      } else {
        res.send('No data available.');
      }
    });//CALLED WHEN THE CONFIRM SURVEY PAGE COMPONENT IS RENDERED

    app.post('/save', async (req, res) => {
        console.log(req.body); //ok na ni
        console.log('session: ',req.session)
        req.session.data = null;
        console.log("user: ",req.session.passport.user)
        const survey = await new Survey({
          user: req.session.passport.user,
          survey: req.body
        }).save();
        res.send(survey + "Saved and session cleared")
    })//WHEN USER CLICKS THE CONFIRM SURVEY BUTTON (sunod rani silas taas na code)


    app.get('/getSurveys', async (req, res) => {
      console.log("user id", req.session.passport.user);
        const surveys = await Survey.find({user: req.session.passport.user});
        console.log("user surveys: ", surveys)
        res.json(surveys);
    });//WHEN CLIENT CHECKS THEIR SURVEYS

    app.post('/feedback', async (req, res) => {
      console.log("user_id: ", req.session)
        await Feedback({
            survey_id: req.body.survey_id,
            feedback: req.body.feedbacks
        }).save();
        res.send('Data received and saved');
    });//SEND FEEDBACK

    app.get("/hasResponded", (req, res) => {
      //later ka nalang hehehe

    });//CHECK IF USER HAS ALREADY SUBMITTED A FEEDBACK

    app.get("*", (_, res) => {
      res.sendFile(path.join(__dirname, "../client/dist/index.html"))
    });
}
 
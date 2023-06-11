  const express = require("express");
  const cors = require("cors");
  const path = require("path");
  const cookieSession = require('cookie-session');
  const passport = require('passport');
  const mongoose = require("mongoose");
  const keys = require("./config/keys");
  require("./models/User");
  require("./models/Surveys");
  require("./models/Feedback");
  require("./services/passport");
  //common js modules

  const connectDB = async () => {
    try {
      const conn = await mongoose.connect(process.env.MONGO_URI || keys.mongoURI);
      console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  }

  const app = express();
  app.use(cors());
  //middleware for parsing the data from a post method
  app.use(express.json());
  //middleware for submitting form (post method)
  app.use(express.urlencoded({extended: false}));

  app.use(cookieSession({
      maxAge: 30 * 24 * 60 * 60 * 1000, //how long the cookie last
      keys: [keys.cookieKey] // no idea meoww
    })
  );

  app.use(passport.initialize());

  app.use(passport.session());
 
  //send whatever file that matches the route in dist folder
  app.use(express.static(path.join(__dirname, "client", "dist")));

  require("./routes/authRoutes")(app);
 
  const port = process.env.PORT || 5174;
  connectDB().then(() => {
     app.listen(port, () => {
        console.log("listening for requests");
    })
})
  
  //hmWDj54mM657g7wa password  mongoDB atlas

  

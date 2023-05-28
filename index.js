  const express = require("express");
  const cookieSession = require('cookie-session');
  const passport = require('passport');
  const mongoose = require("mongoose");
  const keys = require("./config/keys");
  require("./models/User");
  require("./services/passport");
  //common js modules

  const connectDB = async () => {
    try {
      const conn = await mongoose.connect(process.env.MONGO_URI);
      console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  }

  const app = express();

  app.use(cookieSession({
      maxAge: 30 * 24 * 60 * 60 * 1000, //how long the cookie last
      keys: [keys.cookieKey] // no idea meoww
    })
  );

  app.use(passport.initialize());

  app.use(passport.session());
  
  require("./routes/authRoutes")(app);
 
  const port = process.env.PORT || 5174;
  connectDB().then(() => {
    app.listen(port, () => {
        console.log("listening for requests");
    })
})
  
  //hmWDj54mM657g7wa password  mongoDB atlas

  

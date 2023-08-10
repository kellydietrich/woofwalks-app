const express = require("express"); // load express framework
const app = express(); // use express to build the app 
const mongoose = require("mongoose"); // communicates with MongoDB database via models
const passport = require("passport"); // plugin for securely storing passwords
const session = require("express-session"); // activates a browsing session
const MongoStore = require("connect-mongo")(session); // activates a MongoDB session
const methodOverride = require("method-override"); // used for PUT and DELETE requests (override POST)
const flash = require("express-flash"); // 
const logger = require("morgan"); // allows logging to the console
const connectDB = require("./config/database"); // connect to MongoDB database
const mainRoutes = require("./routes/main"); // all routes shown in app.use() section below
const petRoutes = require("./routes/pets"); 
const reportRoutes = require("./routes/reports");
const visitRoutes = require("./routes/visits");
// const walkerRoutes = require("./routes/walkers");
const requestRoutes = require("./routes/requests");


//Use .env file in config folder
require("dotenv").config({ path: "./config/.env" });

// Passport config
require("./config/passport")(passport);

//Connect To Database
connectDB();

//Using EJS for views
app.set("view engine", "ejs");

//Static Folder
app.use(express.static("public"));

//Body Parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Logging
app.use(logger("dev"));

//Use forms for put / delete
app.use(methodOverride("_method"));

// Setup Sessions - stored in MongoDB
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Use flash messages for errors, info, ect...
app.use(flash());


//Setup Routes For Which The Server Is Listening
app.use("/", mainRoutes);
app.use("/pet", petRoutes);
app.use("/report", reportRoutes);
app.use("/visit", visitRoutes);
// app.use("/walker", walkerRoutes);
app.use("/request", requestRoutes);

//Server Running
app.listen(process.env.PORT, () => {
  console.log("Server is running, you better catch it!");
});

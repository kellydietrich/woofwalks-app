const passport = require("passport"); 
const validator = require("validator"); 
const User = require("../models/User"); // use User model

exports.getLogin = (req, res) => { // controls logging in 
  if (req.user) { // if user exists
    return res.redirect("/profile"); // go to their profile when they click on "Log in"
  }
  res.render("login", {
    title: "Login", // Log in page
  });
};

exports.postLogin = (req, res, next) => { // controls validation after a user logs in
  const validationErrors = []; // store errors here
  if (!validator.isEmail(req.body.email)) // if valid email isn't entered, return an error
    validationErrors.push({ msg: "Please enter a valid email address." });
  if (validator.isEmpty(req.body.password)) // if password is empty, return an error
    validationErrors.push({ msg: "Password cannot be blank." });

  if (validationErrors.length) { // if there are any errors stored
    req.flash("errors", validationErrors); // use flash to display the error messages to the user
    return res.redirect("/login"); // reload login page
  }
  req.body.email = validator.normalizeEmail(req.body.email, {
    gmail_remove_dots: false,
  });

  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      req.flash("errors", info);
      return res.redirect("/login");
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", { msg: "Success! You are logged in." });
      res.redirect(req.session.returnTo || "/profile");
    });
  })(req, res, next);
};

exports.logout = (req, res) => {
  req.logout(() => {
    console.log('User has logged out.')
  })
  req.session.destroy((err) => {
    if (err)
      console.log("Error : Failed to destroy the session during logout.", err);
    req.user = null;
    res.redirect("/");
  });
};

exports.getSignup = (req, res) => { 
  if (req.user) { // if user exists...
    return res.redirect("/profile"); // ...load user's profile
  }
  res.render("signup", { // if no user exists, show the signup page
    title: "Create Account",
  });
};

exports.postSignup = (req, res, next) => { // controls validation after a user signs up
  const validationErrors = [];
  if (!validator.isEmail(req.body.email))
    validationErrors.push({ msg: "Please enter a valid email address." });
  if (!validator.isLength(req.body.password, { min: 8 }))
    validationErrors.push({
      msg: "Password must be at least 8 characters long",
    });
  if (req.body.password !== req.body.confirmPassword)
    validationErrors.push({ msg: "Passwords do not match" });

  if (validationErrors.length) {
    req.flash("errors", validationErrors);
    return res.redirect("../signup");
  }
  req.body.email = validator.normalizeEmail(req.body.email, {
    gmail_remove_dots: false,
  });

  const user = new User({ // once the signup info is validated, create a new User document with the given info
    fullName: req.body.fullName,
    email: req.body.email,
    clientProfile: req.body.clientProfile,
    password: req.body.password,
  });

  User.findOne(
    { $or: [{ email: req.body.email }, { fullName: req.body.fullName }] },
    (err, existingUser) => {
      if (err) {
        return next(err);
      }
      if (existingUser) { 
        req.flash("errors", {
          msg: "Account with that email address already exists.", // error returned if email is taken
        });
        return res.redirect("../signup");
      }
      user.save((err) => { // save the user's info so they can sign in with it later
        if (err) {
          return next(err);
        }
        req.logIn(user, (err) => {
          if (err) {
            return next(err);
          }
          res.redirect("/profile"); // take the user to their profile after signup
        });
      });
    }
  );
};

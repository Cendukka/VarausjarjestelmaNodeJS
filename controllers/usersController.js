"use strict";

const passport = require("passport");

const User = require("../models/user"),
getUserParams = body => {
  return {
    name: {
      first: body.first,
      last: body.last
    },
    email: body.email,
    password: body.password
  };
};

module.exports = {
  index: (req, res, next) => {
    User.find()
    .then(users => {
      res.locals.users = users;
      next();
    })
    .catch(error => {
      console.log(`Error fetching users: ${error.message}`);
      next(error);
    });
  },
  indexView: (req, res) => {
    res.render("users/index", {
      flashMessages: {
        success: "Loaded all users!"
      }
    });
  },
  new: (req, res) => {
    res.render("users/new");
  },
  create: (req, res, next) => {
    if (req.skip) next(); 
    let newUser = new User(getUserParams(req.body)); 
    User.register(newUser, req.body.password, (error, user) => { 
      if (user) { 
        req.flash("success", `${user.fullName}'s account created successfully!`); 
        res.locals.redirect = `/users/`; 
        next(); 
      } else { 
        req.flash("error", `Failed to create user account because: ${error.message}.`);
        console.log(`Failed to create user account because: ${error.message}.`);
        res.locals.redirect = "/users/new"; 
        next(); 
      } 
    });
  },
  redirectView: (req, res, next) => {
    let redirectPath = res.locals.redirect;
    if (redirectPath) res.redirect(redirectPath);
    else next();
  },
  show: (req, res, next) => {
    let userId = req.params.id;
    User.findById(userId)
    .then(user => {
      res.locals.user = user;
      console.log(userId);
      next();
    })
    .catch(error => {
      console.log(`Error fetching user by ID: ${error.message}`);
      res.render("error");
    });
  },
  showView: (req, res) => {
    res.render("users/show");
  },
  login: (req, res) => {
    res.render("/login");
  },
  authenticate: passport.authenticate("local", {
    failureRedirect: "/error",
    failureFlash: "Failed to login.",
    successRedirect: "/",
    successFlash: "Logged in!"
  }),
    logout: (req, res, next) => {
    req.logout();
    req.flash("success", "You have been logged out!");
    res.locals.redirect = "/";
    next();
  }
  

};

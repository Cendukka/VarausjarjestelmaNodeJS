"use strict"

const express = require('express');
const router = express.Router();
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");
const connectFlash = require("connect-flash");
const passport = require("passport");

const homeController = require("../controllers/homeController");
const varausController = require("../controllers/varausController");
const usersController = require("../controllers/usersController");
const User = require("../models/user");

router.use(
  expressSession({
    secret: "secret_passcode",
    cookie: {
      maxAge: 4000000
    },
    resave: false,
    saveUninitialized: false
  })
);
router.use(passport.initialize());
router.use(passport.session());



router.use(express.json());
router.use(cookieParser("secret_passcode"));
router.use(connectFlash());

router.use((req, res, next) => {
  res.locals.loggedIn = req.isAuthenticated();
  res.locals.currentUser = req.user;
  res.locals.flashMessages = req.flash();
  next();
});


//authenticate users
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

router.use((req, res, next) => {
  res.locals.loggedIn = req.isAuthenticated();
  res.locals.currentUser = req.user;
  res.locals.flashMessages = req.flash();
  next();
});

router.get("/", homeController.showHome);

router.get("/login", homeController.showLogin);
router.post("/login", usersController.authenticate,usersController.redirectView);
router.get("/logout", usersController.logout, usersController.redirectView);


router.get("/reserve", homeController.showReserve);
router.post("/reserve/new", varausController.saveReservation,varausController.redirectView)
router.get("/reservations", varausController.getAllReservations);
router.get("/contacts", homeController.showContacts);
router.get("/rules", homeController.showRules);
router.post("/users/login", usersController.authenticate);
router.get("/error", homeController.showError);

router.get("/users", usersController.index, usersController.indexView);
router.get("/users/new", usersController.new);
router.post("/users/create", usersController.create, usersController.redirectView);
router.get("/users/:id", usersController.show, usersController.showView);

module.exports = router;
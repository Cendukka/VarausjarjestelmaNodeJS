"use strict"

// Require all packages, models and other files
const httpStatusCode = require("http-status-codes");
const express = require("express");
const layouts = require("express-ejs-layouts");
const homeController = require("./controllers/homeController");
const router = require("./routes/router");
const expressSession = require("express-session");
const cookieParser = require("cookie-parser");
const connectFlash = require("connect-flash");

//Database related
const mongoose = require("mongoose");
const MongoDB = require("mongodb").MongoClient;
const db = mongoose.connection;
const dbURL = "mongodb://localhost:27017";
const dbName = "varausjarjestelma";
// Set app port number and to use express
const port = 3000;
const app = express();

app.set("view engine", "ejs");
app.use(layouts);
app.use(express.static("public"));
app.use(express.urlencoded());


initDB();

app.use((req, res, next) => {
    console.log(`Request made to: ${req.url}`);
    next();
});

// Routes
app.use('/', router);


app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});


//Initialize database
function initDB() {

    MongoDB.connect(dbURL, (error, client) => {
        if (error) {
            console.log(error);
        }

        let db = client.db(dbName);

        //Create collections
        db.createCollection("users", (err) => {
            if (err) throw err;
        });

        db.createCollection("reservations", (err) => {
            if (err) throw err;
        });
    });

    mongoose.connect(
        "mongodb://localhost:27017/varausjarjestelma",
        { useNewUrlParser: true }
        );

    db.once("open", () => {
        console.log("Successfully connected to MongoDB using Mongoose!")
        
    });
    //Requiring flash messaging
    const expressSession = require("express-session"),
    cookieParser = require("cookie-parser"),
    connectFlash = require("connect-flash");

//allow creation of new users
create: (req, res, next) => {
    if (req.skip) next();
    let newUser = new User( getUserParams(req.body) );
    User.register(newUser, req.body.password, (error, user) => {
        if (user) {
            req.flash("success", `${user.fullName}'s account created
                successfully!`);
            res.locals.redirect = "/users";
            next();
        } else {
            req.flash("error", `Failed to create user account because:
                ${error.message}.`);
            res.locals.redirect = "/users/new";
            next();
        }
    });
}
}
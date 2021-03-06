"use strict"

// Require all packages, models and other files
const express = require("express");
const layouts = require("express-ejs-layouts");
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
        let collections = db.listCollections();
        for (let i in collections) {
            if(i !== "users"){
                db.createCollection("users", (err) => {
                    if (err) throw err;
                });
            }else if(i !== "reservations"){
                db.createCollection("reservations", (err) => {
                    if (err) throw err;
                });
            }else{
                res.render("error");
            }
        }
        
        /*db.createCollection("users", (err) => {
            if (err) throw err;
        });

        db.createCollection("reservations", (err) => {
            if (err) throw err;
        });*/
    });

    mongoose.connect(
        "mongodb://localhost:27017/varausjarjestelma",
        { useNewUrlParser: true }
        );

    db.once("open", () => {
        console.log("Successfully connected to MongoDB using Mongoose!")
        
    });
}
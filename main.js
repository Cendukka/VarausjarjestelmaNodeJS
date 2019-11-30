"use strict"


const httpStatusCode = require("http-status-codes");
const express = require("express");
const layouts = require("express-ejs-layouts");
const homeController = require("./controllers/homeController")

//Database related
const mongoose = require("mongoose");
const MongoDB = require("mongodb").MongoClient;
const db = mongoose.connection;
const dbURL = "mongodb://localhost:27017";
const dbName = "varausjarjestelma";

const port = 3000;
const app = express();

app.set("view engine", "ejs");
app.use(layouts);
app.use(express.static("public"));


initDB();

app.use((req, res, next) => {
    console.log(`Request made to: ${req.url}`);
    next();
});


app.get("/home", homeController.showHome);

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
}
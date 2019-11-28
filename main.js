"use strict"


const httpStatusCode = require("http-status-codes");
const express = require("express");
const layouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const homeController = require("./controllers/homeController")

const port = 3000;
const app = express();

app.set("view engine", "ejs");
app.use(layouts);
app.use(express.static("public"));

mongoose.connect(
    "mongodb://localhost:27017/varausjarjestelma",
    { useNewUrlParser: true }
);

const db = mongoose.connection;

db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!")
});

app.use((req, res, next) => {
    console.log(`Request made to: ${req.url}`);
    next();
});


app.get("/home", homeController.showHome);

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});
"use strict"

const express = require("express");
const layouts = require("express-ejs-layouts");
const mongoose = require("mongoose");

const port = 3000;
const app = express();

mongoose.connect(
    "mongodb://localhost:27017/varausjarjestelma",
    { useNewUrlParser: true }
);

const db = mongoose.connection;

db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!")
});


app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});
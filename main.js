"use strict"

const express = require("express");
const layouts = require("express-ejs-layouts");

const port = 3000;
const app = express();

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});
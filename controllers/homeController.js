"use strict"


exports.showHome = (req, res) => {
    console.log("jou"+req.user)
    if (req.user) {
        console.log("jou"+req.user)
        res.render("index");
    } else {
        res.redirect('/login');
    }
    
};
exports.showLogin = (req, res) => {
    res.render("login");
};
exports.showReserve = (req, res) => {
    res.render("varaa");
};
exports.showReservations = (req, res) => {
    res.render("varaukset");
};
exports.showContacts = (req, res) => {
    res.render("yhteystiedot");
};
exports.showRules = (req, res) => {
    res.render("saannot");
};
exports.showError = (req, res) => {
    res.render("error");
};
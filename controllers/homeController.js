"use strict"


exports.showHome = (req, res) => {
    res.render("index");
};
exports.showLogin = (req, res) => {
    res.render("login");
};
exports.showReserve = (req, res) => {
    if (req.user) {
        res.render("varaa");
    } else {
        res.redirect('/login');
    }
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
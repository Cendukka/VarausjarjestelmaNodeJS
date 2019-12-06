"use strict";

const varausModel = require("../models/varaus");


exports.getAllReservations = (req, res) => {
  varausModel.find({})
    .exec()
    .then(varaus => {
      res.render("varaukset", {
        varaus: varaus
      });
    })
    .catch(error => {
      console.log(error.message);
      return [];
    })
    .then(() => {
      console.log("promise complete");
    });
};

exports.getReservationsPage = (req, res) => {
  res.render("varaukset");
};

exports.saveReservation = (req, res) => {
  
  let newVaraus = new varausModel({
    name: req.body.name,
    sport: req.body.sport,
    date: req.body.date,
    startTime: req.body.startTime,
    endTime: req.body.endTime
  });
  newVaraus
    .save()
    .then(result => {
      res.render("varaukset");
    })
    .catch(error => {
      if (error) res.send(error);
    });
};

"use strict";

const Subscriber = require("../models/varaus");

exports.getAllSubscribers = (req, res) => {
  Subscriber.find({})
    .exec()
    .then(varaus => {
      res.render("varaa", {
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
  let newVaraus = new Varaus({
    name: req.body.name,
    sport: req.body.sport,
    startTime: req.body.startTime,
    endTime: req.body.endTime
  });
  newVaraus
    .save()
    .then(result => {
      res.render("thanks");
    })
    .catch(error => {
      if (error) res.send(error);
    });
};

"use strict";

const varausModel = require("../models/varaus");
const moment = require('moment');

//Fetches all reservations from the database and then renders the page to show them
exports.getAllReservations = (req, res) => {
  varausModel.find({})
    .exec()
    .then(varaus => {

      //create empty lists
      let reservers = [];
      let sports = [];
      let dates = [];
      let startTimes = [];
      let endTimes = [];

      //Loop each row from the database collection and 
      varaus.forEach(v =>{
        reservers.push(v.name);
        sports.push(v.sport);
        let unformatedDate = moment(v.date);
        let formatedDate = unformatedDate.format("DD/MM/YYYY");
        dates.push(formatedDate);
        startTimes.push(v.startTime);
        endTimes.push(v.endTime);
      });

      //after all has been pushed, let's render the reservation page, parameters are the filled lists
      res.render("varaukset", {
        reservers: reservers,
        sports: sports,
        dates: dates,
        startTimes: startTimes,
        endTimes: endTimes
      });
    })
    .catch(error => {
      res.render("error");
    })
    .then(() => {
      console.log("promise complete");
    });
};

exports.getReservationsPage = (req, res) => {
  res.render("varaukset");
};

//Creates new reservation object and saves in in the database
exports.saveReservation = (req, res) => {
  
  let newVaraus = new varausModel({
    name: req.body.name,
    sport: req.body.sport,
    date: req.body.date,
    startTime: req.body.startTime,
    endTime: req.body.endTime
  });
  if(newVaraus.startTime>newVaraus.endTime){
    res.render("error");
  }else{
    newVaraus
      .save()
      .then(result => {
        let unformatedDate = moment(result.date);
        let formatedDate = unformatedDate.format("DD/MM/YYYY");
        res.render("kiitos", { result: result, date: formatedDate});
      })
      .catch(error => {
        if (error) res.render("error");
      });
  }
};

"use strict";

const mongoose = require("mongoose");
const varausSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  sport: {
    type: String,
    enum: [ "Sulkapallo", "Koripallo", "Sähly", "Tennis", "Jalkapallo" ]
  },
  date: {
    type: Date,
    required: true
  },
  startTime: {
    type: Number,
    min: 12,
    max: 18,
    required: true
  },
  endTime: {
    type: Number,
    min:13,
    max:19,
    required: true
  }
},{ collection : 'reservations' })

module.exports = mongoose.model("Varaus", varausSchema);

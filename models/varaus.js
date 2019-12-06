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
    required: true
  },
  endTime: {
    type: Number,
    required: true
  }
},{ collection : 'reservations' });

/*subscriberSchema.methods.getInfo = function() {
  return `Name: ${this.name} Sport: ${this.sport} Start Time: ${this.startTime} End Time: ${this.endTime}`;
};*/


module.exports = mongoose.model("Varaus", varausSchema);

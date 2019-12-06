/*"use strict";

const mongoose = require("mongoose");
const varausSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  sport: {
    enum: [ "Sulkapallo", "Koripallo", "Sähly", "Tennis", null ],
    required: true
  },
  startTime: {
    type: Date
  },
    endTime: {
    type: Date
  }
},
{ collection : 'reservations' });

/*subscriberSchema.methods.getInfo = function() {
  return `Name: ${this.name} Sport: ${this.sport} Start Time: ${this.startTime} End Time: ${this.endTime}`;
};


module.exports = mongoose.model("Varaus", varausSchema);*/

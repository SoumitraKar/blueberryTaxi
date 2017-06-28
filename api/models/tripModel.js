'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var tripSchema = new Schema({
  tripId: {
    type: String,
    Required: 'id is compulsory'
  },
  start_lat: {
    type: Number
  },
  start_long: {
    type: Number
  },
  started: {
    type: Boolean,
    default: false
  },
  stopped: {
    type: Boolean,
    default: false
  },
  assignedTo: {
    type: String,
    Required: 'Use UserId'
  },
  driverId: {
    type: String,
    Required: 'Use driverId'
  },
  startTime: {
    type: Date
  },
  endTime: {
    type: Date
  }
});

module.exports = mongoose.model('Trip', tripSchema);
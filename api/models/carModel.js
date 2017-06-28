'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var TaskSchema = new Schema({
  cabId: {
    type: String,
    Required: 'id is compulsory'
  },
  latitude: {
    type: Number,
    default: 0
  },
  longitude: {
    type: Number,
    default: 0
  },
  available: {
    type: Boolean,
    default: true
  },
  isPink: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('Car', TaskSchema);
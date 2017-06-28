'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var userSchema = new Schema({
  userId: {
    type: String,
    Required: 'id is compulsory'
  },
  Name: {
    type: String,
    Required: 'Name is compulsory'
  }
});

module.exports = mongoose.model('User', userSchema);
'use strict';


var mongoose = require('mongoose'),
  Car = mongoose.model('Car');
  Trip = mongoose.model('Trip');
  User = mongoose.model('User');

exports.view_all_car = function(req, res) {
  Car.find({}, function(err, car) {
    if (err)
      res.send(err);
    res.json(car);
  });
};
exports.view_all_trips = function(req, res) {
  Trip.find({}, function(err, trip) {
    if (err)
      res.send(err);
    res.json(trip);
  });
};



exports.view_nearest_car = function(req, res) {
  var request = req.body;
  //check if pink is required
  if  (request.isPink){
    var searchCriteria = {'isPink': true, 'available': true};
  }
  else{
    var searchCriteria = {'available': true};
  }
  var success = true;
  var failMsg = "";
  var carDetails = {};
    var shortestpath = null;
  Car.find(searchCriteria, function(err, car) {
    if (err){
      success = false;
      failMsg = err;
    }
    //find nearest car here
    var user_long = parseInt(request.longitude);
    var user_lat = parseInt(request.laitude);
    var selectedCar = null;
    for (var c in car) {
      var car_long = parseInt(car[c]["longitude"]);
      var car_lat = parseInt(car[c]["latitude"]);
      var lat_diff = parseInt(car_lat - user_lat);
      var long_diff = parseInt(car_long - user_long);
      var dist = Math.sqrt((lat_diff * lat_diff) + (long_diff * long_diff)); //pythagorus theorum for distance
      if(shortestpath == null || shortestpath > dist){
        shortestpath = dist;
        selectedCar = car[c];
      }
    }
    carDetails = selectedCar;
    var newTrip = {};
    var trip = new Trip();
    var trpId = Math.floor((Math.random() * 99999) + 10000); // randm 5 dig no.
    trip["assignedTo"] = request.userId;
    trip["tripId"] = trpId;
    trip["start_lat"] = request.laitude;
    trip["start_long"] = request.longitude;
    trip["driverId"] = carDetails.cabId;
  trip.save(function(err, trp) {
      console.log("====" + shortestpath);
    if (err){
      success = false;
      failMsg = err;
    }
      newTrip = trp;
  var finalJson = {  };
  console.log(carDetails);
  if(success){
    finalJson["success"] = true;
    finalJson["driverId"] = carDetails.cabId;
    finalJson["distance"] = shortestpath;
    finalJson["tripId"] = trp["tripId"];
  }
  else{
    finalJson["success"] = false;
    finalJson["message"] = failMsg;    
  }
  res.json(finalJson)
  });
  });
  //assign trip

};

exports.addCar = function(req, res) {
  for(var i = 0; i < 10 ; i ++){
    var isPinkvar =  Math.floor((Math.random() * 2) + 0);
    var isPink = true;
    if(isPinkvar > 0) {
      isPink = false;
    }
    var longitude = Math.floor((Math.random() * 10000000) + 0);
    var latitude = Math.floor((Math.random() * 10000000) + 0);
    var cabId = Math.floor((Math.random() * 10000000) + 0);
    var carJson = {
                  "isPink" : isPink,
                  "longitude" : longitude,
                  "latitude" : latitude,
                  "cabId" : cabId
                }
    var new_car = new Car(carJson);
    new_car.save(function(err, task) {
      if (err)
        res.send(err);
    });
  }
      res.json("Done");
};


exports.addUsers = function(req, res) {
  for(var i = 0; i < 10 ; i ++){
    var isPinkvar =  Math.floor((Math.random() * 2) + 0);
    var isPink = true;
    if(isPinkvar > 0) {
      isPink = false;
    }
    var Name = Math.floor((Math.random() * 10000000) + 0);
    var userId = Math.floor((Math.random() * 10000000) + 0);
    var userJson = {
                  "userId" : userId,
                  "Name" : Name,
                }
    var new_user = new User(userJson);
    new_user.save(function(err, res) {
      if (err)
        res.send(err);
    });
  }
      res.json("Done");
};


exports.startTrip = function(req, res) {
  var trpId = req.body.tripId;
  var trip_to_start = {};
  var success = true;
  var errMsg = "";
  Trip.find({"tripId" : trpId}, function(err, trip) {
    if (err){
      var op = {
        "success" : false,
        "message" :err
      }
      res.json(op);
    }
    else{
      trip_to_start = trip;
      console.log(trip_to_start);
      if(trip_to_start[0].started == true){
        var op = {
          "success" : false,
          "message" : "Trip already started"
        }
        res.json(op);
      }
      else{
        Trip.update({"tripId" : trpId},{"started" : true, "startTime" : Date.now()}, { multi: false }, function(err, resp){
          if(err){
            var op = {
              "success" : false,
              "message" : err
            }
            res.json(op);
          }
          else{    
            Car.update({"cabId" : trip_to_start[0].driverId}, {"available" : false},{ multi: false }, function(er, rs){
             if(er){
              var op = {
                "success" : false,
                "message" : err
              }
              res.json(op);
            } 
            else{
              var op = {
                "success" : true
              }        
              res.json(op);
            }
            });
          }

        });
      }
    }
  });
};

exports.endTrip = function(req, res) {
  var trpId = req.body.tripId;
  var latitude = req.body.latitude;
  var longitude = req.body.longitude;
  var timeNow = Date.now();
  var trip_to_end = {};
  var success = true;
  var errMsg = "";
  Trip.find({"tripId" : trpId}, function(err, trip) {
    if (err){
      var op = {
        "success" : false,
        "message" :err
      }
      res.json(op);
    }
    else{
      trip_to_end = trip;
      console.log(trip_to_end);
      if(trip_to_end[0].stopped == true){
        var op = {
          "success" : false,
          "message" : "Trip already stopped"
        }
        res.json(op);
      }
      else{
        Trip.update({"tripId" : trpId},{"stopped" : true, "endTime" : Date.now()}, { multi: false }, function(err, resp){
          if(err){
            var op = {
              "success" : false,
              "message" : err
            }
            res.json(op);
          }
          else{    
            //Calculate Fare
            var long_diff = parseInt(trip_to_end[0].start_long) - parseInt(longitude);
            var lat_diff = parseInt(trip_to_end[0].start_lat) - parseInt(latitude);
            console.log(long_diff);
            console.log(lat_diff);
            var dist = Math.sqrt((long_diff * long_diff) + (lat_diff * lat_diff));
            console.log(dist)
            var op = {
              "success" : true,
              "distance" : dist
            }        
            res.json(op);
          }

        });
      }
    }
  });
};

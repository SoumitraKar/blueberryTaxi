'use strict';
module.exports = function(app) {
  var carList = require('../controllers/carController');


  // todoList Routes
    app.route('/addCars')
        .get(carList.addCar);
    app.route('/addUsers')
        .get(carList.addUsers);
    app.route('/view_all_car')
        .get(carList.view_all_car);
    app.route('/view_all_trips')
        .get(carList.view_all_trips);
    app.route('/requestCar')
        .post(carList.view_nearest_car);
    app.route('/startTrip')
        .put(carList.startTrip);
    app.route('/endTrip')
        .put(carList.endTrip);
};
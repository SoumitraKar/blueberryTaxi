var express = require('express'),
  app = express(),
  port = process.env.PORT || 7000;

  mongoose = require('mongoose'),
  Car = require('./api/models/carModel'),
  Trip = require('./api/models/tripModel'),
  User = require('./api/models/userModel'),
  bodyParser = require('body-parser');
  mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/Tododb'); 

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./api/routes/carRoutes');
routes(app);

app.listen(port);

console.log('BlueberryRESTful API server started on: ' + port);

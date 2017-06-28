start server : npm run start

Server : localhost:7000/

Add basic data

addUsers - GET
addCars - GET

view_all_car - GET
view_all_trips - GET

requestCar - POST
{
"isPink" : true,
"longitude" : 2440123,
"laitude" : 260549,
"userId" : "dds"
}

startTrip - PUT
{
"tripId" : 65144
}

endTrip - PUT
{
"tripId" : 65144,
"longitude" : 2,
"latitude" : 3
}
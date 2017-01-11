/*
MERCATORMAP: GEOLOCALIZACION
*/
function MercatorMap(mapScreenWidth, mapScreenHeight, topLatitude,
  bottomLatitude, leftLongitude, rightLongitude) {
  this.mapScreenWidth = mapScreenWidth;
  this.mapScreenHeight = mapScreenHeight;
  this.topLatitudeRelative = this.getScreenYRelative(topLatitude);
  this.bottomLatitudeRelative = this.getScreenYRelative(bottomLatitude);
  this.leftLongitudeRadians = this.getRadians(leftLongitude);
  this.rightLongitudeRadians = this.getRadians(rightLongitude);
}

MercatorMap.prototype.getScreenLocation = function(latitudeInDegrees,
  longitudeInDegrees) {
  return [this.getScreenX(longitudeInDegrees), this.getScreenY(
    latitudeInDegrees)];
}

MercatorMap.prototype.getScreenY = function(latitudeInDegrees) {
  return this.mapScreenHeight * (this.getScreenYRelative(latitudeInDegrees) -
    this.topLatitudeRelative) / (this.bottomLatitudeRelative - this.topLatitudeRelative);
}

MercatorMap.prototype.getScreenX = function(longitudeInDegrees) {
  var longitudeInRadians = this.getRadians(longitudeInDegrees);
  return this.mapScreenWidth * (longitudeInRadians - this.leftLongitudeRadians) /
    (this.rightLongitudeRadians - this.leftLongitudeRadians);
}

MercatorMap.prototype.getScreenYRelative = function(latitudeInDegrees) {
  return Math.log(Math.tan(latitudeInDegrees / 360.0 * Math.PI + Math.PI / 4));
}

MercatorMap.prototype.getRadians = function(deg) {
  return deg * Math.PI / 180;
}

var fs = require('fs');
var left = -74.046478,
  right = -73.716202,
  up = 40.858510,
  bottom = 40.572027;
  map = new MercatorMap(1440, 747, 40.858510, 40.572027, -74.046478, -73.716202);
/* parse data*/
var trans = fs.readFileSync("01AM_AllData_for_calculation.json","utf8");
var dataFromJSON = JSON.parse(trans);

function parseData(data){
  var dataed = [];
  var firstTime = 1451628000000;

for (var i = 0; i < data.length; i++) {
  var o = {};
  o.sx = map.getScreenX(data[i].pickup_longitude);
  o.sy = map.getScreenY(data[i].pickup_latitude);
  o.ex = map.getScreenX(data[i].dropoff_longitude);
  o.ey = map.getScreenY(data[i].dropoff_latitude);
  o.Startvalue_ParticleSequence = new Date(data[i].tpep_pickup_datetime).getTime() - firstTime;
  o.value_ParticleLifeTime = new Date(data[i].tpep_dropoff_datetime).getTime() - new Date(data[i].tpep_pickup_datetime).getTime();
  o.passenger_count = data[i].passenger_count;
  o.trip_distance = data[i].trip_distance;
  o.tip_amount = data[i].tip_amount;
  o.total_amount = data[i].total_amount;
  o.ptime = data[i].tpep_pickup_datetime;
  console.log(o.Startvalue_ParticleSequence);

  dataed.push(o);
}

console.log(dataed.length);
// fs.writeFileSync("particleDataFeed.json",JSON.stringify(dataed),"utf8");
}
parseData(dataFromJSON)

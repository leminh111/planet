import Planet from './planet';
import PlanetSquare from './planet-square';
import Universe from './universe';

import f11 from './fullsize';

f11('.fluid');

document.addEventListener('DOMContentLoaded', function() {
  var canvas = document.getElementById('universe');
  var underlay = document.getElementById('underlayTrail');

  var universe = new Universe();

  var planetO = new Planet();
  var planetA = new Planet();
  var planetB = new Planet();

  planetO.radius = 15;
  planetO.mass = 8000;
  planetO.position = {x:500, y:250};

  planetA.radius = 10;
  planetA.mass = 9;
  planetA.position = {x:400, y:200};
  planetA.velocity.y = 20;

  planetB.radius = 10;
  planetB.mass = 10;
  planetB.position = {x:350, y:200};
  planetB.velocity.y = 18;

  universe
  .addPlanet(planetO)
  .addPlanet(planetA)
  .addPlanet(planetB)
  .setCanvas(canvas, underlay)
  .createPlanet()
  .setDeltaT(0.02)
  .bigbang();
}, false)


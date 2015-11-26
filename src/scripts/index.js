import Planet from './planet';
import Universe from './universe';

document.addEventListener('DOMContentLoaded', function() {
  var universe = new Universe();

  var planetA = new Planet();

  var planetB = new Planet();
  var planetC = new Planet();

  planetA.radius = 10;
  planetA.mass = 9;
  planetA.position = {x:400, y:200};
  planetA.velocity.y = 20;

  planetB.radius = 15;
  planetB.mass = 8000;
  planetB.position = {x:500, y:250};

  planetC.radius = 10;
  planetC.mass = 10;
  planetC.position = {x:350, y:200};
  planetC.velocity.y = 18;

  universe
  .addPlanet(planetA)
  .addPlanet(planetB)
  .addPlanet(planetC)
  .setCanvas(document.getElementById('universe1'))
  .createPlanet()
  .setDeltaT(0.08)
  .bigbang();
}, false)

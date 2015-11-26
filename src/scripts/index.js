import Planet from './planet';
import Universe from './universe';

document.addEventListener('DOMContentLoaded', function() {
  var universe = new Universe();

  var planetA = new Planet();

  var planetB = new Planet();


  planetA.radius = 10;
  planetA.mass = 100;
  planetA.position = {x:400, y:250};
  planetA.velocity.x = 0;

  planetB.radius = 15;
  planetB.mass = 100;
  planetB.position = {x:250, y:250};

  /*planetC.radius = 15;
  planetC.mass = 100;
  planetC.position = {x:500, y:10};*/

  universe
  .addPlanet(planetA)
  .addPlanet(planetB)
  .setCanvas(document.getElementById('universe1'))
  .setDeltaT(0.08)
  .bigbang();
}, false)

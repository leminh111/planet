import Planet from './planet';
import PlanetSquare from './planet-square';
import Universe from './universe';

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

// on event resize and load
// find all .fluid and set width height attribute for each

function setFullsize() {
  var els = document.getElementsByClassName('fluid');
  for (var i=0; i<els.length; i++) {
    var el = els[i];

    // Canvas need width&height attr so the ratio remains 1:1
    if (el.nodeName == 'CANVAS') {
      el.setAttribute('width', window.innerWidth);
      el.setAttribute('height', window.innerHeight);
    }

    el.style.width = window.innerWidth + 'px';
    el.style.height = window.innerHeight + 'px';

  }
}

window.addEventListener('resize', setFullsize, false);
document.addEventListener('DOMContentLoaded', setFullsize, false);

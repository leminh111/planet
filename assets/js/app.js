(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (selector) {
  // on event resize and load
  // find all .fluid and set width height attribute for each
  function setFullsize() {
    var els = document.querySelectorAll(selector);
    for (var i = 0; i < els.length; i++) {
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
};

},{}],2:[function(require,module,exports){
'use strict';

var _planet = require('./planet');

var _planet2 = _interopRequireDefault(_planet);

var _planetSquare = require('./planet-square');

var _planetSquare2 = _interopRequireDefault(_planetSquare);

var _universe = require('./universe');

var _universe2 = _interopRequireDefault(_universe);

var _fullsize = require('./fullsize');

var _fullsize2 = _interopRequireDefault(_fullsize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _fullsize2.default)('.fluid');

document.addEventListener('DOMContentLoaded', function () {
  var canvas = document.getElementById('universe');
  var underlay = document.getElementById('underlayTrail');

  var universe = new _universe2.default();

  var planetO = new _planet2.default();
  var planetA = new _planet2.default();
  var planetB = new _planet2.default();

  planetO.radius = 15;
  planetO.mass = 8000;
  planetO.position = { x: 500, y: 250 };

  planetA.radius = 10;
  planetA.mass = 9;
  planetA.position = { x: 400, y: 200 };
  planetA.velocity.y = 20;

  planetB.radius = 10;
  planetB.mass = 10;
  planetB.position = { x: 350, y: 200 };
  planetB.velocity.y = 18;

  universe.addPlanet(planetO).addPlanet(planetA).addPlanet(planetB).setCanvas(canvas, underlay).createPlanet().setDeltaT(0.02).bigbang();
}, false);

},{"./fullsize":1,"./planet":5,"./planet-square":4,"./universe":6}],3:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Line = (function () {
  function Line() {
    _classCallCheck(this, Line);

    this.init = {
      x: 0,
      y: 0
    };
    this.last = {
      x: 0,
      y: 0
    };
  }

  _createClass(Line, [{
    key: "render",
    value: function render(ctx) {
      ctx.beginPath();
      ctx.moveTo(this.init.x, this.init.y);
      ctx.lineTo(this.last.x, this.last.y);
      ctx.stroke();
      return this;
    }
  }]);

  return Line;
})();

exports.default = Line;

},{}],4:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _planet = require('./planet.js');

var _planet2 = _interopRequireDefault(_planet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PlanetSquare = (function (_Planet) {
  _inherits(PlanetSquare, _Planet);

  function PlanetSquare() {
    _classCallCheck(this, PlanetSquare);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(PlanetSquare).apply(this, arguments));
  }

  _createClass(PlanetSquare, [{
    key: 'render',
    value: function render(ctx) {
      ctx.beginPath();
      ctx.rect(this.position.x - this.radius, this.position.y - this.radius, 2 * this.radius, 2 * this.radius);
      ctx.stroke();
      return this;
    }
  }]);

  return PlanetSquare;
})(_planet2.default);

exports.default = PlanetSquare;

},{"./planet.js":5}],5:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Planet = (function () {
  function Planet() {
    _classCallCheck(this, Planet);

    this.radius = 1;
    this.mass = 1;
    this.velocity = {
      x: 0,
      y: 0
    };
    this.position = {
      x: 0,
      y: 0
    };
    this.gForce = {
      x: 0,
      y: 0
    };
  }

  _createClass(Planet, [{
    key: "render",
    value: function render(ctx) {
      ctx.beginPath();
      ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2, true);
      ctx.stroke();
      return this;
    }
  }]);

  return Planet;
})();

exports.default = Planet;

},{}],6:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _planet = require('./planet');

var _planet2 = _interopRequireDefault(_planet);

var _line = require('./line');

var _line2 = _interopRequireDefault(_line);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Universe = (function () {
  function Universe() {
    _classCallCheck(this, Universe);

    this.planets = [];
  }

  _createClass(Universe, [{
    key: 'addPlanet',
    value: function addPlanet(planet) {
      this.planets.push(planet);
      return this;
    }

    /**
     * @param {Node} canvas
     */

  }, {
    key: 'setCanvas',
    value: function setCanvas(canvas, underlay) {
      this.canvas = canvas;
      this.underlay = underlay;
      this.ctx = canvas.getContext('2d');
      this.ctxUnderlay = underlay.getContext('2d');
      return this;
    }
  }, {
    key: 'setDeltaT',
    value: function setDeltaT(deltaT) {
      this.deltaT = deltaT;
      return this;
    }
  }, {
    key: 'collide',
    value: function collide() {
      var dist;
      for (var i = 0; i < this.planets.length; i++) {
        for (var j = 0; j < this.planets.length; j++) {
          if (i !== j) {
            dist = Math.sqrt(Math.pow(this.planets[j].position.x - this.planets[i].position.x, 2) + Math.pow(this.planets[j].position.y - this.planets[i].position.y, 2));
            if (dist < this.planets[j].radius + this.planets[i].radius) {
              if (this.planets[i].mass <= this.planets[j].mass) {
                this.planets[j].mass += this.planets[i].mass;
                this.planets.splice(i, 1);
              } else {
                this.planets[i].mass += this.planets[j].mass;
                this.planets.splice(j, 1);
              }
            }
          }
        }
      }
      return this;
    }
  }, {
    key: 'createPlanet',
    value: function createPlanet() {
      var self = this;

      // Mousedown, let's create a new planet at that position
      //   BUT don't add it into the planet list (so it won't move ..)
      //   Also, we need to enlarge the planet every 100ms,
      //   and remember to draw it in `render()`
      this.canvas.addEventListener('mousedown', function (e) {
        self.initX = e.clientX - this.getBoundingClientRect().left;
        self.initY = e.clientY - this.getBoundingClientRect().top;

        self.newPlanet = new _planet2.default();
        self.newPlanet.position.x = self.initX;
        self.newPlanet.position.y = self.initY;
        self.newPlanet.radius = 1;

        self.stopInterval = setInterval(function () {
          self.newPlanet.radius += 0.3;
        }, 100);

        self.newLine = new _line2.default();
        self.newLine.init.x = e.clientX - this.getBoundingClientRect().left;
        self.newLine.init.y = e.clientY - this.getBoundingClientRect().top;
        self.newLine.last.x = self.newLine.init.x;
        self.newLine.last.y = self.newLine.init.y;
      });

      // When mouse move, if there's a newPlanet,
      //   update its position to mouse pointer
      this.canvas.addEventListener('mousemove', function (e) {
        if (self.newPlanet) {
          self.newPlanet.position.x = e.clientX - this.getBoundingClientRect().left;
          self.newPlanet.position.y = e.clientY - this.getBoundingClientRect().top;
        }

        if (self.newLine) {
          self.newLine.last.x = e.clientX - this.getBoundingClientRect().left;
          self.newLine.last.y = e.clientY - this.getBoundingClientRect().top;
        }
      });

      // When release mouse, calculate the velocity
      //   and add it into the universe
      this.canvas.addEventListener('mouseup', function (e) {
        clearInterval(self.stopInterval);

        self.lastX = e.clientX - this.getBoundingClientRect().left;
        self.lastY = e.clientY - this.getBoundingClientRect().top;

        self.newPlanet.velocity.x = self.initX - self.lastX;
        self.newPlanet.velocity.y = self.initY - self.lastY;
        self.addPlanet(self.newPlanet);

        self.newPlanet = null;
        self.newLine = null;
      });
      return this;
    }
  }, {
    key: 'bigbang',
    value: function bigbang() {
      var self = this;

      setInterval(function () {
        self.tick().collide().render();
      }, this.deltaT);
      return this;
    }
  }, {
    key: 'trail',
    value: function trail() {
      for (var i = 0; i < this.planets.length; i++) {
        if (!this.planets[i].trail) {
          this.planets[i].trail = new _planet2.default();
          this.planets[i].trail.radius = 0.1;
        };
        if (this.planets[i].trail) {
          this.planets[i].trail.position = this.planets[i].position;
        }
      }
    }
  }, {
    key: 'render',
    value: function render() {
      this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

      this.ctxUnderlay.fillStyle = 'rgba(255, 255, 255, .015)';
      this.ctxUnderlay.fillRect(0, 0, this.ctxUnderlay.canvas.width, this.ctxUnderlay.canvas.height);

      for (var i = 0; i < this.planets.length; i++) {
        this.planets[i].render(this.ctx);
      }

      for (var i = 0; i < this.planets.length; i++) {
        this.planets[i].trail.render(this.ctxUnderlay);
      }

      if (this.newPlanet) {
        this.newPlanet.render(this.ctx);
      }

      if (this.newLine) {
        this.newLine.render(this.ctx);
      }

      return this;
    }
  }, {
    key: 'tick',
    value: function tick() {
      var dt = this.deltaT;

      var gConst = 6.674,
          forceX = 0,
          deltaT = dt,
          subtrX,
          subtrY,
          forceY = 0;

      for (var i = 0; i < this.planets.length; i++) {

        for (var j = 0; j < this.planets.length; j++) {
          if (j == i) {
            forceX += 0;
            forceY += 0;
          } else {
            subtrX = this.planets[j].position.x - this.planets[i].position.x;
            subtrY = this.planets[j].position.y - this.planets[i].position.y;
            forceX += gConst * this.planets[i].mass * this.planets[j].mass * subtrX / Math.pow(Math.sqrt(Math.pow(subtrX, 2) + Math.pow(subtrY, 2)), 3);
            forceY += gConst * this.planets[i].mass * this.planets[j].mass * subtrY / Math.pow(Math.sqrt(Math.pow(subtrX, 2) + Math.pow(subtrY, 2)), 3);
          }
        }
        this.planets[i].gForce.x = forceX;
        this.planets[i].gForce.y = forceY;
        forceX = 0;
        forceY = 0;
      }

      for (var k = 0; k < this.planets.length; k++) {
        this.planets[k].velocity.x += this.planets[k].gForce.x * deltaT / this.planets[k].mass;
        this.planets[k].velocity.y += this.planets[k].gForce.y * deltaT / this.planets[k].mass;
        this.planets[k].position.x += this.planets[k].velocity.x * deltaT;
        this.planets[k].position.y += this.planets[k].velocity.y * deltaT;
      }
      this.trail();
      return this;
    }
  }]);

  return Universe;
})();

exports.default = Universe;

},{"./line":3,"./planet":5}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvc2NyaXB0cy9mdWxsc2l6ZS5qcyIsInNyYy9zY3JpcHRzL2luZGV4LmpzIiwic3JjL3NjcmlwdHMvbGluZS5qcyIsInNyYy9zY3JpcHRzL3BsYW5ldC1zcXVhcmUuanMiLCJzcmMvc2NyaXB0cy9wbGFuZXQuanMiLCJzcmMvc2NyaXB0cy91bml2ZXJzZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztrQkNBZSxVQUFTLFFBQVEsRUFBRTs7O0FBR2hDLFdBQVMsV0FBVyxHQUFHO0FBQ3JCLFFBQUksR0FBRyxHQUFHLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUM5QyxTQUFLLElBQUksQ0FBQyxHQUFDLENBQUMsRUFBRSxDQUFDLEdBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUMvQixVQUFJLEVBQUUsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDOzs7QUFBQyxBQUdoQixVQUFJLEVBQUUsQ0FBQyxRQUFRLElBQUksUUFBUSxFQUFFO0FBQzNCLFVBQUUsQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUM1QyxVQUFFLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7T0FDL0M7O0FBRUQsUUFBRSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7QUFDMUMsUUFBRSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7S0FFN0M7R0FDRjs7QUFFRCxRQUFNLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLFdBQVcsRUFBRSxLQUFLLENBQUMsQ0FBQztBQUN0RCxVQUFRLENBQUMsZ0JBQWdCLENBQUMsa0JBQWtCLEVBQUUsV0FBVyxFQUFFLEtBQUssQ0FBQyxDQUFDO0NBQ25FOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2hCRCx3QkFBSSxRQUFRLENBQUMsQ0FBQzs7QUFFZCxRQUFRLENBQUMsZ0JBQWdCLENBQUMsa0JBQWtCLEVBQUUsWUFBVztBQUN2RCxNQUFJLE1BQU0sR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQ2pELE1BQUksUUFBUSxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsZUFBZSxDQUFDLENBQUM7O0FBRXhELE1BQUksUUFBUSxHQUFHLHdCQUFjLENBQUM7O0FBRTlCLE1BQUksT0FBTyxHQUFHLHNCQUFZLENBQUM7QUFDM0IsTUFBSSxPQUFPLEdBQUcsc0JBQVksQ0FBQztBQUMzQixNQUFJLE9BQU8sR0FBRyxzQkFBWSxDQUFDOztBQUUzQixTQUFPLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztBQUNwQixTQUFPLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztBQUNwQixTQUFPLENBQUMsUUFBUSxHQUFHLEVBQUMsQ0FBQyxFQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUMsR0FBRyxFQUFDLENBQUM7O0FBRWxDLFNBQU8sQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO0FBQ3BCLFNBQU8sQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDO0FBQ2pCLFNBQU8sQ0FBQyxRQUFRLEdBQUcsRUFBQyxDQUFDLEVBQUMsR0FBRyxFQUFFLENBQUMsRUFBQyxHQUFHLEVBQUMsQ0FBQztBQUNsQyxTQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7O0FBRXhCLFNBQU8sQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO0FBQ3BCLFNBQU8sQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDO0FBQ2xCLFNBQU8sQ0FBQyxRQUFRLEdBQUcsRUFBQyxDQUFDLEVBQUMsR0FBRyxFQUFFLENBQUMsRUFBQyxHQUFHLEVBQUMsQ0FBQztBQUNsQyxTQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7O0FBRXhCLFVBQVEsQ0FDUCxTQUFTLENBQUMsT0FBTyxDQUFDLENBQ2xCLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FDbEIsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUNsQixTQUFTLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUMzQixZQUFZLEVBQUUsQ0FDZCxTQUFTLENBQUMsSUFBSSxDQUFDLENBQ2YsT0FBTyxFQUFFLENBQUM7Q0FDWixFQUFFLEtBQUssQ0FBQyxDQUFBOzs7Ozs7Ozs7Ozs7O0lDeENZLElBQUk7QUFDdkIsV0FEbUIsSUFBSSxHQUNUOzBCQURLLElBQUk7O0FBRXJCLFFBQUksQ0FBQyxJQUFJLEdBQUc7QUFDVixPQUFDLEVBQUUsQ0FBQztBQUNKLE9BQUMsRUFBRSxDQUFDO0tBQ0wsQ0FBQTtBQUNELFFBQUksQ0FBQyxJQUFJLEdBQUc7QUFDVixPQUFDLEVBQUUsQ0FBQztBQUNKLE9BQUMsRUFBRSxDQUFDO0tBQ0wsQ0FBQTtHQUNGOztlQVZrQixJQUFJOzsyQkFZaEIsR0FBRyxFQUFFO0FBQ1YsU0FBRyxDQUFDLFNBQVMsRUFBRSxDQUFDO0FBQ2hCLFNBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNyQyxTQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDckMsU0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBQ2IsYUFBTyxJQUFJLENBQUM7S0FDYjs7O1NBbEJrQixJQUFJOzs7a0JBQUosSUFBSTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUNFSixZQUFZO1lBQVosWUFBWTs7V0FBWixZQUFZOzBCQUFaLFlBQVk7O2tFQUFaLFlBQVk7OztlQUFaLFlBQVk7OzJCQUN4QixHQUFHLEVBQUU7QUFDVixTQUFHLENBQUMsU0FBUyxFQUFFLENBQUM7QUFDaEIsU0FBRyxDQUFDLElBQUksQ0FDTixJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUM3QixJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUM3QixDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFDZixDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FDaEIsQ0FBQztBQUNGLFNBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUNiLGFBQU8sSUFBSSxDQUFDO0tBQ2I7OztTQVhrQixZQUFZOzs7a0JBQVosWUFBWTs7Ozs7Ozs7Ozs7OztJQ0ZaLE1BQU07QUFDekIsV0FEbUIsTUFBTSxHQUNYOzBCQURLLE1BQU07O0FBRXZCLFFBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO0FBQ2hCLFFBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDO0FBQ2QsUUFBSSxDQUFDLFFBQVEsR0FBRztBQUNkLE9BQUMsRUFBRSxDQUFDO0FBQ0osT0FBQyxFQUFFLENBQUM7S0FDTCxDQUFDO0FBQ0YsUUFBSSxDQUFDLFFBQVEsR0FBRztBQUNkLE9BQUMsRUFBRSxDQUFDO0FBQ0osT0FBQyxFQUFFLENBQUM7S0FDTCxDQUFDO0FBQ0YsUUFBSSxDQUFDLE1BQU0sR0FBRztBQUNaLE9BQUMsRUFBRSxDQUFDO0FBQ0osT0FBQyxFQUFFLENBQUM7S0FDTCxDQUFBO0dBQ0Y7O2VBaEJrQixNQUFNOzsyQkFrQmxCLEdBQUcsRUFBRTtBQUNWLFNBQUcsQ0FBQyxTQUFTLEVBQUUsQ0FBQztBQUNoQixTQUFHLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxFQUFFLEdBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQzNFLFNBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUNiLGFBQU8sSUFBSSxDQUFDO0tBQ2I7OztTQXZCa0IsTUFBTTs7O2tCQUFOLE1BQU07Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lDRU4sUUFBUTtBQUMzQixXQURtQixRQUFRLEdBQ1o7MEJBREksUUFBUTs7QUFFekIsUUFBSSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7R0FDbkI7O2VBSGtCLFFBQVE7OzhCQUtqQixNQUFNLEVBQUU7QUFDaEIsVUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUE7QUFDekIsYUFBTyxJQUFJLENBQUM7S0FDYjs7Ozs7Ozs7OEJBS1MsTUFBTSxFQUFFLFFBQVEsRUFBRTtBQUMxQixVQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztBQUNyQixVQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztBQUN6QixVQUFJLENBQUMsR0FBRyxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDbkMsVUFBSSxDQUFDLFdBQVcsR0FBRyxRQUFRLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQzdDLGFBQU8sSUFBSSxDQUFDO0tBQ2I7Ozs4QkFFUyxNQUFNLEVBQUU7QUFDaEIsVUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7QUFDckIsYUFBTyxJQUFJLENBQUM7S0FDYjs7OzhCQUVTO0FBQ1IsVUFBSSxJQUFJLENBQUM7QUFDVCxXQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFDNUMsYUFBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQzVDLGNBQUksQ0FBQyxLQUFLLENBQUMsRUFBRTtBQUNYLGdCQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDNUosZ0JBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFO0FBQzFELGtCQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFO0FBQ2hELG9CQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztBQUM3QyxvQkFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO2VBQzNCLE1BQU07QUFDTCxvQkFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7QUFDN0Msb0JBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztlQUMzQjthQUNGO1dBQ0Y7U0FDRjtPQUNGO0FBQ0QsYUFBTyxJQUFJLENBQUM7S0FDYjs7O21DQUVjO0FBQ2IsVUFBSSxJQUFJLEdBQUcsSUFBSTs7Ozs7O0FBQUMsQUFNaEIsVUFBSSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsVUFBUyxDQUFDLEVBQUU7QUFDcEQsWUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDLElBQUksQ0FBQztBQUMzRCxZQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUMsR0FBRyxDQUFDOztBQUUxRCxZQUFJLENBQUMsU0FBUyxHQUFHLHNCQUFZLENBQUM7QUFDOUIsWUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7QUFDdkMsWUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7QUFDdkMsWUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDOztBQUUxQixZQUFJLENBQUMsWUFBWSxHQUFHLFdBQVcsQ0FBQyxZQUFXO0FBQ3pDLGNBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxJQUFJLEdBQUcsQ0FBQztTQUM5QixFQUFFLEdBQUcsQ0FBQyxDQUFDOztBQUVSLFlBQUksQ0FBQyxPQUFPLEdBQUcsb0JBQVUsQ0FBQztBQUMxQixZQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQyxJQUFJLENBQUM7QUFDcEUsWUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUMsR0FBRyxDQUFDO0FBQ25FLFlBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7QUFDMUMsWUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztPQUMzQyxDQUFDOzs7O0FBQUMsQUFJSCxVQUFJLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxVQUFTLENBQUMsRUFBRTtBQUNwRCxZQUFHLElBQUksQ0FBQyxTQUFTLEVBQUU7QUFDakIsY0FBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUMsSUFBSSxDQUFDO0FBQzFFLGNBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDLEdBQUcsQ0FBQztTQUMxRTs7QUFFRCxZQUFHLElBQUksQ0FBQyxPQUFPLEVBQUU7QUFDZixjQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQyxJQUFJLENBQUM7QUFDcEUsY0FBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUMsR0FBRyxDQUFDO1NBQ3BFO09BRUYsQ0FBQzs7OztBQUFDLEFBSUgsVUFBSSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsVUFBUyxDQUFDLEVBQUU7QUFDbEQscUJBQWEsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7O0FBRWpDLFlBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQyxJQUFJLENBQUM7QUFDM0QsWUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDLEdBQUcsQ0FBQzs7QUFFMUQsWUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztBQUNwRCxZQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO0FBQ3BELFlBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDOztBQUUvQixZQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztBQUN0QixZQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztPQUNyQixDQUFDLENBQUM7QUFDSCxhQUFPLElBQUksQ0FBQztLQUNiOzs7OEJBRVM7QUFDUixVQUFJLElBQUksR0FBRyxJQUFJLENBQUM7O0FBRWhCLGlCQUFXLENBQUMsWUFBVztBQUNyQixZQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUM7T0FDaEMsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDaEIsYUFBTyxJQUFJLENBQUM7S0FDYjs7OzRCQUVPO0FBQ04sV0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQzVDLFlBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRTtBQUMxQixjQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxzQkFBWSxDQUFDO0FBQ3JDLGNBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUM7U0FDcEMsQ0FBQztBQUNGLFlBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUU7QUFDekIsY0FBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDO1NBQzNEO09BQ0Y7S0FDRjs7OzZCQUVRO0FBQ1AsVUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQ2hCLENBQUMsRUFBRSxDQUFDLEVBQ0osSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FDOUMsQ0FBQzs7QUFFRixVQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsR0FBRywyQkFBMkIsQ0FBQztBQUN6RCxVQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FDdkIsQ0FBQyxFQUFFLENBQUMsRUFDSixJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUM5RCxDQUFDOztBQUVGLFdBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUM1QyxZQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7T0FDbEM7O0FBRUQsV0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQzVDLFlBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7T0FDaEQ7O0FBRUQsVUFBRyxJQUFJLENBQUMsU0FBUyxFQUFFO0FBQ2pCLFlBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztPQUNqQzs7QUFFRCxVQUFHLElBQUksQ0FBQyxPQUFPLEVBQUU7QUFDZixZQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7T0FDL0I7O0FBRUQsYUFBTyxJQUFJLENBQUM7S0FDYjs7OzJCQUVNO0FBQ0wsVUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQzs7QUFFckIsVUFBSSxNQUFNLEdBQUcsS0FBSztVQUNkLE1BQU0sR0FBRyxDQUFDO1VBQ1YsTUFBTSxHQUFHLEVBQUU7VUFDWCxNQUFNO1VBQ04sTUFBTTtVQUNOLE1BQU0sR0FBRyxDQUFDLENBQUM7O0FBRWYsV0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFOztBQUU1QyxhQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFDNUMsY0FBSSxDQUFDLElBQUksQ0FBQyxFQUFFO0FBQ1Ysa0JBQU0sSUFBSSxDQUFDLENBQUM7QUFDWixrQkFBTSxJQUFJLENBQUMsQ0FBQztXQUNiLE1BQ0k7QUFDSCxrQkFBTSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7QUFDakUsa0JBQU0sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO0FBQ2pFLGtCQUFNLElBQUksTUFBTSxHQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxHQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxHQUFDLE1BQU0sR0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUNsSSxrQkFBTSxJQUFJLE1BQU0sR0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksR0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksR0FBQyxNQUFNLEdBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7V0FDbkk7U0FDRjtBQUNELFlBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUM7QUFDbEMsWUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQztBQUNsQyxjQUFNLEdBQUcsQ0FBQyxDQUFDO0FBQ1gsY0FBTSxHQUFHLENBQUMsQ0FBQztPQUNaOztBQUVELFdBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUM1QyxZQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFDLE1BQU0sR0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztBQUNuRixZQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFDLE1BQU0sR0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztBQUNuRixZQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFDLE1BQU0sQ0FBQztBQUNoRSxZQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFDLE1BQU0sQ0FBQztPQUNqRTtBQUNELFVBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztBQUNiLGFBQU8sSUFBSSxDQUFDO0tBQ2I7OztTQXJNa0IsUUFBUTs7O2tCQUFSLFFBQVEiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oc2VsZWN0b3IpIHtcbiAgLy8gb24gZXZlbnQgcmVzaXplIGFuZCBsb2FkXG4gIC8vIGZpbmQgYWxsIC5mbHVpZCBhbmQgc2V0IHdpZHRoIGhlaWdodCBhdHRyaWJ1dGUgZm9yIGVhY2hcbiAgZnVuY3Rpb24gc2V0RnVsbHNpemUoKSB7XG4gICAgdmFyIGVscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xuICAgIGZvciAodmFyIGk9MDsgaTxlbHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBlbCA9IGVsc1tpXTtcblxuICAgICAgLy8gQ2FudmFzIG5lZWQgd2lkdGgmaGVpZ2h0IGF0dHIgc28gdGhlIHJhdGlvIHJlbWFpbnMgMToxXG4gICAgICBpZiAoZWwubm9kZU5hbWUgPT0gJ0NBTlZBUycpIHtcbiAgICAgICAgZWwuc2V0QXR0cmlidXRlKCd3aWR0aCcsIHdpbmRvdy5pbm5lcldpZHRoKTtcbiAgICAgICAgZWwuc2V0QXR0cmlidXRlKCdoZWlnaHQnLCB3aW5kb3cuaW5uZXJIZWlnaHQpO1xuICAgICAgfVxuXG4gICAgICBlbC5zdHlsZS53aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoICsgJ3B4JztcbiAgICAgIGVsLnN0eWxlLmhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodCArICdweCc7XG5cbiAgICB9XG4gIH1cblxuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgc2V0RnVsbHNpemUsIGZhbHNlKTtcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIHNldEZ1bGxzaXplLCBmYWxzZSk7XG59XG4iLCJpbXBvcnQgUGxhbmV0IGZyb20gJy4vcGxhbmV0JztcbmltcG9ydCBQbGFuZXRTcXVhcmUgZnJvbSAnLi9wbGFuZXQtc3F1YXJlJztcbmltcG9ydCBVbml2ZXJzZSBmcm9tICcuL3VuaXZlcnNlJztcblxuaW1wb3J0IGYxMSBmcm9tICcuL2Z1bGxzaXplJztcblxuZjExKCcuZmx1aWQnKTtcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uKCkge1xuICB2YXIgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VuaXZlcnNlJyk7XG4gIHZhciB1bmRlcmxheSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1bmRlcmxheVRyYWlsJyk7XG5cbiAgdmFyIHVuaXZlcnNlID0gbmV3IFVuaXZlcnNlKCk7XG5cbiAgdmFyIHBsYW5ldE8gPSBuZXcgUGxhbmV0KCk7XG4gIHZhciBwbGFuZXRBID0gbmV3IFBsYW5ldCgpO1xuICB2YXIgcGxhbmV0QiA9IG5ldyBQbGFuZXQoKTtcblxuICBwbGFuZXRPLnJhZGl1cyA9IDE1O1xuICBwbGFuZXRPLm1hc3MgPSA4MDAwO1xuICBwbGFuZXRPLnBvc2l0aW9uID0ge3g6NTAwLCB5OjI1MH07XG5cbiAgcGxhbmV0QS5yYWRpdXMgPSAxMDtcbiAgcGxhbmV0QS5tYXNzID0gOTtcbiAgcGxhbmV0QS5wb3NpdGlvbiA9IHt4OjQwMCwgeToyMDB9O1xuICBwbGFuZXRBLnZlbG9jaXR5LnkgPSAyMDtcblxuICBwbGFuZXRCLnJhZGl1cyA9IDEwO1xuICBwbGFuZXRCLm1hc3MgPSAxMDtcbiAgcGxhbmV0Qi5wb3NpdGlvbiA9IHt4OjM1MCwgeToyMDB9O1xuICBwbGFuZXRCLnZlbG9jaXR5LnkgPSAxODtcblxuICB1bml2ZXJzZVxuICAuYWRkUGxhbmV0KHBsYW5ldE8pXG4gIC5hZGRQbGFuZXQocGxhbmV0QSlcbiAgLmFkZFBsYW5ldChwbGFuZXRCKVxuICAuc2V0Q2FudmFzKGNhbnZhcywgdW5kZXJsYXkpXG4gIC5jcmVhdGVQbGFuZXQoKVxuICAuc2V0RGVsdGFUKDAuMDIpXG4gIC5iaWdiYW5nKCk7XG59LCBmYWxzZSlcblxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgTGluZSB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuaW5pdCA9IHtcbiAgICAgIHg6IDAsXG4gICAgICB5OiAwXG4gICAgfVxuICAgIHRoaXMubGFzdCA9IHtcbiAgICAgIHg6IDAsXG4gICAgICB5OiAwXG4gICAgfVxuICB9XG5cbiAgcmVuZGVyKGN0eCkge1xuICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICBjdHgubW92ZVRvKHRoaXMuaW5pdC54LCB0aGlzLmluaXQueSk7XG4gICAgY3R4LmxpbmVUbyh0aGlzLmxhc3QueCwgdGhpcy5sYXN0LnkpO1xuICAgIGN0eC5zdHJva2UoKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxufVxuIiwiaW1wb3J0IFBsYW5ldCBmcm9tICcuL3BsYW5ldC5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBsYW5ldFNxdWFyZSBleHRlbmRzIFBsYW5ldCB7XG4gIHJlbmRlcihjdHgpIHtcbiAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgY3R4LnJlY3QoXG4gICAgICB0aGlzLnBvc2l0aW9uLnggLSB0aGlzLnJhZGl1cyxcbiAgICAgIHRoaXMucG9zaXRpb24ueSAtIHRoaXMucmFkaXVzLFxuICAgICAgMiAqIHRoaXMucmFkaXVzLFxuICAgICAgMiAqIHRoaXMucmFkaXVzXG4gICAgKTtcbiAgICBjdHguc3Ryb2tlKCk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFBsYW5ldCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMucmFkaXVzID0gMTtcbiAgICB0aGlzLm1hc3MgPSAxO1xuICAgIHRoaXMudmVsb2NpdHkgPSB7XG4gICAgICB4OiAwLFxuICAgICAgeTogMFxuICAgIH07XG4gICAgdGhpcy5wb3NpdGlvbiA9IHtcbiAgICAgIHg6IDAsXG4gICAgICB5OiAwXG4gICAgfTtcbiAgICB0aGlzLmdGb3JjZSA9IHtcbiAgICAgIHg6IDAsXG4gICAgICB5OiAwXG4gICAgfVxuICB9XG5cbiAgcmVuZGVyKGN0eCkge1xuICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICBjdHguYXJjKHRoaXMucG9zaXRpb24ueCwgdGhpcy5wb3NpdGlvbi55LCB0aGlzLnJhZGl1cywgMCwgTWF0aC5QSSoyLCB0cnVlKTtcbiAgICBjdHguc3Ryb2tlKCk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbn1cbiIsImltcG9ydCBQbGFuZXQgZnJvbSAnLi9wbGFuZXQnO1xuaW1wb3J0IExpbmUgZnJvbSAnLi9saW5lJztcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVuaXZlcnNlIHtcbiAgY29uc3RydWN0b3IgKCkge1xuICAgIHRoaXMucGxhbmV0cyA9IFtdO1xuICB9XG5cbiAgYWRkUGxhbmV0KHBsYW5ldCkge1xuICAgIHRoaXMucGxhbmV0cy5wdXNoKHBsYW5ldClcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge05vZGV9IGNhbnZhc1xuICAgKi9cbiAgc2V0Q2FudmFzKGNhbnZhcywgdW5kZXJsYXkpIHtcbiAgICB0aGlzLmNhbnZhcyA9IGNhbnZhcztcbiAgICB0aGlzLnVuZGVybGF5ID0gdW5kZXJsYXk7XG4gICAgdGhpcy5jdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICB0aGlzLmN0eFVuZGVybGF5ID0gdW5kZXJsYXkuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHNldERlbHRhVChkZWx0YVQpIHtcbiAgICB0aGlzLmRlbHRhVCA9IGRlbHRhVDtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGNvbGxpZGUoKSB7XG4gICAgdmFyIGRpc3Q7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnBsYW5ldHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgdGhpcy5wbGFuZXRzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgIGlmIChpICE9PSBqKSB7XG4gICAgICAgICAgZGlzdCA9IE1hdGguc3FydChNYXRoLnBvdyh0aGlzLnBsYW5ldHNbal0ucG9zaXRpb24ueCAtIHRoaXMucGxhbmV0c1tpXS5wb3NpdGlvbi54LDIpICsgTWF0aC5wb3codGhpcy5wbGFuZXRzW2pdLnBvc2l0aW9uLnkgLSB0aGlzLnBsYW5ldHNbaV0ucG9zaXRpb24ueSwyKSk7XG4gICAgICAgICAgaWYgKGRpc3QgPCB0aGlzLnBsYW5ldHNbal0ucmFkaXVzICsgdGhpcy5wbGFuZXRzW2ldLnJhZGl1cykge1xuICAgICAgICAgICAgaWYgKHRoaXMucGxhbmV0c1tpXS5tYXNzIDw9IHRoaXMucGxhbmV0c1tqXS5tYXNzKSB7XG4gICAgICAgICAgICAgIHRoaXMucGxhbmV0c1tqXS5tYXNzICs9IHRoaXMucGxhbmV0c1tpXS5tYXNzO1xuICAgICAgICAgICAgICB0aGlzLnBsYW5ldHMuc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgdGhpcy5wbGFuZXRzW2ldLm1hc3MgKz0gdGhpcy5wbGFuZXRzW2pdLm1hc3M7XG4gICAgICAgICAgICAgIHRoaXMucGxhbmV0cy5zcGxpY2UoaiwgMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgY3JlYXRlUGxhbmV0KCkge1xuICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgIC8vIE1vdXNlZG93biwgbGV0J3MgY3JlYXRlIGEgbmV3IHBsYW5ldCBhdCB0aGF0IHBvc2l0aW9uXG4gICAgLy8gICBCVVQgZG9uJ3QgYWRkIGl0IGludG8gdGhlIHBsYW5ldCBsaXN0IChzbyBpdCB3b24ndCBtb3ZlIC4uKVxuICAgIC8vICAgQWxzbywgd2UgbmVlZCB0byBlbmxhcmdlIHRoZSBwbGFuZXQgZXZlcnkgMTAwbXMsXG4gICAgLy8gICBhbmQgcmVtZW1iZXIgdG8gZHJhdyBpdCBpbiBgcmVuZGVyKClgXG4gICAgdGhpcy5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgZnVuY3Rpb24oZSkge1xuICAgICAgc2VsZi5pbml0WCA9IGUuY2xpZW50WCAtIHRoaXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdDtcbiAgICAgIHNlbGYuaW5pdFkgPSBlLmNsaWVudFkgLSB0aGlzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcDtcblxuICAgICAgc2VsZi5uZXdQbGFuZXQgPSBuZXcgUGxhbmV0KCk7XG4gICAgICBzZWxmLm5ld1BsYW5ldC5wb3NpdGlvbi54ID0gc2VsZi5pbml0WDtcbiAgICAgIHNlbGYubmV3UGxhbmV0LnBvc2l0aW9uLnkgPSBzZWxmLmluaXRZO1xuICAgICAgc2VsZi5uZXdQbGFuZXQucmFkaXVzID0gMTtcblxuICAgICAgc2VsZi5zdG9wSW50ZXJ2YWwgPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpIHtcbiAgICAgICAgc2VsZi5uZXdQbGFuZXQucmFkaXVzICs9IDAuMztcbiAgICAgIH0sIDEwMCk7XG5cbiAgICAgIHNlbGYubmV3TGluZSA9IG5ldyBMaW5lKCk7XG4gICAgICBzZWxmLm5ld0xpbmUuaW5pdC54ID0gZS5jbGllbnRYIC0gdGhpcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5sZWZ0O1xuICAgICAgc2VsZi5uZXdMaW5lLmluaXQueSA9IGUuY2xpZW50WSAtIHRoaXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wO1xuICAgICAgc2VsZi5uZXdMaW5lLmxhc3QueCA9IHNlbGYubmV3TGluZS5pbml0Lng7XG4gICAgICBzZWxmLm5ld0xpbmUubGFzdC55ID0gc2VsZi5uZXdMaW5lLmluaXQueTtcbiAgICB9KTtcblxuICAgIC8vIFdoZW4gbW91c2UgbW92ZSwgaWYgdGhlcmUncyBhIG5ld1BsYW5ldCxcbiAgICAvLyAgIHVwZGF0ZSBpdHMgcG9zaXRpb24gdG8gbW91c2UgcG9pbnRlclxuICAgIHRoaXMuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIGZ1bmN0aW9uKGUpIHtcbiAgICAgIGlmKHNlbGYubmV3UGxhbmV0KSB7XG4gICAgICAgIHNlbGYubmV3UGxhbmV0LnBvc2l0aW9uLnggPSBlLmNsaWVudFggLSB0aGlzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnQ7XG4gICAgICAgIHNlbGYubmV3UGxhbmV0LnBvc2l0aW9uLnkgPSBlLmNsaWVudFkgLSB0aGlzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcDtcbiAgICAgIH1cblxuICAgICAgaWYoc2VsZi5uZXdMaW5lKSB7XG4gICAgICAgIHNlbGYubmV3TGluZS5sYXN0LnggPSBlLmNsaWVudFggLSB0aGlzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnQ7XG4gICAgICAgIHNlbGYubmV3TGluZS5sYXN0LnkgPSBlLmNsaWVudFkgLSB0aGlzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcDtcbiAgICAgIH1cblxuICAgIH0pO1xuXG4gICAgLy8gV2hlbiByZWxlYXNlIG1vdXNlLCBjYWxjdWxhdGUgdGhlIHZlbG9jaXR5XG4gICAgLy8gICBhbmQgYWRkIGl0IGludG8gdGhlIHVuaXZlcnNlXG4gICAgdGhpcy5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIGZ1bmN0aW9uKGUpIHtcbiAgICAgIGNsZWFySW50ZXJ2YWwoc2VsZi5zdG9wSW50ZXJ2YWwpO1xuXG4gICAgICBzZWxmLmxhc3RYID0gZS5jbGllbnRYIC0gdGhpcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5sZWZ0O1xuICAgICAgc2VsZi5sYXN0WSA9IGUuY2xpZW50WSAtIHRoaXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wO1xuXG4gICAgICBzZWxmLm5ld1BsYW5ldC52ZWxvY2l0eS54ID0gc2VsZi5pbml0WCAtIHNlbGYubGFzdFg7XG4gICAgICBzZWxmLm5ld1BsYW5ldC52ZWxvY2l0eS55ID0gc2VsZi5pbml0WSAtIHNlbGYubGFzdFk7XG4gICAgICBzZWxmLmFkZFBsYW5ldChzZWxmLm5ld1BsYW5ldCk7XG5cbiAgICAgIHNlbGYubmV3UGxhbmV0ID0gbnVsbDtcbiAgICAgIHNlbGYubmV3TGluZSA9IG51bGw7XG4gICAgfSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBiaWdiYW5nKCkge1xuICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgIHNldEludGVydmFsKGZ1bmN0aW9uKCkge1xuICAgICAgc2VsZi50aWNrKCkuY29sbGlkZSgpLnJlbmRlcigpO1xuICAgIH0sIHRoaXMuZGVsdGFUKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHRyYWlsKCkge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5wbGFuZXRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoIXRoaXMucGxhbmV0c1tpXS50cmFpbCkge1xuICAgICAgICB0aGlzLnBsYW5ldHNbaV0udHJhaWwgPSBuZXcgUGxhbmV0KCk7XG4gICAgICAgIHRoaXMucGxhbmV0c1tpXS50cmFpbC5yYWRpdXMgPSAwLjE7XG4gICAgICB9O1xuICAgICAgaWYgKHRoaXMucGxhbmV0c1tpXS50cmFpbCkge1xuICAgICAgICB0aGlzLnBsYW5ldHNbaV0udHJhaWwucG9zaXRpb24gPSB0aGlzLnBsYW5ldHNbaV0ucG9zaXRpb247XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHRoaXMuY3R4LmNsZWFyUmVjdChcbiAgICAgIDAsIDAsXG4gICAgICB0aGlzLmN0eC5jYW52YXMud2lkdGgsIHRoaXMuY3R4LmNhbnZhcy5oZWlnaHRcbiAgICApO1xuXG4gICAgdGhpcy5jdHhVbmRlcmxheS5maWxsU3R5bGUgPSAncmdiYSgyNTUsIDI1NSwgMjU1LCAuMDE1KSc7XG4gICAgdGhpcy5jdHhVbmRlcmxheS5maWxsUmVjdChcbiAgICAgIDAsIDAsXG4gICAgICB0aGlzLmN0eFVuZGVybGF5LmNhbnZhcy53aWR0aCwgdGhpcy5jdHhVbmRlcmxheS5jYW52YXMuaGVpZ2h0XG4gICAgKTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5wbGFuZXRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB0aGlzLnBsYW5ldHNbaV0ucmVuZGVyKHRoaXMuY3R4KTtcbiAgICB9XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMucGxhbmV0cy5sZW5ndGg7IGkrKykge1xuICAgICAgdGhpcy5wbGFuZXRzW2ldLnRyYWlsLnJlbmRlcih0aGlzLmN0eFVuZGVybGF5KTtcbiAgICB9XG5cbiAgICBpZih0aGlzLm5ld1BsYW5ldCkge1xuICAgICAgdGhpcy5uZXdQbGFuZXQucmVuZGVyKHRoaXMuY3R4KTtcbiAgICB9XG5cbiAgICBpZih0aGlzLm5ld0xpbmUpIHtcbiAgICAgIHRoaXMubmV3TGluZS5yZW5kZXIodGhpcy5jdHgpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgdGljaygpIHtcbiAgICB2YXIgZHQgPSB0aGlzLmRlbHRhVDtcblxuICAgIHZhciBnQ29uc3QgPSA2LjY3NCxcbiAgICAgICAgZm9yY2VYID0gMCxcbiAgICAgICAgZGVsdGFUID0gZHQsXG4gICAgICAgIHN1YnRyWCxcbiAgICAgICAgc3VidHJZLFxuICAgICAgICBmb3JjZVkgPSAwO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnBsYW5ldHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIFxuICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCB0aGlzLnBsYW5ldHMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgaWYgKGogPT0gaSkge1xuICAgICAgICAgIGZvcmNlWCArPSAwO1xuICAgICAgICAgIGZvcmNlWSArPSAwO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIHN1YnRyWCA9IHRoaXMucGxhbmV0c1tqXS5wb3NpdGlvbi54IC0gdGhpcy5wbGFuZXRzW2ldLnBvc2l0aW9uLng7XG4gICAgICAgICAgc3VidHJZID0gdGhpcy5wbGFuZXRzW2pdLnBvc2l0aW9uLnkgLSB0aGlzLnBsYW5ldHNbaV0ucG9zaXRpb24ueTtcbiAgICAgICAgICBmb3JjZVggKz0gZ0NvbnN0KnRoaXMucGxhbmV0c1tpXS5tYXNzKnRoaXMucGxhbmV0c1tqXS5tYXNzKnN1YnRyWC9NYXRoLnBvdyhNYXRoLnNxcnQoTWF0aC5wb3coc3VidHJYLDIpICsgTWF0aC5wb3coc3VidHJZLDIpKSwgMyk7XG4gICAgICAgICAgZm9yY2VZICs9IGdDb25zdCp0aGlzLnBsYW5ldHNbaV0ubWFzcyp0aGlzLnBsYW5ldHNbal0ubWFzcypzdWJ0clkvTWF0aC5wb3coTWF0aC5zcXJ0KE1hdGgucG93KHN1YnRyWCwyKSArIE1hdGgucG93KHN1YnRyWSwyKSksIDMpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICB0aGlzLnBsYW5ldHNbaV0uZ0ZvcmNlLnggPSBmb3JjZVg7XG4gICAgICB0aGlzLnBsYW5ldHNbaV0uZ0ZvcmNlLnkgPSBmb3JjZVk7XG4gICAgICBmb3JjZVggPSAwO1xuICAgICAgZm9yY2VZID0gMDtcbiAgICB9XG4gICAgXG4gICAgZm9yICh2YXIgayA9IDA7IGsgPCB0aGlzLnBsYW5ldHMubGVuZ3RoOyBrKyspIHtcbiAgICAgIHRoaXMucGxhbmV0c1trXS52ZWxvY2l0eS54ICs9IHRoaXMucGxhbmV0c1trXS5nRm9yY2UueCpkZWx0YVQvdGhpcy5wbGFuZXRzW2tdLm1hc3M7XG4gICAgICB0aGlzLnBsYW5ldHNba10udmVsb2NpdHkueSArPSB0aGlzLnBsYW5ldHNba10uZ0ZvcmNlLnkqZGVsdGFUL3RoaXMucGxhbmV0c1trXS5tYXNzO1xuICAgICAgdGhpcy5wbGFuZXRzW2tdLnBvc2l0aW9uLnggKz0gdGhpcy5wbGFuZXRzW2tdLnZlbG9jaXR5LngqZGVsdGFUO1xuICAgICAgdGhpcy5wbGFuZXRzW2tdLnBvc2l0aW9uLnkgKz0gdGhpcy5wbGFuZXRzW2tdLnZlbG9jaXR5LnkqZGVsdGFUO1xuICAgIH1cbiAgICB0aGlzLnRyYWlsKCk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbn1cbiJdfQ==

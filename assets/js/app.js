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
  planetO.density = 1;
  planetO.position = { x: 500, y: 250 };
  planetO.recalculateMass();

  planetA.radius = 10;
  planetA.position = { x: 400, y: 200 };
  planetA.velocity.y = 20;
  planetA.recalculateMass();

  planetB.radius = 10;
  planetB.position = { x: 350, y: 200 };
  planetB.velocity.y = 18;
  planetB.recalculateMass();

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
    this.density = 0.005;

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
    this.mass = 1;
  }

  _createClass(Planet, [{
    key: "render",
    value: function render(ctx) {
      ctx.beginPath();
      ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2, true);

      ctx.strokeStyle = '#55f';
      ctx.stroke();

      ctx.fillStyle = "#fff";
      ctx.fill();
      return this;
    }
  }, {
    key: "recalculateMass",
    value: function recalculateMass() {
      this.mass = 0.75 * Math.PI * Math.pow(this.radius, 3) * this.density;
      return this;
    }
  }, {
    key: "getVolume",
    value: function getVolume() {
      return 0.75 * Math.PI * Math.pow(this.radius, 3);
    }
  }], [{
    key: "getRadius",
    value: function getRadius(vol) {
      return Math.pow(vol / 0.75 / Math.PI, 1 / 3);
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
    key: 'reposition',
    value: function reposition() {
      for (var i = 0; i < this.planets.length; i++) {
        if (this.planets[i].position.x + this.planets[i].radius > this.canvas.width || this.planets[i].position.x - this.planets[i].radius < 0) {
          this.planets[i].velocity.x *= -1;
        }

        if (this.planets[i].position.y + this.planets[i].radius > this.canvas.height || this.planets[i].position.y - this.planets[i].radius < 0) {
          this.planets[i].velocity.y *= -1;
        }
      }
    }
  }, {
    key: 'collide',
    value: function collide() {
      for (var i = 0; i < this.planets.length; i++) {
        for (var j = 0; j < this.planets.length; j++) {
          if (i !== j) {
            var dist = Math.sqrt(Math.pow(this.planets[j].position.x - this.planets[i].position.x, 2) + Math.pow(this.planets[j].position.y - this.planets[i].position.y, 2));
            if (dist < this.planets[j].radius + this.planets[i].radius) {
              var mass = this.planets[j].mass + this.planets[i].mass;
              var volume = this.planets[j].getVolume() + this.planets[i].getVolume();
              var radius = _planet2.default.getRadius(volume);

              var velocityX = (this.planets[j].mass * this.planets[j].velocity.x + this.planets[i].mass * this.planets[i].velocity.x) / mass;
              var velocityY = (this.planets[j].mass * this.planets[j].velocity.y + this.planets[i].mass * this.planets[i].velocity.y) / mass;

              if (this.planets[i].radius < this.planets[j].radius) {
                this.planets[j].mass = mass;
                this.planets[j].volume = volume;
                this.planets[j].radius = radius;
                this.planets[j].velocity.x = velocityX;
                this.planets[j].velocity.y = velocityY;
                this.planets.splice(i, 1);
              } else {
                this.planets[i].mass = mass;
                this.planets[i].volume = volume;
                this.planets[i].radius = radius;
                this.planets[i].velocity.x = velocityX;
                this.planets[i].velocity.y = velocityY;
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
        self.newPlanet.recalculateMass();
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
        self.tick().render();
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

      for (var i = 0; i < this.planets.length; i++) {
        this.planets[i].render(this.ctx);
      }

      // Underlay render
      this.ctxUnderlay.fillStyle = 'rgba(0, 0, 0, 0.01)';
      this.ctxUnderlay.fillRect(0, 0, this.ctxUnderlay.canvas.width, this.ctxUnderlay.canvas.height);

      for (var i = 0; i < this.planets.length; i++) {
        this.planets[i].trail.render(this.ctxUnderlay);
      }

      // New planet render
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
      this.reposition();
      this.collide();
      return this;
    }
  }]);

  return Universe;
})();

exports.default = Universe;

},{"./line":3,"./planet":5}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvc2NyaXB0cy9mdWxsc2l6ZS5qcyIsInNyYy9zY3JpcHRzL2luZGV4LmpzIiwic3JjL3NjcmlwdHMvbGluZS5qcyIsInNyYy9zY3JpcHRzL3BsYW5ldC1zcXVhcmUuanMiLCJzcmMvc2NyaXB0cy9wbGFuZXQuanMiLCJzcmMvc2NyaXB0cy91bml2ZXJzZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztrQkNBZSxVQUFTLFFBQVEsRUFBRTs7O0FBR2hDLFdBQVMsV0FBVyxHQUFHO0FBQ3JCLFFBQUksR0FBRyxHQUFHLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUM5QyxTQUFLLElBQUksQ0FBQyxHQUFDLENBQUMsRUFBRSxDQUFDLEdBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUMvQixVQUFJLEVBQUUsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDOzs7QUFBQyxBQUdoQixVQUFJLEVBQUUsQ0FBQyxRQUFRLElBQUksUUFBUSxFQUFFO0FBQzNCLFVBQUUsQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUM1QyxVQUFFLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7T0FDL0M7O0FBRUQsUUFBRSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7QUFDMUMsUUFBRSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7S0FFN0M7R0FDRjs7QUFFRCxRQUFNLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLFdBQVcsRUFBRSxLQUFLLENBQUMsQ0FBQztBQUN0RCxVQUFRLENBQUMsZ0JBQWdCLENBQUMsa0JBQWtCLEVBQUUsV0FB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QUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDOztBQUVyRixZQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFDLE1BQU0sQ0FBQztBQUNoRSxZQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFDLE1BQU0sQ0FBQztPQUNqRTtBQUNELFVBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztBQUNiLFVBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztBQUNsQixVQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7QUFDZixhQUFPLElBQUksQ0FBQztLQUNiOzs7U0FyT2tCLFFBQVE7OztrQkFBUixRQUFRIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHNlbGVjdG9yKSB7XG4gIC8vIG9uIGV2ZW50IHJlc2l6ZSBhbmQgbG9hZFxuICAvLyBmaW5kIGFsbCAuZmx1aWQgYW5kIHNldCB3aWR0aCBoZWlnaHQgYXR0cmlidXRlIGZvciBlYWNoXG4gIGZ1bmN0aW9uIHNldEZ1bGxzaXplKCkge1xuICAgIHZhciBlbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKTtcbiAgICBmb3IgKHZhciBpPTA7IGk8ZWxzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgZWwgPSBlbHNbaV07XG5cbiAgICAgIC8vIENhbnZhcyBuZWVkIHdpZHRoJmhlaWdodCBhdHRyIHNvIHRoZSByYXRpbyByZW1haW5zIDE6MVxuICAgICAgaWYgKGVsLm5vZGVOYW1lID09ICdDQU5WQVMnKSB7XG4gICAgICAgIGVsLnNldEF0dHJpYnV0ZSgnd2lkdGgnLCB3aW5kb3cuaW5uZXJXaWR0aCk7XG4gICAgICAgIGVsLnNldEF0dHJpYnV0ZSgnaGVpZ2h0Jywgd2luZG93LmlubmVySGVpZ2h0KTtcbiAgICAgIH1cblxuICAgICAgZWwuc3R5bGUud2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aCArICdweCc7XG4gICAgICBlbC5zdHlsZS5oZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQgKyAncHgnO1xuXG4gICAgfVxuICB9XG5cbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHNldEZ1bGxzaXplLCBmYWxzZSk7XG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBzZXRGdWxsc2l6ZSwgZmFsc2UpO1xufVxuIiwiaW1wb3J0IFBsYW5ldCBmcm9tICcuL3BsYW5ldCc7XG5pbXBvcnQgUGxhbmV0U3F1YXJlIGZyb20gJy4vcGxhbmV0LXNxdWFyZSc7XG5pbXBvcnQgVW5pdmVyc2UgZnJvbSAnLi91bml2ZXJzZSc7XG5cbmltcG9ydCBmMTEgZnJvbSAnLi9mdWxsc2l6ZSc7XG5cbmYxMSgnLmZsdWlkJyk7XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbigpIHtcbiAgdmFyIGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1bml2ZXJzZScpO1xuICB2YXIgdW5kZXJsYXkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndW5kZXJsYXlUcmFpbCcpO1xuXG4gIHZhciB1bml2ZXJzZSA9IG5ldyBVbml2ZXJzZSgpO1xuXG4gIHZhciBwbGFuZXRPID0gbmV3IFBsYW5ldCgpO1xuICB2YXIgcGxhbmV0QSA9IG5ldyBQbGFuZXQoKTtcbiAgdmFyIHBsYW5ldEIgPSBuZXcgUGxhbmV0KCk7XG5cbiAgcGxhbmV0Ty5yYWRpdXMgPSAxNTtcbiAgcGxhbmV0Ty5kZW5zaXR5ID0gMTtcbiAgcGxhbmV0Ty5wb3NpdGlvbiA9IHt4OjUwMCwgeToyNTB9O1xuICBwbGFuZXRPLnJlY2FsY3VsYXRlTWFzcygpO1xuXG4gIHBsYW5ldEEucmFkaXVzID0gMTA7XG4gIHBsYW5ldEEucG9zaXRpb24gPSB7eDo0MDAsIHk6MjAwfTtcbiAgcGxhbmV0QS52ZWxvY2l0eS55ID0gMjA7XG4gIHBsYW5ldEEucmVjYWxjdWxhdGVNYXNzKCk7XG5cbiAgcGxhbmV0Qi5yYWRpdXMgPSAxMDtcbiAgcGxhbmV0Qi5wb3NpdGlvbiA9IHt4OjM1MCwgeToyMDB9O1xuICBwbGFuZXRCLnZlbG9jaXR5LnkgPSAxODtcbiAgcGxhbmV0Qi5yZWNhbGN1bGF0ZU1hc3MoKTtcblxuICB1bml2ZXJzZVxuICAuYWRkUGxhbmV0KHBsYW5ldE8pXG4gIC5hZGRQbGFuZXQocGxhbmV0QSlcbiAgLmFkZFBsYW5ldChwbGFuZXRCKVxuICAuc2V0Q2FudmFzKGNhbnZhcywgdW5kZXJsYXkpXG4gIC5jcmVhdGVQbGFuZXQoKVxuICAuc2V0RGVsdGFUKDAuMDIpXG4gIC5iaWdiYW5nKCk7XG59LCBmYWxzZSlcblxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgTGluZSB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuaW5pdCA9IHtcbiAgICAgIHg6IDAsXG4gICAgICB5OiAwXG4gICAgfVxuICAgIHRoaXMubGFzdCA9IHtcbiAgICAgIHg6IDAsXG4gICAgICB5OiAwXG4gICAgfVxuICB9XG5cbiAgcmVuZGVyKGN0eCkge1xuICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICBjdHgubW92ZVRvKHRoaXMuaW5pdC54LCB0aGlzLmluaXQueSk7XG4gICAgY3R4LmxpbmVUbyh0aGlzLmxhc3QueCwgdGhpcy5sYXN0LnkpO1xuICAgIGN0eC5zdHJva2UoKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxufVxuIiwiaW1wb3J0IFBsYW5ldCBmcm9tICcuL3BsYW5ldC5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBsYW5ldFNxdWFyZSBleHRlbmRzIFBsYW5ldCB7XG4gIHJlbmRlcihjdHgpIHtcbiAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgY3R4LnJlY3QoXG4gICAgICB0aGlzLnBvc2l0aW9uLnggLSB0aGlzLnJhZGl1cyxcbiAgICAgIHRoaXMucG9zaXRpb24ueSAtIHRoaXMucmFkaXVzLFxuICAgICAgMiAqIHRoaXMucmFkaXVzLFxuICAgICAgMiAqIHRoaXMucmFkaXVzXG4gICAgKTtcbiAgICBjdHguc3Ryb2tlKCk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFBsYW5ldCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMucmFkaXVzID0gMTtcbiAgICB0aGlzLmRlbnNpdHkgPSAwLjAwNTtcblxuICAgIHRoaXMudmVsb2NpdHkgPSB7XG4gICAgICB4OiAwLFxuICAgICAgeTogMFxuICAgIH07XG4gICAgdGhpcy5wb3NpdGlvbiA9IHtcbiAgICAgIHg6IDAsXG4gICAgICB5OiAwXG4gICAgfTtcbiAgICB0aGlzLmdGb3JjZSA9IHtcbiAgICAgIHg6IDAsXG4gICAgICB5OiAwXG4gICAgfVxuICAgIHRoaXMubWFzcyA9IDE7XG4gIH1cblxuICByZW5kZXIoY3R4KSB7XG4gICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgIGN0eC5hcmModGhpcy5wb3NpdGlvbi54LCB0aGlzLnBvc2l0aW9uLnksIHRoaXMucmFkaXVzLCAwLCBNYXRoLlBJKjIsIHRydWUpO1xuXG4gICAgY3R4LnN0cm9rZVN0eWxlPSAnIzU1Zic7XG4gICAgY3R4LnN0cm9rZSgpO1xuXG4gICAgY3R4LmZpbGxTdHlsZT1cIiNmZmZcIjtcbiAgICBjdHguZmlsbCgpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgcmVjYWxjdWxhdGVNYXNzKCkge1xuICAgIHRoaXMubWFzcyA9IDAuNzUgKiBNYXRoLlBJICogTWF0aC5wb3codGhpcy5yYWRpdXMsIDMpICogdGhpcy5kZW5zaXR5O1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgZ2V0Vm9sdW1lKCkge1xuICAgIHJldHVybiAwLjc1ICogTWF0aC5QSSAqIE1hdGgucG93KHRoaXMucmFkaXVzLCAzKTtcbiAgfVxuXG4gIHN0YXRpYyBnZXRSYWRpdXModm9sKSB7XG4gICAgcmV0dXJuIE1hdGgucG93KHZvbCAvIDAuNzUgLyBNYXRoLlBJLCAxIC8gMyk7XG4gIH1cbn1cbiIsImltcG9ydCBQbGFuZXQgZnJvbSAnLi9wbGFuZXQnO1xuaW1wb3J0IExpbmUgZnJvbSAnLi9saW5lJztcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVuaXZlcnNlIHtcbiAgY29uc3RydWN0b3IgKCkge1xuICAgIHRoaXMucGxhbmV0cyA9IFtdO1xuICB9XG5cbiAgYWRkUGxhbmV0KHBsYW5ldCkge1xuICAgIHRoaXMucGxhbmV0cy5wdXNoKHBsYW5ldCk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtOb2RlfSBjYW52YXNcbiAgICovXG4gIHNldENhbnZhcyhjYW52YXMsIHVuZGVybGF5KSB7XG4gICAgdGhpcy5jYW52YXMgPSBjYW52YXM7XG4gICAgdGhpcy51bmRlcmxheSA9IHVuZGVybGF5O1xuICAgIHRoaXMuY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gICAgdGhpcy5jdHhVbmRlcmxheSA9IHVuZGVybGF5LmdldENvbnRleHQoJzJkJyk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBzZXREZWx0YVQoZGVsdGFUKSB7XG4gICAgdGhpcy5kZWx0YVQgPSBkZWx0YVQ7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICByZXBvc2l0aW9uKCkge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5wbGFuZXRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAodGhpcy5wbGFuZXRzW2ldLnBvc2l0aW9uLnggKyB0aGlzLnBsYW5ldHNbaV0ucmFkaXVzID4gdGhpcy5jYW52YXMud2lkdGggfHwgdGhpcy5wbGFuZXRzW2ldLnBvc2l0aW9uLnggLSB0aGlzLnBsYW5ldHNbaV0ucmFkaXVzIDwgMCkge1xuICAgICAgICB0aGlzLnBsYW5ldHNbaV0udmVsb2NpdHkueCAqPSAtMTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMucGxhbmV0c1tpXS5wb3NpdGlvbi55ICsgdGhpcy5wbGFuZXRzW2ldLnJhZGl1cyA+IHRoaXMuY2FudmFzLmhlaWdodCB8fCB0aGlzLnBsYW5ldHNbaV0ucG9zaXRpb24ueSAtIHRoaXMucGxhbmV0c1tpXS5yYWRpdXMgPCAwKSB7XG4gICAgICAgIHRoaXMucGxhbmV0c1tpXS52ZWxvY2l0eS55ICo9IC0xO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGNvbGxpZGUoKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnBsYW5ldHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgdGhpcy5wbGFuZXRzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgIGlmIChpICE9PSBqKSB7XG4gICAgICAgICAgdmFyIGRpc3QgPSBNYXRoLnNxcnQoTWF0aC5wb3codGhpcy5wbGFuZXRzW2pdLnBvc2l0aW9uLnggLSB0aGlzLnBsYW5ldHNbaV0ucG9zaXRpb24ueCwyKSArIE1hdGgucG93KHRoaXMucGxhbmV0c1tqXS5wb3NpdGlvbi55IC0gdGhpcy5wbGFuZXRzW2ldLnBvc2l0aW9uLnksMikpO1xuICAgICAgICAgIGlmIChkaXN0IDwgdGhpcy5wbGFuZXRzW2pdLnJhZGl1cyArIHRoaXMucGxhbmV0c1tpXS5yYWRpdXMpIHtcbiAgICAgICAgICAgIHZhciBtYXNzID0gdGhpcy5wbGFuZXRzW2pdLm1hc3MgKyB0aGlzLnBsYW5ldHNbaV0ubWFzcztcbiAgICAgICAgICAgIHZhciB2b2x1bWUgPSB0aGlzLnBsYW5ldHNbal0uZ2V0Vm9sdW1lKCkgKyB0aGlzLnBsYW5ldHNbaV0uZ2V0Vm9sdW1lKCk7XG4gICAgICAgICAgICB2YXIgcmFkaXVzID0gUGxhbmV0LmdldFJhZGl1cyh2b2x1bWUpO1xuXG4gICAgICAgICAgICB2YXIgdmVsb2NpdHlYID0gKHRoaXMucGxhbmV0c1tqXS5tYXNzICogdGhpcy5wbGFuZXRzW2pdLnZlbG9jaXR5LnggKyB0aGlzLnBsYW5ldHNbaV0ubWFzcyAqIHRoaXMucGxhbmV0c1tpXS52ZWxvY2l0eS54KSAvIG1hc3M7XG4gICAgICAgICAgICB2YXIgdmVsb2NpdHlZID0gKHRoaXMucGxhbmV0c1tqXS5tYXNzICogdGhpcy5wbGFuZXRzW2pdLnZlbG9jaXR5LnkgKyB0aGlzLnBsYW5ldHNbaV0ubWFzcyAqIHRoaXMucGxhbmV0c1tpXS52ZWxvY2l0eS55KSAvIG1hc3M7XG5cbiAgICAgICAgICAgIGlmKHRoaXMucGxhbmV0c1tpXS5yYWRpdXMgPCB0aGlzLnBsYW5ldHNbal0ucmFkaXVzKSB7XG4gICAgICAgICAgICAgIHRoaXMucGxhbmV0c1tqXS5tYXNzID0gbWFzcztcbiAgICAgICAgICAgICAgdGhpcy5wbGFuZXRzW2pdLnZvbHVtZSA9IHZvbHVtZTtcbiAgICAgICAgICAgICAgdGhpcy5wbGFuZXRzW2pdLnJhZGl1cyA9IHJhZGl1cztcbiAgICAgICAgICAgICAgdGhpcy5wbGFuZXRzW2pdLnZlbG9jaXR5LnggPSB2ZWxvY2l0eVg7XG4gICAgICAgICAgICAgIHRoaXMucGxhbmV0c1tqXS52ZWxvY2l0eS55ID0gdmVsb2NpdHlZO1xuICAgICAgICAgICAgICB0aGlzLnBsYW5ldHMuc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgdGhpcy5wbGFuZXRzW2ldLm1hc3MgPSBtYXNzO1xuICAgICAgICAgICAgICB0aGlzLnBsYW5ldHNbaV0udm9sdW1lID0gdm9sdW1lO1xuICAgICAgICAgICAgICB0aGlzLnBsYW5ldHNbaV0ucmFkaXVzID0gcmFkaXVzO1xuICAgICAgICAgICAgICB0aGlzLnBsYW5ldHNbaV0udmVsb2NpdHkueCA9IHZlbG9jaXR5WDtcbiAgICAgICAgICAgICAgdGhpcy5wbGFuZXRzW2ldLnZlbG9jaXR5LnkgPSB2ZWxvY2l0eVk7XG4gICAgICAgICAgICAgIHRoaXMucGxhbmV0cy5zcGxpY2UoaiwgMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgY3JlYXRlUGxhbmV0KCkge1xuICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgIC8vIE1vdXNlZG93biwgbGV0J3MgY3JlYXRlIGEgbmV3IHBsYW5ldCBhdCB0aGF0IHBvc2l0aW9uXG4gICAgLy8gICBCVVQgZG9uJ3QgYWRkIGl0IGludG8gdGhlIHBsYW5ldCBsaXN0IChzbyBpdCB3b24ndCBtb3ZlIC4uKVxuICAgIC8vICAgQWxzbywgd2UgbmVlZCB0byBlbmxhcmdlIHRoZSBwbGFuZXQgZXZlcnkgMTAwbXMsXG4gICAgLy8gICBhbmQgcmVtZW1iZXIgdG8gZHJhdyBpdCBpbiBgcmVuZGVyKClgXG4gICAgdGhpcy5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgZnVuY3Rpb24oZSkge1xuICAgICAgc2VsZi5pbml0WCA9IGUuY2xpZW50WCAtIHRoaXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdDtcbiAgICAgIHNlbGYuaW5pdFkgPSBlLmNsaWVudFkgLSB0aGlzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcDtcblxuICAgICAgc2VsZi5uZXdQbGFuZXQgPSBuZXcgUGxhbmV0KCk7XG4gICAgICBzZWxmLm5ld1BsYW5ldC5wb3NpdGlvbi54ID0gc2VsZi5pbml0WDtcbiAgICAgIHNlbGYubmV3UGxhbmV0LnBvc2l0aW9uLnkgPSBzZWxmLmluaXRZO1xuICAgICAgc2VsZi5uZXdQbGFuZXQucmFkaXVzID0gMTtcblxuICAgICAgc2VsZi5zdG9wSW50ZXJ2YWwgPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpIHtcbiAgICAgICAgc2VsZi5uZXdQbGFuZXQucmFkaXVzICs9IDAuMztcbiAgICAgIH0sIDEwMCk7XG5cbiAgICAgIHNlbGYubmV3TGluZSA9IG5ldyBMaW5lKCk7XG4gICAgICBzZWxmLm5ld0xpbmUuaW5pdC54ID0gZS5jbGllbnRYIC0gdGhpcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5sZWZ0O1xuICAgICAgc2VsZi5uZXdMaW5lLmluaXQueSA9IGUuY2xpZW50WSAtIHRoaXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wO1xuICAgICAgc2VsZi5uZXdMaW5lLmxhc3QueCA9IHNlbGYubmV3TGluZS5pbml0Lng7XG4gICAgICBzZWxmLm5ld0xpbmUubGFzdC55ID0gc2VsZi5uZXdMaW5lLmluaXQueTtcbiAgICB9KTtcblxuICAgIC8vIFdoZW4gbW91c2UgbW92ZSwgaWYgdGhlcmUncyBhIG5ld1BsYW5ldCxcbiAgICAvLyAgIHVwZGF0ZSBpdHMgcG9zaXRpb24gdG8gbW91c2UgcG9pbnRlclxuICAgIHRoaXMuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIGZ1bmN0aW9uKGUpIHtcbiAgICAgIGlmKHNlbGYubmV3UGxhbmV0KSB7XG4gICAgICAgIHNlbGYubmV3UGxhbmV0LnBvc2l0aW9uLnggPSBlLmNsaWVudFggLSB0aGlzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnQ7XG4gICAgICAgIHNlbGYubmV3UGxhbmV0LnBvc2l0aW9uLnkgPSBlLmNsaWVudFkgLSB0aGlzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcDtcbiAgICAgIH1cblxuICAgICAgaWYoc2VsZi5uZXdMaW5lKSB7XG4gICAgICAgIHNlbGYubmV3TGluZS5sYXN0LnggPSBlLmNsaWVudFggLSB0aGlzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnQ7XG4gICAgICAgIHNlbGYubmV3TGluZS5sYXN0LnkgPSBlLmNsaWVudFkgLSB0aGlzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcDtcbiAgICAgIH1cblxuICAgIH0pO1xuXG4gICAgLy8gV2hlbiByZWxlYXNlIG1vdXNlLCBjYWxjdWxhdGUgdGhlIHZlbG9jaXR5XG4gICAgLy8gICBhbmQgYWRkIGl0IGludG8gdGhlIHVuaXZlcnNlXG4gICAgdGhpcy5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIGZ1bmN0aW9uKGUpIHtcbiAgICAgIGNsZWFySW50ZXJ2YWwoc2VsZi5zdG9wSW50ZXJ2YWwpO1xuXG4gICAgICBzZWxmLmxhc3RYID0gZS5jbGllbnRYIC0gdGhpcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5sZWZ0O1xuICAgICAgc2VsZi5sYXN0WSA9IGUuY2xpZW50WSAtIHRoaXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wO1xuXG4gICAgICBzZWxmLm5ld1BsYW5ldC52ZWxvY2l0eS54ID0gc2VsZi5pbml0WCAtIHNlbGYubGFzdFg7XG4gICAgICBzZWxmLm5ld1BsYW5ldC52ZWxvY2l0eS55ID0gc2VsZi5pbml0WSAtIHNlbGYubGFzdFk7XG4gICAgICBzZWxmLm5ld1BsYW5ldC5yZWNhbGN1bGF0ZU1hc3MoKTtcbiAgICAgIHNlbGYuYWRkUGxhbmV0KHNlbGYubmV3UGxhbmV0KTtcblxuICAgICAgc2VsZi5uZXdQbGFuZXQgPSBudWxsO1xuICAgICAgc2VsZi5uZXdMaW5lID0gbnVsbDtcbiAgICB9KTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGJpZ2JhbmcoKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XG4gICAgICBzZWxmLnRpY2soKS5yZW5kZXIoKTtcbiAgICB9LCB0aGlzLmRlbHRhVCk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICB0cmFpbCgpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMucGxhbmV0cy5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKCF0aGlzLnBsYW5ldHNbaV0udHJhaWwpIHtcbiAgICAgICAgdGhpcy5wbGFuZXRzW2ldLnRyYWlsID0gbmV3IFBsYW5ldCgpO1xuICAgICAgICB0aGlzLnBsYW5ldHNbaV0udHJhaWwucmFkaXVzID0gMC4xO1xuICAgICAgfTtcbiAgICAgIGlmICh0aGlzLnBsYW5ldHNbaV0udHJhaWwpIHtcbiAgICAgICAgdGhpcy5wbGFuZXRzW2ldLnRyYWlsLnBvc2l0aW9uID0gdGhpcy5wbGFuZXRzW2ldLnBvc2l0aW9uO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICB0aGlzLmN0eC5jbGVhclJlY3QoXG4gICAgICAwLCAwLFxuICAgICAgdGhpcy5jdHguY2FudmFzLndpZHRoLCB0aGlzLmN0eC5jYW52YXMuaGVpZ2h0XG4gICAgKTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5wbGFuZXRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB0aGlzLnBsYW5ldHNbaV0ucmVuZGVyKHRoaXMuY3R4KTtcbiAgICB9XG5cbiAgICAvLyBVbmRlcmxheSByZW5kZXJcbiAgICB0aGlzLmN0eFVuZGVybGF5LmZpbGxTdHlsZSA9ICdyZ2JhKDAsIDAsIDAsIDAuMDEpJztcbiAgICB0aGlzLmN0eFVuZGVybGF5LmZpbGxSZWN0KFxuICAgICAgMCwgMCxcbiAgICAgIHRoaXMuY3R4VW5kZXJsYXkuY2FudmFzLndpZHRoLCB0aGlzLmN0eFVuZGVybGF5LmNhbnZhcy5oZWlnaHRcbiAgICApO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnBsYW5ldHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHRoaXMucGxhbmV0c1tpXS50cmFpbC5yZW5kZXIodGhpcy5jdHhVbmRlcmxheSk7XG4gICAgfVxuXG4gICAgLy8gTmV3IHBsYW5ldCByZW5kZXJcbiAgICBpZih0aGlzLm5ld1BsYW5ldCkge1xuICAgICAgdGhpcy5uZXdQbGFuZXQucmVuZGVyKHRoaXMuY3R4KTtcbiAgICB9XG5cbiAgICBpZih0aGlzLm5ld0xpbmUpIHtcbiAgICAgIHRoaXMubmV3TGluZS5yZW5kZXIodGhpcy5jdHgpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgdGljaygpIHtcbiAgICB2YXIgZHQgPSB0aGlzLmRlbHRhVDtcblxuICAgIHZhciBnQ29uc3QgPSA2LjY3NCxcbiAgICAgICAgZm9yY2VYID0gMCxcbiAgICAgICAgZGVsdGFUID0gZHQsXG4gICAgICAgIHN1YnRyWCxcbiAgICAgICAgc3VidHJZLFxuICAgICAgICBmb3JjZVkgPSAwO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnBsYW5ldHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIFxuICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCB0aGlzLnBsYW5ldHMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgaWYgKGogPT0gaSkge1xuICAgICAgICAgIGZvcmNlWCArPSAwO1xuICAgICAgICAgIGZvcmNlWSArPSAwO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIHN1YnRyWCA9IHRoaXMucGxhbmV0c1tqXS5wb3NpdGlvbi54IC0gdGhpcy5wbGFuZXRzW2ldLnBvc2l0aW9uLng7XG4gICAgICAgICAgc3VidHJZID0gdGhpcy5wbGFuZXRzW2pdLnBvc2l0aW9uLnkgLSB0aGlzLnBsYW5ldHNbaV0ucG9zaXRpb24ueTtcbiAgICAgICAgICBmb3JjZVggKz0gZ0NvbnN0ICogdGhpcy5wbGFuZXRzW2ldLm1hc3MgKiB0aGlzLnBsYW5ldHNbal0ubWFzcyAqIHN1YnRyWCAvIE1hdGgucG93KE1hdGguc3FydChNYXRoLnBvdyhzdWJ0clgsMikgKyBNYXRoLnBvdyhzdWJ0clksMikpLCAzKTtcbiAgICAgICAgICBmb3JjZVkgKz0gZ0NvbnN0ICogdGhpcy5wbGFuZXRzW2ldLm1hc3MgKiB0aGlzLnBsYW5ldHNbal0ubWFzcyAqIHN1YnRyWSAvIE1hdGgucG93KE1hdGguc3FydChNYXRoLnBvdyhzdWJ0clgsMikgKyBNYXRoLnBvdyhzdWJ0clksMikpLCAzKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgdGhpcy5wbGFuZXRzW2ldLmdGb3JjZS54ID0gZm9yY2VYO1xuICAgICAgdGhpcy5wbGFuZXRzW2ldLmdGb3JjZS55ID0gZm9yY2VZO1xuICAgICAgZm9yY2VYID0gMDtcbiAgICAgIGZvcmNlWSA9IDA7XG4gICAgfVxuICAgIFxuICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5wbGFuZXRzLmxlbmd0aDsgaysrKSB7XG4gICAgICB0aGlzLnBsYW5ldHNba10udmVsb2NpdHkueCArPSB0aGlzLnBsYW5ldHNba10uZ0ZvcmNlLngqZGVsdGFUIC8gdGhpcy5wbGFuZXRzW2tdLm1hc3M7XG4gICAgICB0aGlzLnBsYW5ldHNba10udmVsb2NpdHkueSArPSB0aGlzLnBsYW5ldHNba10uZ0ZvcmNlLnkqZGVsdGFUIC8gdGhpcy5wbGFuZXRzW2tdLm1hc3M7XG5cbiAgICAgIHRoaXMucGxhbmV0c1trXS5wb3NpdGlvbi54ICs9IHRoaXMucGxhbmV0c1trXS52ZWxvY2l0eS54KmRlbHRhVDtcbiAgICAgIHRoaXMucGxhbmV0c1trXS5wb3NpdGlvbi55ICs9IHRoaXMucGxhbmV0c1trXS52ZWxvY2l0eS55KmRlbHRhVDtcbiAgICB9XG4gICAgdGhpcy50cmFpbCgpO1xuICAgIHRoaXMucmVwb3NpdGlvbigpO1xuICAgIHRoaXMuY29sbGlkZSgpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG59XG4iXX0=

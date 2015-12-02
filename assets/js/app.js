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
      ctx.stroke();
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

              if (this.planets[i].mass < this.planets[j].mass) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvc2NyaXB0cy9mdWxsc2l6ZS5qcyIsInNyYy9zY3JpcHRzL2luZGV4LmpzIiwic3JjL3NjcmlwdHMvbGluZS5qcyIsInNyYy9zY3JpcHRzL3BsYW5ldC1zcXVhcmUuanMiLCJzcmMvc2NyaXB0cy9wbGFuZXQuanMiLCJzcmMvc2NyaXB0cy91bml2ZXJzZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztrQkNBZSxVQUFTLFFBQVEsRUFBRTs7O0FBR2hDLFdBQVMsV0FBVyxHQUFHO0FBQ3JCLFFBQUksR0FBRyxHQUFHLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUM5QyxTQUFLLElBQUksQ0FBQyxHQUFDLENBQUMsRUFBRSxDQUFDLEdBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUMvQixVQUFJLEVBQUUsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDOzs7QUFBQyxBQUdoQixVQUFJLEVBQUUsQ0FBQyxRQUFRLElBQUksUUFBUSxFQUFFO0FBQzNCLFVBQUUsQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUM1QyxVQUFFLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7T0FDL0M7O0FBRUQsUUFBRSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7QUFDMUMsUUFBRSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7S0FFN0M7R0FDRjs7QUFFRCxRQUFNLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLFdBQVcsRUFBRSxLQUFLLENBQUMsQ0FBQztBQUN0RCxVQUFRLENBQUMsZ0JBQWdCLENBQUMsa0JBQWtCLEVBQUUsV0FB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QUFJLENBQUM7QUFDdkQsa0JBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxFQUFFLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztBQUN2RSxrQkFBSSxNQUFNLEdBQUcsaUJBQU8sU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDOztBQUV0QyxrQkFBSSxTQUFTLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFBLEdBQUksSUFBSSxDQUFDO0FBQy9ILGtCQUFJLFNBQVMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUEsR0FBSSxJQUFJLENBQUM7O0FBRS9ILGtCQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFO0FBQzlDLG9CQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7QUFDNUIsb0JBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztBQUNo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QUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQzs7QUFFckYsWUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBQyxNQUFNLENBQUM7QUFDaEUsWUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBQyxNQUFNLENBQUM7T0FDakU7QUFDRCxVQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7QUFDYixhQUFPLElBQUksQ0FBQztLQUNiOzs7U0FyTmtCLFFBQVE7OztrQkFBUixRQUFRIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHNlbGVjdG9yKSB7XG4gIC8vIG9uIGV2ZW50IHJlc2l6ZSBhbmQgbG9hZFxuICAvLyBmaW5kIGFsbCAuZmx1aWQgYW5kIHNldCB3aWR0aCBoZWlnaHQgYXR0cmlidXRlIGZvciBlYWNoXG4gIGZ1bmN0aW9uIHNldEZ1bGxzaXplKCkge1xuICAgIHZhciBlbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKTtcbiAgICBmb3IgKHZhciBpPTA7IGk8ZWxzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgZWwgPSBlbHNbaV07XG5cbiAgICAgIC8vIENhbnZhcyBuZWVkIHdpZHRoJmhlaWdodCBhdHRyIHNvIHRoZSByYXRpbyByZW1haW5zIDE6MVxuICAgICAgaWYgKGVsLm5vZGVOYW1lID09ICdDQU5WQVMnKSB7XG4gICAgICAgIGVsLnNldEF0dHJpYnV0ZSgnd2lkdGgnLCB3aW5kb3cuaW5uZXJXaWR0aCk7XG4gICAgICAgIGVsLnNldEF0dHJpYnV0ZSgnaGVpZ2h0Jywgd2luZG93LmlubmVySGVpZ2h0KTtcbiAgICAgIH1cblxuICAgICAgZWwuc3R5bGUud2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aCArICdweCc7XG4gICAgICBlbC5zdHlsZS5oZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQgKyAncHgnO1xuXG4gICAgfVxuICB9XG5cbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHNldEZ1bGxzaXplLCBmYWxzZSk7XG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBzZXRGdWxsc2l6ZSwgZmFsc2UpO1xufVxuIiwiaW1wb3J0IFBsYW5ldCBmcm9tICcuL3BsYW5ldCc7XG5pbXBvcnQgUGxhbmV0U3F1YXJlIGZyb20gJy4vcGxhbmV0LXNxdWFyZSc7XG5pbXBvcnQgVW5pdmVyc2UgZnJvbSAnLi91bml2ZXJzZSc7XG5cbmltcG9ydCBmMTEgZnJvbSAnLi9mdWxsc2l6ZSc7XG5cbmYxMSgnLmZsdWlkJyk7XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbigpIHtcbiAgdmFyIGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1bml2ZXJzZScpO1xuICB2YXIgdW5kZXJsYXkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndW5kZXJsYXlUcmFpbCcpO1xuXG4gIHZhciB1bml2ZXJzZSA9IG5ldyBVbml2ZXJzZSgpO1xuXG4gIHZhciBwbGFuZXRPID0gbmV3IFBsYW5ldCgpO1xuICB2YXIgcGxhbmV0QSA9IG5ldyBQbGFuZXQoKTtcbiAgdmFyIHBsYW5ldEIgPSBuZXcgUGxhbmV0KCk7XG5cbiAgcGxhbmV0Ty5yYWRpdXMgPSAxNTtcbiAgcGxhbmV0Ty5kZW5zaXR5ID0gMTtcbiAgcGxhbmV0Ty5wb3NpdGlvbiA9IHt4OjUwMCwgeToyNTB9O1xuICBwbGFuZXRPLnJlY2FsY3VsYXRlTWFzcygpO1xuXG4gIHBsYW5ldEEucmFkaXVzID0gMTA7XG4gIHBsYW5ldEEucG9zaXRpb24gPSB7eDo0MDAsIHk6MjAwfTtcbiAgcGxhbmV0QS52ZWxvY2l0eS55ID0gMjA7XG4gIHBsYW5ldEEucmVjYWxjdWxhdGVNYXNzKCk7XG5cbiAgcGxhbmV0Qi5yYWRpdXMgPSAxMDtcbiAgcGxhbmV0Qi5wb3NpdGlvbiA9IHt4OjM1MCwgeToyMDB9O1xuICBwbGFuZXRCLnZlbG9jaXR5LnkgPSAxODtcbiAgcGxhbmV0Qi5yZWNhbGN1bGF0ZU1hc3MoKTtcblxuICB1bml2ZXJzZVxuICAuYWRkUGxhbmV0KHBsYW5ldE8pXG4gIC5hZGRQbGFuZXQocGxhbmV0QSlcbiAgLmFkZFBsYW5ldChwbGFuZXRCKVxuICAuc2V0Q2FudmFzKGNhbnZhcywgdW5kZXJsYXkpXG4gIC5jcmVhdGVQbGFuZXQoKVxuICAuc2V0RGVsdGFUKDAuMDIpXG4gIC5iaWdiYW5nKCk7XG59LCBmYWxzZSlcblxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgTGluZSB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuaW5pdCA9IHtcbiAgICAgIHg6IDAsXG4gICAgICB5OiAwXG4gICAgfVxuICAgIHRoaXMubGFzdCA9IHtcbiAgICAgIHg6IDAsXG4gICAgICB5OiAwXG4gICAgfVxuICB9XG5cbiAgcmVuZGVyKGN0eCkge1xuICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICBjdHgubW92ZVRvKHRoaXMuaW5pdC54LCB0aGlzLmluaXQueSk7XG4gICAgY3R4LmxpbmVUbyh0aGlzLmxhc3QueCwgdGhpcy5sYXN0LnkpO1xuICAgIGN0eC5zdHJva2UoKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxufVxuIiwiaW1wb3J0IFBsYW5ldCBmcm9tICcuL3BsYW5ldC5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBsYW5ldFNxdWFyZSBleHRlbmRzIFBsYW5ldCB7XG4gIHJlbmRlcihjdHgpIHtcbiAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgY3R4LnJlY3QoXG4gICAgICB0aGlzLnBvc2l0aW9uLnggLSB0aGlzLnJhZGl1cyxcbiAgICAgIHRoaXMucG9zaXRpb24ueSAtIHRoaXMucmFkaXVzLFxuICAgICAgMiAqIHRoaXMucmFkaXVzLFxuICAgICAgMiAqIHRoaXMucmFkaXVzXG4gICAgKTtcbiAgICBjdHguc3Ryb2tlKCk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFBsYW5ldCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMucmFkaXVzID0gMTtcbiAgICB0aGlzLmRlbnNpdHkgPSAwLjAwNTtcblxuICAgIHRoaXMudmVsb2NpdHkgPSB7XG4gICAgICB4OiAwLFxuICAgICAgeTogMFxuICAgIH07XG4gICAgdGhpcy5wb3NpdGlvbiA9IHtcbiAgICAgIHg6IDAsXG4gICAgICB5OiAwXG4gICAgfTtcbiAgICB0aGlzLmdGb3JjZSA9IHtcbiAgICAgIHg6IDAsXG4gICAgICB5OiAwXG4gICAgfVxuICAgIHRoaXMubWFzcyA9IDE7XG4gIH1cblxuICByZW5kZXIoY3R4KSB7XG4gICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgIGN0eC5hcmModGhpcy5wb3NpdGlvbi54LCB0aGlzLnBvc2l0aW9uLnksIHRoaXMucmFkaXVzLCAwLCBNYXRoLlBJKjIsIHRydWUpO1xuICAgIGN0eC5zdHJva2UoKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHJlY2FsY3VsYXRlTWFzcygpIHtcbiAgICB0aGlzLm1hc3MgPSAwLjc1ICogTWF0aC5QSSAqIE1hdGgucG93KHRoaXMucmFkaXVzLCAzKSAqIHRoaXMuZGVuc2l0eTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGdldFZvbHVtZSgpIHtcbiAgICByZXR1cm4gMC43NSAqIE1hdGguUEkgKiBNYXRoLnBvdyh0aGlzLnJhZGl1cywgMyk7XG4gIH1cblxuICBzdGF0aWMgZ2V0UmFkaXVzKHZvbCkge1xuICAgIHJldHVybiBNYXRoLnBvdyh2b2wgLyAwLjc1IC8gTWF0aC5QSSwgMSAvIDMpO1xuICB9XG59XG4iLCJpbXBvcnQgUGxhbmV0IGZyb20gJy4vcGxhbmV0JztcbmltcG9ydCBMaW5lIGZyb20gJy4vbGluZSc7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVbml2ZXJzZSB7XG4gIGNvbnN0cnVjdG9yICgpIHtcbiAgICB0aGlzLnBsYW5ldHMgPSBbXTtcbiAgfVxuXG4gIGFkZFBsYW5ldChwbGFuZXQpIHtcbiAgICB0aGlzLnBsYW5ldHMucHVzaChwbGFuZXQpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7Tm9kZX0gY2FudmFzXG4gICAqL1xuICBzZXRDYW52YXMoY2FudmFzLCB1bmRlcmxheSkge1xuICAgIHRoaXMuY2FudmFzID0gY2FudmFzO1xuICAgIHRoaXMudW5kZXJsYXkgPSB1bmRlcmxheTtcbiAgICB0aGlzLmN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuICAgIHRoaXMuY3R4VW5kZXJsYXkgPSB1bmRlcmxheS5nZXRDb250ZXh0KCcyZCcpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgc2V0RGVsdGFUKGRlbHRhVCkge1xuICAgIHRoaXMuZGVsdGFUID0gZGVsdGFUO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgY29sbGlkZSgpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMucGxhbmV0cy5sZW5ndGg7IGkrKykge1xuICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCB0aGlzLnBsYW5ldHMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgaWYgKGkgIT09IGopIHtcbiAgICAgICAgICB2YXIgZGlzdCA9IE1hdGguc3FydChNYXRoLnBvdyh0aGlzLnBsYW5ldHNbal0ucG9zaXRpb24ueCAtIHRoaXMucGxhbmV0c1tpXS5wb3NpdGlvbi54LDIpICsgTWF0aC5wb3codGhpcy5wbGFuZXRzW2pdLnBvc2l0aW9uLnkgLSB0aGlzLnBsYW5ldHNbaV0ucG9zaXRpb24ueSwyKSk7XG4gICAgICAgICAgaWYgKGRpc3QgPCB0aGlzLnBsYW5ldHNbal0ucmFkaXVzICsgdGhpcy5wbGFuZXRzW2ldLnJhZGl1cykge1xuICAgICAgICAgICAgdmFyIG1hc3MgPSB0aGlzLnBsYW5ldHNbal0ubWFzcyArIHRoaXMucGxhbmV0c1tpXS5tYXNzO1xuICAgICAgICAgICAgdmFyIHZvbHVtZSA9IHRoaXMucGxhbmV0c1tqXS5nZXRWb2x1bWUoKSArIHRoaXMucGxhbmV0c1tpXS5nZXRWb2x1bWUoKTtcbiAgICAgICAgICAgIHZhciByYWRpdXMgPSBQbGFuZXQuZ2V0UmFkaXVzKHZvbHVtZSk7XG5cbiAgICAgICAgICAgIHZhciB2ZWxvY2l0eVggPSAodGhpcy5wbGFuZXRzW2pdLm1hc3MgKiB0aGlzLnBsYW5ldHNbal0udmVsb2NpdHkueCArIHRoaXMucGxhbmV0c1tpXS5tYXNzICogdGhpcy5wbGFuZXRzW2ldLnZlbG9jaXR5LngpIC8gbWFzcztcbiAgICAgICAgICAgIHZhciB2ZWxvY2l0eVkgPSAodGhpcy5wbGFuZXRzW2pdLm1hc3MgKiB0aGlzLnBsYW5ldHNbal0udmVsb2NpdHkueSArIHRoaXMucGxhbmV0c1tpXS5tYXNzICogdGhpcy5wbGFuZXRzW2ldLnZlbG9jaXR5LnkpIC8gbWFzcztcblxuICAgICAgICAgICAgaWYodGhpcy5wbGFuZXRzW2ldLm1hc3MgPCB0aGlzLnBsYW5ldHNbal0ubWFzcykge1xuICAgICAgICAgICAgICB0aGlzLnBsYW5ldHNbal0ubWFzcyA9IG1hc3M7XG4gICAgICAgICAgICAgIHRoaXMucGxhbmV0c1tqXS52b2x1bWUgPSB2b2x1bWU7XG4gICAgICAgICAgICAgIHRoaXMucGxhbmV0c1tqXS5yYWRpdXMgPSByYWRpdXM7XG4gICAgICAgICAgICAgIHRoaXMucGxhbmV0c1tqXS52ZWxvY2l0eS54ID0gdmVsb2NpdHlYO1xuICAgICAgICAgICAgICB0aGlzLnBsYW5ldHNbal0udmVsb2NpdHkueSA9IHZlbG9jaXR5WTtcbiAgICAgICAgICAgICAgdGhpcy5wbGFuZXRzLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRoaXMucGxhbmV0c1tpXS5tYXNzID0gbWFzcztcbiAgICAgICAgICAgICAgdGhpcy5wbGFuZXRzW2ldLnZvbHVtZSA9IHZvbHVtZTtcbiAgICAgICAgICAgICAgdGhpcy5wbGFuZXRzW2ldLnJhZGl1cyA9IHJhZGl1cztcbiAgICAgICAgICAgICAgdGhpcy5wbGFuZXRzW2ldLnZlbG9jaXR5LnggPSB2ZWxvY2l0eVg7XG4gICAgICAgICAgICAgIHRoaXMucGxhbmV0c1tpXS52ZWxvY2l0eS55ID0gdmVsb2NpdHlZO1xuICAgICAgICAgICAgICB0aGlzLnBsYW5ldHMuc3BsaWNlKGosIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGNyZWF0ZVBsYW5ldCgpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAvLyBNb3VzZWRvd24sIGxldCdzIGNyZWF0ZSBhIG5ldyBwbGFuZXQgYXQgdGhhdCBwb3NpdGlvblxuICAgIC8vICAgQlVUIGRvbid0IGFkZCBpdCBpbnRvIHRoZSBwbGFuZXQgbGlzdCAoc28gaXQgd29uJ3QgbW92ZSAuLilcbiAgICAvLyAgIEFsc28sIHdlIG5lZWQgdG8gZW5sYXJnZSB0aGUgcGxhbmV0IGV2ZXJ5IDEwMG1zLFxuICAgIC8vICAgYW5kIHJlbWVtYmVyIHRvIGRyYXcgaXQgaW4gYHJlbmRlcigpYFxuICAgIHRoaXMuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIGZ1bmN0aW9uKGUpIHtcbiAgICAgIHNlbGYuaW5pdFggPSBlLmNsaWVudFggLSB0aGlzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnQ7XG4gICAgICBzZWxmLmluaXRZID0gZS5jbGllbnRZIC0gdGhpcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3A7XG5cbiAgICAgIHNlbGYubmV3UGxhbmV0ID0gbmV3IFBsYW5ldCgpO1xuICAgICAgc2VsZi5uZXdQbGFuZXQucG9zaXRpb24ueCA9IHNlbGYuaW5pdFg7XG4gICAgICBzZWxmLm5ld1BsYW5ldC5wb3NpdGlvbi55ID0gc2VsZi5pbml0WTtcbiAgICAgIHNlbGYubmV3UGxhbmV0LnJhZGl1cyA9IDE7XG5cbiAgICAgIHNlbGYuc3RvcEludGVydmFsID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XG4gICAgICAgIHNlbGYubmV3UGxhbmV0LnJhZGl1cyArPSAwLjM7XG4gICAgICB9LCAxMDApO1xuXG4gICAgICBzZWxmLm5ld0xpbmUgPSBuZXcgTGluZSgpO1xuICAgICAgc2VsZi5uZXdMaW5lLmluaXQueCA9IGUuY2xpZW50WCAtIHRoaXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdDtcbiAgICAgIHNlbGYubmV3TGluZS5pbml0LnkgPSBlLmNsaWVudFkgLSB0aGlzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcDtcbiAgICAgIHNlbGYubmV3TGluZS5sYXN0LnggPSBzZWxmLm5ld0xpbmUuaW5pdC54O1xuICAgICAgc2VsZi5uZXdMaW5lLmxhc3QueSA9IHNlbGYubmV3TGluZS5pbml0Lnk7XG4gICAgfSk7XG5cbiAgICAvLyBXaGVuIG1vdXNlIG1vdmUsIGlmIHRoZXJlJ3MgYSBuZXdQbGFuZXQsXG4gICAgLy8gICB1cGRhdGUgaXRzIHBvc2l0aW9uIHRvIG1vdXNlIHBvaW50ZXJcbiAgICB0aGlzLmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBmdW5jdGlvbihlKSB7XG4gICAgICBpZihzZWxmLm5ld1BsYW5ldCkge1xuICAgICAgICBzZWxmLm5ld1BsYW5ldC5wb3NpdGlvbi54ID0gZS5jbGllbnRYIC0gdGhpcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5sZWZ0O1xuICAgICAgICBzZWxmLm5ld1BsYW5ldC5wb3NpdGlvbi55ID0gZS5jbGllbnRZIC0gdGhpcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3A7XG4gICAgICB9XG5cbiAgICAgIGlmKHNlbGYubmV3TGluZSkge1xuICAgICAgICBzZWxmLm5ld0xpbmUubGFzdC54ID0gZS5jbGllbnRYIC0gdGhpcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5sZWZ0O1xuICAgICAgICBzZWxmLm5ld0xpbmUubGFzdC55ID0gZS5jbGllbnRZIC0gdGhpcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3A7XG4gICAgICB9XG5cbiAgICB9KTtcblxuICAgIC8vIFdoZW4gcmVsZWFzZSBtb3VzZSwgY2FsY3VsYXRlIHRoZSB2ZWxvY2l0eVxuICAgIC8vICAgYW5kIGFkZCBpdCBpbnRvIHRoZSB1bml2ZXJzZVxuICAgIHRoaXMuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBmdW5jdGlvbihlKSB7XG4gICAgICBjbGVhckludGVydmFsKHNlbGYuc3RvcEludGVydmFsKTtcblxuICAgICAgc2VsZi5sYXN0WCA9IGUuY2xpZW50WCAtIHRoaXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdDtcbiAgICAgIHNlbGYubGFzdFkgPSBlLmNsaWVudFkgLSB0aGlzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcDtcblxuICAgICAgc2VsZi5uZXdQbGFuZXQudmVsb2NpdHkueCA9IHNlbGYuaW5pdFggLSBzZWxmLmxhc3RYO1xuICAgICAgc2VsZi5uZXdQbGFuZXQudmVsb2NpdHkueSA9IHNlbGYuaW5pdFkgLSBzZWxmLmxhc3RZO1xuICAgICAgc2VsZi5uZXdQbGFuZXQucmVjYWxjdWxhdGVNYXNzKCk7XG4gICAgICBzZWxmLmFkZFBsYW5ldChzZWxmLm5ld1BsYW5ldCk7XG5cbiAgICAgIHNlbGYubmV3UGxhbmV0ID0gbnVsbDtcbiAgICAgIHNlbGYubmV3TGluZSA9IG51bGw7XG4gICAgfSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBiaWdiYW5nKCkge1xuICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgIHNldEludGVydmFsKGZ1bmN0aW9uKCkge1xuICAgICAgc2VsZi50aWNrKCkuY29sbGlkZSgpLnJlbmRlcigpO1xuICAgIH0sIHRoaXMuZGVsdGFUKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHRyYWlsKCkge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5wbGFuZXRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoIXRoaXMucGxhbmV0c1tpXS50cmFpbCkge1xuICAgICAgICB0aGlzLnBsYW5ldHNbaV0udHJhaWwgPSBuZXcgUGxhbmV0KCk7XG4gICAgICAgIHRoaXMucGxhbmV0c1tpXS50cmFpbC5yYWRpdXMgPSAwLjE7XG4gICAgICB9O1xuICAgICAgaWYgKHRoaXMucGxhbmV0c1tpXS50cmFpbCkge1xuICAgICAgICB0aGlzLnBsYW5ldHNbaV0udHJhaWwucG9zaXRpb24gPSB0aGlzLnBsYW5ldHNbaV0ucG9zaXRpb247XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHRoaXMuY3R4LmNsZWFyUmVjdChcbiAgICAgIDAsIDAsXG4gICAgICB0aGlzLmN0eC5jYW52YXMud2lkdGgsIHRoaXMuY3R4LmNhbnZhcy5oZWlnaHRcbiAgICApO1xuXG4gICAgdGhpcy5jdHhVbmRlcmxheS5maWxsU3R5bGUgPSAncmdiYSgyNTUsIDI1NSwgMjU1LCAuMDE1KSc7XG4gICAgdGhpcy5jdHhVbmRlcmxheS5maWxsUmVjdChcbiAgICAgIDAsIDAsXG4gICAgICB0aGlzLmN0eFVuZGVybGF5LmNhbnZhcy53aWR0aCwgdGhpcy5jdHhVbmRlcmxheS5jYW52YXMuaGVpZ2h0XG4gICAgKTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5wbGFuZXRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB0aGlzLnBsYW5ldHNbaV0ucmVuZGVyKHRoaXMuY3R4KTtcbiAgICB9XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMucGxhbmV0cy5sZW5ndGg7IGkrKykge1xuICAgICAgdGhpcy5wbGFuZXRzW2ldLnRyYWlsLnJlbmRlcih0aGlzLmN0eFVuZGVybGF5KTtcbiAgICB9XG5cbiAgICBpZih0aGlzLm5ld1BsYW5ldCkge1xuICAgICAgdGhpcy5uZXdQbGFuZXQucmVuZGVyKHRoaXMuY3R4KTtcbiAgICB9XG5cbiAgICBpZih0aGlzLm5ld0xpbmUpIHtcbiAgICAgIHRoaXMubmV3TGluZS5yZW5kZXIodGhpcy5jdHgpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgdGljaygpIHtcbiAgICB2YXIgZHQgPSB0aGlzLmRlbHRhVDtcblxuICAgIHZhciBnQ29uc3QgPSA2LjY3NCxcbiAgICAgICAgZm9yY2VYID0gMCxcbiAgICAgICAgZGVsdGFUID0gZHQsXG4gICAgICAgIHN1YnRyWCxcbiAgICAgICAgc3VidHJZLFxuICAgICAgICBmb3JjZVkgPSAwO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnBsYW5ldHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIFxuICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCB0aGlzLnBsYW5ldHMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgaWYgKGogPT0gaSkge1xuICAgICAgICAgIGZvcmNlWCArPSAwO1xuICAgICAgICAgIGZvcmNlWSArPSAwO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIHN1YnRyWCA9IHRoaXMucGxhbmV0c1tqXS5wb3NpdGlvbi54IC0gdGhpcy5wbGFuZXRzW2ldLnBvc2l0aW9uLng7XG4gICAgICAgICAgc3VidHJZID0gdGhpcy5wbGFuZXRzW2pdLnBvc2l0aW9uLnkgLSB0aGlzLnBsYW5ldHNbaV0ucG9zaXRpb24ueTtcbiAgICAgICAgICBmb3JjZVggKz0gZ0NvbnN0ICogdGhpcy5wbGFuZXRzW2ldLm1hc3MgKiB0aGlzLnBsYW5ldHNbal0ubWFzcyAqIHN1YnRyWCAvIE1hdGgucG93KE1hdGguc3FydChNYXRoLnBvdyhzdWJ0clgsMikgKyBNYXRoLnBvdyhzdWJ0clksMikpLCAzKTtcbiAgICAgICAgICBmb3JjZVkgKz0gZ0NvbnN0ICogdGhpcy5wbGFuZXRzW2ldLm1hc3MgKiB0aGlzLnBsYW5ldHNbal0ubWFzcyAqIHN1YnRyWSAvIE1hdGgucG93KE1hdGguc3FydChNYXRoLnBvdyhzdWJ0clgsMikgKyBNYXRoLnBvdyhzdWJ0clksMikpLCAzKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgdGhpcy5wbGFuZXRzW2ldLmdGb3JjZS54ID0gZm9yY2VYO1xuICAgICAgdGhpcy5wbGFuZXRzW2ldLmdGb3JjZS55ID0gZm9yY2VZO1xuICAgICAgZm9yY2VYID0gMDtcbiAgICAgIGZvcmNlWSA9IDA7XG4gICAgfVxuICAgIFxuICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5wbGFuZXRzLmxlbmd0aDsgaysrKSB7XG4gICAgICB0aGlzLnBsYW5ldHNba10udmVsb2NpdHkueCArPSB0aGlzLnBsYW5ldHNba10uZ0ZvcmNlLngqZGVsdGFUIC8gdGhpcy5wbGFuZXRzW2tdLm1hc3M7XG4gICAgICB0aGlzLnBsYW5ldHNba10udmVsb2NpdHkueSArPSB0aGlzLnBsYW5ldHNba10uZ0ZvcmNlLnkqZGVsdGFUIC8gdGhpcy5wbGFuZXRzW2tdLm1hc3M7XG5cbiAgICAgIHRoaXMucGxhbmV0c1trXS5wb3NpdGlvbi54ICs9IHRoaXMucGxhbmV0c1trXS52ZWxvY2l0eS54KmRlbHRhVDtcbiAgICAgIHRoaXMucGxhbmV0c1trXS5wb3NpdGlvbi55ICs9IHRoaXMucGxhbmV0c1trXS52ZWxvY2l0eS55KmRlbHRhVDtcbiAgICB9XG4gICAgdGhpcy50cmFpbCgpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG59XG4iXX0=

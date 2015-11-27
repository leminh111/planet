import Planet from './planet';
export default class Universe {
  constructor () {
    this.planets = [];
  }

  addPlanet(planet) {
    this.planets.push(planet)
    return this;
  }

  /**
   * @param {Node} canvas
   */
  setCanvas(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    return this;
  }

  setDeltaT(deltaT) {
    this.deltaT = deltaT;
    return this;
  }

  collide() {
    var dist;
    for (var i = 0; i < this.planets.length; i++) {
      for (var j = 0; j < this.planets.length; j++) {
        if (i !== j) {
          dist = Math.sqrt(Math.pow(this.planets[j].position.x - this.planets[i].position.x,2) + Math.pow(this.planets[j].position.y - this.planets[i].position.y,2));
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

  createPlanet() {
    var self = this;
    self.plR = 1;

    this.canvas.addEventListener('mousedown', function(e) {
      self.initX = e.clientX - this.getBoundingClientRect().left;
      self.initY = e.clientY - this.getBoundingClientRect().top;
      self.stopInterval = setInterval(function() {
        self.plR += 1;
      }, 100);
    });
    this.canvas.addEventListener('mouseup', function(e) {
      clearInterval(self.stopInterval);
      self.lastX =  e.clientX - this.getBoundingClientRect().left;
      self.lastY =  e.clientY - this.getBoundingClientRect().top;
      self.addPlanet(new Planet());
      self.planets[self.planets.length - 1].radius = self.plR;
      self.planets[self.planets.length - 1].mass = 8;
      self.planets[self.planets.length - 1].position = {x: self.initX, y: self.initY};
      self.planets[self.planets.length - 1].velocity = {x: self.lastX - self.initX, y: self.lastY - self.initY};
      self.plR = 1;
    });
    return this;
  }

  bigbang() {
    var self = this;

    setInterval(function() {
      self.tick().collide().render();
    }, this.deltaT);
    return this;
  }

  render() {
    this.ctx.clearRect(
      0, 0,
      this.ctx.canvas.width, this.ctx.canvas.height
    );
    
    for (var i = 0; i < this.planets.length; i++) {
      this.ctx.beginPath();
      this.ctx.arc(this.planets[i].position.x,this.planets[i].position.y,this.planets[i].radius,0,Math.PI*2,true);
      this.ctx.stroke();
    }
  }

  tick() {
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
        }
        else {
          subtrX = this.planets[j].position.x - this.planets[i].position.x;
          subtrY = this.planets[j].position.y - this.planets[i].position.y;
          forceX += gConst*this.planets[i].mass*this.planets[j].mass*subtrX/Math.pow(Math.sqrt(Math.pow(subtrX,2) + Math.pow(subtrY,2)), 3);
          forceY += gConst*this.planets[i].mass*this.planets[j].mass*subtrY/Math.pow(Math.sqrt(Math.pow(subtrX,2) + Math.pow(subtrY,2)), 3);
        }
      }
      this.planets[i].gForce.x = forceX;
      this.planets[i].gForce.y = forceY;
      forceX = 0;
      forceY = 0;
    }
    
    for (var k = 0; k < this.planets.length; k++) {
      this.planets[k].velocity.x += this.planets[k].gForce.x*deltaT/this.planets[k].mass;
      this.planets[k].velocity.y += this.planets[k].gForce.y*deltaT/this.planets[k].mass;
      this.planets[k].position.x += this.planets[k].velocity.x*deltaT;
      this.planets[k].position.y += this.planets[k].velocity.y*deltaT;
    }
    return this;
  }
}

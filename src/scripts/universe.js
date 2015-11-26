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
    this.ctx = canvas.getContext('2d');
    return this;
  }

  setDeltaT(deltaT) {
    this.deltaT = deltaT;
    return this;
  }

  bigbang() {
    var self = this;

    setInterval(function() {
      self.tick().render();
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
      this.ctx.fill();
    }
  }

  tick() {
    var dt = this.deltaT;

    var gConst = 1,
        forceX = 0,
        deltaT = dt,
        forceY = 0;

    for (var i = 0; i < this.planets.length; i++) {
      
      for (var j = 0; j < this.planets.length; j++) {
        if (j == i) {
          forceX = 0;
          forceY = 0;
        }
        else {
          if (this.planets[j].position.x > this.planets[i].position.x) {
            forceX = gConst*this.planets[i].mass*this.planets[j].mass/Math.pow(this.planets[j].position.x - this.planets[i].position.x, 2);
          }
          else if (this.planets[j].position.x == this.planets[i].position.x) {
            console.log('beep');
            forceX = 0;
          }
          else {
            forceX = -gConst*this.planets[i].mass*this.planets[j].mass/Math.pow(this.planets[j].position.x - this.planets[i].position.x, 2);
          }
          
          if (this.planets[j].position.y > this.planets[i].position.y) {
            forceY = gConst*this.planets[i].mass*this.planets[j].mass/Math.pow(this.planets[j].position.y - this.planets[i].position.y, 2);
          }
          else if (this.planets[j].position.y == this.planets[i].position.y) {
            forceY = 0;
          }
          else {
            forceY = -gConst*this.planets[i].mass*this.planets[j].mass/Math.pow(this.planets[j].position.y - this.planets[i].position.y, 2);
          }
        }

        this.planets[i].gForce.x += forceX;
        this.planets[i].gForce.y += forceY;
      }
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

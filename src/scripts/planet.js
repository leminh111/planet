export default class Planet {
  constructor() {
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
    }
  }

  render(ctx) {
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI*2, true);
    ctx.stroke();
    return this;
  }

  getMass() {
    return 0.75 * Math.PI * Math.pow(this.radius, 3) * this.density;
  }
}

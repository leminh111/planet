import Planet from './planet.js';

export default class PlanetSquare extends Planet {
  render(ctx) {
    ctx.beginPath();
    ctx.rect(
      this.position.x - this.radius,
      this.position.y - this.radius,
      2 * this.radius,
      2 * this.radius
    );
    ctx.stroke();
    return this;
  }
}

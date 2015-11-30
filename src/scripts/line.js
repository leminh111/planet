export default class Line {
  constructor() {
    this.init = {
      x: 0,
      y: 0
    }
    this.last = {
      x: 0,
      y: 0
    }
  }

  render(ctx) {
    ctx.beginPath();
    ctx.moveTo(this.init.x, this.init.y);
    ctx.lineTo(this.last.x, this.last.y);
    ctx.stroke();
    return this;
  }
}

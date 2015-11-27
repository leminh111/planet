import Planet from '../../../src/scripts/planet';

describe('Planet', () => {
  it('should be a class', () => {
    expect(Planet).toBeDefined();
    expect(new Planet()).toBeDefined();
  });

  it('should have attr', () => {
    var planet = new Planet();

    expect(typeof planet.radius == 'number').toBeTruthy();
    expect(planet.mass).toBeDefined();

    expect(planet.velocity).toBeDefined();
    expect(planet.velocity.x).toBeDefined();
    expect(planet.velocity.y).toBeDefined();

    expect(planet.position).toBeDefined();
    expect(planet.position.x).toBeDefined();
    expect(planet.position.y).toBeDefined();
  });

  it('should have render', () => {
    var planet = new Planet();
    expect(planet.render).toBeDefined();
  });
});

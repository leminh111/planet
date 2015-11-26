import Universe from '../../../src/scripts/universe';
import Planet from '../../../src/scripts/planet';

describe('Universe', function() {
  it('should be a class', function() {
    expect(Universe).toBeDefined();
    expect(new Universe()).toBeDefined();
  });

  it('should know its planets position', function() {
    var uni = new Universe();
    expect(uni.planets).toBeDefined();
    expect(uni.tick).toBeDefined();
    expect(uni.addPlanet).toBeDefined();
  });

  describe('addPlanet()', function() {
    var uni, planet1, planet2;
    beforeEach(function() {
      uni = new Universe();
      planet1 = new Planet();
      planet2 = new Planet();
    });

    it('basic work', function() {
      // we should have no planet by default
      expect(uni.planets.length).toEqual(0);

      uni.addPlanet(planet1);
      expect(uni.planets.length).toEqual(1);

      uni.addPlanet(planet2);
      expect(uni.planets.length).toEqual(2);
    });

    it('duplicated handle', function() {
      expect(uni.planets.length).toEqual(0);

      uni.addPlanet(planet1);
      expect(uni.planets.length).toEqual(1);

      // do not add it again if duplicated
      uni.addPlanet(planet1);
      expect(uni.planets.length).toEqual(1);
    });
  });

  describe('tick()', function() {
    it('should work with 3 planets', function() {
      var uni = new Universe();
      var planet1 = new Planet();
      var planet2 = new Planet();
      var planet3 = new Planet();
      var gConst = 1;

      planet1.radius = 1;
      planet1.mass = 100;
      planet1.position = { x: 0, y: 0 };
      planet1.velocity = { x: 0, y: 0 };

      planet2.radius = 2;
      planet2.mass = 100;
      planet2.position = { x: 10, y: 0 };
      planet2.velocity = { x: 0, y: 0 };

      planet3.radius = 2;
      planet3.mass = 100;
      planet3.position = { x: 0, y: 10 };
      planet3.velocity = { x: 0, y: 0 };

      uni.addPlanet(planet1);
      uni.addPlanet(planet2);
      uni.addPlanet(planet3);
 
      uni.bigbang('universe1', 1);

      expect(planet1.position).toEqual({
        x: (-1),
        y: (0)
      });

      expect(planet2.position).toEqual({
        x: (-9),
        y: (0)
      });

      expect(planet3.position).toEqual({
        x: (-9),
        y: (0)
      });
 
    })
  });
 
});

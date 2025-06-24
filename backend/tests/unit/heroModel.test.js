const Hero = require('../../models/Hero');
const { connect, cleanup, disconnect } = require('../setup');

beforeAll(connect);
afterEach(cleanup);
afterAll(disconnect);

describe('Hero Model', () => {
  it('should save a valid hero', async () => {
    const hero = new Hero({
      name: 'Achilles',
      parentage: ['Peleus', 'Thetis'],
      heroicDeeds: ['Slayed Hector'],
      associatedMyths: ['Trojan War'],
      fate: 'Killed by Paris'
    });

    const saved = await hero.save();
    expect(saved._id).toBeDefined();
    expect(saved.name).toBe('Achilles');
  });

  it('should not save hero without name', async () => {
    const hero = new Hero({});
    let err;
    try {
      await hero.save();
    } catch (e) {
      err = e;
    }
    expect(err).toBeDefined();
  });
});

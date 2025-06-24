const God = require('../../models/God');
const { connect, cleanup, disconnect } = require('../setup');

beforeAll(connect);
afterEach(cleanup);
afterAll(disconnect);

describe('God Model', () => {
  it('should save a valid god', async () => {
    const god = new God({
      name: 'Zeus',
      domain: ['Sky', 'Thunder'],
      symbols: ['Thunderbolt', 'Eagle'],
      parents: ['Cronus', 'Rhea'],
      romanEquivalent: 'Jupiter',
      associatedMyths: ['Olympus', 'Titanomachy']
    });

    const saved = await god.save();
    expect(saved._id).toBeDefined();
    expect(saved.name).toBe('Zeus');
  });

  it('should not save god without name', async () => {
    const god = new God({});
    let err;
    try {
      await god.save();
    } catch (e) {
      err = e;
    }
    expect(err).toBeDefined();
  });
});

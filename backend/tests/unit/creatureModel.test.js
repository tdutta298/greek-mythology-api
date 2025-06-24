const Creature = require('../../models/Creature');
const { connect, cleanup, disconnect } = require('../setup');

beforeAll(connect);
afterEach(cleanup);
afterAll(disconnect);

describe('Creature Model', () => {
  it('should save a valid creature', async () => {
    const creature = new Creature({
      name: 'Minotaur',
      type: 'Hybrid',
      abilities: ['Strength'],
      origin: 'Crete',
      associatedMyths: ['Theseus and the Labyrinth']
    });

    const saved = await creature.save();
    expect(saved._id).toBeDefined();
    expect(saved.name).toBe('Minotaur');
  });

  it('should not save creature without name', async () => {
    const creature = new Creature({});
    let err;
    try {
      await creature.save();
    } catch (e) {
      err = e;
    }
    expect(err).toBeDefined();
  });
});

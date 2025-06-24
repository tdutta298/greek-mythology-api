const Myth = require('../../models/Myth');
const { connect, cleanup, disconnect } = require('../setup');

beforeAll(connect);
afterEach(cleanup);
afterAll(disconnect);

describe('Myth Model', () => {
  it('should save a valid myth', async () => {
    const myth = new Myth({
      title: 'Pandora’s Box',
      summary: 'First woman created by gods, opens a forbidden box',
      charactersInvolved: ['Pandora', 'Zeus'],
      locations: ['Earth', 'Olympus'],
      moral: 'Curiosity can be dangerous',
      source: 'Greek Mythology'
    });

    const saved = await myth.save();
    expect(saved._id).toBeDefined();
    expect(saved.title).toBe('Pandora’s Box');
  });

  it('should not save myth without title', async () => {
    const myth = new Myth({});
    let err;
    try {
      await myth.save();
    } catch (e) {
      err = e;
    }
    expect(err).toBeDefined();
  });
});

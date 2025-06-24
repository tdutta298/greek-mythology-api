const Creature = require('../../models/Creature');
jest.mock('../../models/Creature');

describe('Creature Model - Mocked', () => {
  it('should call save() and return mocked creature', async () => {
    const mockSave = jest.fn().mockResolvedValue({
      _id: '3',
      name: 'Minotaur',
      origin: 'Crete'
    });

    Creature.mockImplementation(() => ({ save: mockSave }));

    const creature = new Creature({ name: 'Minotaur' });
    const saved = await creature.save();

    expect(mockSave).toHaveBeenCalled();
    expect(saved.name).toBe('Minotaur');
  });
});

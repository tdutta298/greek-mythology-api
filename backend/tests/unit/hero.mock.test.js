const Hero = require('../../models/Hero');
jest.mock('../../models/Hero');

describe('Hero Model - Mocked', () => {
  it('should call save() and return mocked hero', async () => {
    const mockSave = jest.fn().mockResolvedValue({
      _id: '1',
      name: 'Achilles',
      heroicDeeds: ['Slayed Hector']
    });

    Hero.mockImplementation(() => ({ save: mockSave }));

    const hero = new Hero({ name: 'Achilles' });
    const saved = await hero.save();

    expect(mockSave).toHaveBeenCalled();
    expect(saved.name).toBe('Achilles');
  });
});

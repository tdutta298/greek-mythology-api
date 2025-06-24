const Myth = require('../../models/Myth');
jest.mock('../../models/Myth');

describe('Myth Model - Mocked', () => {
  it('should call save() and return mocked myth', async () => {
    const mockSave = jest.fn().mockResolvedValue({
      _id: '4',
      title: 'Pandora’s Box'
    });

    Myth.mockImplementation(() => ({ save: mockSave }));

    const myth = new Myth({ title: 'Pandora’s Box' });
    const saved = await myth.save();

    expect(mockSave).toHaveBeenCalled();
    expect(saved.title).toBe('Pandora’s Box');
  });
});

const God = require('../../models/God');
jest.mock('../../models/God');

describe('God Model - Mocked', () => {
  it('should call save() and return mocked god', async () => {
    const mockSave = jest.fn().mockResolvedValue({
      _id: '2',
      name: 'Zeus',
      domain: ['Sky']
    });

    God.mockImplementation(() => ({ save: mockSave }));

    const god = new God({ name: 'Zeus' });
    const saved = await god.save();

    expect(mockSave).toHaveBeenCalled();
    expect(saved.name).toBe('Zeus');
  });
});

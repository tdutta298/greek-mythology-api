const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../../app');
const Myth = require('../../models/Myth');

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  await Myth.deleteMany();
});

describe('Myth API', () => {
  it('POST /api/myths - should create myth', async () => {
    const res = await request(app).post('/api/myths').send({
      title: 'Persephone’s Abduction',
      summary: 'Explains seasons',
      charactersInvolved: ['Hades', 'Persephone']
    });
    expect(res.status).toBe(201);
    expect(res.body.title).toContain('Persephone');
  });

  it('GET /api/myths - should return all myths', async () => {
    await Myth.create({ title: 'Narcissus' });
    const res = await request(app).get('/api/myths');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});

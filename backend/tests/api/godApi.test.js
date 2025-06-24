const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../../app');
const God = require('../../models/God');

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
  await God.deleteMany();
});

describe('God API', () => {
  it('POST /api/gods - should create god', async () => {
    const res = await request(app).post('/api/gods').send({
      name: 'Apollo',
      domain: ['Sun'],
      symbols: ['Lyre'],
      parents: ['Zeus', 'Leto']
    });
    expect(res.status).toBe(201);
    expect(res.body.name).toBe('Apollo');
  });

  it('GET /api/gods - should return all gods', async () => {
    await God.create({ name: 'Athena' });
    const res = await request(app).get('/api/gods');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});

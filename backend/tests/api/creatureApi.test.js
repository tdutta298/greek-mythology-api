const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../../app');
const Creature = require('../../models/Creature');

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
  await Creature.deleteMany();
});

describe('Creature API', () => {
  it('POST /api/creatures - should create creature', async () => {
    const res = await request(app).post('/api/creatures').send({
      name: 'Griffin',
      type: 'Hybrid',
      abilities: ['Flying']
    });
    expect(res.status).toBe(201);
    expect(res.body.name).toBe('Griffin');
  });

  it('GET /api/creatures - should return all creatures', async () => {
    await Creature.create({ name: 'Dragon' });
    const res = await request(app).get('/api/creatures');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});

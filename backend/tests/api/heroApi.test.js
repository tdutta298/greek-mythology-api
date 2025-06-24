const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../../app');
const Hero = require('../../models/Hero');

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
  await Hero.deleteMany();
});

describe('Hero API', () => {
  it('POST /api/heroes - should create hero', async () => {
    const res = await request(app).post('/api/heroes').send({
      name: 'Theseus',
      parentage: ['Aegeus'],
      heroicDeeds: ['Killed Minotaur']
    });
    expect(res.status).toBe(201);
    expect(res.body.name).toBe('Theseus');
  });

  it('GET /api/heroes - should return all heroes', async () => {
    await Hero.create({ name: 'Hercules' });
    const res = await request(app).get('/api/heroes');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});

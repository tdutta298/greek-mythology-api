const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const Hero = require('../../models/Hero');

let app, mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  process.env.MONGO_URI = mongoServer.getUri();
  app = require('../../app');
  await mongoose.connect(process.env.MONGO_URI);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  await Hero.deleteMany();
});

describe('Hero Integration Tests', () => {
  it('should create a hero', async () => {
    const res = await request(app)
      .post('/api/heroes')
      .send({
        name: 'Achilles',
        parentage: ['Peleus', 'Thetis'],
        heroicDeeds: ['Killed Hector']
      });
    expect(res.status).toBe(201);
    expect(res.body.name).toBe('Achilles');
  });

  it('should fetch all heroes', async () => {
    await Hero.create({ name: 'Odysseus' });
    const res = await request(app).get('/api/heroes');
    expect(res.status).toBe(200);
    expect(res.body[0].name).toBe('Odysseus');
  });

  it('should update a hero', async () => {
    const hero = await Hero.create({ name: 'Perseus' });
    const res = await request(app).put(`/api/heroes/${hero._id}`).send({ fate: 'Honored' });
    expect(res.status).toBe(200);
    expect(res.body.fate).toBe('Honored');
  });

  it('should delete a hero', async () => {
    const hero = await Hero.create({ name: 'Theseus' });
    const res = await request(app).delete(`/api/heroes/${hero._id}`);
    expect(res.status).toBe(200);
    const check = await Hero.findById(hero._id);
    expect(check).toBeNull();
  });
});

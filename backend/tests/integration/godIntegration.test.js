const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const God = require('../../models/God');

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
  await God.deleteMany();
});

describe('God Integration Tests', () => {
  it('should create a god', async () => {
    const res = await request(app)
      .post('/api/gods')
      .send({
        name: 'Zeus',
        domain: ['Sky'],
        symbols: ['Thunderbolt'],
        parents: ['Cronus', 'Rhea']
      });

    expect(res.status).toBe(201);
    expect(res.body.name).toBe('Zeus');
  });

  it('should fetch all gods', async () => {
    await God.create({ name: 'Hera' });
    const res = await request(app).get('/api/gods');
    expect(res.status).toBe(200);
    expect(res.body[0].name).toBe('Hera');
  });

  it('should update a god', async () => {
    const god = await God.create({ name: 'Poseidon' });
    const res = await request(app).put(`/api/gods/${god._id}`).send({ domain: ['Sea'] });
    expect(res.status).toBe(200);
    expect(res.body.domain).toContain('Sea');
  });

  it('should delete a god', async () => {
    const god = await God.create({ name: 'Hades' });
    const res = await request(app).delete(`/api/gods/${god._id}`);
    expect(res.status).toBe(200);
    const check = await God.findById(god._id);
    expect(check).toBeNull();
  });
});

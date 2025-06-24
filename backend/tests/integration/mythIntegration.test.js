const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const Myth = require('../../models/Myth');

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
  await Myth.deleteMany();
});

describe('Myth Integration Tests', () => {
  it('should create a myth', async () => {
    const res = await request(app)
      .post('/api/myths')
      .send({
        title: 'Pandora’s Box',
        summary: 'Opening of the box',
        charactersInvolved: ['Pandora']
      });

    expect(res.status).toBe(201);
    expect(res.body.title).toBe('Pandora’s Box');
  });

  it('should fetch all myths', async () => {
    await Myth.create({ title: 'Trojan War' });
    const res = await request(app).get('/api/myths');
    expect(res.status).toBe(200);
    expect(res.body[0].title).toBe('Trojan War');
  });

  it('should update a myth', async () => {
    const myth = await Myth.create({ title: 'Orpheus and Eurydice' });
    const res = await request(app).put(`/api/myths/${myth._id}`).send({ moral: 'Trust matters' });
    expect(res.status).toBe(200);
    expect(res.body.moral).toBe('Trust matters');
  });

  it('should delete a myth', async () => {
    const myth = await Myth.create({ title: 'Sisyphus' });
    const res = await request(app).delete(`/api/myths/${myth._id}`);
    expect(res.status).toBe(200);
    const check = await Myth.findById(myth._id);
    expect(check).toBeNull();
  });
});

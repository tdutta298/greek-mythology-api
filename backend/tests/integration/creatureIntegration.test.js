const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const Creature = require('../../models/Creature');

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
  await Creature.deleteMany();
});

describe('Creature Integration Tests', () => {
  it('should create a creature', async () => {
    const res = await request(app)
      .post('/api/creatures')
      .send({
        name: 'Hydra',
        type: 'Beast',
        abilities: ['Regeneration']
      });

    expect(res.status).toBe(201);
    expect(res.body.name).toBe('Hydra');
  });

  it('should fetch all creatures', async () => {
    await Creature.create({ name: 'Cerberus' });
    const res = await request(app).get('/api/creatures');
    expect(res.status).toBe(200);
    expect(res.body[0].name).toBe('Cerberus');
  });

  it('should update a creature', async () => {
    const creature = await Creature.create({ name: 'Chimera' });
    const res = await request(app).put(`/api/creatures/${creature._id}`).send({ type: 'Monster' });
    expect(res.status).toBe(200);
    expect(res.body.type).toBe('Monster');
  });

  it('should delete a creature', async () => {
    const creature = await Creature.create({ name: 'Sphinx' });
    const res = await request(app).delete(`/api/creatures/${creature._id}`);
    expect(res.status).toBe(200);
    const check = await Creature.findById(creature._id);
    expect(check).toBeNull();
  });
});

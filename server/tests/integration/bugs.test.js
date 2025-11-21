const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../../app');

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

beforeEach(async () => {
  await mongoose.connection.db.dropDatabase();
});

describe('Bug API', () => {
  it('GET /api/bugs returns empty array initially', async () => {
    const res = await request(app).get('/api/bugs');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([]);
  });

  it('POST /api/bugs creates a new bug', async () => {
    const res = await request(app)
      .post('/api/bugs')
      .send({ title: 'Crash on load', description: 'App crashes on startup' });
    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe('Crash on load');
  });

  it('PATCH /api/bugs/:id updates status', async () => {
    const createRes = await request(app)
      .post('/api/bugs')
      .send({ title: 'Test', description: 'Test desc' });
    const bugId = createRes.body._id;

    const updateRes = await request(app)
      .patch(`/api/bugs/${bugId}`)
      .send({ status: 'resolved' });
    expect(updateRes.statusCode).toBe(200);
    expect(updateRes.body.status).toBe('resolved');
  });

  it('DELETE /api/bugs/:id deletes bug', async () => {
    const createRes = await request(app)
      .post('/api/bugs')
      .send({ title: 'To delete', description: 'Delete me' });
    const bugId = createRes.body._id;

    await request(app).delete(`/api/bugs/${bugId}`);
    const getRes = await request(app).get('/api/bugs');
    expect(getRes.body.length).toBe(0);
  });
});
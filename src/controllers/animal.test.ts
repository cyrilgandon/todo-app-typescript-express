import request from 'supertest';
import app from '../app';

describe('GET /animals', () => {
  it('should return 200 OK', () => {
    return request(app)
      .get('/api/animals')
      .expect('Content-Type', /json/)
      .expect(200);
  });
});

describe('GET /animals/:rfidKey', () => {
  it('should return 404', () => {
    return request(app)
      .get('/api/animals/123')
      .expect(404);
  });

  // TODO: add a test with a mock on animalService
});

describe('POST /animals', () => {
  it('should return 200 with complete data', () => {
    return request(app)
      .post('/api/animals')
      .send({
        species: 'cat',
        height: 50,
        weight: 100,
        description: 'a pretty cat',
      })
      .expect(200);
  });

  it('should return 400 with incomplete data', () => {
    return request(app)
      .post('/api/animals')
      .send({
        height: 50,
        weight: 100,
        description: 'a pretty cat',
      })
      .expect(400);
  });
});

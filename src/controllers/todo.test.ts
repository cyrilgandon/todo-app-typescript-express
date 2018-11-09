import request from 'supertest';
import app from '../app';

describe('GET /todos', () => {
  it('should return 200 OK', () => {
    return request(app)
      .get('/api/todos')
      .expect('Content-Type', /json/)
      .expect(200);
  });
});

describe('GET /todos/:id', () => {
  it('should return 404', () => {
    return request(app)
      .get('/api/todos/123')
      .expect(404);
  });
  it('should return 412', () => {
    return request(app)
      .get('/api/todos/abc')
      .expect(412);
  });
});

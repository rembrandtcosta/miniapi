import request from 'supertest';
import app from '../index';

describe('GET /api/posts', () => {
  test('responds with 200 OK', async () => {
    const response = await request(app).get('/api/posts');
    expect(response.status).toBe(200);
  });
});

describe('GET /api/posts?_page=1', () => {
  test('should respond with just the first page', async () => {
    const response = await request(app).get('/api/posts?_page=1');
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(10);
  });
});

describe('GET /api/posts?_page=2&_limit=12', () => {
  test('should respond with the second page and 12 items', async () => {
    const response = await request(app).get('/api/posts?_page=2&_limit=12');
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(12);
  });
});
  
describe('GET /api/posts?_page=1&_limit=8', () => {
  test('should respond with the first page and 8 items', async () => {
    const response = await request(app).get('/api/posts?_page=1&_limit=8');
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(8);
  });
});

describe('GET /api/posts?_start=0&_end=20', () => {
  test('should respond with the first 20 items', async () => {
    const response = await request(app).get('/api/posts?_start=0&_end=20');
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(20);
  });
});

describe('GET /api/post/{id}', () => {
  test('should respond with 404 if resource is not found', async () => {
    const response = await request(app).get('/api/post/01');
    expect(response.status).toBe(404);
  });
});

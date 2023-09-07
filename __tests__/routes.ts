// Example unit test using Jest and Supertest
import request from 'supertest';
import app from '../index'; // Import your Express app

describe('GET /api/resource', () => {
  it('responds with 200 OK', async () => {
    const response = await request(app).get('/api/posts');
    expect(response.status).toBe(200);
  });
});

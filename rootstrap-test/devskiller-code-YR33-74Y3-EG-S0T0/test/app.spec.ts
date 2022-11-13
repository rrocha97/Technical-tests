import request from 'supertest';
import app from '../src/app';
import { COINMARKET_TOTAL_CURRENCIES } from '../src/config';

describe('Testing APP endpoints', () => {

  describe('testing basic server response', () => {
    it('returns http code 200', async () => {

      const response = await request(app)
        .get(`/ping`)
      expect(response.status).toBe(200);
    });
  });

  describe('testing currencies list response', () => {
    it('returns http code 200', async () => {

      const response = await request(app)
        .get(`/criptos`);
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty(['total']);
      expect(response.body).toHaveProperty(['currencies']);
      expect(response.body.total).toBe(Number(COINMARKET_TOTAL_CURRENCIES));
    });
  });

});
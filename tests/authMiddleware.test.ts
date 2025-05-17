// tests/middlewares/authMiddleware.test.ts
import request from 'supertest';
import express from 'express';
import jwt from 'jsonwebtoken';
import { verifyToken, verifyAccountOwner } from '../src/middleware/authMiddleware';

const app = express();
app.use(express.json());

const JWT_SECRET = 'testsecret';

// Mock route to test verifyToken
app.get('/protected', verifyToken, (req, res) => {
  res.status(200).json({ message: 'Acesso autorizado', userId: req.userId });
});

// Mock route to test verifyAccountOwner
app.get('/account/:accountId', verifyToken, verifyAccountOwner('accountId'), (req, res) => {
  res.status(200).json({ message: 'Acesso à conta autorizado' });
});

// Test verifyToken middleware
describe('verifyToken Middleware', () => {
  it('should return 401 if token is not provided', async () => {
    const res = await request(app).get('/protected');
    expect(res.status).toBe(401);
    expect(res.body.message).toBe('Acesso negado. Token não fornecido.');
  });

  it('should return 403 if token is invalid', async () => {
    const res = await request(app).get('/protected').set('Authorization', 'Bearer invalidtoken');
    expect(res.status).toBe(403);
    expect(res.body.message).toBe('Token inválido ou expirado.');
  });

  it('should allow access with valid token', async () => {
    const token = jwt.sign({ userId: 1 }, JWT_SECRET);
    const res = await request(app).get('/protected').set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.userId).toBe(1);
  });
});

// Test verifyAccountOwner middleware
describe('verifyAccountOwner Middleware', () => {
  it('should return 403 if user is not the account owner', async () => {
    const token = jwt.sign({ userId: 1 }, JWT_SECRET);
    const res = await request(app).get('/account/2').set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(403);
    expect(res.body.message).toBe('Acesso negado. Você não é o proprietário desta conta.');
  });

  it('should allow access if user is the account owner', async () => {
    const token = jwt.sign({ userId: 1 }, JWT_SECRET);
    const res = await request(app).get('/account/1').set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Acesso à conta autorizado');
  });
});

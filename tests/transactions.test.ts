// tests/routes/transactions.test.ts
import request from 'supertest';
import express from 'express';
import { AppDataSource } from '../src/config/data-source';
import transactionRoutes from '../src/routes/transactions';
import authRoutes from '../src/routes/auth';

const app = express();
app.use(express.json());
app.use('/transactions', transactionRoutes);
app.use('/auth', authRoutes);

let authToken = '';

beforeAll(async () => {
  await AppDataSource.initialize();

  // Cria um usuário para autenticação
  await request(app).post('/auth/register').send({
    name: 'Transaction User',
    email: 'transaction@example.com',
    password: '123456',
    cpf: '12345678901',
    birthDate: '2000-01-01'
  });

  // Faz login para obter o token
  const res = await request(app).post('/auth/login').send({
    email: 'transaction@example.com',
    password: '123456'
  });
  authToken = res.body.token;

  // Realiza um depósito inicial
  await request(app).post('/account/deposit').set('Authorization', `Bearer ${authToken}`).send({ amount: 200 });
});

afterAll(async () => {
  await AppDataSource.destroy();
});

// Testes para listagem de transações e filtro por período
describe('Transaction Routes', () => {
  it('should list all transactions for an account', async () => {
    const res = await request(app)
      .get('/transactions')
      .set('Authorization', `Bearer ${authToken}`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should filter transactions by date range', async () => {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 7);

    const res = await request(app)
      .get('/transactions?startDate=' + startDate.toISOString() + '&endDate=' + new Date().toISOString())
      .set('Authorization', `Bearer ${authToken}`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});

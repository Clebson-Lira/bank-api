// tests/routes/account.test.ts
import request from 'supertest';
import express from 'express';
import { AppDataSource } from '../src/config/data-source';
import accountRoutes from '../src/routes/account';
import authRoutes from '../src/routes/auth';

const app = express();
app.use(express.json());
app.use('/account', accountRoutes);
app.use('/auth', authRoutes);

let authToken = '';

beforeAll(async () => {
  await AppDataSource.initialize();

  // Cria um usuário para autenticação
  await request(app).post('/auth/register').send({
    fullName: 'Test User',
    email: 'testaccount@example.com',
    password: '123456',
    cpf: '12345678901',
    birthDate: '2000-01-01'
  });

  // Faz login para obter o token
  const res = await request(app).post('/auth/login').send({
    email: 'testaccount@example.com',
    password: '123456'
  });
  authToken = res.body.token;
});

afterAll(async () => {
  await AppDataSource.destroy();
});

// Testes para depósito e saque
describe('Account Routes', () => {
  it('should deposit money into account', async () => {
    const res = await request(app)
      .post('/account/deposit')
      .set('Authorization', `Bearer ${authToken}`)
      .send({ amount: 100 });

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Depósito realizado com sucesso.');
    expect(res.body.balance).toBe(100);
  });

  it('should withdraw money from account', async () => {
    const res = await request(app)
      .post('/account/withdraw')
      .set('Authorization', `Bearer ${authToken}`)
      .send({ amount: 50 });

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Saque realizado com sucesso.');
    expect(res.body.balance).toBe(50);
  });

  it('should not withdraw more than balance', async () => {
    const res = await request(app)
      .post('/account/withdraw')
      .set('Authorization', `Bearer ${authToken}`)
      .send({ amount: 100 });

    expect(res.status).toBe(400);
    expect(res.body.message).toBe('Saldo insuficiente.');
  });

  it('should transfer money to another account', async () => {
    // Cria outro usuário para a transferência
    await request(app).post('/auth/register').send({
      name: 'Target User',
      email: 'target@example.com',
      password: '123456',
      cpf: '98765432100',
      birthDate: '1990-01-01'
    });

    const res = await request(app)
      .post('/account/transfer')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        targetAccountNumber: 2,
        targetAgency: '1234',
        amount: 25
      });

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Transferência realizada com sucesso.');
    expect(res.body.balance).toBe(25);
  });
});

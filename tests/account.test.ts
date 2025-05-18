import dotenv from 'dotenv';
import request from 'supertest';
import express from 'express';
import { AppDataSource } from '../src/config/data-source';
import accountRoutes from '../src/routes/account';
import authRoutes from '../src/routes/auth';

const app = express();
app.use(express.json());
app.use('/account', accountRoutes);
app.use('/auth', authRoutes);
dotenv.config();

let authToken = '';
let uniqueEmail = '';
beforeAll(async () => {
  await AppDataSource.initialize();

  uniqueEmail = `test${Date.now()}@example.com`;
  await request(app).post('/auth/register').send({
    fullName: 'Test User',
    email: uniqueEmail,
    password: '123456',
    cpf: '12345678901',
    birthDate: '2000-01-01'
  });

  const res = await request(app).post('/auth/login').send({
    email: uniqueEmail,
    password: '123456'
  });
  authToken = res.body.token;
});

afterAll(async () => {
  await AppDataSource.destroy();
});

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
    
    const targetEmail = `target${Date.now()}@example.com`;
    await request(app).post('/auth/register').send({
      fullName: 'Target User',
      email: targetEmail,
      password: '123456',
      cpf: '98765432100',
      birthDate: '1990-01-01'
    });
  
    
    const targetLogin = await request(app).post('/auth/login').send({
      email: targetEmail,
      password: '123456'
    });
  
    
    const targetAccountRes = await request(app)
      .get('/account/me')
      .set('Authorization', `Bearer ${targetLogin.body.token}`);
  
    const { accountNumber, agency } = targetAccountRes.body;
  
    const res = await request(app)
      .post('/account/transfer')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        targetAccountNumber: String(accountNumber),
        targetAgency: String(agency),
        amount: 25
      });
    console.log('Transfer response:', res.body);
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Transferência realizada com sucesso.');
    expect(res.body.balance).toBe(25);
  });
  
});

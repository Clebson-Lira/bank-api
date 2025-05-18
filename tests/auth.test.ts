import dotenv from 'dotenv';
import request from 'supertest';
import express from 'express';
import { AppDataSource } from '../src/config/data-source';
import authRoutes from '../src/routes/auth';

const app = express();
app.use(express.json());
app.use('/auth', authRoutes);
dotenv.config();

beforeAll(async () => {
  await AppDataSource.initialize();
});

afterAll(async () => {
  await AppDataSource.destroy();
});
let uniqueEmail = '';

describe('Auth Routes', () => {
  it('should register a new user', async () => {
  uniqueEmail = `test${Date.now()}@example.com`;
  const res = await request(app).post('/auth/register').send({
    fullName: 'Test User',
    email: uniqueEmail,
    password: '123456',
    cpf: '12345678900',
    birthDate: '2000-01-01'
  });
  expect(res.status).toBe(201);
  expect(res.body.message).toBe('Usuário cadastrado com sucesso.');
});

 it('should login with valid credentials', async () => {
  const res = await request(app).post('/auth/login').send({
    email: uniqueEmail,
    password: '123456'
  });
  expect(res.status).toBe(200);
  expect(res.body).toHaveProperty('token');
});

  it('should not login with invalid credentials', async () => {
    const res = await request(app).post('/auth/login').send({
      email: uniqueEmail,
      password: 'wrongpassword'
    });
    expect(res.status).toBe(401);
    expect(res.body.message).toBe('Credenciais inválidas.');
  });

  it('should handle missing fields during registration', async () => {
    const res = await request(app).post('/auth/register').send({
      email: 'incomplete@example.com'
    });
    expect(res.status).toBe(400);
    expect(res.body.message).toBe('Dados incompletos.');
  });
});

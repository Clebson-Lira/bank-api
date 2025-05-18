import dotenv from 'dotenv';
import request from 'supertest';
import express from 'express';
import { AppDataSource } from '../src/config/data-source';
import profileRoutes from '../src/routes/profile';
import authRoutes from '../src/routes/auth';

const app = express();
app.use(express.json());
app.use('/profile', profileRoutes);
app.use('/auth', authRoutes);
dotenv.config();

let authToken = '';
let uniqueEmail = '';

beforeAll(async () => {
  await AppDataSource.initialize();
  uniqueEmail = `test${Date.now()}@example.com`;
  
  await request(app).post('/auth/register').send({
    fullName: 'Profile User',
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

describe('Profile Routes', () => {
  it('should update user password', async () => {
    const res = await request(app)
      .put('/profile/update-password')
      .set('Authorization', `Bearer ${authToken}`)
      .send({ currentPassword: '123456', newPassword: '654321' });

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Senha atualizada com sucesso.');
  });

  it('should handle incorrect old password', async () => {
    const res = await request(app)
      .put('/profile/update-password')
      .set('Authorization', `Bearer ${authToken}`)
      .send({ currentPassword: 'wrongpassword', newPassword: '123123' });

    expect(res.status).toBe(500);
    expect(res.body.message).toBe('Senha atual incorreta.');
  });

  it('should upload profile image', async () => {
    const res = await request(app)
      .post('/profile/upload-picture')
      .set('Authorization', `Bearer ${authToken}`)
      .attach('profilePicture', Buffer.from('test image content'), 'test-image.png');

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Imagem enviada com sucesso.');
  });
});

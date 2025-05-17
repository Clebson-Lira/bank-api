// tests/routes/profile.test.ts
import request from 'supertest';
import express from 'express';
import { AppDataSource } from '../src/config/data-source';
import profileRoutes from '../src/routes/profile';
import authRoutes from '../src/routes/auth';

const app = express();
app.use(express.json());
app.use('/profile', profileRoutes);
app.use('/auth', authRoutes);

let authToken = '';

beforeAll(async () => {
  await AppDataSource.initialize();

  // Cria um usuário para autenticação
  await request(app).post('/auth/register').send({
    name: 'Profile User',
    email: 'profile@example.com',
    password: '123456',
    cpf: '12345678901',
    birthDate: '2000-01-01'
  });

  // Faz login para obter o token
  const res = await request(app).post('/auth/login').send({
    email: 'profile@example.com',
    password: '123456'
  });
  authToken = res.body.token;
});

afterAll(async () => {
  await AppDataSource.destroy();
});

// Testes para atualização de senha e upload de imagem
describe('Profile Routes', () => {
  it('should update user password', async () => {
    const res = await request(app)
      .put('/profile/change-password')
      .set('Authorization', `Bearer ${authToken}`)
      .send({ oldPassword: '123456', newPassword: '654321' });

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Senha atualizada com sucesso.');
  });

  it('should handle incorrect old password', async () => {
    const res = await request(app)
      .put('/profile/change-password')
      .set('Authorization', `Bearer ${authToken}`)
      .send({ oldPassword: 'wrongpassword', newPassword: '123123' });

    expect(res.status).toBe(400);
    expect(res.body.message).toBe('Senha antiga incorreta.');
  });

  it('should upload profile image', async () => {
    const res = await request(app)
      .post('/profile/upload-image')
      .set('Authorization', `Bearer ${authToken}`)
      .attach('file', Buffer.from('test image content'), 'test-image.png');

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Imagem de perfil atualizada com sucesso.');
  });
});

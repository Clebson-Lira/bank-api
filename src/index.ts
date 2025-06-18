import 'dotenv/config';
import dotenv from 'dotenv';
import 'reflect-metadata';
import path from 'path';
import express from 'express';
import cors from 'cors';
import { AppDataSource } from './config/data-source';
import authRoutes from './routes/auth';
import accountRoutes from './routes/account';
import transactionRoutes from './routes/transactions';
import profileRoutes from './routes/profile';
import { swaggerOptions } from './config/swagger';
import swaggerUi from 'swagger-ui-express';

dotenv.config();

const app = express();
app.use(express.json());

app.use(cors({
  origin: 'http://localhost:4200',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Rotas
app.use('/auth', authRoutes);
app.use('/account', accountRoutes);
app.use('/transactions', transactionRoutes);
app.use('/profile', profileRoutes);
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerOptions));

export { app, AppDataSource };
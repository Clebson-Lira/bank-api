import 'dotenv/config';
import dotenv from 'dotenv';
import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import { AppDataSource } from './config/data-source';
import authRoutes from './routes/auth';
import accountRoutes from './routes/account';
import transactionRoutes from './routes/transactions';
import profileRoutes from './routes/profile';

dotenv.config();

const app = express();
app.use(express.json());

app.use(cors({
  origin: 'http://localhost:4200',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

const PORT = process.env.PORT || 3000;

// Rotas
app.use('/auth', authRoutes);
app.use('/account', accountRoutes);
app.use('/transactions', transactionRoutes);
app.use('/profile', profileRoutes);

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source initialized successfully.");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => console.log("Error initializing data source: ", error));
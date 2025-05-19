import { DataSource } from 'typeorm';
import { User } from '../entities/User';
import { Account } from '../entities/Account';
import { Transaction } from '../entities/Transaction';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 3306,
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || 'Abc123456',
  database: process.env.DB_NAME || 'banking_system',
  synchronize: false,
  logging: false,
  entities: [User, Account, Transaction],
  migrations: ['src/migrations/*.ts'],
  subscribers: [],
});
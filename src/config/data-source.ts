import'dotenv/config';
import { DataSource } from 'typeorm';
import path from 'path';
import winston from 'winston';

const logger = winston.createLogger({
  level: 'error',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.Console()
  ],
});

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST ,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: false,
  logging: false,
  entities: [
  path.join(__dirname, '..', 'entities', '*.ts'),
  path.join(__dirname, '..', 'modules', '**', '*.entity.ts')
],
  migrations: ['src/migrations/*.ts'],
  subscribers: [],
});

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    logger.error('Erro ao inicializar o Data Source', { error: err });
  });

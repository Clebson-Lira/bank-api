// src/routes/transactions.ts
import express from 'express';
import { AppDataSource } from '../config/data-source';
import { Transaction } from '../entities/Transaction';
import { verifyToken } from '../middleware/authMiddleware';

// Extende a interface Request para incluir userId
declare global {
  namespace Express {
    interface Request {
      userId?: number;
    }
  }
}

const router = express.Router();

// Get all transactions
router.get('/', verifyToken, async (req, res) => {
  const userId = req.userId;

  try {
    const transactionRepository = AppDataSource.getRepository(Transaction);
    const transactions = await transactionRepository.find({ where: { account: { id: userId } } });
    res.status(200).json(transactions);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Erro ao listar transações.' });
  }
});

// Get transactions by period
router.get('/period', verifyToken, async (req, res) => {
  const userId = req.userId;
  const { startDate, endDate } = req.query;

  try {
    const transactionRepository = AppDataSource.getRepository(Transaction);

    const transactions = await transactionRepository.createQueryBuilder('transaction')
      .where('transaction.accountId = :userId', { userId })
      .andWhere('transaction.createdAt BETWEEN :startDate AND :endDate', { startDate, endDate })
      .getMany();

    res.status(200).json(transactions);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Erro ao filtrar transações por período.' });
  }
});

export default router;

import { Request, Response } from 'express';
import { TransactionService } from '../services/transaction.service';
import { TransactionPeriodDTO } from '../dtos/transaction.dto';

const transactionService = new TransactionService();

export const getAllTransactionsController = async (req: Request, res: Response) => {
  const userId = req.userId;

  try {
    const transactions = await transactionService.getAllTransactions(String(userId));
    res.status(200).json(transactions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao listar transações.' });
  }
};

export const getTransactionsByPeriodController = async (req: Request, res: Response) => {
  const userId = req.userId;
  const { startDate, endDate } = req.query;

  try {
    const periodData: TransactionPeriodDTO = { startDate: String(startDate), endDate: String(endDate) };
    const transactions = await transactionService.getTransactionsByPeriod(String(userId), periodData);
    res.status(200).json(transactions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao filtrar transações por período.' });
  }
};

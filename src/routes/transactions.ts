import express from 'express';
import { verifyToken } from '../middleware/authMiddleware';
import { getAllTransactionsController, getTransactionsByPeriodController } from '../modules/transaction/useCases/transaction.controller';

const router = express.Router();

router.get('/', verifyToken, getAllTransactionsController);
router.get('/period', verifyToken, getTransactionsByPeriodController);

export default router;

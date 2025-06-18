import express from 'express';
import { verifyToken } from '../middleware/authMiddleware';
import { getAllTransactionsController, getTransactionsByPeriodController } from '../modules/transaction/useCases/transaction.controller';

const router = express.Router();

router.get('/', verifyToken, getAllTransactionsController);
router.get('/period', verifyToken, getTransactionsByPeriodController);

/**
 * @swagger
 * tags:
 *   name: Transactions
 *   description: Endpoints relacionados a transações bancárias
 */

/**
 * @swagger
 * /transactions:
 *   get:
 *     summary: Retorna todas as transações do usuário autenticado
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de transações retornada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   amount:
 *                     type: number
 *                   type:
 *                     type: string
 *                     enum: [deposit, withdraw]
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *       401:
 *         description: Não autorizado.
 */


/**
 * @swagger
 * /transactions/period:
 *   post:
 *     summary: Retorna as transações filtradas por período
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               startDate:
 *                 type: string
 *                 format: date
 *               endDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Transações do período retornadas com sucesso.
 *       400:
 *         description: Requisição inválida.
 *       401:
 *         description: Não autorizado.
 */


export default router;

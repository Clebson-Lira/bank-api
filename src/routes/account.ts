import express from 'express';
import { verifyToken } from '../middleware/authMiddleware';
import { depositController, getAccountController, transferController, withdrawController } from '../modules/account/useCases/account.controller';

const router = express.Router();

router.post('/deposit', verifyToken, depositController);
router.post('/withdraw', verifyToken, withdrawController);
router.post('/transfer', verifyToken, transferController);
router.get('/me', verifyToken, getAccountController)

/**
 * @swagger
 * tags:
 *   name: Account
 *   description: Endpoints relacionados à conta bancária
 */

/**
 * @swagger
 * /account/deposit:
 *   post:
 *     summary: Realiza um depósito na conta do usuário autenticado
 *     tags: [Account]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *     responses:
 *       200:
 *         description: Depósito realizado com sucesso.
 *       400:
 *         description: Valor inválido.
 *       401:
 *         description: Não autorizado.
 */

/**
 * @swagger
 * /account/withdraw:
 *   post:
 *     summary: Realiza um saque na conta do usuário autenticado
 *     tags: [Account]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *     responses:
 *       200:
 *         description: Saque realizado com sucesso.
 *       400:
 *         description: Saldo insuficiente ou valor inválido.
 *       401:
 *         description: Não autorizado.
 */

/**
 * @swagger
 * /account/transfer:
 *   post:
 *     summary: Realiza uma transferência da conta do usuário autenticado para outra conta
 *     tags: [Account]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               recipientAccountNumber:
 *                 type: string
 *               amount:
 *                 type: number
 *     responses:
 *       200:
 *         description: Transferência realizada com sucesso.
 *       400:
 *         description: Dados inválidos ou saldo insuficiente.
 *       401:
 *         description: Não autorizado.
 */

/**
 * @swagger
 * /account/me:
 *   get:
 *     summary: Retorna as informações da conta do usuário autenticado
 *     tags: [Account]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Informações da conta retornadas com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 agency:
 *                   type: string
 *                 accountNumber:
 *                   type: string
 *                 balance:
 *                   type: number
 *       401:
 *         description: Não autorizado.
 */

export default router;

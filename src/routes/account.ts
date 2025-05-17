// src/routes/account.ts
import express from 'express';
import { AppDataSource } from '../config/data-source';
import { Account } from '../entities/Account';
import { Transaction } from '../entities/Transaction';
import { verifyToken } from '../middleware/authMiddleware';

const router = express.Router();

// Deposit route
router.post('/deposit', verifyToken, async (req, res) => {
  const { amount } = req.body;
  const userId = req.userId;

  try {
    const accountRepository = AppDataSource.getRepository(Account);
    const transactionRepository = AppDataSource.getRepository(Transaction);

    const account = await accountRepository.findOne({ where: { id: userId } });
    if (!account) return res.status(404).json({ message: 'Conta não encontrada.' });

    account.balance += parseFloat(amount);
    await accountRepository.save(account);

    const transaction = transactionRepository.create({
      account,
      type: 'deposit',
      amount
    });
    await transactionRepository.save(transaction);

    res.status(200).json({ message: 'Depósito realizado com sucesso.', balance: account.balance });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Erro ao realizar depósito.' });
  }
});

// Withdrawal route
router.post('/withdraw', verifyToken, async (req, res) => {
  const { amount } = req.body;
  const userId = req.userId;

  try {
    const accountRepository = AppDataSource.getRepository(Account);
    const transactionRepository = AppDataSource.getRepository(Transaction);

    const account = await accountRepository.findOne({ where: { id: userId } });
    if (!account) return res.status(404).json({ message: 'Conta não encontrada.' });

    if (account.balance < amount) {
      return res.status(400).json({ message: 'Saldo insuficiente.' });
    }

    account.balance -= parseFloat(amount);
    await accountRepository.save(account);

    const transaction = transactionRepository.create({
      account,
      type: 'withdrawal',
      amount
    });
    await transactionRepository.save(transaction);

    res.status(200).json({ message: 'Saque realizado com sucesso.', balance: account.balance });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Erro ao realizar saque.' });
  }
});

// Transfer route
router.post('/transfer', verifyToken, async (req, res) => {
  const { targetAccountNumber, targetAgency, amount } = req.body;
  const userId = req.userId;

  try {
    const accountRepository = AppDataSource.getRepository(Account);
    const transactionRepository = AppDataSource.getRepository(Transaction);

    const senderAccount = await accountRepository.findOne({ where: { id: userId } });
    if (!senderAccount) return res.status(404).json({ message: 'Conta do remetente não encontrada.' });

    if (senderAccount.balance < amount) {
      return res.status(400).json({ message: 'Saldo insuficiente.' });
    }

    const receiverAccount = await accountRepository.findOne({ where: { accountNumber: targetAccountNumber, agency: targetAgency } });
    if (!receiverAccount) return res.status(404).json({ message: 'Conta de destino não encontrada.' });

    senderAccount.balance -= parseFloat(amount);
    receiverAccount.balance += parseFloat(amount);

    await accountRepository.save(senderAccount);
    await accountRepository.save(receiverAccount);

    const transaction = transactionRepository.create({
      account: senderAccount,
      type: 'transfer',
      amount,
      targetAccount: receiverAccount.accountNumber
    });
    await transactionRepository.save(transaction);

    res.status(200).json({ message: 'Transferência realizada com sucesso.', balance: senderAccount.balance });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Erro ao realizar transferência.' });
  }
});

export default router;

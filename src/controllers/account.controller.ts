import { Request, Response } from 'express';
import { DepositDTO, WithdrawDTO, TransferDTO } from '../dtos/account.dto';
import { AccountService } from '../services/accountService.service';

const accountService = new AccountService();

export const depositController = async (req: Request, res: Response) => {
  const { amount } = req.body;
  const userId = req.userId;
  if (typeof userId !== 'number') {
    return res.status(401).json({ message: 'Usuário não autenticado.' });
  }
  const depositData: DepositDTO = { userId, amount };

  try {
    const result = await accountService.deposit(depositData);
    res.status(200).json({ message: 'Depósito realizado com sucesso.', ...result });
  } catch (error) {
    console.error(error);
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido.';
    res.status(400).json({ message: errorMessage });
  }
};

export const withdrawController = async (req: Request, res: Response) => {
  const { amount } = req.body;
  const userId = req.userId;
  if (typeof userId !== 'number') {
    return res.status(401).json({ message: 'Usuário não autenticado.' });
  }
  const withdrawData: WithdrawDTO = { userId, amount };

  try {
    const result = await accountService.withdraw(withdrawData);
    res.status(200).json({ message: 'Saque realizado com sucesso.', ...result });
  } catch (error) {
    console.error(error);
    const errorMessage = error instanceof Error ? error.message : 'Saldo insuficiente.';
    res.status(400).json({ message: errorMessage });
  }
};

export const transferController = async (req: Request, res: Response) => {
  const { targetAccountNumber, targetAgency, amount } = req.body;
  const userId = req.userId;
  if (typeof userId !== 'number') {
    return res.status(401).json({ message: 'Usuário não autenticado.' });
  }
  const transferData: TransferDTO = { userId, targetAccountNumber, targetAgency, amount };

  try {
    const result = await accountService.transfer(transferData);
    res.status(200).json({ message: 'Transferência realizada com sucesso.', ...result });
  } catch (error) {
    console.error(error);
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido.';
    res.status(400).json({ message: errorMessage });
  }
};

export const getAccountController = async (req: Request, res: Response) => {
    const userId = req.userId;
    if (typeof userId !== 'number') {
        return res.status(401).json({ message: 'Usuário não autenticado.' });
    }
    
    try {
        const account = await accountService.getAccount(userId);
        res.status(200).json(account);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao buscar conta.' });
    }
};

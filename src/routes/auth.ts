// src/routes/auth.ts
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AppDataSource } from '../config/data-source';
import { User } from '../entities/User';
import { Account } from '../entities/Account';

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || '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';
const AGENCY_DEFAULT = '1234';

// Register route
router.post('/register', async (req, res) => {
  const { email, password, fullName, cpf, birthDate } = req.body;

   if (!email || !password || !fullName || !cpf || !birthDate) {
    return res.status(400).json({ message: 'Dados incompletos.' });
  }

  try {
    const userRepository = AppDataSource.getRepository(User);
    const accountRepository = AppDataSource.getRepository(Account);

    const existingUser = await userRepository.findOne({ where: { email } });
    if (existingUser) return res.status(400).json({ message: 'Email já cadastrado.' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const accountNumber = Math.floor(Math.random() * 900000 + 100000).toString();

    const account = accountRepository.create({
      agency: AGENCY_DEFAULT,
      accountNumber
    });
    await accountRepository.save(account);

    const user = userRepository.create({
      email,
      password: hashedPassword,
      fullName,
      cpf,
      birthDate,
      account
    });
    await userRepository.save(user);

    res.status(201).json({ message: 'Usuário cadastrado com sucesso.' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Erro ao cadastrar usuário.' });
  }
});

// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({ where: { email }, relations: ['account'] });

    if (!user) return res.status(404).json({ message: 'Usuário não encontrado.' });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).json({ message: 'Credenciais inválidas.' });

    // const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
  expiresIn: "1d"
});

    res.status(200).json({
      message: 'Login realizado com sucesso.',
      token,
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        accountNumber: user.account.accountNumber,
        agency: user.account.agency
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Erro ao realizar login.' });
  }
});

// Password recovery route
router.post('/recover-password', async (req, res) => {
  const { email } = req.body;
  try {
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({ where: { email } });

    if (!user) return res.status(404).json({ message: 'Usuário não encontrado.' });

    // Aqui, podemos implementar o envio de um e-mail ou a geração de um token para redefinição de senha.
    // Por enquanto, vamos apenas enviar uma mensagem padrão.
    res.status(200).json({ message: 'Instruções para recuperação de senha enviadas para o e-mail informado.' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Erro ao recuperar senha.' });
  }
});

export default router;

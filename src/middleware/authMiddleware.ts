// src/middlewares/authMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'defaultsecret';

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Acesso negado. Token não fornecido.' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: number };
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.log(error);
    res.status(403).json({ message: 'Token inválido ou expirado.' });
  }
};

// Middleware para verificar se o usuário é o proprietário da conta
export const verifyAccountOwner = (accountIdParam: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const userId = req.userId;
    const accountId = parseInt(req.params[accountIdParam]);

    if (userId !== accountId) {
      return res.status(403).json({ message: 'Acesso negado. Você não é o proprietário desta conta.' });
    }

    next();
  };
};

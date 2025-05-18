import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || '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';

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  console.log('Authorization Header:', authHeader);

  const token = authHeader && authHeader.split(' ')[1];
  console.log('Token Extraído:', token);

  if (!token) {
    console.log('Token não fornecido.');
    return res.status(401).json({ message: 'Acesso negado. Token não fornecido.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: number };
    console.log('Token Decodificado:', decoded);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.log('Erro ao verificar token:', error);
    res.status(403).json({ message: 'Token inválido ou expirado.' });
  }
};

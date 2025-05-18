import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { RegisterDTO, LoginDTO, RecoverPasswordDTO } from '../dtos/auth.dto';

const authService = new AuthService();

export const registerController = async (req: Request, res: Response) => {
  const { email, password, fullName, cpf, birthDate } = req.body;
  const registerData: RegisterDTO = { email, password, fullName, cpf, birthDate };

  try {
    if (!email || !password || !fullName || !cpf || !birthDate) {
      return res.status(400).json({ message: 'Dados incompletos.' });
    }
    const result = await authService.register(registerData);
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      if (
        error.message === 'Email já cadastrado.' ||
        error.message === 'Dados incompletos.'
      ) {
        return res.status(400).json({ message: error.message });
      }
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};

export const loginController = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const loginData: LoginDTO = { email, password };

  try {
    if (!email || !password) {
      return res.status(400).json({ message: 'Dados incompletos.' });
    }
    const result = await authService.login(loginData);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      if (error.message === 'Credenciais inválidas.' || error.message === 'Usuário não encontrado.') {
        return res.status(401).json({ message: 'Credenciais inválidas.' });
      }
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};

export const recoverPasswordController = async (req: Request, res: Response) => {
  const { email } = req.body;
  const recoverData: RecoverPasswordDTO = { email };

  try {
    const result = await authService.recoverPassword(recoverData);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};

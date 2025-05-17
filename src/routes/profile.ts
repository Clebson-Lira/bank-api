// src/routes/profile.ts
import express from 'express';
import bcrypt from 'bcrypt';
import { AppDataSource } from '../config/data-source';
import { User } from '../entities/User';
import { verifyToken } from '../middleware/authMiddleware';
import multer from 'multer';
import path from 'path';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// Update password
router.put('/update-password', verifyToken, async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const userId = req.userId;

  try {
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({ where: { id: userId } });

    if (!user) return res.status(404).json({ message: 'Usuário não encontrado.' });

    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isPasswordValid) return res.status(400).json({ message: 'Senha atual incorreta.' });

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedNewPassword;
    await userRepository.save(user);

    res.status(200).json({ message: 'Senha atualizada com sucesso.' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Erro ao atualizar senha.' });
  }
});

// Upload profile picture
router.post('/upload-picture', verifyToken, upload.single('profilePicture'), async (req, res) => {
  const userId = req.userId;

  try {
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({ where: { id: userId } });

    if (!user) return res.status(404).json({ message: 'Usuário não encontrado.' });

    if (req.file) {
      user.profilePicture = req.file.path;
      await userRepository.save(user);
      res.status(200).json({ message: 'Imagem enviada com sucesso.', path: req.file.path });
    } else {
      res.status(400).json({ message: 'Nenhuma imagem foi enviada.' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Erro ao enviar imagem.' });
  }
});

export default router;

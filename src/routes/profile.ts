import express from 'express';
import multer from 'multer';
import path from 'path';
import { verifyToken } from '../middleware/authMiddleware';
import { updatePasswordController, uploadPictureController, getProfileController, updateProfileController } from '../modules/profile/useCases/profile.controller';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.put('/update-password', verifyToken, updatePasswordController);
router.post('/upload-picture', verifyToken, upload.single('profilePicture'), uploadPictureController);
router.get('/', verifyToken, getProfileController);
router.put('/update', verifyToken, upload.single('profilePicture'), updateProfileController);
/**
 * @swagger
 * tags:
 *   name: Profile
 *   description: Endpoints relacionados ao perfil do usuário
 */

/**
 * @swagger
 * /profile/update-password:
 *   put:
 *     summary: Atualiza a senha do usuário
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - currentPassword
 *               - newPassword
 *             properties:
 *               currentPassword:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Senha atualizada com sucesso.
 *       400:
 *         description: Senha atual incorreta.
 *       401:
 *         description: Não autorizado.
 */

/**
 * @swagger
 * /profile/upload-picture:
 *   post:
 *     summary: Faz upload da imagem de perfil do usuário
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - profilePicture
 *             properties:
 *               profilePicture:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Imagem enviada com sucesso.
 *       401:
 *         description: Não autorizado.
 */

/**
 * @swagger
 * /profile:
 *   get:
 *     summary: Busca os dados do perfil do usuário
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dados do perfil retornados com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 fullName:
 *                   type: string
 *                 profilePicture:
 *                   type: string
 *       401:
 *         description: Não autorizado.
 */

/**
 * @swagger
 * /profile/update:
 *   put:
 *     summary: Atualiza os dados do perfil do usuário
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *               email:
 *                 type: string
 *               profilePicture:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Perfil atualizado com sucesso.
 *       401:
 *         description: Não autorizado.
 */

export default router;

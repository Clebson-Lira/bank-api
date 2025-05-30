import express from 'express';
import { registerController, loginController, recoverPasswordController } from '../modules/auth/useCases/auth.controller';

const router = express.Router();

router.post('/register', registerController);
router.post('/login', loginController);
router.post('/recover-password', recoverPasswordController);

export default router;

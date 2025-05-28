import express from 'express';
import { verifyToken } from '../middleware/authMiddleware';
import { depositController, getAccountController, transferController, withdrawController } from '../modules/account/useCases/account.controller';

const router = express.Router();

router.post('/deposit', verifyToken, depositController);
router.post('/withdraw', verifyToken, withdrawController);
router.post('/transfer', verifyToken, transferController);
router.get('/me', verifyToken, getAccountController)

export default router;

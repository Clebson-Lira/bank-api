import express from 'express';
import { verifyToken } from '../middleware/authMiddleware';
import { depositController, withdrawController, transferController } from '../controllers/account.controller';

const router = express.Router();

router.post('/deposit', verifyToken, depositController);
router.post('/withdraw', verifyToken, withdrawController);
router.post('/transfer', verifyToken, transferController);

export default router;

import express from 'express';
import multer from 'multer';
import path from 'path';
import { verifyToken } from '../middleware/authMiddleware';
import { getProfileController, updatePasswordController, updateProfileController, uploadPictureController } from '../controllers/profile.controller';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.put('/update-password', verifyToken, updatePasswordController);
router.post('/upload-picture', verifyToken, upload.single('profilePicture'), uploadPictureController);
router.get('/', verifyToken, getProfileController);
router.put('/update', verifyToken, upload.single('profilePicture'), updateProfileController);

export default router;

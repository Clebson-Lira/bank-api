import { Request, Response } from 'express';
import { ProfileService } from '../services/profile.service';
import { UpdatePasswordDTO, UploadPictureDTO } from '../dtos/profile.dto';

const profileService = new ProfileService();

export const updatePasswordController = async (req: Request, res: Response) => {
  const userId = req.userId;
  const { currentPassword, newPassword } = req.body;
  const updateData: UpdatePasswordDTO = { currentPassword, newPassword };

  try {
    const result = await profileService.updatePassword(String(userId), updateData);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    const errorMessage = error instanceof Error ? error.message : 'Internal server error';
    res.status(500).json({ message: errorMessage });
  }
};

export const uploadPictureController = async (req: Request, res: Response) => {
  const userId = req.userId;

  try {
    if (!req.file) throw new Error('Nenhuma imagem foi enviada.');

    const fileName = req.file.filename;
    const filePath = `uploads/${fileName}`.replace(/\\/g, '/');
    const imageUrl = `${req.protocol}://${req.get('host')}/${filePath}`;
    const uploadData: UploadPictureDTO = { filePath };
    const result = await profileService.uploadPicture(String(userId), uploadData);

    res.status(200).json({ ...result, imageUrl });
  } catch (error) {
    console.error(error);
    const errorMessage = error instanceof Error ? error.message : 'Internal server error';
    res.status(500).json({ message: errorMessage });
  }
};

export const getProfileController = async (req: Request, res: Response) => {
  const userId = req.userId;
  try {
    const profile = await profileService.getProfile(String(userId));
    res.status(200).json(profile);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Internal server error';
    res.status(500).json({ message: errorMessage });
  }
};

export const updateProfileController = async (req: Request, res: Response) => {
  const userId = req.userId;
  try {
    const { fullName, email } = req.body;
    let profilePicture;
    if (req.file) {
      profilePicture = req.file.path;
    }
    const result = await profileService.updateProfile(String(userId), { fullName, email, profilePicture });
    res.status(200).json(result);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Internal server error';
    res.status(500).json({ message: errorMessage });
  }
};

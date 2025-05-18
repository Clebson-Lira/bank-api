import bcrypt from 'bcrypt';
import { AppDataSource } from '../config/data-source';
import { User } from '../entities/User';
import { UpdatePasswordDTO, UploadPictureDTO } from '../dtos/profile.dto';

export class ProfileService {
  private userRepository = AppDataSource.getRepository(User);

  async updatePassword(userId: string, data: UpdatePasswordDTO) {
    const { currentPassword, newPassword } = data;

    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) throw new Error('Usuário não encontrado.');

    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isPasswordValid) throw new Error('Senha atual incorreta.');

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedNewPassword;
    await this.userRepository.save(user);

    return { message: 'Senha atualizada com sucesso.' };
  }

  async uploadPicture(userId: string, data: UploadPictureDTO) {
    const { filePath } = data;

    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) throw new Error('Usuário não encontrado.');

    user.profilePicture = filePath;
    await this.userRepository.save(user);

    return { message: 'Imagem enviada com sucesso.', path: filePath };
  }
}

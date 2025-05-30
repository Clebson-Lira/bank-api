import bcrypt from 'bcrypt';
import { UpdatePasswordDTO, UploadPictureDTO } from '../dto/profile.dto';
import { ProfileRepository } from '../repositories/profile.repository';


export class ProfileService {
  private profileRepository = new ProfileRepository();

  async updatePassword(userId: string, data: UpdatePasswordDTO) {
    const { currentPassword, newPassword } = data;

    const user = await this.profileRepository.findById(userId);
    if (!user) throw new Error('Usuário não encontrado.');

    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isPasswordValid) throw new Error('Senha atual incorreta.');

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedNewPassword;

    await this.profileRepository.save(user);

    return { message: 'Senha atualizada com sucesso.' };
  }

  async uploadPicture(userId: string, data: UploadPictureDTO) {
    const { filePath } = data;

    const user = await this.profileRepository.findById(userId);
    if (!user) throw new Error('Usuário não encontrado.');

    user.profilePicture = filePath;
    await this.profileRepository.save(user);

    return { message: 'Imagem enviada com sucesso.', path: filePath };
  }

  async getProfile(userId: string) {
    const user = await this.profileRepository.findById(userId);
    if (!user) throw new Error('Usuário não encontrado.');

    return {
      fullName: user.fullName,
      profilePicture: user.profilePicture
    };
  }

  async updateProfile(userId: string, data: { fullName?: string; email?: string; profilePicture?: string }) {
    const user = await this.profileRepository.findById(userId);
    if (!user) throw new Error('Usuário não encontrado.');

    if (data.fullName) user.fullName = data.fullName;
    if (data.email) user.email = data.email;
    if (data.profilePicture) user.profilePicture = data.profilePicture;

    await this.profileRepository.save(user);

    return { message: 'Perfil atualizado com sucesso.' };
  }
}

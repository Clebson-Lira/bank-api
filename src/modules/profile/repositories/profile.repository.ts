import { AppDataSource } from "../../../config/data-source";
import { User } from "../../../entities/User";

export class ProfileRepository {
  private userRepository = AppDataSource.getRepository(User);

  findById(id: string) {
    return this.userRepository.findOne({ where: { id } });
  }

  async save(user: User) {
    return await this.userRepository.save(user);
  }

  async updateProfile(user: User, data: { fullName?: string; email?: string; profilePicture?: string }) {
    if (data.fullName) user.fullName = data.fullName;
    if (data.email) user.email = data.email;
    if (data.profilePicture) user.profilePicture = data.profilePicture;

    return await this.userRepository.save(user);
  }
}

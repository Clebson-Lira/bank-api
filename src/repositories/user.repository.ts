import { AppDataSource } from '../config/data-source';
import { User } from '../entities/User';
import { Account } from '../entities/Account';

export class UserRepository {
  private userRepository = AppDataSource.getRepository(User);
  private accountRepository = AppDataSource.getRepository(Account);

  findById(id: string) {
    return this.userRepository.findOne({ where: { id } });
  }

  findByEmail(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }

  findByEmailWithAccount(email: string) {
    return this.userRepository.findOne({
      where: { email },
      relations: ['account']
    });
  }

  async createAccount(accountNumber: string, agency: string) {
    const account = this.accountRepository.create({ accountNumber, agency });
    return await this.accountRepository.save(account);
  }

  async createUser(data: Partial<User>) {
    const user = this.userRepository.create(data);
    return await this.userRepository.save(user);
  }

  async save(user: User) {
    return await this.userRepository.save(user);
  }
}

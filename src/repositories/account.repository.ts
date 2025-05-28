import { AppDataSource } from '../config/data-source';
import { Account } from '../entities/Account';
import { Transaction } from '../entities/Transaction';
import { User } from '../entities/User';

export class AccountRepository {
  private userRepository = AppDataSource.getRepository(User);
  private accountRepository = AppDataSource.getRepository(Account);
  private transactionRepository = AppDataSource.getRepository(Transaction);

  async findUserWithAccount(userId: string) {
    return await this.userRepository.findOne({
      where: { id: userId },
      relations: ['account']
    });
  }

  async findAccountByNumberAndAgency(accountNumber: string, agency: string) {
    return await this.accountRepository.findOne({
      where: {
        accountNumber,
        agency
      }
    });
  }

  async saveAccount(account: Account) {
    return await this.accountRepository.save(account);
  }

  async createAndSaveTransaction(data: Partial<Transaction>) {
    const transaction = this.transactionRepository.create(data);
    return await this.transactionRepository.save(transaction);
  }
}

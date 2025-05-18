import { AppDataSource } from '../config/data-source';
import { Transaction } from '../entities/Transaction';
import { TransactionPeriodDTO } from '../dtos/transaction.dto';

export class TransactionService {
  private transactionRepository = AppDataSource.getRepository(Transaction);

  async getAllTransactions(userId: string) {
    return await this.transactionRepository.find({ where: { account: { id: userId } } });
  }

  async getTransactionsByPeriod(userId: string, data: TransactionPeriodDTO) {
    const { startDate, endDate } = data;

    return await this.transactionRepository
      .createQueryBuilder('transaction')
      .where('transaction.accountId = :userId', { userId })
      .andWhere('transaction.createdAt BETWEEN :startDate AND :endDate', { startDate, endDate })
      .getMany();
  }
}

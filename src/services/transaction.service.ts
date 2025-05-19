import { AppDataSource } from '../config/data-source';
import { Transaction } from '../entities/Transaction';
import { TransactionPeriodDTO } from '../dtos/transaction.dto';
import { User } from '../entities/User';


export class TransactionService {
  private transactionRepository = AppDataSource.getRepository(Transaction);

  async getAllTransactions(userId: string) {
    const user = await AppDataSource.getRepository(User).findOne({ where: { id: userId }, relations: ['account'] });
    console.log('User 2:', user?.id, 'Account:', user?.account?.id); // Adicione este log
    if (!user || !user.account) return [];
    return await this.transactionRepository.find({ where: { account: { id: user.account.id } } });
  }

 async getTransactionsByPeriod(userId: string, data: TransactionPeriodDTO) {
   let { startDate, endDate } = data;

  // Ajusta o endDate para o final do dia, se vier só a data
  if (endDate && endDate.length === 10) {
    endDate = endDate + 'T23:59:59.999Z';
  }
  if (startDate && startDate.length === 10) {
    startDate = startDate + 'T00:00:00.000Z';
  }

  console.log('Received Dates:', startDate, endDate);

  const user = await AppDataSource.getRepository(User).findOne({ where: { id: userId }, relations: ['account'] });
  console.log('User:', user?.id, 'Account:', user?.account?.id); // Adicione este log
  if (!user || !user.account) {
    console.log('User or account not found');
    return [];
  }

  try {
  const transactions = await this.transactionRepository
    .createQueryBuilder('transaction')
    .innerJoin('transaction.account', 'account')
    .where('account.id = :accountId', { accountId: user.account.id })
    .andWhere('transaction.createdAt BETWEEN :startDate AND :endDate', { startDate, endDate })
    .getMany();

  return transactions;
} catch (error) {
  console.error('Error fetching transactions by period:', error);
  return [];
}
}

}
import { ProfileRepository } from '../../profile/repositories/profile.repository';
import { TransactionPeriodDTO } from '../dto/transaction.dto';
import { TransactionRepository } from '../repositories/transaction.repository';

export class TransactionService {
  private profileRepository = new ProfileRepository();
  private transactionRepository = new TransactionRepository();

  async getAllTransactions(userId: string) {
    const user = await this.profileRepository.findById(userId);
    if (!user || !user.account) return [];

    return await this.transactionRepository.findByAccountId(user.account.id);
  }

  async getTransactionsByPeriod(userId: string, data: TransactionPeriodDTO) {
    let { startDate, endDate } = data;

    // Ajustar os horários de início/fim do dia se vier só a data
    if (startDate?.length === 10) startDate += 'T00:00:00.000Z';
    if (endDate?.length === 10) endDate += 'T23:59:59.999Z';

    const user = await this.profileRepository.findById(userId);
    if (!user || !user.account) return [];

    try {
      return await this.transactionRepository.findByPeriod(user.account.id, startDate, endDate);
    } catch (error) {
      console.error('Erro ao buscar transações por período:', error);
      return [];
    }
  }
}

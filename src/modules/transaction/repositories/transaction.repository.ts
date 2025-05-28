import { AppDataSource } from "../../../config/data-source";
import { Transaction } from "../../../entities/Transaction";

export class TransactionRepository {
  private repository = AppDataSource.getRepository(Transaction);

  async findByAccountId(accountId: string) {
    return await this.repository.find({
      where: { account: { id: accountId } }
    });
  }

  async findByPeriod(accountId: string, startDate: string, endDate: string) {
    return await this.repository
      .createQueryBuilder('transaction')
      .innerJoin('transaction.account', 'account')
      .where('account.id = :accountId', { accountId })
      .andWhere('transaction.createdAt BETWEEN :startDate AND :endDate', { startDate, endDate })
      .getMany();
  }
}

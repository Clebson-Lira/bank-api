import { AppDataSource } from '../config/data-source';
import { DepositDTO, TransferDTO, WithdrawDTO } from '../dtos/account.dto';
import { Account } from '../entities/Account';
import { Transaction } from '../entities/Transaction';
import { User } from '../entities/User';

export class AccountService {
  private accountRepository = AppDataSource.getRepository(Account);
  private transactionRepository = AppDataSource.getRepository(Transaction);

 async deposit({ userId, amount }: DepositDTO) {
    if (typeof amount !== 'number' || amount <= 0) {
      throw new Error('O valor do depósito deve ser maior que zero.');
    }
    const user = await AppDataSource.getRepository(User).findOne({ where: { id: String(userId) }, relations: ['account'] });
    if (!user || !user.account) throw new Error('Conta não encontrada.');
    const account = user.account;

    account.balance = Number(account.balance) + amount;
    await this.accountRepository.save(account);

    const transaction = this.transactionRepository.create({
      account,
      type: 'deposit',
      amount
    });
    await this.transactionRepository.save(transaction);

    return { balance: Number(account.balance) };
  }

  async withdraw({ userId, amount }: WithdrawDTO) {
    const user = await AppDataSource.getRepository(User).findOne({ where: { id: String(userId) }, relations: ['account'] });
    if (!user || !user.account) throw new Error('Conta não encontrada.');
    if (Number(user.account.balance) < amount) throw new Error('Saldo insuficiente.');

    user.account.balance = Number(user.account.balance) - amount;
    await this.accountRepository.save(user.account);

    const transaction = this.transactionRepository.create({
      account: user.account,
      type: 'withdrawal',
      amount
    });
    await this.transactionRepository.save(transaction);

    return { balance: Number(user.account.balance) };
  }

  async transfer({ userId, targetAccountNumber, targetAgency, amount }: TransferDTO) {
   const senderUser = await AppDataSource.getRepository(User).findOne({ where: { id: String(userId) }, relations: ['account'] });
    if (!senderUser || !senderUser.account) throw new Error('Conta do remetente não encontrada.');
    const senderAccount = senderUser.account;
    if (Number(senderAccount.balance) < amount) throw new Error('Saldo insuficiente.');

    const receiverAccount = await this.accountRepository.findOne({
      where: {
        accountNumber: String(targetAccountNumber),
        agency: String(targetAgency)
      }
    });
    if (!receiverAccount) throw new Error('Conta de destino não encontrada.');

    senderAccount.balance = Number(senderAccount.balance) - amount;
    receiverAccount.balance = Number(receiverAccount.balance) + amount;

    await this.accountRepository.save(senderAccount);
    await this.accountRepository.save(receiverAccount);

    const transaction = this.transactionRepository.create({
      account: senderAccount,
      type: 'transfer',
      amount,
      targetAccount: receiverAccount.accountNumber
    });
    await this.transactionRepository.save(transaction);

    return { balance: Number(senderAccount.balance) };
  }

    async getAccount(userId: string) {
        const user = await AppDataSource.getRepository(User).findOne({ where: { id: String(userId) }, relations: ['account'] });
        if (!user || !user.account) {
            throw new Error('Conta não encontrada.');
        }
        return {
            accountNumber: user.account.accountNumber,
            agency: user.account.agency,
            balance: Number(user.account.balance)
        };
    }
}

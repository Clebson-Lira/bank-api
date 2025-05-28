import { DepositDTO, TransferDTO, WithdrawDTO } from '../dtos/account.dto';
import { AccountRepository } from '../repositories/account.repository';

export class AccountService {
  private readonly repository = new AccountRepository();

  async deposit({ userId, amount }: DepositDTO) {
    if (typeof amount !== 'number' || amount <= 0) {
      throw new Error('O valor do depósito deve ser maior que zero.');
    }

    const user = await this.repository.findUserWithAccount(userId);
    if (!user || !user.account) throw new Error('Conta não encontrada.');

    user.account.balance += amount;
    await this.repository.saveAccount(user.account);

    await this.repository.createAndSaveTransaction({
      account: user.account,
      type: 'deposit',
      amount
    });

    return { balance: user.account.balance };
  }

  async withdraw({ userId, amount }: WithdrawDTO) {
    const user = await this.repository.findUserWithAccount(userId);
    if (!user || !user.account) throw new Error('Conta não encontrada.');
    if (user.account.balance < amount) throw new Error('Saldo insuficiente.');

    user.account.balance -= amount;
    await this.repository.saveAccount(user.account);

    await this.repository.createAndSaveTransaction({
      account: user.account,
      type: 'withdrawal',
      amount
    });

    return { balance: user.account.balance };
  }

  async transfer({ userId, targetAccountNumber, targetAgency, amount }: TransferDTO) {
    const senderUser = await this.repository.findUserWithAccount(userId);
    if (!senderUser || !senderUser.account) throw new Error('Conta do remetente não encontrada.');
    const senderAccount = senderUser.account;

    if (senderAccount.balance < amount) throw new Error('Saldo insuficiente.');

    const receiverAccount = await this.repository.findAccountByNumberAndAgency(targetAccountNumber, targetAgency);
    if (!receiverAccount) throw new Error('Conta de destino não encontrada.');

    senderAccount.balance -= amount;
    receiverAccount.balance += amount;

    await this.repository.saveAccount(senderAccount);
    await this.repository.saveAccount(receiverAccount);

    await this.repository.createAndSaveTransaction({
      account: senderAccount,
      type: 'transfer',
      amount,
      targetAccount: receiverAccount.accountNumber
    });

    return { balance: senderAccount.balance };
  }

  async getAccount(userId: string) {
    const user = await this.repository.findUserWithAccount(userId);
    if (!user || !user.account) throw new Error('Conta não encontrada.');

    return {
      accountNumber: user.account.accountNumber,
      agency: user.account.agency,
      balance: user.account.balance
    };
  }
}

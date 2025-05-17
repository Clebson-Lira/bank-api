import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Account } from './Account';

@Entity('transactions')
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Account)
  @JoinColumn()
  account: Account;

  @Column()
  type: 'deposit' | 'withdrawal' | 'transfer';

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;

  @Column({ nullable: true })
  targetAccount?: string;

  @CreateDateColumn()
  createdAt: Date;
}

import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn, DeleteDateColumn } from 'typeorm';
import { Account } from './Account';

@Entity('transactions')
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => Account)
  @JoinColumn()
  account!: Account;

  @Column()
  type!: 'deposit' | 'withdrawal' | 'transfer';

  @Column('decimal', { precision: 10, scale: 2 })
  amount!: number;

  @Column({ nullable: true })
  targetAccount?: string;

  @CreateDateColumn()
  createdAt!: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}

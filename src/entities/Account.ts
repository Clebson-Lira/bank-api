import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToOne } from 'typeorm';
import { User } from './User';

@Entity('accounts')
export class Account {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  agency!: string;

  @Column({ unique: true })
  accountNumber!: string;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  balance!: number;

  @OneToOne(() => User, (user) => user.account)
  user!: User;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}
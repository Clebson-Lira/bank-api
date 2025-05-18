import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn, DeleteDateColumn } from 'typeorm';
import { Account } from './Account';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column()
  fullName!: string;

  @Column({ unique: true })
  cpf!: string;

  @Column()
  birthDate!: Date;

  @Column({ nullable: true })
  profilePicture?: string;

  @OneToOne(() => Account)
  @JoinColumn()
  account!: Account;

  @CreateDateColumn()
  createdAt!: Date;

  @DeleteDateColumn()
  deletedAt?: Date;  
}
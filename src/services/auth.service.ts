import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AppDataSource } from '../config/data-source';
import { User } from '../entities/User';
import { Account } from '../entities/Account';
import { RegisterDTO, LoginDTO, RecoverPasswordDTO } from '../dtos/auth.dto';

const JWT_SECRET = process.env.JWT_SECRET || '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';
const AGENCY_DEFAULT = '1234';

export class AuthService {
  private userRepository = AppDataSource.getRepository(User);
  private accountRepository = AppDataSource.getRepository(Account);

  async register(data: RegisterDTO) {
    const { email, password, fullName, cpf, birthDate } = data;

    const existingUser = await this.userRepository.findOne({ where: { email } });
    if (existingUser) throw new Error('Email já cadastrado.');

    const hashedPassword = await bcrypt.hash(password, 10);
    const accountNumber = Math.floor(Math.random() * 900000 + 100000).toString();

    const account = this.accountRepository.create({
      agency: AGENCY_DEFAULT,
      accountNumber
    });
    await this.accountRepository.save(account);

    const user = this.userRepository.create({
      email,
      password: hashedPassword,
      fullName,
      cpf,
      birthDate,
      account
    });
    await this.userRepository.save(user);

    return { message: 'Usuário cadastrado com sucesso.' };
  }

  async login(data: LoginDTO) {
    const { email, password } = data;

    const user = await this.userRepository.findOne({ where: { email }, relations: ['account'] });
    if (!user) throw new Error('Usuário não encontrado.');

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new Error('Credenciais inválidas.');

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1d' });

    return {
      message: 'Login realizado com sucesso.',
      token,
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        accountNumber: user.account.accountNumber,
        agency: user.account.agency
      }
    };
  }

  async recoverPassword(data: RecoverPasswordDTO) {
    const { email } = data;

    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) throw new Error('Usuário não encontrado.');

    return { message: 'Instruções para recuperação de senha enviadas para o e-mail informado.' };
  }
}

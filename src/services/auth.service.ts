import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { RegisterDTO, LoginDTO, RecoverPasswordDTO } from '../dtos/auth.dto';
import { UserRepository } from '../repositories/user.repository';

const JWT_SECRET = process.env.JWT_SECRET || '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';
const AGENCY_DEFAULT = '1234';

export class AuthService {
  private readonly userRepository = new UserRepository();

  async register(data: RegisterDTO) {
    const { email, password, fullName, cpf, birthDate } = data;

    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) throw new Error('Email já cadastrado.');

    const hashedPassword = await bcrypt.hash(password, 10);
    const accountNumber = Math.floor(Math.random() * 900000 + 100000).toString();

    const account = await this.userRepository.createAccount(accountNumber, AGENCY_DEFAULT);

    await this.userRepository.createUser({
      email,
      password: hashedPassword,
      fullName,
      cpf,
      birthDate: new Date(birthDate),
      account
    });

    return { message: 'Usuário cadastrado com sucesso.' };
  }

  async login(data: LoginDTO) {
    const { email, password } = data;

    const user = await this.userRepository.findByEmailWithAccount(email);
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

    const user = await this.userRepository.findByEmail(email);
    if (!user) throw new Error('Usuário não encontrado.');

    // Em produção: aqui você enviaria um e-mail com token de redefinição.
    return { message: 'Instruções para recuperação de senha enviadas para o e-mail informado.' };
  }
}

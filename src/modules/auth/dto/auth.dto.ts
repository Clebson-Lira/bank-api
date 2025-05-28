export interface RegisterDTO {
  email: string;
  password: string;
  fullName: string;
  cpf: string;
  birthDate: string;
}

export interface LoginDTO {
  email: string;
  password: string;
}

export interface RecoverPasswordDTO {
  email: string;
}

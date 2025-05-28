# 💰 Bank API

Sistema bancário fictício desenvolvido com Node.js e TypeScript, que simula as principais funcionalidades de uma conta bancária.

## 🚀 Funcionalidades

- Cadastro de usuários
- Autenticação com login e senha
- Criação de conta bancária
- Depósito e saque
- Transferência entre contas
- Consulta de extrato por período
- Atualização de perfil com upload de imagem

## 🛠️ Tecnologias utilizadas

- **Node.js** com **TypeScript**
- **Express** para criação da API
- **TypeORM** para ORM com banco de dados
- **MySQL** como banco de dados relacional
- **Bcrypt** para hash de senhas
- **Multer** para upload de imagens
- **JWT** para autenticação

## 📁 Estrutura de pastas

src/
├── config/
│   └── data-source.ts
├── entities/
│   ├── Account.ts
│   ├── Transaction.ts
│   └── User.ts
├── middleware/
│   └── authMiddleware.ts
├── migrations/
├── modules/
│   ├── account/
│   ├── auth/
│   ├── profile/
│   └── transaction/
├── routes/
│   ├── account.ts
│   ├── auth.ts
│   ├── profile.ts
│   └── transactions.ts
├── types/
│   └── express.d.ts
├── index.ts
└── server.ts

## ⚙️ Como rodar o projeto

```bash
# Clone o repositório
git clone https://github.com/Clebson-Lira/bank-api.git
cd bank-api

# Instale as dependências
npm install

# Configure o banco de dados em ormconfig.ts ou .env

# Rode as migrations (se aplicável)
npm run typeorm migration:run

# Inicie o servidor
npm run dev

✅ Status
🚧 Em desenvolvimento | Aberto a melhorias

👨‍💻 Autor
Clebson Lira
LinkedIn: https://www.linkedin.com/in/clebson-lira-dev/
GitHub

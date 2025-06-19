# 💰 Bank API — Sistema Bancário Fictício

Sistema bancário desenvolvido com **Node.js** e **TypeScript**, seguindo boas práticas de arquitetura modular, autenticação segura com JWT, documentação Swagger. Idealizado para simular as principais operações de uma conta bancária real.

---

## 🚀 Funcionalidades

- ✅ Cadastro de usuários
- 🔐 Autenticação com JWT
- 🏦 Criação de conta bancária
- 💸 Depósito, saque e transferência entre contas
- 📊 Consulta de extrato por período
- 👤 Atualização de perfil com upload de imagem
- 📄 Documentação automática com Swagger
- 🧪 Testes automatizados com cobertura

---

## 🛠️ Tecnologias Utilizadas

- **Node.js + TypeScript**
- **Express** — Framework para APIs
- **TypeORM** — ORM com suporte a entidades e relacionamentos
- **MySQL** — Banco de dados relacional
- **Bcrypt** — Hash de senhas
- **JWT** — Autenticação baseada em token
- **Multer** — Upload de arquivos (imagem de perfil)
- **Swagger (JSDoc)** — Documentação da API
- **Vitest** — Testes unitários e de integração
- **Morgan + Custom Logger** — Logging estruturado

---

## 📁 Estrutura de Pastas

```
src/
├── config/              # TypeORM connection and configs
├── entities/            # Database entities
│   ├── Account.ts
│   ├── Transaction.ts
│   └── User.ts
├── middleware/          # Global middlewares (e.g., authentication)
│   └── authMiddleware.ts
├── migrations/          # TypeORM migrations
├── modules/             # Modules organized by domain
│   ├── account/
│   │   ├── controllers/
│   │   ├── dto/
│   │   ├── repositories/
│   │   ├── useCases/
│   │   └── validators/
│   ├── auth/
│   │   ├── controllers/
│   │   ├── dto/
│   │   ├── repositories/
│   │   ├── useCases/
│   │   └── validators/
│   ├── profile/
│   │   ├── controllers/
│   │   ├── dto/
│   │   ├── repositories/
│   │   ├── useCases/
│   │   └── validators/
│   └── transaction/
│       ├── controllers/
│       ├── dto/
│       ├── repositories/
│       ├── useCases/
│       └── validators/
├── routes/              # REST route definitions
│   ├── account.ts
│   ├── auth.ts
│   ├── profile.ts
│   └── transactions.ts
├── types/               # Additional typings
│   └── express.d.ts
├── index.ts             # Entry point
└── server.ts            # Express server configuration

logs/                    # Application logs
uploads/                 # Uploaded files (e.g., profile images)
tests/                   # Automated tests
.env                     # Environment variables
.env.example             # Example environment variables
package.json
README.md
tsconfig.json
```

---

## ⚙️ Como rodar o projeto

```bash
# Clone o repositório
git clone https://github.com/Clebson-Lira/bank-api.git
cd bank-api

# Instale as dependências
npm install

# Configure o banco de dados no .env
cp .env.example .env

# Rode as migrations
npm run typeorm migration:run

# Inicie o servidor
npm run dev
```

---

## 📘 Documentação da API

> Disponível via Swagger na rota:  
```
http://localhost:3000/api-docs
```

---

## ✅ Status

🚧 Projeto em constante evolução — contribuições e feedbacks são bem-vindos!

---

## 👨‍💻 Autor

**Clebson Lira**  
[![LinkedIn](https://img.shields.io/badge/-LinkedIn-blue?style=flat-square&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/clebson-lira-dev)  
[GitHub](https://github.com/Clebson-Lira)

---

## 💡 Sugestões para próximos passos

- [ ] Adicionar CI/CD com GitHub Actions
- [ ] Dockerização do projeto
- [ ] Testes e2e com `supertest`
- [ ] Integração com Redis para cache (ex: extrato)
- [ ] Criação de ambiente de homologação

---

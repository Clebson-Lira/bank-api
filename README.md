# 💰 Bank API — Sistema Bancário Fictício

Sistema bancário desenvolvido com **Node.js** e **TypeScript**, seguindo boas práticas de arquitetura modular, autenticação segura com JWT, documentação Swagger e validações robustas com Zod. Idealizado para simular as principais operações de uma conta bancária real.

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
- **Zod** — Validação de dados
- **Multer** — Upload de arquivos (imagem de perfil)
- **Swagger (JSDoc)** — Documentação da API
- **Vitest** — Testes unitários e de integração
- **Morgan + Custom Logger** — Logging estruturado

---

## 📁 Estrutura de Pastas

```
src/
├── config/              # Conexão e configs do TypeORM
├── entities/            # Entidades do banco de dados
│   ├── Account.ts
│   ├── Transaction.ts
│   └── User.ts
├── middleware/          # Middlewares globais (ex: autenticação)
│   └── authMiddleware.ts
├── migrations/          # Migrations do TypeORM
├── modules/             # Módulos organizados por domínio
│   ├── account/
│   ├── auth/
│   ├── profile/
│   └── transaction/
├── routes/              # Definição de rotas REST
│   ├── conta.ts
│   ├── auth.ts
│   ├── perfil.ts
│   └── transacoes.ts
├── tipos/               # Tipagens adicionais
│   └── express.d.ts
├── index.ts             # Entry point
└── servidor.ts          # Configuração do servidor Express
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

# API REST - Node.js e TypeScript

API RESTful desenvolvida com Node.js e TypeScript, implementando um sistema de gerenciamento de cidades, pessoas e autenticação de usuários.

## 🚀 Tecnologias Utilizadas

### Core
- **Node.js** (v20.x) - Ambiente de execução JavaScript
- **TypeScript** - Superset JavaScript com tipagem estática
- **Express** - Framework web minimalista e flexível

### Banco de Dados
- **PostgreSQL** - Banco de dados relacional principal
- **Knex.js** - Query builder SQL e gerenciador de migrations
- **SQLite3** - Banco de dados para ambiente de testes

### Autenticação e Segurança
- **JWT (jsonwebtoken)** - Autenticação baseada em tokens
- **bcryptjs** - Criptografia de senhas

### Validação
- **Yup** - Validação de schemas e dados

### Outros
- **dotenv** - Gerenciamento de variáveis de ambiente
- **cors** - Controle de acesso entre origens
- **http-status-codes** - Constantes de códigos HTTP

### Desenvolvimento
- **ts-node-dev** - Execução e reload automático durante desenvolvimento
- **Jest** - Framework de testes
- **Supertest** - Testes de integração HTTP
- **ESLint** - Linter para padronização de código

## 📁 Arquitetura do Projeto

O projeto segue uma arquitetura em camadas organizada da seguinte forma:

```
src/
├── index.ts                    # Ponto de entrada da aplicação
└── server/
    ├── Server.ts              # Configuração do servidor Express
    ├── controllers/           # Controladores das rotas
    │   ├── cidades/          # CRUD de cidades
    │   ├── pessoas/          # CRUD de pessoas
    │   └── usuarios/         # Autenticação de usuários
    ├── database/             # Camada de banco de dados
    │   ├── knex/            # Configuração do Knex
    │   ├── migrations/      # Migrations do banco
    │   ├── seeds/           # Seeds para popular o banco
    │   ├── models/          # Interfaces TypeScript dos modelos
    │   └── providers/       # Providers de acesso aos dados
    ├── routes/              # Definição das rotas da API
    └── shared/              # Recursos compartilhados
        ├── middlewares/     # Middlewares (autenticação, validação)
        └── services/        # Serviços auxiliares
```

### Camadas da Aplicação

1. **Controllers**: Recebem as requisições HTTP, aplicam validações e chamam os providers
2. **Providers**: Encapsulam a lógica de acesso ao banco de dados
3. **Models**: Definem as interfaces TypeScript dos dados
4. **Middlewares**: Validam requisições e autenticação
5. **Routes**: Mapeiam endpoints HTTP para controllers

## 📊 Modelos de Dados

### Cidade
```typescript
interface ICidade {
  id: number;
  nome: string;
}
```

### Pessoa
```typescript
interface IPessoa {
  id: number;
  nomeCompleto: string;
  email: string;
  cidadeId: number;
}
```

### Usuário
```typescript
interface IUsuario {
  id: number;
  nome: string;
  email: string;
  senha: string;
}
```

## 🔧 Instalação

1. Clone o repositório:
```bash
git clone https://github.com/DannerKurtz/api-rest-node-e-typescript.git
cd api-rest-node-e-typescript
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente criando um arquivo `.env` baseado no `.env.example`:
```bash
cp .env.example .env
```

4. Configure as variáveis de ambiente no arquivo `.env`:
```env
PORT=3232
NODE_ENV=development
IS_LOCALHOST=true

JWT_SECRET=seu_secret_aqui

ENABLE_CORS=http://localhost:3000

DATABASE_HOST=localhost
DATABASE_USER=postgres
DATABASE_NAME=api_rest_db
DATABASE_PASSWORD=sua_senha
DATABASE_PORT=5432
```

## 🗄️ Configuração do Banco de Dados

### Executar Migrations
```bash
npm run knex:migrate
```

### Executar Seeds
```bash
npm run knex:seed
```

### Reverter Migration
```bash
npm run knex:rollback
```

### Reverter Todas as Migrations
```bash
npm run knex:rollback-all
```

## 🚀 Executando a Aplicação

### Desenvolvimento
```bash
npm start
```
Inicia o servidor com hot reload na porta 3232 (ou a definida em PORT)

### Produção
```bash
npm run postinstall  # Compila o TypeScript
npm run production   # Executa a versão compilada
```

## 🧪 Testes

Execute os testes automatizados:
```bash
npm test
```

Os testes utilizam Jest e Supertest para validar os endpoints da API.

## 📡 Endpoints da API

### Autenticação

#### Cadastrar Usuário
```
POST /cadastrar
Body: { nome, email, senha }
```

#### Entrar (Login)
```
POST /entrar
Body: { email, senha }
Returns: { accessToken }
```

### Cidades (Requer Autenticação)

```
GET    /cidades          # Listar todas as cidades
GET    /cidades/:id      # Buscar cidade por ID
POST   /cidades          # Criar nova cidade
PUT    /cidades/:id      # Atualizar cidade
DELETE /cidades/:id      # Deletar cidade
```

### Pessoas (Requer Autenticação)

```
GET    /pessoas          # Listar todas as pessoas
GET    /pessoas/:id      # Buscar pessoa por ID
POST   /pessoas          # Criar nova pessoa
PUT    /pessoas/:id      # Atualizar pessoa
DELETE /pessoas/:id      # Deletar pessoa
```

**Nota**: Todas as rotas, exceto `/cadastrar` e `/entrar`, requerem autenticação via token JWT no header:
```
Authorization: Bearer {seu_token_aqui}
```

## 🔐 Segurança

- Senhas são criptografadas usando bcrypt
- Autenticação baseada em JWT (JSON Web Tokens)
- Middleware de autenticação protege rotas sensíveis
- Validação de dados de entrada com Yup

## 🌐 Deploy

O projeto está configurado para deploy em plataformas como Heroku, utilizando o arquivo `Procfile`.

### Variáveis de Ambiente em Produção
Certifique-se de configurar:
- `IS_LOCALHOST=false` para executar migrations e seeds automaticamente
- Todas as variáveis de conexão com o banco PostgreSQL
- `ENABLE_CORS` com os domínios permitidos

## 📝 Scripts Disponíveis

| Script | Descrição |
|--------|-----------|
| `npm start` | Inicia servidor em modo desenvolvimento |
| `npm test` | Executa os testes |
| `npm run production` | Executa versão de produção |
| `npm run postinstall` | Compila TypeScript para JavaScript |
| `npm run knex:migrate` | Executa migrations |
| `npm run knex:rollback` | Reverte última migration |
| `npm run knex:rollback-all` | Reverte todas migrations |
| `npm run knex:seed` | Executa seeds do banco |

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

## 📄 Licença

ISC

## 👨‍💻 Desenvolvido com

- ❤️ e TypeScript
- Node.js + Express
- PostgreSQL
- Knex.js

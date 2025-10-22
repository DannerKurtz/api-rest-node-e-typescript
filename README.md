# API REST com Node.js e TypeScript

API RESTful desenvolvida com Node.js e TypeScript, implementando autenticação JWT e operações CRUD para gerenciamento de cidades, pessoas e usuários.

## 🚀 Tecnologias

- **Node.js** (v20.x) - Runtime JavaScript
- **TypeScript** - Superset JavaScript com tipagem estática
- **Express** - Framework web para Node.js
- **Knex.js** - Query builder SQL
- **PostgreSQL** - Banco de dados relacional (produção)
- **SQLite3** - Banco de dados para testes
- **JWT (jsonwebtoken)** - Autenticação baseada em tokens
- **Bcrypt.js** - Hash de senhas
- **Yup** - Validação de schemas
- **Jest** - Framework de testes
- **Supertest** - Testes de integração HTTP
- **ESLint** - Linter para código JavaScript/TypeScript
- **dotenv** - Gerenciamento de variáveis de ambiente
- **CORS** - Controle de acesso cross-origin

## 📋 Pré-requisitos

- Node.js 20.x
- PostgreSQL (para produção)
- npm ou yarn

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

3. Configure as variáveis de ambiente:

Copie o arquivo `.env.example` para `.env` e configure as variáveis:

```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas configurações:

```env
PORT=3232
NODE_ENV=development
IS_LOCALHOST=true

JWT_SECRET=seu_secret_jwt_aqui

ENABLE_CORS=http://localhost:3000

DATABASE_HOST=localhost
DATABASE_USER=seu_usuario
DATABASE_NAME=nome_do_banco
DATABASE_PASSWORD=sua_senha
DATABASE_PORT=5432
```

4. Execute as migrations do banco de dados:
```bash
npm run knex:migrate
```

5. (Opcional) Execute as seeds para popular o banco:
```bash
npm run knex:seed
```

## 🎮 Como Usar

### Desenvolvimento

Execute o servidor em modo de desenvolvimento com hot reload:

```bash
npm start
```

O servidor estará disponível em `http://localhost:3232` (ou a porta configurada no `.env`)

### Produção

1. Compile o TypeScript:
```bash
npm run postinstall
```

2. Execute o servidor de produção:
```bash
npm run production
```

### Testes

Execute os testes:

```bash
npm test
```

## 📚 API Endpoints

### Autenticação

#### Cadastrar usuário
```
POST /cadastrar
Content-Type: application/json

{
  "nome": "Nome do Usuário",
  "email": "usuario@email.com",
  "senha": "senha123"
}
```

#### Login
```
POST /entrar
Content-Type: application/json

{
  "email": "usuario@email.com",
  "senha": "senha123"
}
```

**Resposta:**
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Cidades

Todas as rotas de cidades requerem autenticação (Bearer Token).

#### Listar todas as cidades
```
GET /cidades
Authorization: Bearer {token}
```

Query parameters:
- `page` - Número da página (padrão: 1)
- `limit` - Itens por página (padrão: 7)
- `filter` - Filtro de busca

#### Buscar cidade por ID
```
GET /cidades/:id
Authorization: Bearer {token}
```

#### Criar cidade
```
POST /cidades
Authorization: Bearer {token}
Content-Type: application/json

{
  "nome": "Nome da Cidade"
}
```

#### Atualizar cidade
```
PUT /cidades/:id
Authorization: Bearer {token}
Content-Type: application/json

{
  "nome": "Novo Nome da Cidade"
}
```

#### Deletar cidade
```
DELETE /cidades/:id
Authorization: Bearer {token}
```

### Pessoas

Todas as rotas de pessoas requerem autenticação (Bearer Token).

#### Listar todas as pessoas
```
GET /pessoas
Authorization: Bearer {token}
```

Query parameters:
- `page` - Número da página (padrão: 1)
- `limit` - Itens por página (padrão: 7)
- `filter` - Filtro de busca

#### Buscar pessoa por ID
```
GET /pessoas/:id
Authorization: Bearer {token}
```

#### Criar pessoa
```
POST /pessoas
Authorization: Bearer {token}
Content-Type: application/json

{
  "nomeCompleto": "Nome Completo",
  "email": "email@exemplo.com",
  "cidadeId": 1
}
```

#### Atualizar pessoa
```
PUT /pessoas/:id
Authorization: Bearer {token}
Content-Type: application/json

{
  "nomeCompleto": "Novo Nome",
  "email": "novoemail@exemplo.com",
  "cidadeId": 1
}
```

#### Deletar pessoa
```
DELETE /pessoas/:id
Authorization: Bearer {token}
```

## 🗃️ Estrutura do Banco de Dados

### Tabelas

- **usuarios** - Armazena usuários do sistema
- **cidades** - Armazena cidades
- **pessoas** - Armazena pessoas vinculadas a cidades

## 🛠️ Scripts Disponíveis

- `npm start` - Inicia o servidor em modo desenvolvimento
- `npm run production` - Inicia o servidor em modo produção
- `npm test` - Executa os testes
- `npm run knex:migrate` - Executa migrations
- `npm run knex:rollback` - Desfaz última migration
- `npm run knex:rollback-all` - Desfaz todas migrations
- `npm run knex:seed` - Executa seeds

## 📁 Estrutura do Projeto

```
.
├── src/
│   ├── index.ts                 # Ponto de entrada da aplicação
│   └── server/
│       ├── Server.ts            # Configuração do servidor Express
│       ├── controllers/         # Controladores da API
│       │   ├── cidades/
│       │   ├── pessoas/
│       │   └── usuarios/
│       ├── database/            # Configuração do banco de dados
│       │   ├── knex/
│       │   ├── migrations/
│       │   ├── models/
│       │   ├── providers/
│       │   └── seeds/
│       ├── routes/              # Definição de rotas
│       └── shared/              # Recursos compartilhados
│           ├── middlewares/
│           └── services/
├── tests/                       # Testes da aplicação
├── .env.example                 # Exemplo de variáveis de ambiente
├── package.json                 # Dependências e scripts
├── tsconfig.json                # Configuração do TypeScript
└── jest.config.ts               # Configuração do Jest
```

## 🔐 Autenticação

A API utiliza JWT (JSON Web Tokens) para autenticação. Após fazer login, inclua o token retornado no header `Authorization` de todas as requisições protegidas:

```
Authorization: Bearer {seu_token_aqui}
```

## 🚢 Deploy

O projeto está configurado para deploy no Heroku através do `Procfile`.

## 📝 Licença

ISC

## 👤 Autor

DannerKurtz

# Encurtador de URL Backend

Trata-se de uma API que oferece o serviço de encurtamento de URLs. Ela possui funcionalidades para redirecionamento, persistência de dados e documentação.

Tecnologias utilizadas:
- Nodejs v22.12.0
- PostgreSQL
- Prisma ORM
- Typescript

## Configuração

Esta seção contém instruções para executar o projeto.

1. Clone o repositório: > git clone https://github.com/natanaelfreire/encurtador-de-url.git
2. > npm install
3. Crie um arquivo .env contendo as variáveis de ambiente baseado no arquivo .env.example
4. > npx prisma migrate dev

## Uso da API

### Autenticação
POST /authentication
Request body:
{
    "email": "exemplo@email.com"
    "password": "senha12345"
}

- Descrição: Rota para autenticação do usuário. O usuário informa o e-mail e a senha no corpo da requisição e recebe um token de retorno caso as credenciais estejam corretas. Este token deverá ser enviado nos headers das requisições no campo authorization para comprovar a identidade do usuário.

### Criar uma URL curta
POST /urls
Request body: 
{
    "originalUrl": "https://exemplo.com"
}

- Descrição: Rota para encurtar uma URL. O usuário informa a URL original e é criado uma URL curta. Caso o usuário esteja autenticado via token, esta URL criada é salva no banco de dados para este usuário.

### Redirecionar para a URL original
GET /{shortUrl}

- Descrição: Redireciona para a URL original com base no código de URL encurtada.

### Listar URLs encurtadas por usuário
GET /urls
(necessário autenticação via token)

- Descrição: Lista todas as URLs criadas de um usuário específico

### Alterar URL original 
PATCH /urls/{id}
(necessário autenticação via token)
Request body: 
{
    "originalUrl": "https://exemplo.com"
}

- Descrição: Altera a URL original de uma URL curta salva.

### Excluir URL curta 
DELETE /urls/{id}
(necessário autenticação via token)

- Descrição: Exclui logicamente a URL curta do banco de dados preenchendo a data de remoção.

## Documentação no Swagger

A documentação da API pode ser encontrada no Swagger. Para visualizá-la, acesse http://localhost:3000/api-docs


# Frequentar - Sistema de Frequência Acadêmica

Este é o protótipo inicial do projeto Frequentar, desenvolvido como um sistema de gestão de alunos para a faculdade.

Esta versão contempla o CRUD completo de Alunos (Cadastro, Listagem, Atualização e Exclusão).

A interface foi projetada de forma simples e direta, utilizando a identidade visual e as cores oficiais do SENAC (Azul e Laranja).

O projeto não utiliza banco de dados externo, persistindo as informações localmente em um arquivo .json.

------------------------------------------------------------

## Tecnologias Utilizadas

- Frontend: React.js (com CSS puro para estilização)
- Backend: Node.js com Express e CORS
- Armazenamento: File System nativo do Node.js (arquivo students.json)

------------------------------------------------------------

## Estrutura do Projeto

O repositório está dividido em duas partes principais:

# Frequentar - Sistema de Frequência Acadêmica

Este é o protótipo inicial do projeto Frequentar, desenvolvido como um sistema de gestão de alunos para a faculdade.

Esta versão contempla o CRUD completo de Alunos (Cadastro, Listagem, Atualização e Exclusão).

A interface foi projetada de forma simples e direta, utilizando a identidade visual e as cores oficiais do SENAC (Azul e Laranja).

O projeto não utiliza banco de dados externo, persistindo as informações localmente em um arquivo .json.

------------------------------------------------------------

## Tecnologias Utilizadas

- Frontend: React.js (com CSS puro para estilização)
- Backend: Node.js com Express e CORS
- Armazenamento: File System nativo do Node.js (arquivo students.json)

------------------------------------------------------------

## Estrutura do Projeto

O repositório está dividido em duas partes principais:

```
/
├── backend/                  # API e persistência de dados
│   ├── database/
│   │   └── students.json     # Arquivo gerado automaticamente onde os dados são salvos
│   ├── server.js             # Código principal da API
│   └── package.json          # Dependências do Node.js
│
└── frontend/                 # Interface de usuário (React)
    ├── public/
    │   └── index.html        # Estrutura base da página
    ├── src/
    │   ├── App.js            # Lógica principal do CRUD
    │   ├── App.css           # Estilização (Cores do SENAC)
    │   └── index.js          # Ponto de entrada do React
    └── package.json          # Dependências do React
```
------------------------------------------------------------

## Pré-requisitos

Para rodar este projeto na sua máquina, você precisará ter instalado:

- Node.js (versão 14 ou superior)
- Git

------------------------------------------------------------

## Como Executar o Projeto Localmente

Como o sistema possui um Frontend e um Backend separados, é necessário rodar dois terminais simultaneamente.

### Passo 1: Clonar o Repositório

Abra o terminal e baixe o projeto para a sua máquina:

```git clone https://github.com/pedrovianadev/projetocrud.git```
```cd projetocrud```

------------------------------------------------------------

### Passo 2: Inicializar o Backend

O backend gerencia os dados e os salva no arquivo .json.

No terminal, entre na pasta do backend:

```cd backend```

Instale as dependências necessárias:

```npm install```

Inicie o servidor:

```node server.js```

Aviso: O servidor estará rodando em ```http://localhost:3001.```
Mantenha este terminal aberto e rodando.

------------------------------------------------------------

### Passo 3: Inicializar o Frontend

Agora vamos rodar a tela do projeto para interagir com o sistema.

Abra um novo terminal (sem fechar o do backend) e entre na pasta do frontend:

```cd frontend```

Instale as dependências do React:

```npm install```

Inicie a aplicação:

```npm start```

Aviso: O navegador abrirá automaticamente a aplicação em ```http://localhost:3000.```

------------------------------------------------------------

## Reiniciando os Dados (Para Testes)

Os dados cadastrados pelo frontend são salvos automaticamente em:

backend/database/students.json

Caso precise limpar o banco de dados para uma nova apresentação ou teste:

- Abra o arquivo students.json
- Apague todo o conteúdo
- Salve apenas com colchetes vazios:

[]/

├── backend/                  # API e persistência de dados
│   ├── database/
│   │   └── students.json     # Arquivo gerado automaticamente onde os dados são salvos
│   ├── server.js             # Código principal da API
│   └── package.json          # Dependências do Node.js
│
└── frontend/                 # Interface de usuário (React)
    ├── public/
    │   └── index.html        # Estrutura base da página
    ├── src/
    │   ├── App.js            # Lógica principal do CRUD
    │   ├── App.css           # Estilização (Cores do SENAC)
    │   └── index.js          # Ponto de entrada do React
    └── package.json          # Dependências do React

------------------------------------------------------------

## Pré-requisitos

Para rodar este projeto na sua máquina, você precisará ter instalado:

- Node.js (versão 14 ou superior)
- Git

------------------------------------------------------------

## Como Executar o Projeto Localmente

Como o sistema possui um Frontend e um Backend separados, é necessário rodar dois terminais simultaneamente.

### Passo 1: Clonar o Repositório

Abra o terminal e baixe o projeto para a sua máquina:

```git clone https://github.com/pedrovianadev/projetocrud.git```
```cd projetocrud```

------------------------------------------------------------

### Passo 2: Inicializar o Backend

O backend gerencia os dados e os salva no arquivo .json.

No terminal, entre na pasta do backend:

```cd backend```

Instale as dependências necessárias:

```npm install```

Inicie o servidor:

```node server.js```

Aviso: O servidor estará rodando em ```http://localhost:3001.```
Mantenha este terminal aberto e rodando.

------------------------------------------------------------

### Passo 3: Inicializar o Frontend

Agora vamos rodar a tela do projeto para interagir com o sistema.

Abra um novo terminal (sem fechar o do backend) e entre na pasta do frontend:

```cd frontend```

Instale as dependências do React:

```npm install```

Inicie a aplicação:

```npm start```

Aviso: O navegador abrirá automaticamente a aplicação em ```http://localhost:3000.```

------------------------------------------------------------

## Reiniciando os Dados (Para Testes)

Os dados cadastrados pelo frontend são salvos automaticamente em:

backend/database/students.json

Caso precise limpar o banco de dados para uma nova apresentação ou teste:

- Abra o arquivo students.json
- Apague todo o conteúdo
- Salve apenas com colchetes vazios:

[]

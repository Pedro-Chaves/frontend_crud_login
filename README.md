# Painel Administrativo - Vue.js

Este projeto é um **Painel Administrativo** desenvolvido com **Vue.js** e **Bulma CSS**, permitindo o gerenciamento de usuários, incluindo cadastro, edição e exclusão.

🚀 **Este projeto foi baseado na API que desenvolvi anteriormente:** [API CRUD Login](https://github.com/Pedro-Chaves/api_crud_login).

## 🚀 Tecnologias Utilizadas

- **Vue.js** (Framework JavaScript)
- **Vue Router** (Gerenciamento de rotas)
- **Axios** (Requisições HTTP)
- **Bulma CSS** (Estilização)

## 📦 Instalação e Configuração

Clone o repositório:

```sh
git clone git@github.com:Pedro-Chaves/frontend_crud_login.git
cd frontend_crud_login
```

Instale as dependências do projeto:

```sh
npm install
```

### 🔧 Configuração do Ambiente

Crie um arquivo **.env** na raiz do projeto e defina a URL da API:

```
VUE_APP_API_URL=http://localhost:8000
```

## ▶️ Executando o Projeto

Para iniciar o servidor de desenvolvimento, execute:

```sh
npm run serve
```

O projeto estará disponível em **[http://localhost:8080](http://localhost:8080)** (ou outra porta definida pelo Vue).

## 📌 Estrutura do Projeto

```
painel-admin-vue/
│── src/
│   ├── components/        # Componentes reutilizáveis
│   ├── views/             # Páginas principais do projeto
│   ├── router/            # Configuração de rotas
│   ├── store/             # Gerenciamento de estado (Vuex, se utilizado)
│   ├── assets/            # Arquivos estáticos
|   ├── App.vue            # Arquivo raiz
│   ├── main.js            # Arquivo principal do Vue
│── public/                # Arquivos públicos (index.html, favicon, etc.)
│── .env                   # Configurações do ambiente
│── package.json           # Dependências e scripts
```

## 🔄 Fluxo do Projeto

- **LoginView\.vue**: Tela de login do sistema.
- **RegisterView\.vue**: Cadastro de novos usuários.
- **UsersView\.vue**: Listagem e gerenciamento de usuários.
- **EditUserView\.vue**: Tela de edição de usuários.

## 🔑 Autenticação

O sistema utiliza **JWT (JSON Web Token)** para autenticação. O token é armazenado no **localStorage** e enviado no cabeçalho das requisições:

```js
headers: {
  Authorization: `Bearer ${localStorage.getItem('token')}`
}
```

## 🔄 Rotas Principais

- `/login` → Página de login.
- `/register` → Cadastro de usuários.
- `/users` → Listagem de usuários.
- `/edit/:id` → Edição de usuário.

## 📌 Melhorias Futuras

- Implementação de testes automatizados.
- Paginação na listagem de usuários.
- Melhor gestão de permissões e níveis de acesso.

## 📜 Licença

Este projeto está licenciado sob a **MIT License**.

---

💡 Desenvolvido com ❤️ por [Seu Nome].
# 🎨 Frontend - The Band  

> 🖼️ *"Se o backend é a banda tocando música, o frontend é o palco, as luzes e o som que o público percebe. É aqui que a experiência ganha forma visual e interativa."*  

**Frontend - The Band** é a interface web do projeto, construída em **Vue.js** e estilizada com **TailwindCSS**. Ele consome os serviços do backend e apresenta os dados de forma clara, interativa e moderna, permitindo que usuários explorem insights sem precisar lidar diretamente com a complexidade da arquitetura semântica.  

---

## 🚀 Tech Stack  

* [Vue 3](https://vuejs.org/) 
* [Vite](https://vitejs.dev/)  
* [TailwindCSS](https://tailwindcss.com/)  
* [Axios](https://axios-http.com/) 
* [TypeScript](https://www.typescriptlang.org/)
 

---

## 📦 Estrutura do Projeto  

```
frontend/
├── .vscode/                  # Configurações do VSCode
├── node_modules/             # Dependências do projeto
├── public/                   # Arquivos estáticos públicos
├── src/                      # Código-fonte principal (componentes, páginas, etc.)
│   ├── main.ts                
│   ├── App.vue                
│   ├── index.d.ts             
│   ├── vue.shims.d.ts         
│   ├── modules/              # 🎯 MÓDULOS DE NEGÓCIO
│   │   └── app/               
│   │       ├── router/       # Definição de rotas (Vue Router)
│   │       │   └── index.ts   
│   │       └── views/        # Páginas principais da aplicação
│   │
│   ├── common/               # 🔧 RECURSOS COMPARTILHADOS  
│       ├── assets/            
│       │   └── icons/        # Ícones do projeto 
│       ├── components/       
│       └── composables/ 
├── .editorconfig             # Configurações de formatação
├── .gitattributes            # Configurações Git
├── .gitignore                # Arquivos e pastas ignorados pelo Git
├── .prettierrc.json          # Configurações do Prettier
├── banner.png                # Banner do projeto
├── env.d.ts                  # Tipagem de variáveis de ambiente
├── eslint.config.ts          # Configuração do ESLint
├── index.html                # HTML principal
├── package.json              # Dependências e scripts do projeto
├── package-lock.json         # Lockfile de dependências
├── postcss.config.js         # Configuração do PostCSS
├── README.md                 # Documentação do frontend
├── tsconfig.app.json         # Configuração do TypeScript para a aplicação
├── tsconfig.json             # Configuração global do TypeScript
├── tsconfig.node.json        # Configuração do TypeScript para Node
└── vite.config.ts            # Configuração do Vite
```

---

## ⚙️ Instalação e Uso  

### 🔹 1. Pré-requisitos  

- [Node.js (>= 18)](https://nodejs.org/)  
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)  

### 🔹 2. Instalar dependências  

```
npm install
# ou
yarn install
```

### 🔹 3. Rodar em ambiente local 

```
npm run dev
# ou
yarn dev
```
A aplicação estará disponível em: http://localhost:5173

⚠️ Importante: O frontend precisa que o backend esteja rodando em http://localhost:8000
(ou configure uma URL diferente).

### 🚀 Build do projeto:

```
npm run build
# ou
yarn build
```
---

### 🙋 Contribuições
Pull requests são muito bem-vindos! Para mudanças maiores, por favor, abra uma issue primeiro para discutirmos o que você gostaria de mudar.

---

### ✨ Autor
Feito com 💙 por The Band Dev Team

---
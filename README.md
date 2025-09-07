# 🎨 Frontend - The Band  

> 🖼️ *"Se o backend é a banda tocando música, o frontend é o palco, as luzes e o som que o público percebe. É aqui que a experiência ganha forma visual e interativa."*  

**Frontend - The Band** é a interface web do projeto, construída em **Vue.js** e estilizada com **TailwindCSS**. Ele consome os serviços do backend e apresenta os dados de forma clara, interativa e moderna, permitindo que usuários explorem insights sem precisar lidar diretamente com a complexidade da arquitetura semântica.  

---

## 🚀 Tech Stack  

* [Vue 3](https://vuejs.org/) 
* [Vite](https://vitejs.dev/)  
* [TailwindCSS](https://tailwindcss.com/)  
* [Axios](https://axios-http.com/) 
 

---

## 📦 Estrutura do Projeto  

```
frontend/
├── .vscode/                  # Configurações do VSCode
├── node_modules/             # Dependências do projeto
├── public/                   # Arquivos estáticos públicos
├── src/                      # Código-fonte principal (componentes, páginas, etc.)
│ ├── assets/                    # Arquivos estáticos (imagens, fontes, estilos globais)
│ ├── components/                # Componentes Vue reutilizáveis
│ ├── composables/               # Funções reutilizáveis (Composition API)
│ ├── icons/                     # Ícones do projeto
│ ├── router/                    # Definição de rotas (Vue Router)
│ ├── views/                     # Páginas principais da aplicação
│ ├── App.vue                    # Componente raiz da aplicação
│ ├── index.d.ts                 # Definições de tipos globais
│ ├── main.ts                    # Ponto de entrada da aplicação (monta o Vue app)
│ └── vue-shims.d.ts          # Tipos para arquivos .vue no TypeScript
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

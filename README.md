# HYPER - Web App de Treinos Personalizados

Este é o frontend do HYPER, um aplicativo web da nossa startup focada em treinos personalizados de academia. O sistema adapta os treinos de acordo com os dados e feedbacks dos usuários, promovendo uma experiência de treino mais eficiente e personalizada.

## 🔧 Tecnologias Utilizadas

- **React** com **TypeScript**
- **Vite** para build e desenvolvimento
- **Styled Components** (ou outro sistema de estilos modularizado por `styles.ts`)
- **React Router** para navegação
- **Context API** para autenticação e controle de rotas públicas/privadas

## 📁 Estrutura de Pastas

```bash
src/
├── components/        # Componentes reutilizáveis (Footer, Header, etc.)
├── context/           # Contextos globais (ex: AuthContext)
├── pages/             # Páginas principais divididas por funcionalidades
│   ├── Configuracoes/
│   ├── ExecutarTreino/
│   ├── Exercicios/
│   ├── Historico/
│   ├── Login/
│   ├── Perfil/
│   ├── Register/
│   └── Treinos/
│       ├── index.tsx
│       └── styles.ts
├── App.tsx            # Componente principal do app
├── Routes.tsx         # Definição das rotas da aplicação
└── main.tsx           # Ponto de entrada da aplicação
└── index.css		   # Estilos globais
index.html             # HTML principal
 .env                  # Variáveis de ambiente
 .gitignore            # Arquivo para ignorar arquivos e pastas no Git
 vite-env.d.ts         # Tipos do Vite
 vite.config.ts        # Configuração do Vite

```

Cada pasta dentro de `pages/` segue uma estrutura semelhante à pasta `Treinos`, com seus próprios arquivos de visualização (`index.tsx`) e estilo (`styles.ts`).

## 🚀 Como rodar o projeto

1. **Clone o repositório**

```bash
git clone https://github.com/iancdesponds/hyper-app-front.git
cd hyper-app-front
```

2. **Instale as dependências**

```bash
npm install
```

3. **Crie um arquivo `.env` com base no `.env.example`**

4. **Execute o app**

```bash
npm run dev
```

O app estará disponível em `http://localhost:5173`.

## ✅ Funcionalidades Principais

* Cadastro e login de usuários
* Geração de treinos personalizados
* Histórico de treinos (To-Do)
* Monitoramento de performance (To-Do)
* Perfil do usuário e configurações (To-Do)
* Rotas protegidas por autenticação

---

## 📄 Licença

Este projeto é privado e de uso exclusivo da equipe do HYPER.

---

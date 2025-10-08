# 📚 Personal Library Management System

A comprehensive full-stack library management system featuring loan tracking, detailed history, and analytics. Built with modern web technologies and a clean, Apple-inspired interface design.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18.3.1-61dafb?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-3178c6?logo=typescript)](https://www.typescriptlang.org/)
[![Python](https://img.shields.io/badge/Python-3.11+-3776ab?logo=python)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.115.0-009688?logo=fastapi)](https://fastapi.tiangolo.com/)
[![Vite](https://img.shields.io/badge/Vite-5.4.19-646cff?logo=vite)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4.17-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)

## 📋 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Technology Stack](#-technology-stack)
- [Prerequisites](#-prerequisites)
- [Installation](#️-installation)
- [Usage](#-usage)
- [Project Structure](#-project-structure)
- [API Documentation](#-api-documentation)
- [Development](#-development)
- [Production Build](#️-production-build)
- [Contributing](#-contributing)
- [License](#-license)
- [Author](#-author)

## 🎯 Overview

This Personal Library Management System is a modern, full-stack web application designed to help individuals organize and track their book collections efficiently. The system provides comprehensive features for cataloging books, managing loans, tracking reading history, and generating insightful statistics about your library.

## ✨ Key Features

### 📖 Book Management
- **Complete Cataloging**: Store detailed information including title, authors, publisher, ISBN, synopsis, cover image, and more
- **Format Support**: Manage both physical and digital books in a unified interface
- **Rating System**: Rate your books on a 0-5 star scale
- **Custom Tags**: Organize your collection with personalized tags
- **Favorites**: Mark and filter favorite books for quick access
- **Full CRUD Operations**: Create, read, update, and delete book records

### 🔄 Loan Management
- **Comprehensive Tracking**: Record loans with borrower details, contact information, and notes
- **Due Date Control**: Set and monitor return deadlines
- **Overdue Alerts**: Visual indicators for books past their return date
- **Complete History**: Maintain a full audit trail of all loans
- **Automatic Calculations**: System automatically calculates days overdue

### 🔍 Search & Filtering
- **Multi-field Search**: Search across titles, authors, publishers, and tags
- **Status Filtering**: Filter by availability (available/loaned)
- **Format Filtering**: Separate physical and digital collections
- **Favorites Filter**: Quick access to your favorite books
- **Real-time Results**: Instant search results as you type

### 📊 Analytics & Statistics
- **Collection Overview**: Total books, pages, and formats at a glance
- **Loan Metrics**: Track total loans and current active loans
- **Format Distribution**: Visual breakdown of physical vs digital books
- **Reading Statistics**: Comprehensive insights into your reading habits

### 💾 Data Management
- **JSON Export**: Full backup of your library data
- **Data Import**: Restore from previous backups
- **Bulk Operations**: Clear all data when needed
- **Data Persistence**: SQLite database ensures data integrity

### 🎨 User Interface
- **Modern Design**: Clean, Apple-inspired aesthetic with glassmorphism effects
- **Dark/Light Mode**: Full theme support for comfortable reading in any lighting
- **Responsive Layout**: Optimized for desktop, tablet, and mobile devices
- **Smooth Animations**: Polished transitions and micro-interactions
- **Toast Notifications**: Non-intrusive feedback for all user actions

## 🚀 Technology Stack

### Frontend Architecture
| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 18.3.1 | UI library for building component-based interfaces |
| **TypeScript** | 5.8.3 | Static typing for enhanced code quality and developer experience |
| **Vite** | 5.4.19 | Next-generation frontend tooling for fast development |
| **TailwindCSS** | 3.4.17 | Utility-first CSS framework for rapid UI development |
| **shadcn/ui** | Latest | High-quality, accessible component library |
| **React Router** | 6.30.1 | Declarative routing for React applications |
| **TanStack Query** | 5.83.0 | Powerful asynchronous state management |
| **date-fns** | 3.6.0 | Modern JavaScript date utility library |
| **Sonner** | 1.7.4 | Beautiful toast notifications |
| **Lucide React** | 0.462.0 | Consistent and customizable icon library |

### Backend Architecture
| Technology | Version | Purpose |
|------------|---------|---------|
| **Python** | 3.11+ | High-level programming language |
| **FastAPI** | 0.115.0 | Modern, high-performance web framework |
| **SQLAlchemy** | 2.0.36 | SQL toolkit and Object-Relational Mapping |
| **SQLite** | 3 | Lightweight, serverless database engine |
| **Pydantic** | 2.10.0 | Data validation using Python type annotations |
| **Uvicorn** | 0.32.0 | Lightning-fast ASGI server |
| **python-dateutil** | 2.9.0 | Extensions to the standard datetime module |

## 📋 Prerequisites

Ensure you have the following installed on your system:

- **Node.js**: Version 18.0 or higher ([Download](https://nodejs.org/))
- **npm**: Comes with Node.js
- **Python**: Version 3.11 or higher ([Download](https://www.python.org/))
- **Git**: For version control ([Download](https://git-scm.com/))

## 🛠️ Installation

### Step 1: Clone the Repository

```bash
git clone https://github.com/reissbruno/biblioteca-bruno-reis.git
cd biblioteca-bruno-reis
```

### Step 2: Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create Python virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On Linux/macOS:
source venv/bin/activate

# Install Python dependencies
pip install -r requirements.txt

# Setup environment variables
cp .env.example .env

# Initialize database with sample data
python seed_data.py
```

### Step 3: Frontend Setup

```bash
# Return to project root
cd ..

# Install Node.js dependencies
npm install

# Setup environment variables (optional)
cp .env.example .env
```

## 🎮 Usage

### Starting the Backend Server

Open a terminal and run:

```bash
cd backend
# Activate virtual environment (see Step 2 above)
venv\Scripts\activate  # Windows
# or
source venv/bin/activate  # Linux/macOS

# Start the FastAPI server
python main.py
```

**Backend Server**: http://localhost:8000
**API Documentation**: http://localhost:8000/docs (Interactive Swagger UI)
**Alternative API Docs**: http://localhost:8000/redoc (ReDoc format)

### Starting the Frontend Application

Open a new terminal and run:

```bash
npm run dev
```

**Frontend Application**: http://localhost:8080

The application will automatically reload when you make changes to the source code.

## 📁 Project Structure

```
biblioteca-bruno-reis/
├── backend/                     # Backend application
│   ├── main.py                  # FastAPI application and endpoints
│   ├── models.py                # SQLAlchemy database models
│   ├── schemas.py               # Pydantic validation schemas
│   ├── database.py              # Database configuration and session management
│   ├── crud.py                  # CRUD operations layer
│   ├── seed_data.py             # Database seeding script
│   ├── requirements.txt         # Python dependencies
│   ├── .env.example             # Environment variables template
│   └── README.md                # Backend documentation
│
├── src/                         # Frontend application
│   ├── components/              # React components
│   │   ├── ui/                  # shadcn/ui base components
│   │   ├── BookCard.tsx         # Book display card component
│   │   ├── BookFormDialog.tsx   # Book creation/editing dialog
│   │   ├── BookDetailModal.tsx  # Book details modal
│   │   ├── LoanDialog.tsx       # Loan creation dialog
│   │   ├── FilterBar.tsx        # Search filters component
│   │   ├── SearchBar.tsx        # Search input component
│   │   ├── ThemeToggle.tsx      # Dark/light mode toggle
│   │   └── GlassCard.tsx        # Glassmorphism card wrapper
│   ├── pages/                   # Application pages
│   │   ├── Index.tsx            # Main library page
│   │   ├── Emprestimos.tsx      # Active loans page
│   │   ├── Configuracoes.tsx    # Settings page
│   │   └── NotFound.tsx         # 404 page
│   ├── lib/                     # Utility libraries
│   │   ├── api.ts               # API client and HTTP methods
│   │   ├── mockData.ts          # Sample data for development
│   │   └── utils.ts             # Helper functions
│   ├── types/                   # TypeScript type definitions
│   │   └── book.ts              # Book-related interfaces
│   ├── App.tsx                  # Root application component
│   └── main.tsx                 # Application entry point
│
├── public/                      # Static assets
├── CLAUDE.md                    # AI assistant documentation
├── README.md                    # Project documentation
├── package.json                 # Node.js dependencies and scripts
├── tsconfig.json                # TypeScript configuration
├── vite.config.ts               # Vite build configuration
└── tailwind.config.ts           # TailwindCSS configuration
```

## 🔌 API Documentation

### Books API

| Method | Endpoint | Description | Query Parameters |
|--------|----------|-------------|------------------|
| `GET` | `/api/books` | List all books | `search`, `status`, `formato`, `favorito`, `skip`, `limit` |
| `GET` | `/api/books/{id}` | Get book by ID | - |
| `POST` | `/api/books` | Create new book | - |
| `PUT` | `/api/books/{id}` | Update book | - |
| `DELETE` | `/api/books/{id}` | Delete book | - |
| `POST` | `/api/books/{id}/favorite` | Toggle favorite status | - |

### Loans API

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/books/{id}/loan` | Create new loan |
| `POST` | `/api/books/{id}/return` | Return loaned book |
| `GET` | `/api/loans/active` | List all active loans |
| `GET` | `/api/books/{id}/history` | Get loan history for a book |

**Full Interactive Documentation**: http://localhost:8000/docs

## 📸 Screenshots

> _Screenshots coming soon_

## 🛠️ Development

### Available Scripts

#### Frontend Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build optimized production bundle |
| `npm run build:dev` | Build development bundle |
| `npm run lint` | Run ESLint code analysis |
| `npm run preview` | Preview production build locally |

#### Backend Scripts

| Command | Description |
|---------|-------------|
| `python main.py` | Start development server with auto-reload |
| `python seed_data.py` | Seed database with sample data |

### Environment Variables

#### Backend (.env)
```env
DATABASE_URL=sqlite:///./biblioteca.db
CORS_ORIGINS=http://localhost:8080,http://localhost:5173
```

#### Frontend (.env)
```env
VITE_API_URL=http://localhost:8000
```

## 🏗️ Production Build

### Frontend Production Build

```bash
# Create optimized production build
npm run build

# Output will be in the dist/ directory
# Serve with any static file server
```

The build is optimized and minified for best performance. All assets are properly bundled and ready for deployment.

### Backend Production Deployment

The backend is production-ready. For deployment, use a production ASGI server:

```bash
# Install Gunicorn
pip install gunicorn

# Run with Gunicorn
gunicorn main:app -w 4 -k uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000

# Or use Uvicorn directly
uvicorn main:app --host 0.0.0.0 --port 8000 --workers 4
```

**Deployment Considerations:**
- Set `DATABASE_URL` to your production database
- Configure `CORS_ORIGINS` with your frontend domain
- Use environment variables for sensitive configuration
- Consider using PostgreSQL for production instead of SQLite
- Implement proper logging and monitoring
- Set up SSL/TLS certificates for HTTPS

## 🧪 Testing

### Backend Tests
```bash
cd backend
pytest
```

### Frontend Tests
```bash
npm run test
```

> _Test suites will be implemented in future releases_

## 🤝 Contributing

Contributions are welcome! Feel free to open issues and pull requests.

### How to Contribute

1. **Fork the Repository**
   ```bash
   git clone https://github.com/reissbruno/biblioteca-bruno-reis.git
   ```

2. **Create a Feature Branch**
   ```bash
   git checkout -b feature/AmazingFeature
   ```

3. **Make Your Changes**
   - Write clean, documented code
   - Follow the existing code style
   - Add tests if applicable

4. **Commit Your Changes**
   ```bash
   git commit -m 'feat: Add some AmazingFeature'
   ```

5. **Push to Your Fork**
   ```bash
   git push origin feature/AmazingFeature
   ```

6. **Open a Pull Request**
   - Provide a clear description of the changes
   - Reference any related issues

### Commit Convention

This project follows [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting, etc.)
- `refactor:` Code refactoring
- `test:` Adding or updating tests
- `chore:` Maintenance tasks

## 📝 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 👤 Author

**Bruno Reis**

- GitHub: [@reissbruno](https://github.com/reissbruno)
- Repository: [biblioteca-bruno-reis](https://github.com/reissbruno/biblioteca-bruno-reis)

## 🙏 Acknowledgments

This project was built using amazing open-source technologies:

- [React](https://reactjs.org/) - A JavaScript library for building user interfaces
- [FastAPI](https://fastapi.tiangolo.com/) - Modern, fast web framework for Python
- [shadcn/ui](https://ui.shadcn.com/) - Beautifully designed components
- [TailwindCSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Lucide](https://lucide.dev/) - Beautiful & consistent icon pack
- [Vite](https://vitejs.dev/) - Next generation frontend tooling
- [SQLAlchemy](https://www.sqlalchemy.org/) - Python SQL toolkit

Special thanks to the open-source community for their invaluable contributions.

---

<div align="center">

### 🌐 Language / Idioma

**[English](#-personal-library-management-system) | [Português](#-sistema-de-gerenciamento-de-biblioteca-pessoal)**

**Made with ❤️ by [Bruno Reis](https://github.com/reissbruno)**

[![GitHub](https://img.shields.io/badge/GitHub-reissbruno-181717?logo=github)](https://github.com/reissbruno)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-brunorreiss-0077B5?logo=linkedin)](https://www.linkedin.com/in/brunorreiss)

</div>

---

# 📚 Sistema de Gerenciamento de Biblioteca Pessoal

Um sistema completo full-stack para gerenciamento de biblioteca pessoal com rastreamento de empréstimos, histórico detalhado e análises. Construído com tecnologias web modernas e uma interface limpa inspirada no design da Apple.

[![Licença: MIT](https://img.shields.io/badge/Licença-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18.3.1-61dafb?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-3178c6?logo=typescript)](https://www.typescriptlang.org/)
[![Python](https://img.shields.io/badge/Python-3.11+-3776ab?logo=python)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.115.0-009688?logo=fastapi)](https://fastapi.tiangolo.com/)

## 📋 Índice

- [Visão Geral](#-visão-geral)
- [Principais Funcionalidades](#-principais-funcionalidades)
- [Stack Tecnológica](#-stack-tecnológica)
- [Pré-requisitos](#-pré-requisitos)
- [Instalação](#️-instalação)
- [Como Usar](#-como-usar)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Documentação da API](#-documentação-da-api)
- [Desenvolvimento](#️-desenvolvimento)
- [Build de Produção](#️-build-de-produção)
- [Contribuindo](#-contribuindo)
- [Licença](#-licença)
- [Autor](#-autor)

## 🎯 Visão Geral

Este Sistema de Gerenciamento de Biblioteca Pessoal é uma aplicação web moderna e full-stack projetada para ajudar indivíduos a organizar e rastrear suas coleções de livros de forma eficiente. O sistema fornece recursos abrangentes para catalogar livros, gerenciar empréstimos, rastrear histórico de leitura e gerar estatísticas relevantes sobre sua biblioteca.

## ✨ Principais Funcionalidades

### 📖 Gerenciamento de Livros
- **Catalogação Completa**: Armazene informações detalhadas incluindo título, autores, editora, ISBN, sinopse, imagem de capa e muito mais
- **Suporte a Formatos**: Gerencie livros físicos e digitais em uma interface unificada
- **Sistema de Avaliação**: Avalie seus livros em uma escala de 0-5 estrelas
- **Tags Personalizadas**: Organize sua coleção com tags personalizadas
- **Favoritos**: Marque e filtre livros favoritos para acesso rápido
- **Operações CRUD Completas**: Crie, leia, atualize e delete registros de livros

### 🔄 Gerenciamento de Empréstimos
- **Rastreamento Abrangente**: Registre empréstimos com detalhes do destinatário, informações de contato e observações
- **Controle de Prazo**: Defina e monitore prazos de devolução
- **Alertas de Atraso**: Indicadores visuais para livros com prazo vencido
- **Histórico Completo**: Mantenha uma trilha de auditoria completa de todos os empréstimos
- **Cálculos Automáticos**: Sistema calcula automaticamente dias de atraso

### 🔍 Busca e Filtragem
- **Busca Multi-campo**: Busque por títulos, autores, editoras e tags
- **Filtro por Status**: Filtre por disponibilidade (disponível/emprestado)
- **Filtro por Formato**: Separe coleções físicas e digitais
- **Filtro de Favoritos**: Acesso rápido aos seus livros favoritos
- **Resultados em Tempo Real**: Resultados instantâneos de busca conforme você digita

### 📊 Análises e Estatísticas
- **Visão Geral da Coleção**: Total de livros, páginas e formatos de relance
- **Métricas de Empréstimo**: Acompanhe empréstimos totais e ativos
- **Distribuição de Formato**: Visualização da divisão entre livros físicos e digitais
- **Estatísticas de Leitura**: Insights abrangentes sobre seus hábitos de leitura

### 💾 Gerenciamento de Dados
- **Exportação JSON**: Backup completo dos dados da sua biblioteca
- **Importação de Dados**: Restaure de backups anteriores
- **Operações em Massa**: Limpe todos os dados quando necessário
- **Persistência de Dados**: Banco de dados SQLite garante integridade dos dados

### 🎨 Interface do Usuário
- **Design Moderno**: Estética limpa inspirada na Apple com efeitos glassmorphism
- **Modo Escuro/Claro**: Suporte completo a temas para leitura confortável em qualquer iluminação
- **Layout Responsivo**: Otimizado para desktop, tablet e dispositivos móveis
- **Animações Suaves**: Transições polidas e micro-interações
- **Notificações Toast**: Feedback não intrusivo para todas as ações do usuário

## 🚀 Stack Tecnológica

### Arquitetura Frontend
| Tecnologia | Versão | Propósito |
|------------|---------|-----------|
| **React** | 18.3.1 | Biblioteca UI para construir interfaces baseadas em componentes |
| **TypeScript** | 5.8.3 | Tipagem estática para qualidade de código aprimorada |
| **Vite** | 5.4.19 | Ferramenta de frontend de próxima geração para desenvolvimento rápido |
| **TailwindCSS** | 3.4.17 | Framework CSS utility-first para desenvolvimento rápido de UI |
| **shadcn/ui** | Latest | Biblioteca de componentes de alta qualidade e acessíveis |
| **React Router** | 6.30.1 | Roteamento declarativo para aplicações React |
| **TanStack Query** | 5.83.0 | Gerenciamento de estado assíncrono poderoso |
| **date-fns** | 3.6.0 | Biblioteca moderna de utilitários de data JavaScript |
| **Sonner** | 1.7.4 | Notificações toast elegantes |
| **Lucide React** | 0.462.0 | Biblioteca de ícones consistente e customizável |

### Arquitetura Backend
| Tecnologia | Versão | Propósito |
|------------|---------|-----------|
| **Python** | 3.11+ | Linguagem de programação de alto nível |
| **FastAPI** | 0.115.0 | Framework web moderno e de alta performance |
| **SQLAlchemy** | 2.0.36 | Toolkit SQL e Mapeamento Objeto-Relacional |
| **SQLite** | 3 | Motor de banco de dados leve e serverless |
| **Pydantic** | 2.10.0 | Validação de dados usando anotações de tipo Python |
| **Uvicorn** | 0.32.0 | Servidor ASGI ultra-rápido |
| **python-dateutil** | 2.9.0 | Extensões para o módulo datetime padrão |

## 📋 Pré-requisitos

Certifique-se de ter instalado em seu sistema:

- **Node.js**: Versão 18.0 ou superior ([Download](https://nodejs.org/))
- **npm**: Vem com Node.js
- **Python**: Versão 3.11 ou superior ([Download](https://www.python.org/))
- **Git**: Para controle de versão ([Download](https://git-scm.com/))

## 🛠️ Instalação

### Passo 1: Clone o Repositório

```bash
git clone https://github.com/reissbruno/biblioteca-bruno-reis.git
cd biblioteca-bruno-reis
```

### Passo 2: Configuração do Backend

```bash
# Navegue para o diretório do backend
cd backend

# Crie ambiente virtual Python
python -m venv venv

# Ative o ambiente virtual
# No Windows:
venv\Scripts\activate
# No Linux/macOS:
source venv/bin/activate

# Instale dependências Python
pip install -r requirements.txt

# Configure variáveis de ambiente
cp .env.example .env

# Inicialize o banco de dados com dados de exemplo
python seed_data.py
```

### Passo 3: Configuração do Frontend

```bash
# Retorne para a raiz do projeto
cd ..

# Instale dependências Node.js
npm install

# Configure variáveis de ambiente (opcional)
cp .env.example .env
```

## 🎮 Como Usar

### Iniciando o Servidor Backend

Abra um terminal e execute:

```bash
cd backend
# Ative o ambiente virtual (veja Passo 2 acima)
venv\Scripts\activate  # Windows
# ou
source venv/bin/activate  # Linux/macOS

# Inicie o servidor FastAPI
python main.py
```

**Servidor Backend**: http://localhost:8000
**Documentação da API**: http://localhost:8000/docs (Swagger UI Interativo)
**Documentação Alternativa**: http://localhost:8000/redoc (Formato ReDoc)

### Iniciando a Aplicação Frontend

Abra um novo terminal e execute:

```bash
npm run dev
```

**Aplicação Frontend**: http://localhost:8080

A aplicação recarregará automaticamente quando você fizer alterações no código-fonte.

## 📁 Estrutura do Projeto

```
biblioteca-bruno-reis/
├── backend/                     # Aplicação backend
│   ├── main.py                  # Aplicação FastAPI e endpoints
│   ├── models.py                # Modelos de banco de dados SQLAlchemy
│   ├── schemas.py               # Schemas de validação Pydantic
│   ├── database.py              # Configuração do banco e gerenciamento de sessão
│   ├── crud.py                  # Camada de operações CRUD
│   ├── seed_data.py             # Script de seed do banco de dados
│   ├── requirements.txt         # Dependências Python
│   ├── .env.example             # Template de variáveis de ambiente
│   └── README.md                # Documentação do backend
│
├── src/                         # Aplicação frontend
│   ├── components/              # Componentes React
│   │   ├── ui/                  # Componentes base shadcn/ui
│   │   ├── BookCard.tsx         # Componente de card de livro
│   │   ├── BookFormDialog.tsx   # Diálogo de criação/edição de livro
│   │   ├── BookDetailModal.tsx  # Modal de detalhes do livro
│   │   ├── LoanDialog.tsx       # Diálogo de criação de empréstimo
│   │   ├── FilterBar.tsx        # Componente de filtros de busca
│   │   ├── SearchBar.tsx        # Componente de entrada de busca
│   │   ├── ThemeToggle.tsx      # Toggle modo escuro/claro
│   │   └── GlassCard.tsx        # Wrapper de card glassmorphism
│   ├── pages/                   # Páginas da aplicação
│   │   ├── Index.tsx            # Página principal da biblioteca
│   │   ├── Emprestimos.tsx      # Página de empréstimos ativos
│   │   ├── Configuracoes.tsx    # Página de configurações
│   │   └── NotFound.tsx         # Página 404
│   ├── lib/                     # Bibliotecas utilitárias
│   │   ├── api.ts               # Cliente API e métodos HTTP
│   │   ├── mockData.ts          # Dados de exemplo para desenvolvimento
│   │   └── utils.ts             # Funções auxiliares
│   ├── types/                   # Definições de tipos TypeScript
│   │   └── book.ts              # Interfaces relacionadas a livros
│   ├── App.tsx                  # Componente raiz da aplicação
│   └── main.tsx                 # Ponto de entrada da aplicação
│
├── public/                      # Assets estáticos
├── CLAUDE.md                    # Documentação para assistente AI
├── README.md                    # Documentação do projeto
├── package.json                 # Dependências e scripts Node.js
├── tsconfig.json                # Configuração TypeScript
├── vite.config.ts               # Configuração de build Vite
└── tailwind.config.ts           # Configuração TailwindCSS
```

## 🔌 Documentação da API

### API de Livros

| Método | Endpoint | Descrição | Parâmetros de Query |
|--------|----------|-----------|---------------------|
| `GET` | `/api/books` | Listar todos os livros | `search`, `status`, `formato`, `favorito`, `skip`, `limit` |
| `GET` | `/api/books/{id}` | Buscar livro por ID | - |
| `POST` | `/api/books` | Criar novo livro | - |
| `PUT` | `/api/books/{id}` | Atualizar livro | - |
| `DELETE` | `/api/books/{id}` | Deletar livro | - |
| `POST` | `/api/books/{id}/favorite` | Alternar status de favorito | - |

### API de Empréstimos

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `POST` | `/api/books/{id}/loan` | Criar novo empréstimo |
| `POST` | `/api/books/{id}/return` | Devolver livro emprestado |
| `GET` | `/api/loans/active` | Listar todos os empréstimos ativos |
| `GET` | `/api/books/{id}/history` | Obter histórico de empréstimos de um livro |

**Documentação Interativa Completa**: http://localhost:8000/docs

## 🛠️ Desenvolvimento

### Scripts Disponíveis

#### Scripts Frontend

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Iniciar servidor de desenvolvimento com hot reload |
| `npm run build` | Criar build otimizado de produção |
| `npm run build:dev` | Criar build de desenvolvimento |
| `npm run lint` | Executar análise de código ESLint |
| `npm run preview` | Visualizar build de produção localmente |

#### Scripts Backend

| Comando | Descrição |
|---------|-----------|
| `python main.py` | Iniciar servidor de desenvolvimento com auto-reload |
| `python seed_data.py` | Popular banco de dados com dados de exemplo |

### Variáveis de Ambiente

#### Backend (.env)
```env
DATABASE_URL=sqlite:///./biblioteca.db
CORS_ORIGINS=http://localhost:8080,http://localhost:5173
```

#### Frontend (.env)
```env
VITE_API_URL=http://localhost:8000
```

## 🏗️ Build de Produção

### Build de Produção Frontend

```bash
# Criar build otimizado de produção
npm run build

# A saída estará no diretório dist/
# Servir com qualquer servidor de arquivos estáticos
```

O build é otimizado e minificado para melhor performance. Todos os assets são devidamente empacotados e prontos para deploy.

### Deploy de Produção Backend

O backend está pronto para produção. Para deploy, use um servidor ASGI de produção:

```bash
# Instalar Gunicorn
pip install gunicorn

# Executar com Gunicorn
gunicorn main:app -w 4 -k uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000

# Ou usar Uvicorn diretamente
uvicorn main:app --host 0.0.0.0 --port 8000 --workers 4
```

**Considerações de Deploy:**
- Configure `DATABASE_URL` para seu banco de dados de produção
- Configure `CORS_ORIGINS` com seu domínio frontend
- Use variáveis de ambiente para configurações sensíveis
- Considere usar PostgreSQL para produção ao invés de SQLite
- Implemente logging e monitoramento adequados
- Configure certificados SSL/TLS para HTTPS

## 🧪 Testes

### Testes Backend
```bash
cd backend
pytest
```

### Testes Frontend
```bash
npm run test
```

> _Suítes de teste serão implementadas em versões futuras_

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests.

### Como Contribuir

1. **Faça Fork do Repositório**
   ```bash
   git clone https://github.com/reissbruno/biblioteca-bruno-reis.git
   ```

2. **Crie uma Branch de Feature**
   ```bash
   git checkout -b feature/MinhaNovaFeature
   ```

3. **Faça Suas Alterações**
   - Escreva código limpo e documentado
   - Siga o estilo de código existente
   - Adicione testes se aplicável

4. **Faça Commit das Suas Alterações**
   ```bash
   git commit -m 'feat: Adiciona alguma NovaFeature'
   ```

5. **Envie para Seu Fork**
   ```bash
   git push origin feature/MinhaNovaFeature
   ```

6. **Abra um Pull Request**
   - Forneça uma descrição clara das alterações
   - Referencie quaisquer issues relacionadas

### Convenção de Commits

Este projeto segue [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` Nova funcionalidade
- `fix:` Correção de bug
- `docs:` Mudanças na documentação
- `style:` Mudanças de estilo de código (formatação, etc.)
- `refactor:` Refatoração de código
- `test:` Adição ou atualização de testes
- `chore:` Tarefas de manutenção

## 📝 Licença

Este projeto está licenciado sob a Licença MIT. Veja o arquivo [LICENSE](LICENSE) para detalhes.

## 👤 Autor

**Bruno Reis**

[![GitHub](https://img.shields.io/badge/GitHub-reissbruno-181717?logo=github)](https://github.com/reissbruno)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-brunorreiss-0077B5?logo=linkedin)](https://www.linkedin.com/in/brunorreiss)

## 🙏 Agradecimentos

Este projeto foi construído usando tecnologias open-source incríveis:

- [React](https://reactjs.org/) - Biblioteca JavaScript para construir interfaces de usuário
- [FastAPI](https://fastapi.tiangolo.com/) - Framework web moderno e rápido para Python
- [shadcn/ui](https://ui.shadcn.com/) - Componentes lindamente projetados
- [TailwindCSS](https://tailwindcss.com/) - Framework CSS utility-first
- [Lucide](https://lucide.dev/) - Pacote de ícones consistente e bonito
- [Vite](https://vitejs.dev/) - Ferramenta frontend de próxima geração
- [SQLAlchemy](https://www.sqlalchemy.org/) - Toolkit SQL Python

Agradecimento especial à comunidade open-source por suas contribuições inestimáveis.

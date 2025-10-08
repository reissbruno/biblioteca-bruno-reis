# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal library management application for tracking physical and digital books, managing loans, and maintaining borrowing history. Full-stack application with:
- **Frontend**: React, TypeScript, Vite, shadcn/ui components
- **Backend**: Python FastAPI, SQLAlchemy, SQLite database

## Development Commands

### Frontend
```bash
# Install dependencies
npm install

# Start development server (http://localhost:8080)
npm run dev

# Build for production
npm run build

# Build for development mode
npm run build:dev

# Lint code
npm run lint

# Preview production build
npm preview
```

### Backend
```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment (Windows)
venv\Scripts\activate

# Activate virtual environment (Linux/Mac)
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Setup environment variables
cp .env.example .env

# Initialize database with seed data
python seed_data.py

# Start API server (http://localhost:8000)
python main.py

# Access API documentation
# http://localhost:8000/docs (Swagger UI)
```

## Architecture

### Backend Architecture (Python/FastAPI)

**Structure:**
- [backend/main.py](backend/main.py) - FastAPI application with REST endpoints
- [backend/models.py](backend/models.py) - SQLAlchemy database models (Book, Loan, LoanHistory)
- [backend/schemas.py](backend/schemas.py) - Pydantic schemas for request/response validation
- [backend/database.py](backend/database.py) - Database configuration and session management
- [backend/crud.py](backend/crud.py) - Database operations (CRUD functions)
- [backend/seed_data.py](backend/seed_data.py) - Database initialization with sample data

**API Endpoints:**
- `GET /api/books` - List books with filters (search, status, formato, favorito)
- `GET /api/books/{id}` - Get single book details
- `POST /api/books` - Create new book
- `PUT /api/books/{id}` - Update book
- `DELETE /api/books/{id}` - Delete book
- `POST /api/books/{id}/favorite` - Toggle favorite status
- `POST /api/books/{id}/loan` - Create loan
- `POST /api/books/{id}/return` - Return loaned book
- `GET /api/loans/active` - List active loans
- `GET /api/books/{id}/history` - Get loan history for book

**Database:**
- SQLite database (`biblioteca.db`)
- Three tables: `books`, `loans`, `loan_history`
- JSON columns for arrays (autores, tags)
- Foreign key relationships with cascade delete

### Frontend Architecture (React/TypeScript)

**State Management:**
- **Global State**: Managed in [App.tsx](src/App.tsx) using React useState
- **Book data**: Passed down through props to route components (Index, Emprestimos, Configuracoes)
- **Mock data**: Initial book data loaded from [src/lib/mockData.ts](src/lib/mockData.ts)
- **Note**: Frontend currently uses local state; needs integration with backend API

### Routing Structure
- `/` - Main library view (Index page) - browse, search, filter books
- `/emprestimos` - Active loans view with status tracking and return functionality
- `/configuracoes` - Settings page for data import/export
- `*` - 404 catch-all route

**Data Flow (Current - Local State):**
1. Book array state lives in [App.tsx](src/App.tsx)
2. State and setters passed to page components as props
3. Pages handle UI interactions and call state updaters

### Type Definitions
Core types in [src/types/book.ts](src/types/book.ts):
- `Book` - Main book entity with metadata, loan info, and history
- `Loan` - Active loan details
- `LoanHistory` - Completed loan record with delay tracking
- `BookStatus` - 'disponivel' | 'emprestado'
- `BookFormat` - 'fisico' | 'digital'

### Component Structure
- **Page components**: [src/pages/](src/pages/) - Index, Emprestimos, Configuracoes, NotFound
- **Feature components**: [src/components/](src/components/) - BookCard, BookFormDialog, LoanDialog, BookDetailModal, FilterBar, SearchBar
- **UI components**: [src/components/ui/](src/components/ui/) - shadcn/ui primitives
- **Utilities**: [src/lib/utils.ts](src/lib/utils.ts) - cn() for className merging

### Styling
- TailwindCSS with custom theme configuration in [tailwind.config.ts](tailwind.config.ts)
- CSS variables defined for theming (light/dark modes)
- Glass morphism effects via custom `.glass-strong` class
- Theme toggle using `next-themes` library

### Key Features
- **Search & Filters**: Search by title/author/publisher/tags, filter by status/format
- **Loan Management**: Track active loans, calculate overdue days, maintain history
- **Favorites**: Toggle favorite status on books
- **Toast Notifications**: Using Sonner for user feedback
- **Form Validation**: React Hook Form with Zod schemas in dialogs

## Important Notes

### General
- All book dates stored as ISO strings (e.g., "2025-10-07T10:00:00Z")
- Book IDs generated using timestamp (`Date.now().toString()` in frontend, `int(datetime.now().timestamp() * 1000)` in backend)
- Portuguese (pt-BR) locale used for date formatting in frontend

### Frontend
- Path alias `@/` resolves to `src/` directory
- Overdue calculation uses `date-fns` library functions
- Important: `handleReturn` logic duplicated in [App.tsx:19-55](src/App.tsx#L19) and [Index.tsx:134-171](src/pages/Index.tsx#L134) - when modifying return logic, update both locations

### Backend
- CORS configured in [backend/main.py](backend/main.py) - update `CORS_ORIGINS` in `.env` file
- Database file: `backend/biblioteca.db` (SQLite)
- API runs on port 8000 by default
- Overdue calculation uses `python-dateutil` library
- Snake_case used in database columns, camelCase in API responses (Pydantic handles conversion)

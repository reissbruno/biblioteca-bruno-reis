from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List, Optional
import os
from dotenv import load_dotenv

import models
import schemas
import crud
from database import engine, get_db, init_db

# Carregar variáveis de ambiente
load_dotenv()

# Criar tabelas
models.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Biblioteca API",
    description="API REST para gerenciamento de biblioteca pessoal",
    version="1.0.0"
)

# Configurar CORS
origins = os.getenv("CORS_ORIGINS", "http://localhost:8080").split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Health check
@app.get("/", tags=["Health"])
def read_root():
    return {"status": "ok", "message": "Biblioteca API está rodando"}


# Books Endpoints
@app.get("/api/books", response_model=List[schemas.BookResponse], tags=["Books"])
def list_books(
    skip: int = 0,
    limit: int = 100,
    search: Optional[str] = None,
    status: Optional[str] = None,
    formato: Optional[str] = None,
    favorito: Optional[bool] = None,
    db: Session = Depends(get_db)
):
    """Lista todos os livros com filtros opcionais"""
    books = crud.get_books(
        db, skip=skip, limit=limit, search=search,
        status=status, formato=formato, favorito=favorito
    )
    return books


@app.get("/api/books/{book_id}", response_model=schemas.BookResponse, tags=["Books"])
def get_book(book_id: str, db: Session = Depends(get_db)):
    """Busca um livro por ID"""
    book = crud.get_book(db, book_id)
    if not book:
        raise HTTPException(status_code=404, detail="Livro não encontrado")
    return book


@app.post("/api/books", response_model=schemas.BookResponse, status_code=status.HTTP_201_CREATED, tags=["Books"])
def create_book(book: schemas.BookCreate, db: Session = Depends(get_db)):
    """Cria um novo livro"""
    return crud.create_book(db, book)


@app.put("/api/books/{book_id}", response_model=schemas.BookResponse, tags=["Books"])
def update_book(book_id: str, book: schemas.BookUpdate, db: Session = Depends(get_db)):
    """Atualiza um livro existente"""
    updated_book = crud.update_book(db, book_id, book)
    if not updated_book:
        raise HTTPException(status_code=404, detail="Livro não encontrado")
    return updated_book


@app.delete("/api/books/{book_id}", status_code=status.HTTP_204_NO_CONTENT, tags=["Books"])
def delete_book(book_id: str, db: Session = Depends(get_db)):
    """Deleta um livro"""
    if not crud.delete_book(db, book_id):
        raise HTTPException(status_code=404, detail="Livro não encontrado")
    return None


@app.post("/api/books/{book_id}/favorite", response_model=schemas.BookResponse, tags=["Books"])
def toggle_favorite(book_id: str, db: Session = Depends(get_db)):
    """Alterna status de favorito de um livro"""
    book = crud.toggle_favorite(db, book_id)
    if not book:
        raise HTTPException(status_code=404, detail="Livro não encontrado")
    return book


# Loans Endpoints
@app.post("/api/books/{book_id}/loan", response_model=schemas.BookResponse, tags=["Loans"])
def create_loan(book_id: str, loan: schemas.LoanCreate, db: Session = Depends(get_db)):
    """Cria um empréstimo para um livro"""
    book = crud.create_loan(db, book_id, loan)
    if not book:
        raise HTTPException(
            status_code=400,
            detail="Livro não encontrado ou já está emprestado"
        )
    return book


@app.post("/api/books/{book_id}/return", response_model=schemas.BookResponse, tags=["Loans"])
def return_book(
    book_id: str,
    return_data: schemas.ReturnBookRequest,
    db: Session = Depends(get_db)
):
    """Registra devolução de um livro"""
    book = crud.return_book(db, book_id, return_data.data_devolucao)
    if not book:
        raise HTTPException(
            status_code=400,
            detail="Livro não encontrado ou não está emprestado"
        )
    return book


@app.get("/api/loans/active", response_model=List[schemas.BookResponse], tags=["Loans"])
def get_active_loans(db: Session = Depends(get_db)):
    """Lista todos os empréstimos ativos"""
    return crud.get_active_loans(db)


@app.get("/api/books/{book_id}/history", response_model=List[schemas.LoanHistoryResponse], tags=["Loans"])
def get_loan_history(book_id: str, db: Session = Depends(get_db)):
    """Busca histórico de empréstimos de um livro"""
    book = crud.get_book(db, book_id)
    if not book:
        raise HTTPException(status_code=404, detail="Livro não encontrado")
    return crud.get_loan_history(db, book_id)


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)

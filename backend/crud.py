from sqlalchemy.orm import Session
from sqlalchemy import or_
from typing import List, Optional
from datetime import datetime, timezone
import models
import schemas


# Book CRUD
def get_book(db: Session, book_id: str) -> Optional[models.Book]:
    """Busca um livro por ID"""
    return db.query(models.Book).filter(models.Book.id == book_id).first()


def get_books(
    db: Session,
    skip: int = 0,
    limit: int = 100,
    search: Optional[str] = None,
    status: Optional[str] = None,
    formato: Optional[str] = None,
    favorito: Optional[bool] = None
) -> List[models.Book]:
    """Lista livros com filtros opcionais"""
    query = db.query(models.Book)

    # Filtro de busca
    if search:
        search_filter = or_(
            models.Book.titulo.ilike(f"%{search}%"),
            models.Book.editora.ilike(f"%{search}%")
        )
        query = query.filter(search_filter)

    # Filtros
    if status and status != "todos":
        query = query.filter(models.Book.status == status)

    if formato and formato != "todos":
        query = query.filter(models.Book.formato == formato)

    if favorito is not None:
        query = query.filter(models.Book.favorito == favorito)

    return query.order_by(models.Book.atualizado_em.desc()).offset(skip).limit(limit).all()


def create_book(db: Session, book: schemas.BookCreate) -> models.Book:
    """Cria um novo livro"""
    db_book = models.Book(
        id=str(int(datetime.now(timezone.utc).timestamp() * 1000)),
        **book.model_dump(),
        status="disponivel",
        criado_em=datetime.now(timezone.utc),
        atualizado_em=datetime.now(timezone.utc)
    )
    db.add(db_book)
    db.commit()
    db.refresh(db_book)
    return db_book


def update_book(db: Session, book_id: str, book_update: schemas.BookUpdate) -> Optional[models.Book]:
    """Atualiza um livro existente"""
    db_book = get_book(db, book_id)
    if not db_book:
        return None

    update_data = book_update.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_book, key, value)

    db_book.atualizado_em = datetime.now(timezone.utc)
    db.commit()
    db.refresh(db_book)
    return db_book


def delete_book(db: Session, book_id: str) -> bool:
    """Deleta um livro"""
    db_book = get_book(db, book_id)
    if not db_book:
        return False

    db.delete(db_book)
    db.commit()
    return True


def toggle_favorite(db: Session, book_id: str) -> Optional[models.Book]:
    """Alterna status de favorito de um livro"""
    db_book = get_book(db, book_id)
    if not db_book:
        return None

    db_book.favorito = not db_book.favorito
    db_book.atualizado_em = datetime.now(timezone.utc)
    db.commit()
    db.refresh(db_book)
    return db_book


# Loan CRUD
def create_loan(db: Session, book_id: str, loan: schemas.LoanCreate) -> Optional[models.Book]:
    """Cria um empréstimo para um livro"""
    db_book = get_book(db, book_id)
    if not db_book or db_book.status == "emprestado":
        return None

    # Criar empréstimo
    db_loan = models.Loan(
        book_id=book_id,
        **loan.model_dump(),
        ativo=True
    )
    db.add(db_loan)

    # Atualizar status do livro
    db_book.status = "emprestado"
    db_book.atualizado_em = datetime.now(timezone.utc)

    db.commit()
    db.refresh(db_book)
    return db_book


def return_book(db: Session, book_id: str, data_devolucao: Optional[str] = None) -> Optional[models.Book]:
    """Registra devolução de um livro"""
    db_book = get_book(db, book_id)
    if not db_book or db_book.status != "emprestado":
        return None

    # Buscar empréstimo ativo
    loan = db.query(models.Loan).filter(
        models.Loan.book_id == book_id,
        models.Loan.ativo == True
    ).first()

    if not loan:
        return None

    # Calcular atraso
    if not data_devolucao:
        data_devolucao = datetime.now(timezone.utc).date().isoformat()

    atraso_dias = 0
    if loan.data_prevista_devolucao:
        from dateutil import parser
        data_prev = parser.parse(loan.data_prevista_devolucao).date()
        data_dev = parser.parse(data_devolucao).date()
        diff = (data_dev - data_prev).days
        atraso_dias = max(0, diff)

    # Criar histórico
    history = models.LoanHistory(
        book_id=book_id,
        para_quem=loan.para_quem,
        data_emprestimo=loan.data_emprestimo,
        data_devolucao=data_devolucao,
        observacoes=loan.observacoes,
        atraso_dias=atraso_dias
    )
    db.add(history)

    # Desativar empréstimo
    loan.ativo = False

    # Atualizar status do livro
    db_book.status = "disponivel"
    db_book.atualizado_em = datetime.now(timezone.utc)

    db.commit()
    db.refresh(db_book)
    return db_book


def get_active_loans(db: Session) -> List[models.Book]:
    """Lista todos os livros com empréstimos ativos"""
    return db.query(models.Book).filter(models.Book.status == "emprestado").all()


def get_loan_history(db: Session, book_id: str) -> List[models.LoanHistory]:
    """Busca histórico de empréstimos de um livro"""
    return db.query(models.LoanHistory).filter(
        models.LoanHistory.book_id == book_id
    ).order_by(models.LoanHistory.data_devolucao.desc()).all()

from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime


# Loan Schemas
class LoanBase(BaseModel):
    para_quem: str
    contato: Optional[str] = None
    data_emprestimo: str
    data_prevista_devolucao: Optional[str] = None
    observacoes: Optional[str] = None


class LoanCreate(LoanBase):
    pass


class LoanResponse(LoanBase):
    id: int
    book_id: str
    ativo: bool

    class Config:
        from_attributes = True


# LoanHistory Schemas
class LoanHistoryBase(BaseModel):
    para_quem: str
    data_emprestimo: str
    data_devolucao: str
    observacoes: Optional[str] = None
    atraso_dias: int = 0


class LoanHistoryResponse(LoanHistoryBase):
    id: int
    book_id: str

    class Config:
        from_attributes = True


# Book Schemas
class BookBase(BaseModel):
    titulo: str
    subtitulo: Optional[str] = None
    autores: List[str]
    editora: str
    paginas: int
    capa_url: Optional[str] = None
    formato: str  # 'fisico' ou 'digital'
    ano: Optional[int] = None
    edicao: Optional[str] = None
    isbn10: Optional[str] = None
    isbn13: Optional[str] = None
    idioma: str
    tags: List[str] = []
    sinopse: Optional[str] = None
    avaliacao: int = Field(default=0, ge=0, le=5)
    favorito: bool = False


class BookCreate(BookBase):
    pass


class BookUpdate(BaseModel):
    titulo: Optional[str] = None
    subtitulo: Optional[str] = None
    autores: Optional[List[str]] = None
    editora: Optional[str] = None
    paginas: Optional[int] = None
    capa_url: Optional[str] = None
    formato: Optional[str] = None
    ano: Optional[int] = None
    edicao: Optional[str] = None
    isbn10: Optional[str] = None
    isbn13: Optional[str] = None
    idioma: Optional[str] = None
    tags: Optional[List[str]] = None
    sinopse: Optional[str] = None
    avaliacao: Optional[int] = Field(default=None, ge=0, le=5)
    favorito: Optional[bool] = None


class BookResponse(BookBase):
    id: str
    status: str
    emprestimo_atual: Optional[LoanResponse] = None
    historico_emprestimos: List[LoanHistoryResponse] = []
    criado_em: datetime
    atualizado_em: datetime

    class Config:
        from_attributes = True


# Return Book Schema
class ReturnBookRequest(BaseModel):
    data_devolucao: Optional[str] = None  # ISO date string, usa data atual se não fornecido

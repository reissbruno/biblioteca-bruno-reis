from sqlalchemy import Column, String, Integer, Float, Boolean, DateTime, ForeignKey, Text, JSON
from sqlalchemy.orm import relationship
from datetime import datetime
from database import Base


class Book(Base):
    __tablename__ = "books"

    id = Column(String, primary_key=True, index=True)
    titulo = Column(String, nullable=False, index=True)
    subtitulo = Column(String, nullable=True)
    autores = Column(JSON, nullable=False)  # Lista de strings
    editora = Column(String, nullable=False)
    paginas = Column(Integer, nullable=False)
    capa_url = Column(String, nullable=True)
    formato = Column(String, nullable=False)  # 'fisico' ou 'digital'
    ano = Column(Integer, nullable=True)
    edicao = Column(String, nullable=True)
    isbn10 = Column(String, nullable=True)
    isbn13 = Column(String, nullable=True)
    idioma = Column(String, nullable=False)
    tags = Column(JSON, nullable=False)  # Lista de strings
    sinopse = Column(Text, nullable=True)
    avaliacao = Column(Integer, nullable=False, default=0)
    status = Column(String, nullable=False, default="disponivel")  # 'disponivel' ou 'emprestado'
    favorito = Column(Boolean, nullable=False, default=False)
    criado_em = Column(DateTime, nullable=False, default=datetime.utcnow)
    atualizado_em = Column(DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relacionamentos
    emprestimo_atual = relationship("Loan", back_populates="book", uselist=False,
                                   foreign_keys="Loan.book_id",
                                   primaryjoin="and_(Book.id==Loan.book_id, Loan.ativo==True)")
    historico_emprestimos = relationship("LoanHistory", back_populates="book", cascade="all, delete-orphan")
    loans = relationship("Loan", back_populates="book", cascade="all, delete-orphan",
                        foreign_keys="Loan.book_id",
                        overlaps="emprestimo_atual")


class Loan(Base):
    __tablename__ = "loans"

    id = Column(Integer, primary_key=True, index=True)
    book_id = Column(String, ForeignKey("books.id", ondelete="CASCADE"), nullable=False)
    para_quem = Column(String, nullable=False)
    contato = Column(String, nullable=True)
    data_emprestimo = Column(String, nullable=False)  # ISO date string
    data_prevista_devolucao = Column(String, nullable=True)  # ISO date string
    observacoes = Column(Text, nullable=True)
    ativo = Column(Boolean, nullable=False, default=True)

    # Relacionamentos
    book = relationship("Book", back_populates="loans", foreign_keys=[book_id], overlaps="emprestimo_atual")


class LoanHistory(Base):
    __tablename__ = "loan_history"

    id = Column(Integer, primary_key=True, index=True)
    book_id = Column(String, ForeignKey("books.id", ondelete="CASCADE"), nullable=False)
    para_quem = Column(String, nullable=False)
    data_emprestimo = Column(String, nullable=False)  # ISO date string
    data_devolucao = Column(String, nullable=False)  # ISO date string
    observacoes = Column(Text, nullable=True)
    atraso_dias = Column(Integer, nullable=False, default=0)

    # Relacionamentos
    book = relationship("Book", back_populates="historico_emprestimos")

"""
Script para popular o banco de dados com dados iniciais
"""
from datetime import datetime, timezone
from database import SessionLocal, init_db
import models


def seed_database():
    """Popula o banco de dados com livros de exemplo"""

    # Inicializar banco
    init_db()

    db = SessionLocal()

    try:
        # Verificar se já existem livros
        existing_books = db.query(models.Book).count()
        if existing_books > 0:
            print(f"Banco de dados já contém {existing_books} livros. Pulando seed.")
            return

        # Livros de exemplo
        books_data = [
            {
                "id": "1",
                "titulo": "Clean Code",
                "subtitulo": "A Handbook of Agile Software Craftsmanship",
                "autores": ["Robert C. Martin"],
                "editora": "Prentice Hall",
                "paginas": 464,
                "capa_url": "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=600&fit=crop",
                "formato": "fisico",
                "ano": 2008,
                "edicao": "1ª",
                "isbn13": "978-0132350884",
                "idioma": "Inglês",
                "tags": ["Programação", "Boas Práticas", "Software"],
                "sinopse": "Even bad code can function. But if code isn't clean, it can bring a development organization to its knees.",
                "avaliacao": 5,
                "status": "disponivel",
                "favorito": True,
                "criado_em": datetime.fromisoformat("2024-01-15T10:00:00"),
                "atualizado_em": datetime.fromisoformat("2024-01-15T10:00:00"),
            },
            {
                "id": "2",
                "titulo": "O Poder do Hábito",
                "subtitulo": "Por que fazemos o que fazemos na vida e nos negócios",
                "autores": ["Charles Duhigg"],
                "editora": "Objetiva",
                "paginas": 408,
                "capa_url": "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop",
                "formato": "fisico",
                "ano": 2012,
                "edicao": "1ª",
                "idioma": "Português",
                "tags": ["Autoajuda", "Psicologia", "Hábitos"],
                "sinopse": "Durante os últimos dois anos, uma jovem transformou quase todos os aspectos de sua vida.",
                "avaliacao": 4,
                "status": "emprestado",
                "favorito": False,
                "criado_em": datetime.fromisoformat("2024-02-10T14:30:00"),
                "atualizado_em": datetime.fromisoformat("2025-09-25T09:15:00"),
            },
            {
                "id": "3",
                "titulo": "Sapiens",
                "subtitulo": "Uma Breve História da Humanidade",
                "autores": ["Yuval Noah Harari"],
                "editora": "L&PM",
                "paginas": 464,
                "capa_url": "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400&h=600&fit=crop",
                "formato": "digital",
                "ano": 2015,
                "edicao": "1ª",
                "idioma": "Português",
                "tags": ["História", "Antropologia", "Filosofia"],
                "sinopse": "Na trilha de Armas, Germes e Aço, de Jared Diamond, este livro é uma narrativa emocionante da aventura humana.",
                "avaliacao": 5,
                "status": "disponivel",
                "favorito": True,
                "criado_em": datetime.fromisoformat("2024-03-05T16:20:00"),
                "atualizado_em": datetime.fromisoformat("2025-02-15T11:00:00"),
            },
            {
                "id": "4",
                "titulo": "Atomic Habits",
                "subtitulo": "An Easy & Proven Way to Build Good Habits & Break Bad Ones",
                "autores": ["James Clear"],
                "editora": "Avery",
                "paginas": 320,
                "capa_url": "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop",
                "formato": "fisico",
                "ano": 2018,
                "edicao": "1ª",
                "isbn13": "978-0735211292",
                "idioma": "Inglês",
                "tags": ["Autoajuda", "Produtividade", "Hábitos"],
                "sinopse": "No matter your goals, Atomic Habits offers a proven framework for improving every day.",
                "avaliacao": 5,
                "status": "disponivel",
                "favorito": True,
                "criado_em": datetime.fromisoformat("2024-04-12T09:45:00"),
                "atualizado_em": datetime.fromisoformat("2024-04-12T09:45:00"),
            },
            {
                "id": "5",
                "titulo": "Design Patterns",
                "subtitulo": "Elements of Reusable Object-Oriented Software",
                "autores": ["Erich Gamma", "Richard Helm", "Ralph Johnson", "John Vlissides"],
                "editora": "Addison-Wesley",
                "paginas": 416,
                "formato": "fisico",
                "ano": 1994,
                "edicao": "1ª",
                "isbn13": "978-0201633610",
                "idioma": "Inglês",
                "tags": ["Programação", "Design Patterns", "Arquitetura"],
                "sinopse": "Capturing a wealth of experience about the design of object-oriented software.",
                "avaliacao": 4,
                "status": "emprestado",
                "favorito": False,
                "criado_em": datetime.fromisoformat("2024-05-20T13:10:00"),
                "atualizado_em": datetime.fromisoformat("2025-08-15T10:30:00"),
            },
            {
                "id": "6",
                "titulo": "1984",
                "autores": ["George Orwell"],
                "editora": "Companhia das Letras",
                "paginas": 416,
                "capa_url": "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400&h=600&fit=crop",
                "formato": "fisico",
                "ano": 2009,
                "idioma": "Português",
                "tags": ["Ficção", "Distopia", "Clássicos"],
                "sinopse": "1984 é uma distopia do escritor inglês George Orwell que retrata uma sociedade totalitária.",
                "avaliacao": 5,
                "status": "disponivel",
                "favorito": True,
                "criado_em": datetime.fromisoformat("2024-06-08T15:25:00"),
                "atualizado_em": datetime.fromisoformat("2024-06-08T15:25:00"),
            },
        ]

        # Criar livros
        for book_data in books_data:
            book = models.Book(**book_data)
            db.add(book)

        # Criar empréstimo para "O Poder do Hábito"
        loan1 = models.Loan(
            book_id="2",
            para_quem="Maria Silva",
            contato="maria@email.com",
            data_emprestimo="2025-09-25",
            data_prevista_devolucao="2025-10-25",
            observacoes="Emprestado na reunião de equipe",
            ativo=True
        )
        db.add(loan1)

        # Criar empréstimo para "Design Patterns"
        loan2 = models.Loan(
            book_id="5",
            para_quem="Pedro Costa",
            contato=None,
            data_emprestimo="2025-08-15",
            data_prevista_devolucao="2025-09-15",
            observacoes="Empréstimo para estudo de padrões",
            ativo=True
        )
        db.add(loan2)

        # Criar histórico de empréstimo para "Sapiens"
        history1 = models.LoanHistory(
            book_id="3",
            para_quem="João Santos",
            data_emprestimo="2025-01-10",
            data_devolucao="2025-02-15",
            observacoes="Devolvido em perfeito estado",
            atraso_dias=0
        )
        db.add(history1)

        db.commit()
        print("✅ Banco de dados populado com sucesso!")
        print(f"   - {len(books_data)} livros criados")
        print(f"   - 2 empréstimos ativos")
        print(f"   - 1 registro de histórico")

    except Exception as e:
        print(f"❌ Erro ao popular banco de dados: {e}")
        db.rollback()
    finally:
        db.close()


if __name__ == "__main__":
    seed_database()

import { useState, useMemo, useEffect } from "react";
import { Book, BookFormat, BookStatus } from "@/types/book";
import { BookCard } from "@/components/BookCard";
import { SearchBar } from "@/components/SearchBar";
import { FilterBar } from "@/components/FilterBar";
import { ThemeToggle } from "@/components/ThemeToggle";
import { BookDetailModal } from "@/components/BookDetailModal";
import { LoanDialog } from "@/components/LoanDialog";
import { BookFormDialog } from "@/components/BookFormDialog";
import { Button } from "@/components/ui/button";
import { Plus, Library, BookOpen, List, Settings, LayoutGrid, ArrowUpDown } from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { api } from "@/lib/api";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type GridSize = "small" | "medium" | "large" | "xl";
type SortOption = "none" | "title-asc" | "title-desc" | "author-asc" | "author-desc";

const Index = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<BookStatus | "todos">("todos");
  const [formatFilter, setFormatFilter] = useState<BookFormat | "todos">("todos");
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [loanDialogOpen, setLoanDialogOpen] = useState(false);
  const [bookToLoan, setBookToLoan] = useState<Book | null>(null);
  const [bookFormOpen, setBookFormOpen] = useState(false);
  const [bookToEdit, setBookToEdit] = useState<Book | null>(null);
  const [gridSize, setGridSize] = useState<GridSize>("medium");
  const [sortOption, setSortOption] = useState<SortOption>("none");

  // Carregar livros
  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    try {
      setLoading(true);
      const data = await api.getBooks();
      setBooks(data);
    } catch (error) {
      toast.error("Erro ao carregar livros");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Filtros e busca (cliente-side)
  const filteredBooks = useMemo(() => {
    let result = books.filter((book) => {
      // Busca
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch =
        book.titulo.toLowerCase().includes(searchLower) ||
        book.autores.some((autor) => autor.toLowerCase().includes(searchLower)) ||
        book.editora.toLowerCase().includes(searchLower) ||
        book.tags.some((tag) => tag.toLowerCase().includes(searchLower));

      // Filtro de status
      const matchesStatus = statusFilter === "todos" || book.status === statusFilter;

      // Filtro de formato
      const matchesFormat = formatFilter === "todos" || book.formato === formatFilter;

      return matchesSearch && matchesStatus && matchesFormat;
    });

    // Ordenação
    if (sortOption !== "none") {
      result = [...result].sort((a, b) => {
        switch (sortOption) {
          case "title-asc":
            return a.titulo.localeCompare(b.titulo, "pt-BR");
          case "title-desc":
            return b.titulo.localeCompare(a.titulo, "pt-BR");
          case "author-asc":
            return a.autores[0]?.localeCompare(b.autores[0] || "", "pt-BR") || 0;
          case "author-desc":
            return b.autores[0]?.localeCompare(a.autores[0] || "", "pt-BR") || 0;
          default:
            return 0;
        }
      });
    }

    return result;
  }, [books, searchQuery, statusFilter, formatFilter, sortOption]);

  const handleViewDetails = (book: Book) => {
    setSelectedBook(book);
    setDetailModalOpen(true);
  };

  const handleEdit = (book: Book) => {
    setBookToEdit(book);
    setBookFormOpen(true);
    setDetailModalOpen(false);
  };

  const handleNewBook = () => {
    setBookToEdit(null);
    setBookFormOpen(true);
  };

  const handleSaveBook = async (bookData: Partial<Book>) => {
    try {
      if (bookToEdit) {
        // Editar livro existente
        await api.updateBook(bookToEdit.id, bookData);
        toast.success("Livro atualizado com sucesso");
      } else {
        // Adicionar novo livro
        await api.createBook(bookData);
        toast.success("Livro cadastrado com sucesso");
      }
      await loadBooks();
      setBookFormOpen(false);
      setBookToEdit(null);
    } catch (error) {
      toast.error("Erro ao salvar livro");
      console.error(error);
    }
  };

  const handleToggleFavorite = async (book: Book) => {
    try {
      await api.toggleFavorite(book.id);
      toast.success(book.favorito ? "Removido dos favoritos" : "Adicionado aos favoritos");
      await loadBooks();
    } catch (error) {
      toast.error("Erro ao atualizar favorito");
      console.error(error);
    }
  };

  const handleOpenLoanDialog = (book: Book) => {
    setBookToLoan(book);
    setLoanDialogOpen(true);
  };

  const handleLoan = async (book: Book, loanData: any) => {
    try {
      await api.createLoan(book.id, loanData);
      toast.success(`Livro emprestado para ${loanData.paraQuem}`);
      await loadBooks();
      setLoanDialogOpen(false);
      setBookToLoan(null);
    } catch (error) {
      toast.error("Erro ao criar empréstimo");
      console.error(error);
    }
  };

  const handleReturn = async (book: Book) => {
    if (!book.emprestimoAtual) return;

    try {
      await api.returnBook(book.id);
      toast.success("Livro devolvido com sucesso");
      await loadBooks();
    } catch (error) {
      toast.error("Erro ao devolver livro");
      console.error(error);
    }
  };

  const handleDelete = async (book: Book) => {
    if (!confirm(`Tem certeza que deseja deletar "${book.titulo}"?`)) return;

    try {
      await api.deleteBook(book.id);
      toast.success("Livro deletado com sucesso");
      await loadBooks();
    } catch (error) {
      toast.error("Erro ao deletar livro");
      console.error(error);
    }
  };

  const stats = {
    total: books.length,
    disponivel: books.filter((b) => b.status === "disponivel").length,
    emprestado: books.filter((b) => b.status === "emprestado").length,
    favoritos: books.filter((b) => b.favorito).length,
  };

  const gridSizeClasses = {
    small: "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6",
    medium: "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
    large: "sm:grid-cols-2 lg:grid-cols-3",
    xl: "sm:grid-cols-1 md:grid-cols-2",
  };

  const gridSizeLabels = {
    small: "Pequeno",
    medium: "Médio",
    large: "Grande",
    xl: "Extra Grande",
  };

  const sortLabels = {
    none: "Sem ordenação",
    "title-asc": "Título (A-Z)",
    "title-desc": "Título (Z-A)",
    "author-asc": "Autor (A-Z)",
    "author-desc": "Autor (Z-A)",
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="glass-strong sticky top-0 z-50 border-b border-border">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <Library className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-2xl font-bold">Biblioteca do Bruno Reis</h1>
              <p className="text-sm text-muted-foreground">
                {stats.total} {stats.total === 1 ? "livro" : "livros"} • {stats.disponivel}{" "}
                {stats.disponivel === 1 ? "disponível" : "disponíveis"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/emprestimos">
              <Button variant="outline">
                <List className="mr-2 h-4 w-4" />
                Empréstimos
              </Button>
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" aria-label="Ordenar">
                  <ArrowUpDown className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {(Object.keys(sortLabels) as SortOption[]).map((option) => (
                  <DropdownMenuItem
                    key={option}
                    onClick={() => setSortOption(option)}
                    className={sortOption === option ? "bg-accent" : ""}
                  >
                    {sortLabels[option]}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" aria-label="Tamanho da grade">
                  <LayoutGrid className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {(Object.keys(gridSizeClasses) as GridSize[]).map((size) => (
                  <DropdownMenuItem
                    key={size}
                    onClick={() => setGridSize(size)}
                    className={gridSize === size ? "bg-accent" : ""}
                  >
                    {gridSizeLabels[size]}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <Link to="/configuracoes">
              <Button variant="ghost" size="icon" aria-label="Configurações">
                <Settings className="h-5 w-5" />
              </Button>
            </Link>
            <Button onClick={handleNewBook}>
              <Plus className="mr-2 h-4 w-4" />
              Novo Livro
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Busca e Filtros */}
        <div className="mb-8 space-y-4">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
          <FilterBar
            statusFilter={statusFilter}
            formatFilter={formatFilter}
            onStatusChange={setStatusFilter}
            onFormatChange={setFormatFilter}
          />
        </div>

        {/* Grid de Livros */}
        {loading ? (
          <div className="flex min-h-[400px] items-center justify-center">
            <p className="text-muted-foreground">Carregando livros...</p>
          </div>
        ) : filteredBooks.length > 0 ? (
          <div className={`grid gap-6 ${gridSizeClasses[gridSize]}`}>
            {filteredBooks.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                onViewDetails={handleViewDetails}
                onEdit={handleEdit}
                onToggleFavorite={handleToggleFavorite}
                onLoan={handleOpenLoanDialog}
                onReturn={handleReturn}
                onDelete={handleDelete}
              />
            ))}
          </div>
        ) : (
          <div className="flex min-h-[400px] flex-col items-center justify-center text-center">
            <BookOpen className="mb-4 h-16 w-16 text-muted-foreground" />
            <h3 className="mb-2 text-xl font-semibold">Nenhum livro encontrado</h3>
            <p className="text-muted-foreground">
              {searchQuery
                ? "Tente ajustar sua busca ou filtros"
                : "Comece adicionando seu primeiro livro à biblioteca"}
            </p>
          </div>
        )}
      </main>

      {/* Modals */}
      <BookDetailModal
        book={selectedBook}
        open={detailModalOpen}
        onOpenChange={setDetailModalOpen}
        onEdit={handleEdit}
        onToggleFavorite={handleToggleFavorite}
        onLoan={handleOpenLoanDialog}
        onReturn={handleReturn}
      />

      <LoanDialog
        book={bookToLoan}
        open={loanDialogOpen}
        onOpenChange={setLoanDialogOpen}
        onConfirm={handleLoan}
      />

      <BookFormDialog
        book={bookToEdit}
        open={bookFormOpen}
        onOpenChange={setBookFormOpen}
        onSave={handleSaveBook}
      />
    </div>
  );
};

export default Index;

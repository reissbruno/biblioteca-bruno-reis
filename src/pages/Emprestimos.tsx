import { useState, useMemo, useEffect } from "react";
import { Book } from "@/types/book";
import { GlassCard } from "@/components/GlassCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/ThemeToggle";
import { SearchBar } from "@/components/SearchBar";
import {
  Library,
  Calendar,
  User,
  Phone,
  ArrowLeft,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { Link } from "react-router-dom";
import { format, differenceInDays } from "date-fns";
import { ptBR } from "date-fns/locale";
import { api } from "@/lib/api";
import { toast } from "sonner";

const Emprestimos = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    loadActiveLoans();
  }, []);

  const loadActiveLoans = async () => {
    try {
      setLoading(true);
      const data = await api.getActiveLoans();
      setBooks(data);
    } catch (error) {
      toast.error("Erro ao carregar empréstimos");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const emprestados = useMemo(() => {
    return books.filter((book) => {
      const searchLower = searchQuery.toLowerCase();
      return (
        book.titulo.toLowerCase().includes(searchLower) ||
        book.emprestimoAtual?.paraQuem.toLowerCase().includes(searchLower)
      );
    });
  }, [books, searchQuery]);

  const getStatusInfo = (book: Book) => {
    if (!book.emprestimoAtual?.dataPrevistaDevolucao) {
      return { status: "normal", daysLeft: null, isOverdue: false };
    }

    const hoje = new Date();
    const dataPrevista = new Date(book.emprestimoAtual.dataPrevistaDevolucao);
    const daysLeft = differenceInDays(dataPrevista, hoje);

    return {
      status: daysLeft < 0 ? "overdue" : daysLeft <= 3 ? "warning" : "normal",
      daysLeft,
      isOverdue: daysLeft < 0,
    };
  };

  const handleReturn = async (book: Book) => {
    if (!book.emprestimoAtual) return;

    try {
      await api.returnBook(book.id);
      toast.success("Livro devolvido com sucesso");
      await loadActiveLoans();
    } catch (error) {
      toast.error("Erro ao devolver livro");
      console.error(error);
    }
  };

  const stats = {
    total: emprestados.length,
    atrasados: emprestados.filter((b) => getStatusInfo(b).isOverdue).length,
    proximoVencimento: emprestados.filter(
      (b) => getStatusInfo(b).status === "warning"
    ).length,
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="glass-strong sticky top-0 z-50 border-b border-border">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <Link to="/">
              <Button variant="ghost" size="icon" aria-label="Voltar">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <Library className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-2xl font-bold">Empréstimos Ativos</h1>
              <p className="text-sm text-muted-foreground">
                {stats.total} {stats.total === 1 ? "livro emprestado" : "livros emprestados"}
                {stats.atrasados > 0 && ` • ${stats.atrasados} atrasado${stats.atrasados > 1 ? "s" : ""}`}
              </p>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Busca */}
        <div className="mb-6">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Busque por livro ou pessoa..."
          />
        </div>

        {/* Stats */}
        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          <GlassCard className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Emprestados</p>
                <p className="text-3xl font-bold">{stats.total}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-primary" />
            </div>
          </GlassCard>

          <GlassCard className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Próximo Vencimento</p>
                <p className="text-3xl font-bold text-warning">{stats.proximoVencimento}</p>
              </div>
              <AlertCircle className="h-8 w-8 text-warning" />
            </div>
          </GlassCard>

          <GlassCard className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Atrasados</p>
                <p className="text-3xl font-bold text-destructive">{stats.atrasados}</p>
              </div>
              <AlertCircle className="h-8 w-8 text-destructive" />
            </div>
          </GlassCard>
        </div>

        {/* Lista de Empréstimos */}
        {loading ? (
          <div className="flex min-h-[400px] items-center justify-center">
            <p className="text-muted-foreground">Carregando empréstimos...</p>
          </div>
        ) : emprestados.length > 0 ? (
          <div className="space-y-4">
            {emprestados.map((book) => {
              const statusInfo = getStatusInfo(book);
              const emprestimo = book.emprestimoAtual!;

              return (
                <GlassCard key={book.id} className="p-6">
                  <div className="flex flex-col gap-4 md:flex-row md:items-start">
                    {/* Capa */}
                    <div className="flex-shrink-0">
                      <div className="relative h-32 w-24 overflow-hidden rounded-lg bg-muted">
                        {book.capaUrl ? (
                          <img
                            src={book.capaUrl}
                            alt={`Capa de ${book.titulo}`}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center">
                            <Library className="h-8 w-8 text-muted-foreground" />
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Informações */}
                    <div className="flex-1">
                      <div className="mb-2 flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-semibold">{book.titulo}</h3>
                          <p className="text-sm text-muted-foreground">
                            {book.autores.join(", ")}
                          </p>
                        </div>
                        <Badge
                          variant={
                            statusInfo.isOverdue
                              ? "destructive"
                              : statusInfo.status === "warning"
                              ? "default"
                              : "secondary"
                          }
                          className={
                            statusInfo.status === "warning"
                              ? "bg-warning text-warning-foreground"
                              : ""
                          }
                        >
                          {statusInfo.isOverdue
                            ? `${Math.abs(statusInfo.daysLeft!)} dias de atraso`
                            : statusInfo.daysLeft !== null
                            ? `${statusInfo.daysLeft} dias restantes`
                            : "Sem prazo"}
                        </Badge>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">Para:</span>
                          <span>{emprestimo.paraQuem}</span>
                        </div>

                        {emprestimo.contato && (
                          <div className="flex items-center gap-2 text-sm">
                            <Phone className="h-4 w-4 text-muted-foreground" />
                            <span>{emprestimo.contato}</span>
                          </div>
                        )}

                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">Emprestado em:</span>
                          <span>
                            {format(new Date(emprestimo.dataEmprestimo), "dd 'de' MMMM 'de' yyyy", {
                              locale: ptBR,
                            })}
                          </span>
                        </div>

                        {emprestimo.dataPrevistaDevolucao && (
                          <div className="flex items-center gap-2 text-sm">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium">Devolução prevista:</span>
                            <span>
                              {format(
                                new Date(emprestimo.dataPrevistaDevolucao),
                                "dd 'de' MMMM 'de' yyyy",
                                { locale: ptBR }
                              )}
                            </span>
                          </div>
                        )}

                        {emprestimo.observacoes && (
                          <p className="text-sm text-muted-foreground">
                            {emprestimo.observacoes}
                          </p>
                        )}
                      </div>

                      <div className="mt-4">
                        <Button onClick={() => handleReturn(book)} size="sm">
                          Registrar Devolução
                        </Button>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              );
            })}
          </div>
        ) : (
          <div className="flex min-h-[400px] flex-col items-center justify-center text-center">
            <CheckCircle className="mb-4 h-16 w-16 text-muted-foreground" />
            <h3 className="mb-2 text-xl font-semibold">
              {searchQuery ? "Nenhum empréstimo encontrado" : "Nenhum livro emprestado"}
            </h3>
            <p className="text-muted-foreground">
              {searchQuery
                ? "Tente ajustar sua busca"
                : "Todos os livros estão disponíveis na biblioteca"}
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Emprestimos;

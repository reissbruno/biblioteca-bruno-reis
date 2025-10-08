import { useState, useEffect } from "react";
import { GlassCard } from "@/components/GlassCard";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Library, ArrowLeft, Download, Upload, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { api } from "@/lib/api";
import { Book } from "@/types/book";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const Configuracoes = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    try {
      setLoading(true);
      const data = await api.getBooks();
      setBooks(data);
    } catch (error) {
      toast.error("Erro ao carregar dados");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const handleExport = () => {
    const data = {
      books,
      exportedAt: new Date().toISOString(),
      version: "1.0",
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `biblioteca-backup-${new Date().toISOString().split("T")[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);

    toast.success("Backup exportado com sucesso!");
  };

  const handleImportClick = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "application/json";
    input.onchange = async (e: any) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = async (event: any) => {
          try {
            const data = JSON.parse(event.target.result);
            if (data.books && Array.isArray(data.books)) {
              // Importar cada livro via API
              let imported = 0;
              for (const book of data.books) {
                try {
                  await api.createBook(book);
                  imported++;
                } catch (error) {
                  console.error("Erro ao importar livro:", book.titulo, error);
                }
              }
              await loadBooks();
              toast.success(`${imported} livros importados com sucesso!`);
            } else {
              toast.error("Formato de arquivo inválido");
            }
          } catch (error) {
            toast.error("Erro ao ler o arquivo");
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const handleClearAll = async () => {
    try {
      // Deletar todos os livros
      for (const book of books) {
        await api.deleteBook(book.id);
      }
      await loadBooks();
      toast.success("Todos os dados foram removidos");
    } catch (error) {
      toast.error("Erro ao limpar dados");
      console.error(error);
    }
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
              <h1 className="text-2xl font-bold">Configurações</h1>
              <p className="text-sm text-muted-foreground">
                Gerencie suas preferências e dados
              </p>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto max-w-4xl px-4 py-8">
        <div className="space-y-6">
          {/* Aparência */}
          <GlassCard className="p-6">
            <h2 className="mb-4 text-xl font-semibold">Aparência</h2>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Tema</p>
                <p className="text-sm text-muted-foreground">
                  Alterne entre modo claro e escuro
                </p>
              </div>
              <ThemeToggle />
            </div>
          </GlassCard>

          {/* Dados e Backup */}
          <GlassCard className="p-6">
            <h2 className="mb-4 text-xl font-semibold">Dados e Backup</h2>
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="font-medium">Exportar Dados</p>
                  <p className="text-sm text-muted-foreground">
                    Baixe um backup de toda a sua biblioteca em formato JSON
                  </p>
                </div>
                <Button onClick={handleExport} variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Exportar
                </Button>
              </div>

              <div className="border-t border-border pt-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="font-medium">Importar Dados</p>
                    <p className="text-sm text-muted-foreground">
                      Restaure um backup anterior ou importe dados de outra biblioteca
                    </p>
                  </div>
                  <Button onClick={handleImportClick} variant="outline">
                    <Upload className="mr-2 h-4 w-4" />
                    Importar
                  </Button>
                </div>
              </div>

              <div className="border-t border-border pt-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="font-medium text-destructive">Limpar Todos os Dados</p>
                    <p className="text-sm text-muted-foreground">
                      Remove todos os livros da biblioteca. Esta ação não pode ser desfeita.
                    </p>
                  </div>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Limpar Tudo
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="glass-strong">
                      <AlertDialogHeader>
                        <AlertDialogTitle>Tem certeza absoluta?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Esta ação não pode ser desfeita. Todos os seus livros e históricos de
                          empréstimos serão permanentemente removidos.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={handleClearAll}
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                          Sim, limpar tudo
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </div>
          </GlassCard>

          {/* Estatísticas */}
          <GlassCard className="p-6">
            <h2 className="mb-4 text-xl font-semibold">Estatísticas</h2>
            {loading ? (
              <p className="text-muted-foreground">Carregando...</p>
            ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-sm text-muted-foreground">Total de Livros</p>
                <p className="text-2xl font-bold">{books.length}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Livros Físicos</p>
                <p className="text-2xl font-bold">
                  {books.filter((b) => b.formato === "fisico").length}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Livros Digitais</p>
                <p className="text-2xl font-bold">
                  {books.filter((b) => b.formato === "digital").length}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Favoritos</p>
                <p className="text-2xl font-bold">{books.filter((b) => b.favorito).length}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total de Empréstimos</p>
                <p className="text-2xl font-bold">
                  {books.reduce((acc, b) => acc + b.historicoEmprestimos.length, 0)}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Páginas Totais</p>
                <p className="text-2xl font-bold">
                  {books.reduce((acc, b) => acc + b.paginas, 0).toLocaleString()}
                </p>
              </div>
            </div>
            )}
          </GlassCard>

          {/* Sobre */}
          <GlassCard className="p-6">
            <h2 className="mb-4 text-xl font-semibold">Sobre</h2>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>
                <span className="font-medium text-foreground">Biblioteca do Bruno Reis</span>
              </p>
              <p>Versão 1.0.0</p>
              <p>
                Sistema de gerenciamento pessoal de livros com controle de empréstimos e
                histórico completo.
              </p>
              <p className="mt-4">
                Desenvolvido com React, TypeScript, Tailwind CSS e design Apple-like minimalista.
              </p>
            </div>
          </GlassCard>
        </div>
      </main>
    </div>
  );
};

export default Configuracoes;

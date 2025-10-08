import { Book } from "@/types/book";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Edit, Heart, BookOpen, Calendar, User, Package, Hash } from "lucide-react";
import { GlassCard } from "./GlassCard";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface BookDetailModalProps {
  book: Book | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEdit: (book: Book) => void;
  onToggleFavorite: (book: Book) => void;
  onLoan: (book: Book) => void;
  onReturn: (book: Book) => void;
}

export const BookDetailModal = ({
  book,
  open,
  onOpenChange,
  onEdit,
  onToggleFavorite,
  onLoan,
  onReturn,
}: BookDetailModalProps) => {
  if (!book) return null;

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
    } catch {
      return dateString;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass-strong max-h-[90vh] max-w-4xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{book.titulo}</DialogTitle>
          {book.subtitulo && (
            <p className="text-muted-foreground">{book.subtitulo}</p>
          )}
        </DialogHeader>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Capa */}
          <div className="md:col-span-1">
            <GlassCard className="overflow-hidden">
              <div className="relative aspect-[2/3] w-full bg-muted">
                {book.capaUrl ? (
                  <img
                    src={book.capaUrl}
                    alt={`Capa do livro ${book.titulo}`}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <BookOpen className="h-24 w-24 text-muted-foreground" />
                  </div>
                )}
              </div>
            </GlassCard>

            {/* Ações principais */}
            <div className="mt-4 space-y-2">
              <Button className="w-full" onClick={() => onEdit(book)}>
                <Edit className="mr-2 h-4 w-4" />
                Editar
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => onToggleFavorite(book)}
              >
                <Heart
                  className={`mr-2 h-4 w-4 ${
                    book.favorito ? "fill-destructive text-destructive" : ""
                  }`}
                />
                {book.favorito ? "Remover dos favoritos" : "Favoritar"}
              </Button>
              {book.status === "disponivel" ? (
                <Button variant="outline" className="w-full" onClick={() => onLoan(book)}>
                  Emprestar
                </Button>
              ) : (
                <Button variant="outline" className="w-full" onClick={() => onReturn(book)}>
                  Devolver
                </Button>
              )}
            </div>
          </div>

          {/* Informações */}
          <div className="md:col-span-2">
            <GlassCard className="p-6">
              {/* Status e avaliação */}
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <Badge
                  variant={book.status === "disponivel" ? "default" : "secondary"}
                  className={
                    book.status === "disponivel"
                      ? "bg-success text-success-foreground"
                      : "bg-warning text-warning-foreground"
                  }
                >
                  {book.status === "disponivel" ? "Disponível" : "Emprestado"}
                </Badge>
                {book.avaliacao > 0 && (
                  <Badge variant="outline">
                    ⭐ {book.avaliacao}/5
                  </Badge>
                )}
                <Badge variant="outline">{book.formato === "fisico" ? "Físico" : "Digital"}</Badge>
              </div>

              {/* Metadados */}
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <User className="mt-0.5 h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Autor(es)</p>
                    <p className="text-sm text-muted-foreground">{book.autores.join(", ")}</p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Package className="mt-0.5 h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Editora</p>
                    <p className="text-sm text-muted-foreground">
                      {book.editora}
                      {book.edicao && ` • ${book.edicao} edição`}
                      {book.ano && ` • ${book.ano}`}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <BookOpen className="mt-0.5 h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Páginas</p>
                    <p className="text-sm text-muted-foreground">{book.paginas}</p>
                  </div>
                </div>

                {(book.isbn10 || book.isbn13) && (
                  <div className="flex items-start gap-2">
                    <Hash className="mt-0.5 h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">ISBN</p>
                      <p className="text-sm text-muted-foreground">
                        {book.isbn13 || book.isbn10}
                      </p>
                    </div>
                  </div>
                )}

                {book.idioma && (
                  <div>
                    <p className="text-sm font-medium">Idioma</p>
                    <p className="text-sm text-muted-foreground">{book.idioma}</p>
                  </div>
                )}

                {/* Tags */}
                {book.tags.length > 0 && (
                  <div>
                    <p className="mb-2 text-sm font-medium">Tags</p>
                    <div className="flex flex-wrap gap-1">
                      {book.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Sinopse */}
                {book.sinopse && (
                  <div>
                    <p className="mb-2 text-sm font-medium">Sinopse</p>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {book.sinopse}
                    </p>
                  </div>
                )}
              </div>
            </GlassCard>

            {/* Empréstimo atual */}
            {book.emprestimoAtual && (
              <GlassCard className="mt-4 p-6">
                <h4 className="mb-3 text-lg font-semibold">Empréstimo Atual</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">
                      <span className="font-medium">Para:</span> {book.emprestimoAtual.paraQuem}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">
                      <span className="font-medium">Emprestado em:</span>{" "}
                      {formatDate(book.emprestimoAtual.dataEmprestimo)}
                    </span>
                  </div>
                  {book.emprestimoAtual.dataPrevistaDevolucao && (
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">
                        <span className="font-medium">Devolução prevista:</span>{" "}
                        {formatDate(book.emprestimoAtual.dataPrevistaDevolucao)}
                      </span>
                    </div>
                  )}
                  {book.emprestimoAtual.observacoes && (
                    <p className="text-sm text-muted-foreground">
                      {book.emprestimoAtual.observacoes}
                    </p>
                  )}
                </div>
              </GlassCard>
            )}

            {/* Histórico */}
            {book.historicoEmprestimos.length > 0 && (
              <GlassCard className="mt-4 p-6">
                <h4 className="mb-3 text-lg font-semibold">Histórico de Empréstimos</h4>
                <div className="space-y-3">
                  {book.historicoEmprestimos.map((emprestimo, index) => (
                    <div key={index} className="border-b border-border pb-3 last:border-0">
                      <p className="font-medium">{emprestimo.paraQuem}</p>
                      <p className="text-sm text-muted-foreground">
                        {formatDate(emprestimo.dataEmprestimo)} →{" "}
                        {formatDate(emprestimo.dataDevolucao)}
                        {emprestimo.atrasoDias > 0 && (
                          <span className="ml-2 text-destructive">
                            ({emprestimo.atrasoDias} dias de atraso)
                          </span>
                        )}
                      </p>
                      {emprestimo.observacoes && (
                        <p className="text-sm text-muted-foreground">{emprestimo.observacoes}</p>
                      )}
                    </div>
                  ))}
                </div>
              </GlassCard>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

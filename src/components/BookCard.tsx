import { Book } from "@/types/book";
import { GlassCard } from "./GlassCard";
import { Badge } from "./ui/badge";
import { BookOpen, Heart, MoreVertical, Edit, Eye, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface BookCardProps {
  book: Book;
  onViewDetails: (book: Book) => void;
  onEdit: (book: Book) => void;
  onToggleFavorite: (book: Book) => void;
  onLoan: (book: Book) => void;
  onReturn: (book: Book) => void;
  onDelete: (book: Book) => void;
}

export const BookCard = ({
  book,
  onViewDetails,
  onEdit,
  onToggleFavorite,
  onLoan,
  onReturn,
  onDelete,
}: BookCardProps) => {
  const isOverdue = () => {
    if (!book.emprestimoAtual?.dataPrevistaDevolucao) return false;
    return new Date(book.emprestimoAtual.dataPrevistaDevolucao) < new Date();
  };

  return (
    <GlassCard hover className="group overflow-hidden">
      {/* Imagem */}
      <div className="relative aspect-[2/3] w-full overflow-hidden bg-muted">
        {book.capaUrl ? (
          <img
            src={book.capaUrl}
            alt={`Capa do livro ${book.titulo}`}
            className="h-full w-full object-cover transition-smooth group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <BookOpen className="h-16 w-16 text-muted-foreground" />
          </div>
        )}
        
        {/* Favorito badge */}
        {book.favorito && (
          <div className="absolute right-2 top-2">
            <Badge variant="secondary" className="glass-strong gap-1">
              <Heart className="h-3 w-3 fill-destructive text-destructive" />
            </Badge>
          </div>
        )}

        {/* Status badge */}
        <div className="absolute bottom-2 left-2">
          <Badge
            variant={book.status === "disponivel" ? "default" : "secondary"}
            className={
              book.status === "disponivel"
                ? "bg-success text-success-foreground"
                : isOverdue()
                ? "bg-destructive text-destructive-foreground"
                : "bg-warning text-warning-foreground"
            }
          >
            {book.status === "disponivel"
              ? "Disponível"
              : isOverdue()
              ? "Atrasado"
              : "Emprestado"}
          </Badge>
        </div>
      </div>

      {/* Conteúdo */}
      <div className="p-4">
        <h3 className="line-clamp-2 text-lg font-semibold leading-tight">
          {book.titulo}
        </h3>
        <p className="mt-1 line-clamp-1 text-sm text-muted-foreground">
          {book.autores.join(", ")}
        </p>
        <p className="mt-0.5 text-xs text-muted-foreground">
          {book.editora} • {book.paginas} pág.
        </p>

        {/* Tags */}
        {book.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1">
            {book.tags.slice(0, 2).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
            {book.tags.length > 2 && (
              <Badge variant="outline" className="text-xs">
                +{book.tags.length - 2}
              </Badge>
            )}
          </div>
        )}

        {/* Empréstimo info */}
        {book.emprestimoAtual && (
          <p className="mt-3 text-xs text-muted-foreground">
            Para: <span className="font-medium">{book.emprestimoAtual.paraQuem}</span>
          </p>
        )}

        {/* Ações */}
        <div className="mt-4 flex gap-2">
          <Button
            size="sm"
            variant="outline"
            className="flex-1"
            onClick={() => onViewDetails(book)}
          >
            <Eye className="mr-1 h-4 w-4" />
            Detalhes
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => onEdit(book)}
            aria-label="Editar livro"
          >
            <Edit className="h-4 w-4" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="sm" variant="ghost" aria-label="Mais opções">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onToggleFavorite(book)}>
                {book.favorito ? "Remover dos favoritos" : "Adicionar aos favoritos"}
              </DropdownMenuItem>
              {book.status === "disponivel" ? (
                <DropdownMenuItem onClick={() => onLoan(book)}>
                  Emprestar
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem onClick={() => onReturn(book)}>
                  Devolver
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => onDelete(book)}
                className="text-destructive focus:text-destructive"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Deletar livro
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </GlassCard>
  );
};

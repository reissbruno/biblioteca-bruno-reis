import { Book, BookFormat } from "@/types/book";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { X, Plus } from "lucide-react";
import { Badge } from "./ui/badge";

interface BookFormDialogProps {
  book?: Book | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (bookData: Partial<Book>) => void;
}

export const BookFormDialog = ({ book, open, onOpenChange, onSave }: BookFormDialogProps) => {
  const [formData, setFormData] = useState({
    titulo: "",
    subtitulo: "",
    autores: [""],
    editora: "",
    paginas: 0,
    capaUrl: "",
    formato: "fisico" as BookFormat,
    ano: new Date().getFullYear(),
    edicao: "",
    isbn10: "",
    isbn13: "",
    idioma: "Português",
    tags: [] as string[],
    sinopse: "",
    avaliacao: 0,
  });

  const [newTag, setNewTag] = useState("");

  useEffect(() => {
    if (book) {
      setFormData({
        titulo: book.titulo,
        subtitulo: book.subtitulo || "",
        autores: book.autores.length > 0 ? book.autores : [""],
        editora: book.editora,
        paginas: book.paginas,
        capaUrl: book.capaUrl || "",
        formato: book.formato,
        ano: book.ano || new Date().getFullYear(),
        edicao: book.edicao || "",
        isbn10: book.isbn10 || "",
        isbn13: book.isbn13 || "",
        idioma: book.idioma,
        tags: book.tags,
        sinopse: book.sinopse || "",
        avaliacao: book.avaliacao,
      });
    } else {
      // Reset form
      setFormData({
        titulo: "",
        subtitulo: "",
        autores: [""],
        editora: "",
        paginas: 0,
        capaUrl: "",
        formato: "fisico",
        ano: new Date().getFullYear(),
        edicao: "",
        isbn10: "",
        isbn13: "",
        idioma: "Português",
        tags: [],
        sinopse: "",
        avaliacao: 0,
      });
    }
  }, [book, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validações
    if (!formData.titulo.trim()) {
      toast.error("O título é obrigatório");
      return;
    }

    if (formData.autores.filter(a => a.trim()).length === 0) {
      toast.error("Informe ao menos um autor");
      return;
    }

    if (!formData.editora.trim()) {
      toast.error("A editora é obrigatória");
      return;
    }

    if (formData.paginas <= 0) {
      toast.error("Informe o número de páginas");
      return;
    }

    const cleanedData = {
      ...formData,
      autores: formData.autores.filter(a => a.trim()),
      titulo: formData.titulo.trim(),
      editora: formData.editora.trim(),
      subtitulo: formData.subtitulo.trim() || undefined,
      capaUrl: formData.capaUrl.trim() || undefined,
      edicao: formData.edicao.trim() || undefined,
      isbn10: formData.isbn10.trim() || undefined,
      isbn13: formData.isbn13.trim() || undefined,
      sinopse: formData.sinopse.trim() || undefined,
    };

    onSave(cleanedData);
    onOpenChange(false);
  };

  const addAuthor = () => {
    setFormData({ ...formData, autores: [...formData.autores, ""] });
  };

  const updateAuthor = (index: number, value: string) => {
    const newAutores = [...formData.autores];
    newAutores[index] = value;
    setFormData({ ...formData, autores: newAutores });
  };

  const removeAuthor = (index: number) => {
    if (formData.autores.length > 1) {
      const newAutores = formData.autores.filter((_, i) => i !== index);
      setFormData({ ...formData, autores: newAutores });
    }
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData({ ...formData, tags: [...formData.tags, newTag.trim()] });
      setNewTag("");
    }
  };

  const removeTag = (tag: string) => {
    setFormData({ ...formData, tags: formData.tags.filter(t => t !== tag) });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass-strong max-h-[90vh] max-w-3xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            {book ? "Editar Livro" : "Novo Livro"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            {/* Título */}
            <div>
              <Label htmlFor="titulo">
                Título <span className="text-destructive">*</span>
              </Label>
              <Input
                id="titulo"
                value={formData.titulo}
                onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                placeholder="Digite o título do livro"
                required
              />
            </div>

            {/* Subtítulo */}
            <div>
              <Label htmlFor="subtitulo">Subtítulo</Label>
              <Input
                id="subtitulo"
                value={formData.subtitulo}
                onChange={(e) => setFormData({ ...formData, subtitulo: e.target.value })}
                placeholder="Subtítulo (opcional)"
              />
            </div>

            {/* Autores */}
            <div>
              <Label>
                Autor(es) <span className="text-destructive">*</span>
              </Label>
              <div className="space-y-2">
                {formData.autores.map((autor, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={autor}
                      onChange={(e) => updateAuthor(index, e.target.value)}
                      placeholder={`Autor ${index + 1}`}
                      required
                    />
                    {formData.autores.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeAuthor(index)}
                        aria-label="Remover autor"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button type="button" variant="outline" size="sm" onClick={addAuthor}>
                  <Plus className="mr-2 h-4 w-4" />
                  Adicionar Autor
                </Button>
              </div>
            </div>

            {/* Editora e Páginas */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="editora">
                  Editora <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="editora"
                  value={formData.editora}
                  onChange={(e) => setFormData({ ...formData, editora: e.target.value })}
                  placeholder="Nome da editora"
                  required
                />
              </div>

              <div>
                <Label htmlFor="paginas">
                  Páginas <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="paginas"
                  type="number"
                  min="1"
                  value={formData.paginas || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, paginas: parseInt(e.target.value) || 0 })
                  }
                  placeholder="Número de páginas"
                  required
                />
              </div>
            </div>

            {/* URL da Capa */}
            <div>
              <Label htmlFor="capaUrl">URL da Capa</Label>
              <Input
                id="capaUrl"
                type="url"
                value={formData.capaUrl}
                onChange={(e) => setFormData({ ...formData, capaUrl: e.target.value })}
                placeholder="https://exemplo.com/capa.jpg"
              />
              {formData.capaUrl && (
                <div className="mt-2">
                  <p className="mb-2 text-sm text-muted-foreground">Preview:</p>
                  <img
                    src={formData.capaUrl}
                    alt="Preview da capa"
                    className="h-48 w-32 rounded-lg object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                      toast.error("URL da capa inválida");
                    }}
                  />
                </div>
              )}
            </div>

            {/* Formato, Ano, Edição */}
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="formato">Formato</Label>
                <Select
                  value={formData.formato}
                  onValueChange={(value: BookFormat) =>
                    setFormData({ ...formData, formato: value })
                  }
                >
                  <SelectTrigger id="formato">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fisico">Físico</SelectItem>
                    <SelectItem value="digital">Digital</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="ano">Ano</Label>
                <Input
                  id="ano"
                  type="number"
                  min="1000"
                  max={new Date().getFullYear() + 10}
                  value={formData.ano || ""}
                  onChange={(e) => setFormData({ ...formData, ano: parseInt(e.target.value) })}
                />
              </div>

              <div>
                <Label htmlFor="edicao">Edição</Label>
                <Input
                  id="edicao"
                  value={formData.edicao}
                  onChange={(e) => setFormData({ ...formData, edicao: e.target.value })}
                  placeholder="1ª, 2ª..."
                />
              </div>
            </div>

            {/* ISBN */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="isbn10">ISBN-10</Label>
                <Input
                  id="isbn10"
                  value={formData.isbn10}
                  onChange={(e) => setFormData({ ...formData, isbn10: e.target.value })}
                  placeholder="0-123456-78-9"
                  maxLength={13}
                />
              </div>

              <div>
                <Label htmlFor="isbn13">ISBN-13</Label>
                <Input
                  id="isbn13"
                  value={formData.isbn13}
                  onChange={(e) => setFormData({ ...formData, isbn13: e.target.value })}
                  placeholder="978-0-123456-78-9"
                  maxLength={17}
                />
              </div>
            </div>

            {/* Idioma e Avaliação */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="idioma">Idioma</Label>
                <Input
                  id="idioma"
                  value={formData.idioma}
                  onChange={(e) => setFormData({ ...formData, idioma: e.target.value })}
                  placeholder="Português"
                />
              </div>

              <div>
                <Label htmlFor="avaliacao">Avaliação (0-5)</Label>
                <Input
                  id="avaliacao"
                  type="number"
                  min="0"
                  max="5"
                  step="1"
                  value={formData.avaliacao}
                  onChange={(e) =>
                    setFormData({ ...formData, avaliacao: parseInt(e.target.value) || 0 })
                  }
                />
              </div>
            </div>

            {/* Tags */}
            <div>
              <Label htmlFor="newTag">Tags</Label>
              <div className="flex gap-2">
                <Input
                  id="newTag"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addTag();
                    }
                  }}
                  placeholder="Digite uma tag e pressione Enter"
                />
                <Button type="button" variant="outline" onClick={addTag}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              {formData.tags.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {formData.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="gap-1">
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="ml-1 hover:text-destructive"
                        aria-label={`Remover tag ${tag}`}
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* Sinopse */}
            <div>
              <Label htmlFor="sinopse">Sinopse</Label>
              <Textarea
                id="sinopse"
                value={formData.sinopse}
                onChange={(e) => setFormData({ ...formData, sinopse: e.target.value })}
                placeholder="Descreva o livro..."
                rows={4}
                maxLength={1000}
              />
              <p className="mt-1 text-xs text-muted-foreground">
                {formData.sinopse.length}/1000 caracteres
              </p>
            </div>
          </div>

          <DialogFooter className="mt-6">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">{book ? "Salvar Alterações" : "Adicionar Livro"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

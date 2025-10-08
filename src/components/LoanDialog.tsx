import { Book } from "@/types/book";
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
import { useState } from "react";
import { toast } from "sonner";

interface LoanDialogProps {
  book: Book | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (book: Book, loanData: any) => void;
}

export const LoanDialog = ({ book, open, onOpenChange, onConfirm }: LoanDialogProps) => {
  const [formData, setFormData] = useState({
    paraQuem: "",
    contato: "",
    dataEmprestimo: new Date().toISOString().split("T")[0],
    dataPrevistaDevolucao: "",
    observacoes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.paraQuem.trim()) {
      toast.error("Por favor, informe o nome da pessoa");
      return;
    }

    if (book) {
      onConfirm(book, formData);
      setFormData({
        paraQuem: "",
        contato: "",
        dataEmprestimo: new Date().toISOString().split("T")[0],
        dataPrevistaDevolucao: "",
        observacoes: "",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass-strong">
        <DialogHeader>
          <DialogTitle>Emprestar Livro</DialogTitle>
          {book && (
            <p className="text-sm text-muted-foreground">{book.titulo}</p>
          )}
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <Label htmlFor="paraQuem">
                Nome da pessoa <span className="text-destructive">*</span>
              </Label>
              <Input
                id="paraQuem"
                value={formData.paraQuem}
                onChange={(e) => setFormData({ ...formData, paraQuem: e.target.value })}
                placeholder="Nome completo"
                required
              />
            </div>

            <div>
              <Label htmlFor="contato">Contato (opcional)</Label>
              <Input
                id="contato"
                type="email"
                value={formData.contato}
                onChange={(e) => setFormData({ ...formData, contato: e.target.value })}
                placeholder="email@exemplo.com"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="dataEmprestimo">Data do empréstimo</Label>
                <Input
                  id="dataEmprestimo"
                  type="date"
                  value={formData.dataEmprestimo}
                  onChange={(e) =>
                    setFormData({ ...formData, dataEmprestimo: e.target.value })
                  }
                  required
                />
              </div>

              <div>
                <Label htmlFor="dataPrevistaDevolucao">Devolução prevista (opcional)</Label>
                <Input
                  id="dataPrevistaDevolucao"
                  type="date"
                  value={formData.dataPrevistaDevolucao}
                  onChange={(e) =>
                    setFormData({ ...formData, dataPrevistaDevolucao: e.target.value })
                  }
                />
              </div>
            </div>

            <div>
              <Label htmlFor="observacoes">Observações (opcional)</Label>
              <Textarea
                id="observacoes"
                value={formData.observacoes}
                onChange={(e) => setFormData({ ...formData, observacoes: e.target.value })}
                placeholder="Adicione observações sobre o empréstimo"
                rows={3}
              />
            </div>
          </div>

          <DialogFooter className="mt-6">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">Confirmar Empréstimo</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

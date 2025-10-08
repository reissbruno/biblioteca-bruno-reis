import { BookStatus, BookFormat } from "@/types/book";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { GlassCard } from "./GlassCard";

interface FilterBarProps {
  statusFilter: BookStatus | "todos";
  formatFilter: BookFormat | "todos";
  onStatusChange: (status: BookStatus | "todos") => void;
  onFormatChange: (format: BookFormat | "todos") => void;
}

export const FilterBar = ({
  statusFilter,
  formatFilter,
  onStatusChange,
  onFormatChange,
}: FilterBarProps) => {
  return (
    <GlassCard className="flex flex-wrap gap-3 p-4">
      <div className="flex-1 min-w-[150px]">
        <label htmlFor="status-filter" className="mb-2 block text-sm font-medium">
          Status
        </label>
        <Select value={statusFilter} onValueChange={onStatusChange}>
          <SelectTrigger id="status-filter">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos</SelectItem>
            <SelectItem value="disponivel">Disponível</SelectItem>
            <SelectItem value="emprestado">Emprestado</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex-1 min-w-[150px]">
        <label htmlFor="format-filter" className="mb-2 block text-sm font-medium">
          Formato
        </label>
        <Select value={formatFilter} onValueChange={onFormatChange}>
          <SelectTrigger id="format-filter">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos</SelectItem>
            <SelectItem value="fisico">Físico</SelectItem>
            <SelectItem value="digital">Digital</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </GlassCard>
  );
};

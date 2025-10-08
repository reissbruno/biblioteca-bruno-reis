import { Search, X } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { GlassCard } from "./GlassCard";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const SearchBar = ({
  value,
  onChange,
  placeholder = "Busque por título, autor, editora…",
}: SearchBarProps) => {
  return (
    <GlassCard className="flex items-center gap-2 px-4 py-3">
      <Search className="h-5 w-5 text-muted-foreground" />
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border-0 bg-transparent p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
        aria-label="Campo de busca"
      />
      {value && (
        <Button
          size="icon"
          variant="ghost"
          onClick={() => onChange("")}
          className="h-8 w-8"
          aria-label="Limpar busca"
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </GlassCard>
  );
};

import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  hover?: boolean;
}

export const GlassCard = ({ children, className, onClick, hover = false }: GlassCardProps) => {
  return (
    <div
      className={cn(
        "glass rounded-lg shadow-glass transition-smooth",
        hover && "hover:shadow-glass-lg hover:scale-[1.02]",
        onClick && "cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

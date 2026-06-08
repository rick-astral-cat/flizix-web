import type { ReactNode } from "react";
import { cn } from "../../utils/cn";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className }: CardProps) {
  return (
    <div
      className={cn(
        "bg-white dark:bg-white/[0.02] border border-zinc-200 dark:border-white/[0.08] rounded-xl overflow-hidden shadow-sm dark:shadow-2xl dark:backdrop-blur-md",
        className
      )}
    >
      {children}
    </div>
  );
}

export function CardContent({ children, className }: CardProps) {
  return <div className={cn("p-6", className)}>{children}</div>;
}

export function CardHeader({ children, className }: CardProps) {
  return (
    <div className={cn("px-6 py-4 border-b border-zinc-100 dark:border-zinc-800", className)}>
      {children}
    </div>
  );
}

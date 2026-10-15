import { cn } from "@/lib/utils";

/**
 * Estilos compartilhados por superfícies flutuantes (menus, popovers, select, tooltips).
 * Entrada rápida com ease-enter; saída mais curta com ease-exit (Material 3).
 */
export const overlaySurface = cn(
  "z-50 rounded-lg border border-border bg-popover text-popover-foreground shadow-overlay",
  "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-[0.97]",
  "data-[state=open]:duration-(--duration-moderate) data-[state=open]:ease-enter",
  "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-[0.97]",
  "data-[state=closed]:duration-(--duration-fast) data-[state=closed]:ease-exit",
  "data-[side=bottom]:slide-in-from-top-1 data-[side=left]:slide-in-from-right-1",
  "data-[side=right]:slide-in-from-left-1 data-[side=top]:slide-in-from-bottom-1",
);

/** Item de lista em menus/select/command. Densidade do Linear: 32px de altura. */
export const overlayItem = cn(
  "relative flex h-8 cursor-default select-none items-center gap-2 rounded-md px-2 text-sm outline-none",
  "text-foreground data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground",
  "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
  "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground",
);

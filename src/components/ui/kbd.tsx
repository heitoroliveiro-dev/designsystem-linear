import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/** Kbd — tecla de atalho. Produtos keyboard-first exibem atalhos em menus e tooltips. */
const kbdVariants = cva(
  "pointer-events-none inline-flex select-none items-center justify-center rounded-xs border border-border bg-muted font-mono font-medium text-muted-foreground",
  {
    variants: {
      size: {
        sm: "h-4 min-w-4 px-1 text-[10px]",
        default: "h-5 min-w-5 px-1 text-2xs",
      },
    },
    defaultVariants: { size: "default" },
  },
);

function Kbd({ className, size, ...props }: React.ComponentProps<"kbd"> & VariantProps<typeof kbdVariants>) {
  return <kbd data-slot="kbd" className={cn(kbdVariants({ size }), className)} {...props} />;
}

export { Kbd };

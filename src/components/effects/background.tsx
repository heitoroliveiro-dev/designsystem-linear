import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * Background — camadas decorativas para seções de destaque.
 * Posiciona-se absolutamente atrás do conteúdo; o pai precisa de `relative isolate`.
 */
const backgroundVariants = cva("pointer-events-none absolute inset-0 -z-10", {
  variants: {
    variant: {
      grid: "bg-grid",
      dots: "bg-dots",
      spotlight: "spotlight",
    },
  },
  defaultVariants: { variant: "grid" },
});

function Background({ className, variant, ...props }: React.ComponentProps<"div"> & VariantProps<typeof backgroundVariants>) {
  return <div aria-hidden data-slot="background" className={cn(backgroundVariants({ variant }), className)} {...props} />;
}

export { Background };

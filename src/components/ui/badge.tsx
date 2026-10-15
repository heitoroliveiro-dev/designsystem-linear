import * as React from "react";
import { Slot } from "radix-ui";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/** Badge — rótulo de status/categoria. Cor nunca é o único sinal: sempre há texto. */
const badgeVariants = cva(
  "inline-flex w-fit shrink-0 items-center gap-1 whitespace-nowrap rounded-full border px-2 py-0.5 text-xs font-medium [&>svg]:size-3 [&>svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "border-border bg-muted text-muted-foreground",
        brand: "border-brand-border bg-brand-subtle text-brand-text",
        success: "border-success-border bg-success-subtle text-success-text",
        warning: "border-warning-border bg-warning-subtle text-warning-text",
        danger: "border-danger-border bg-danger-subtle text-danger-text",
        info: "border-info-border bg-info-subtle text-info-text",
        outline: "border-border bg-transparent text-foreground",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

const dotColor: Record<string, string> = {
  default: "bg-subtle-foreground",
  brand: "bg-brand",
  success: "bg-success",
  warning: "bg-warning",
  danger: "bg-destructive",
  info: "bg-info",
  outline: "bg-foreground",
};

type BadgeProps = React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean; dot?: boolean };

function Badge({ className, variant, asChild = false, dot = false, children, ...props }: BadgeProps) {
  const Comp = asChild ? Slot.Root : "span";
  return (
    <Comp data-slot="badge" className={cn(badgeVariants({ variant }), className)} {...props}>
      {dot && <span aria-hidden className={cn("size-1.5 rounded-full", dotColor[variant ?? "default"])} />}
      {children}
    </Comp>
  );
}

export { Badge, badgeVariants };

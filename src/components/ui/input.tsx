import * as React from "react";

import { cn } from "@/lib/utils";

/** Classes compartilhadas por campos de texto (Input, Textarea, SelectTrigger). */
export const fieldStyles = cn(
  "w-full min-w-0 rounded-md border border-input bg-transparent text-sm text-foreground shadow-raised",
  "transition-[border-color,box-shadow] duration-(--duration-fast) ease-standard",
  "placeholder:text-subtle-foreground hover:border-border-strong",
  "focus-visible:border-ring focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/30",
  "aria-invalid:border-destructive aria-invalid:ring-destructive/25",
  "disabled:cursor-not-allowed disabled:opacity-50",
);

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        fieldStyles,
        "h-8 px-2.5 py-1",
        "file:mr-2 file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground",
        className,
      )}
      {...props}
    />
  );
}

export { Input };

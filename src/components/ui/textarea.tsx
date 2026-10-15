import * as React from "react";

import { cn } from "@/lib/utils";
import { fieldStyles } from "@/components/ui/input";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(fieldStyles, "field-sizing-content min-h-16 px-2.5 py-2", className)}
      {...props}
    />
  );
}

export { Textarea };

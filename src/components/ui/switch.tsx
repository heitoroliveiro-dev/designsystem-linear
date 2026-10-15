"use client";

import * as React from "react";
import { Switch as SwitchPrimitive } from "radix-ui";

import { cn } from "@/lib/utils";

/** Switch — liga/desliga com efeito imediato. Para escolhas que dependem de "Salvar", use Checkbox. */
function Switch({ className, ...props }: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "peer inline-flex h-5 w-8 shrink-0 items-center rounded-full border border-transparent p-px",
        "transition-colors duration-(--duration-normal) ease-standard",
        "data-[state=checked]:bg-primary data-[state=unchecked]:bg-gray-7 high-contrast:data-[state=unchecked]:bg-gray-9",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "pointer-events-none block size-4 rounded-full bg-white shadow-raised",
          "transition-transform duration-(--duration-normal) ease-standard",
          "data-[state=checked]:translate-x-3 data-[state=unchecked]:translate-x-0",
        )}
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };

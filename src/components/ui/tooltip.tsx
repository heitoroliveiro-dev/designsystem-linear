"use client";

import * as React from "react";
import { Tooltip as TooltipPrimitive } from "radix-ui";

import { cn } from "@/lib/utils";
import { overlaySurface } from "@/components/ui/overlay";
import { Kbd } from "@/components/ui/kbd";

function TooltipProvider({ delayDuration = 400, skipDelayDuration = 150, ...props }: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
  return <TooltipPrimitive.Provider delayDuration={delayDuration} skipDelayDuration={skipDelayDuration} {...props} />;
}

function Tooltip(props: React.ComponentProps<typeof TooltipPrimitive.Root>) {
  return <TooltipPrimitive.Root data-slot="tooltip" {...props} />;
}

function TooltipTrigger(props: React.ComponentProps<typeof TooltipPrimitive.Trigger>) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />;
}

type TooltipContentProps = React.ComponentProps<typeof TooltipPrimitive.Content> & {
  /** Atalho de teclado exibido ao lado do rótulo — padrão Linear (ex.: ["⌘", "K"]). */
  shortcut?: string[];
};

function TooltipContent({ className, sideOffset = 6, shortcut, children, ...props }: TooltipContentProps) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        data-slot="tooltip-content"
        sideOffset={sideOffset}
        className={cn(overlaySurface, "flex items-center gap-2 rounded-md px-2 py-1 text-xs", className)}
        {...props}
      >
        {children}
        {shortcut && (
          <span className="flex gap-0.5">
            {shortcut.map((k) => (
              <Kbd key={k} size="sm">{k}</Kbd>
            ))}
          </span>
        )}
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  );
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };

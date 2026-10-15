"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * GlowCard — card com holofote que segue o cursor (assinatura das landing pages estilo Linear).
 * Implementação: o JS apenas grava a posição do ponteiro em variáveis CSS; o brilho é um
 * radial-gradient. Sem bibliotecas de animação, sem re-render do React.
 */
function GlowCard({ className, children, onPointerMove, ...props }: React.ComponentProps<"div">) {
  const handleMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--glow-x", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--glow-y", `${e.clientY - rect.top}px`);
    onPointerMove?.(e);
  };

  return (
    <div
      data-slot="glow-card"
      onPointerMove={handleMove}
      className={cn(
        "group/glow relative isolate overflow-hidden rounded-xl border border-border bg-card p-6 shadow-raised",
        // camada de brilho no preenchimento
        "before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:opacity-0 before:transition-opacity before:duration-(--duration-slow)",
        "before:bg-[radial-gradient(400px_circle_at_var(--glow-x,50%)_var(--glow-y,50%),color-mix(in_oklch,var(--brand)_14%,transparent),transparent_60%)]",
        // camada de brilho na borda (mascarada para aparecer só no 1px da borda)
        "after:pointer-events-none after:absolute after:inset-0 after:rounded-[inherit] after:p-px after:opacity-0 after:transition-opacity after:duration-(--duration-slow)",
        "after:bg-[radial-gradient(240px_circle_at_var(--glow-x,50%)_var(--glow-y,50%),color-mix(in_oklch,var(--brand)_70%,transparent),transparent_70%)]",
        "after:[mask:linear-gradient(#000_0_0)_content-box_exclude,linear-gradient(#000_0_0)]",
        "hover:before:opacity-100 hover:after:opacity-100",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export { GlowCard };

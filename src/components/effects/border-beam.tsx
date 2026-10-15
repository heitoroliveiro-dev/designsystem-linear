import { cn } from "@/lib/utils";

/**
 * BorderBeam — feixe de luz que percorre a borda do elemento pai.
 * O pai precisa de `relative` e de border-radius. CSS puro (@property + conic-gradient).
 * Use em UM elemento por tela (CTA principal, plano recomendado).
 */
function BorderBeam({ className, duration = 6, ...props }: React.ComponentProps<"span"> & { duration?: number }) {
  return (
    <span
      aria-hidden
      data-slot="border-beam"
      style={{ animationDuration: `${duration}s` }}
      className={cn(
        "pointer-events-none absolute inset-0 rounded-[inherit] p-px animate-beam",
        "bg-[conic-gradient(from_var(--beam-angle),transparent_0%,transparent_70%,var(--brand-11)_85%,var(--brand)_90%,transparent_100%)]",
        "[mask:linear-gradient(#000_0_0)_content-box_exclude,linear-gradient(#000_0_0)]",
        className,
      )}
      {...props}
    />
  );
}

export { BorderBeam };

import { cn } from "@/lib/utils";

/** Skeleton — placeholder de carregamento com shimmer (desligado em prefers-reduced-motion). */
function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      aria-hidden
      className={cn(
        "rounded-md bg-muted bg-[linear-gradient(90deg,transparent,var(--gray-4),transparent)] bg-[length:200%_100%] bg-no-repeat animate-shimmer",
        className,
      )}
      {...props}
    />
  );
}

export { Skeleton };

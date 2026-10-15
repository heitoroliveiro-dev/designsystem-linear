import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-start gap-4 py-20">
      <p className="font-mono text-sm text-subtle-foreground">404</p>
      <h1 className="text-3xl">Página não encontrada</h1>
      <Button asChild variant="secondary">
        <Link href="/">Voltar ao início</Link>
      </Button>
    </div>
  );
}

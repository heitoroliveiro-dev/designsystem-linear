import type { Metadata } from "next";

import { componentIndex } from "./component-index";
import { ComponentsShowcase } from "./showcase";
import { PageHeader } from "@/components/docs/page-header";

export const metadata: Metadata = { title: "Componentes" };

export default function ComponentsPage() {
  return (
    <>
      <PageHeader eyebrow="Construção" title="Componentes">
        Construídos sobre <strong>Radix Primitives</strong> (teclado, foco e ARIA corretos) com a API e os nomes do{" "}
        <strong>shadcn/ui</strong>. O código vive em <code className="font-mono text-sm">src/components/ui</code> — é seu.
      </PageHeader>
      <nav aria-label="Índice" className="mb-12 flex flex-wrap gap-1.5">
        {componentIndex.map(([id, title]) => (
          <a key={id} href={`#${id}`} className="rounded-full border border-border px-2.5 py-1 text-xs text-muted-foreground transition-colors duration-(--duration-fast) hover:border-border-strong hover:text-foreground">
            {title}
          </a>
        ))}
      </nav>
      <ComponentsShowcase />
    </>
  );
}

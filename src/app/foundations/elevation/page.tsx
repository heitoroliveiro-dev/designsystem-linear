import type { Metadata } from "next";

import { CodeBlock } from "@/components/docs/example";
import { DoDont, PageHeader, Prose, Section } from "@/components/docs/page-header";

export const metadata: Metadata = { title: "Elevação e luz" };

export default function ElevationPage() {
  return (
    <>
      <PageHeader eyebrow="Fundamentos" title="Elevação e luz">
        Em dark mode, sombra quase não aparece. A profundidade vem de <strong>superfícies mais claras</strong>, de um{" "}
        <strong>realce de 1px</strong> no topo e, em pontos de destaque, de <strong>luz</strong> (glow).
      </PageHeader>

      <Section id="superficies" title="Superfícies" description="Cada nível é um passo mais claro da escala de cinza.">
        <div className="rounded-xl border border-border bg-background p-4">
          <p className="mb-3 font-mono text-xs text-subtle-foreground">bg-background · gray-1</p>
          <div className="rounded-lg border border-border bg-card p-4 shadow-raised">
            <p className="mb-3 font-mono text-xs text-subtle-foreground">bg-card · gray-2 · shadow-raised</p>
            <div className="max-w-sm rounded-lg border border-border bg-popover p-4 shadow-overlay">
              <p className="font-mono text-xs text-subtle-foreground">bg-popover · gray-3 · shadow-overlay</p>
            </div>
          </div>
        </div>
      </Section>

      <Section id="sombras" title="Tokens de elevação" description="Mudam por modo: em dark, realce interno + sombra profunda; em light, sombras suaves.">
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            ["shadow-raised", "Botões, cards"],
            ["shadow-overlay", "Menus, popovers, tooltips"],
            ["shadow-modal", "Dialogs, ⌘K"],
          ].map(([cls, use]) => (
            <div key={cls} className={`${cls} flex h-28 flex-col justify-end rounded-lg border border-border bg-popover p-4`}>
              <p className="font-mono text-xs text-foreground">{cls}</p>
              <p className="text-xs text-subtle-foreground">{use}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="luz" title="Luz (glow)" description="Utilitários CSS em src/styles/effects.css. Guiam a atenção sem pesar o layout.">
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="glow flex h-28 items-end rounded-lg border border-brand-border bg-card p-4">
            <p className="font-mono text-xs">glow</p>
          </div>
          <div className="highlight-top flex h-28 items-end rounded-lg border border-border bg-popover p-4">
            <p className="font-mono text-xs">highlight-top</p>
          </div>
          <div className="relative isolate flex h-28 items-end overflow-hidden rounded-lg border border-border bg-card p-4">
            <div className="spotlight absolute inset-0 -z-10" />
            <p className="font-mono text-xs">spotlight</p>
          </div>
        </div>
        <div className="mt-6">
          <Prose>
            <p>
              <strong>Regra:</strong> luz é escassa. Uma fonte de brilho por tela. Se tudo brilha, nada se destaca — &quot;não dispute
              uma atenção que você não conquistou&quot; (princípio do refresh do Linear, 2026).
            </p>
          </Prose>
        </div>
        <div className="mt-4">
          <DoDont
            doText="Glow no CTA principal, no item recém-criado ou no plano recomendado."
            dontText="Glow em cards de listagem, sombras pretas sólidas, ou efeitos animados dentro de telas de trabalho."
          />
        </div>
        <div className="mt-4">
          <CodeBlock
            code={`
<div className="rounded-lg border border-brand-border bg-card glow" />
<div className="rounded-lg bg-popover highlight-top" />
<section className="relative isolate">
  <Background variant="spotlight" />
  <Background variant="grid" />
</section>
`}
          />
        </div>
      </Section>
    </>
  );
}

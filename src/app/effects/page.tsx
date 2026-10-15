import type { Metadata } from "next";
import { SparklesIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Background } from "@/components/effects/background";
import { BorderBeam } from "@/components/effects/border-beam";
import { GlowCard } from "@/components/effects/glow-card";
import { CodeBlock } from "@/components/docs/example";
import { DoDont, PageHeader, Prose, Section } from "@/components/docs/page-header";

export const metadata: Metadata = { title: "Efeitos" };

export default function EffectsPage() {
  return (
    <>
      <PageHeader eyebrow="Construção" title="Efeitos">
        A camada de &quot;brilho&quot; do estilo Linear — <strong>apenas para pontos de destaque</strong> e páginas de marketing. Todos são
        CSS puro: nenhum custo de JavaScript de animação, e desligam com <code className="font-mono text-sm">prefers-reduced-motion</code>.
      </PageHeader>

      <Section id="glow-card" title="GlowCard" description="Holofote que segue o cursor no fundo e na borda. JS só grava a posição em variáveis CSS.">
        <div className="grid gap-3 sm:grid-cols-3">
          {["Rápido", "Preciso", "Confiável"].map((t) => (
            <GlowCard key={t}>
              <SparklesIcon className="mb-3 size-5 text-brand-text" aria-hidden />
              <p className="font-semibold">{t}</p>
              <p className="text-sm text-muted-foreground">Passe o mouse para ver o holofote.</p>
            </GlowCard>
          ))}
        </div>
        <div className="mt-4">
          <CodeBlock code={`<GlowCard>\n  <h3>Rápido</h3>\n  <p className="text-muted-foreground">…</p>\n</GlowCard>`} />
        </div>
      </Section>

      <Section id="border-beam" title="BorderBeam" description="Feixe de luz contínuo na borda. Um por tela, no elemento mais importante.">
        <div className="flex flex-wrap items-center gap-6">
          <div className="relative w-72 rounded-xl border border-border bg-card p-5">
            <Badge variant="brand" className="mb-3">
              Recomendado
            </Badge>
            <p className="text-2xl font-semibold">
              Pro <span className="text-sm font-normal text-muted-foreground">R$ 49/mês</span>
            </p>
            <p className="mb-4 text-sm text-muted-foreground">Para times que entregam toda semana.</p>
            <Button variant="default" className="w-full">
              Assinar
            </Button>
            <BorderBeam />
          </div>
        </div>
        <div className="mt-4">
          <CodeBlock code={`<div className="relative rounded-xl border border-border bg-card p-5">\n  …\n  <BorderBeam duration={6} />\n</div>`} />
        </div>
      </Section>

      <Section id="backgrounds" title="Background" description="Camadas decorativas: grid, dots e spotlight. Combine no máximo duas.">
        <div className="grid gap-3 sm:grid-cols-3">
          {(["grid", "dots", "spotlight"] as const).map((v) => (
            <div key={v} className="relative isolate flex h-40 items-end overflow-hidden rounded-xl border border-border bg-background p-4">
              <Background variant={v} />
              <p className="font-mono text-xs">variant=&quot;{v}&quot;</p>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <CodeBlock code={`<section className="relative isolate">\n  <Background variant="spotlight" />\n  <Background variant="grid" className="opacity-60" />\n  <h1 className="text-6xl text-gradient">…</h1>\n</section>`} />
        </div>
      </Section>

      <Section id="text" title="Texto em degradê" description="text-gradient: começa em foreground (contraste preservado) e esmaece para baixo.">
        <p className="text-5xl text-gradient">Planeje. Construa. Entregue.</p>
      </Section>

      <Section id="bibliotecas" title="Quando trazer Aceternity UI / Magic UI">
        <Prose>
          <p>
            Essas bibliotecas são ótimas para landing pages, mas dependem de <strong>Framer Motion</strong> (JS de animação). Regras para
            adotá-las neste sistema:
          </p>
          <p>
            1. <strong>Somente em rotas de marketing</strong>, nunca no app de trabalho. 2. Copie o componente para{" "}
            <code>src/components/effects</code> e troque cores fixas por tokens (<code>var(--brand)</code>). 3. Carregue com{" "}
            <code>next/dynamic</code> abaixo da dobra. 4. Garanta fallback para <code>prefers-reduced-motion</code>.
          </p>
        </Prose>
        <div className="mt-4">
          <DoDont
            doText="Um efeito marcante por seção de marketing, com tokens do sistema."
            dontText="Efeitos animados em telas de trabalho, ou cores hardcoded vindas da biblioteca (quebram o light mode e o alto contraste)."
          />
        </div>
      </Section>
    </>
  );
}

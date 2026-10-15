import type { Metadata } from "next";

import { CodeBlock } from "@/components/docs/example";
import { DoDont, PageHeader, Prose, Section } from "@/components/docs/page-header";

export const metadata: Metadata = { title: "Espaço e layout" };

const space = [1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24];
const radii = [
  ["rounded-xs", "4px", "Checkbox, kbd"],
  ["rounded-sm", "6px", "Botões xs"],
  ["rounded-md", "8px", "Botões, inputs, itens"],
  ["rounded-lg", "12px", "Cards, popovers"],
  ["rounded-xl", "16px", "Dialogs, painéis"],
  ["rounded-2xl", "24px", "Marketing"],
  ["rounded-full", "∞", "Avatares, pílulas"],
];
const heights = [
  ["h-6", "24px", "Botão xs, kbd, badge — mínimo WCAG 2.5.8"],
  ["h-7", "28px", "Botão sm, item de sidebar"],
  ["h-8", "32px", "Padrão: botão, input, select, item de menu"],
  ["h-9", "36px", "Linha de tabela/lista, item do ⌘K"],
  ["h-10", "40px", "Botão lg (marketing, onboarding)"],
];

export default function LayoutPage() {
  return (
    <>
      <PageHeader eyebrow="Fundamentos" title="Espaço e layout">
        Grid de <strong>4px</strong>. Densidade alta e alinhamento rigoroso: tudo encaixa em múltiplos de 4.
      </PageHeader>

      <Section id="espacamento" title="Espaçamento" description="Escala padrão do Tailwind (--spacing: 0.25rem). p-2 = 8px, gap-3 = 12px…">
        <div className="space-y-1.5 rounded-lg border border-border-subtle bg-background p-4">
          {space.map((s) => (
            <div key={s} className="flex items-center gap-4">
              <span className="w-10 font-mono text-xs text-foreground">{s}</span>
              <span className="w-12 font-mono text-xs text-subtle-foreground">{s * 4}px</span>
              <div className="h-3 rounded-xs bg-brand/70" style={{ width: s * 4 }} />
            </div>
          ))}
        </div>
        <div className="mt-4">
          <Prose>
            <p>
              <strong>Ritmo:</strong> 4–8px dentro de componentes · 12–16px entre elementos relacionados · 24–32px entre grupos ·
              48–64px entre seções.
            </p>
          </Prose>
        </div>
      </Section>

      <Section id="alturas" title="Alturas de controle" description="Controles compartilham alturas para alinhar em linha sem ajustes.">
        <div className="space-y-2">
          {heights.map(([cls, px, use]) => (
            <div key={cls} className="flex items-center gap-4">
              <div className={`${cls} w-24 shrink-0 rounded-md border border-border bg-muted`} />
              <span className="w-12 font-mono text-xs text-foreground">{cls}</span>
              <span className="w-12 font-mono text-xs text-subtle-foreground">{px}</span>
              <span className="text-sm text-muted-foreground">{use}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section id="raio" title="Raio" description="Raios pequenos e consistentes. Elementos aninhados: raio interno = raio externo − padding.">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
          {radii.map(([cls, px, use]) => (
            <div key={cls} className="flex flex-col gap-2">
              <div className={`${cls} aspect-square border border-border-strong bg-muted`} />
              <p className="font-mono text-xs text-foreground">{cls}</p>
              <p className="text-xs text-subtle-foreground">
                {px} · {use}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="estrutura" title="Estrutura de aplicação" description="O shell desta documentação é o modelo: sidebar recuada + painel de conteúdo elevado.">
        <div className="flex h-56 gap-2 rounded-xl border border-border bg-sidebar p-2">
          <div className="flex w-36 flex-col gap-1 p-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className={`h-5 rounded-sm ${i === 2 ? "bg-sidebar-accent" : "bg-gray-3/60"}`} />
            ))}
          </div>
          <div className="flex flex-1 flex-col gap-2 rounded-lg border border-border-subtle bg-card p-3 shadow-raised">
            <div className="h-6 w-1/3 rounded-sm bg-muted" />
            <div className="h-px bg-border-subtle" />
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-5 rounded-sm bg-muted/60" />
            ))}
          </div>
        </div>
        <div className="mt-4">
          <DoDont
            doText="Sidebar 240px (w-60), conteúdo com max-w-5xl para leitura, painéis laterais de 320–400px."
            dontText="Bordas em todos os lados de todos os blocos. Agrupe com espaço e superfície primeiro."
          />
        </div>
      </Section>

      <Section id="breakpoints" title="Breakpoints" description="Padrões do Tailwind. Mobile-first.">
        <CodeBlock
          code={`
sm  640px   → 2 colunas em grids de cards
md  768px   → formulários em 2 colunas
lg  1024px  → sidebar fixa aparece (shell de app)
xl  1280px  → painel lateral de detalhes
2xl 1536px
`}
        />
      </Section>
    </>
  );
}

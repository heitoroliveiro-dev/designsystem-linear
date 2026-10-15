import type { Metadata } from "next";

import { CodeBlock } from "@/components/docs/example";
import { DoDont, PageHeader, Prose, Section } from "@/components/docs/page-header";

export const metadata: Metadata = { title: "Tipografia" };

const scale = [
  ["7xl", "text-7xl", "64 / 68", "Hero de marketing"],
  ["6xl", "text-6xl", "48 / 54", "Hero de marketing"],
  ["5xl", "text-5xl", "40 / 46", "Título de landing"],
  ["4xl", "text-4xl", "32 / 38", "Título de página (docs, settings)"],
  ["3xl", "text-3xl", "24 / 32", "Título de seção grande"],
  ["2xl", "text-2xl", "20 / 28", "Título de seção"],
  ["xl", "text-xl", "18 / 26", "Título de card/dialog grande"],
  ["lg", "text-lg", "16 / 24", "Texto de leitura, lead"],
  ["md", "text-md", "15 / 24", "Texto de leitura em docs"],
  ["base", "text-base", "14 / 20", "Corpo confortável, inputs grandes"],
  ["sm", "text-sm", "13 / 20", "Corpo padrão da aplicação"],
  ["xs", "text-xs", "12 / 16", "Metadados, labels, tabelas"],
  ["2xs", "text-2xs", "11 / 14", "Atalhos, contadores"],
] as const;

export default function TypographyPage() {
  return (
    <>
      <PageHeader eyebrow="Fundamentos" title="Tipografia">
        Sans-serif utilitária e hiperlegível. <strong>Inter</strong> variável para interface (o Linear usa Inter e Inter Display) e{" "}
        <strong>Geist Mono</strong> para código e atalhos.
      </PageHeader>

      <Section id="familias" title="Famílias">
        <div className="grid gap-3 md:grid-cols-2">
          <div className="rounded-lg border border-border bg-background p-5">
            <p className="mb-4 text-5xl">Aa</p>
            <p className="font-medium">Inter (variável)</p>
            <p className="text-sm text-muted-foreground">
              Eixo <code className="font-mono text-xs">opsz</code> 14–32: com <code className="font-mono text-xs">font-optical-sizing: auto</code>{" "}
              títulos grandes usam automaticamente o desenho &quot;Display&quot;.
            </p>
          </div>
          <div className="rounded-lg border border-border bg-background p-5">
            <p className="mb-4 font-mono text-5xl">{"{ }"}</p>
            <p className="font-medium">Geist Mono</p>
            <p className="text-sm text-muted-foreground">Código, IDs (ENG-1234), atalhos de teclado e valores tabulares.</p>
          </div>
        </div>
      </Section>

      <Section id="escala" title="Escala" description="13px é o corpo padrão: densidade de ferramenta B2B. Títulos têm tracking negativo progressivo.">
        <div className="divide-y divide-border-subtle rounded-lg border border-border-subtle bg-background">
          {scale.map(([name, cls, size, use]) => (
            <div key={name} className="flex flex-col gap-1 px-4 py-3 sm:flex-row sm:items-baseline sm:gap-6">
              <div className="flex w-40 shrink-0 gap-3 font-mono text-xs text-subtle-foreground">
                <span className="w-16 text-foreground">text-{name}</span>
                <span>{size}</span>
              </div>
              <p className={`${cls} min-w-0 truncate`}>Construa rápido</p>
              <p className="ml-auto hidden shrink-0 text-xs text-subtle-foreground md:block">{use}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="pesos" title="Pesos" description="O Inter variável permite pesos intermediários; 510 e 590 ficam mais refinados que 500/600 em fundo escuro.">
        <div className="grid gap-3 sm:grid-cols-4">
          {[
            ["font-normal", "400", "Corpo"],
            ["font-medium", "510", "Labels, botões, itens ativos"],
            ["font-semibold", "590", "Títulos"],
            ["font-bold", "680", "Raro — números de destaque"],
          ].map(([cls, w, use]) => (
            <div key={cls} className="rounded-lg border border-border bg-background p-4">
              <p className={`${cls} mb-2 text-3xl`}>Ag</p>
              <p className="font-mono text-xs text-foreground">
                {cls} · {w}
              </p>
              <p className="text-xs text-subtle-foreground">{use}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="regras" title="Regras">
        <Prose>
          <p>
            <strong>Hierarquia por cor antes de tamanho.</strong> Em interfaces densas, diferencie com{" "}
            <code>foreground</code> → <code>muted-foreground</code> → <code>subtle-foreground</code> em vez de criar novos tamanhos.
          </p>
          <p>
            <strong>Números tabulares</strong> em tabelas e contadores: <code>tabular-nums</code>.
          </p>
          <p>
            <strong>Comprimento de linha</strong> de 60–75 caracteres para leitura (<code>max-w-2xl</code>).
          </p>
        </Prose>
        <div className="mt-4">
          <DoDont
            doText="Títulos com text-balance e corpo com text-pretty (já aplicados na base)."
            dontText="Texto todo em maiúsculas ou abaixo de 11px. Itálico para ênfase em UI."
          />
        </div>
        <div className="mt-4">
          <CodeBlock
            code={`
<h1 className="text-4xl">Configurações</h1>            {/* peso 590 e tracking já vêm do token */}
<p className="text-sm text-muted-foreground">Gerencie sua conta.</p>
<span className="font-mono text-xs text-subtle-foreground">ENG-1234</span>
`}
          />
        </div>
      </Section>
    </>
  );
}

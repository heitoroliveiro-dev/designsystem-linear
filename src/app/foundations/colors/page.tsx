import type { Metadata } from "next";

import tokens from "../../../../tokens/build/tokens.json";
import report from "../../../../tokens/build/contrast-report.json";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CodeBlock } from "@/components/docs/example";
import { DoDont, PageHeader, Prose, Section } from "@/components/docs/page-header";

export const metadata: Metadata = { title: "Cores" };

const groups: { title: string; description: string; names: string[] }[] = [
  {
    title: "Superfícies",
    description: "Do mais profundo ao mais elevado. Em dark, elevar = clarear a superfície.",
    names: ["background", "sidebar", "card", "popover", "muted", "accent"],
  },
  {
    title: "Texto",
    description: "Três níveis de ênfase. Nunca crie um quarto: use peso ou tamanho.",
    names: ["foreground", "muted-foreground", "subtle-foreground", "brand-text"],
  },
  {
    title: "Ações",
    description: "primary é a única cor saturada da interface em repouso.",
    names: ["primary", "primary-hover", "secondary", "destructive", "ring"],
  },
  {
    title: "Bordas",
    description: "Quatro intensidades. Prefira espaço a divisores.",
    names: ["border-subtle", "border", "input", "border-strong"],
  },
  {
    title: "Status",
    description: "Cada status tem solid, subtle (fundo), border e text. Sempre combine cor com texto/ícone.",
    names: ["success", "success-subtle", "warning", "warning-subtle", "danger-subtle", "danger-text", "info", "info-subtle"],
  },
];

type ColorEntry = { css: string; hex: string | null };
const colors = tokens.colors as Record<string, Record<string, ColorEntry>>;
const descriptions = tokens.descriptions as Record<string, string>;
const scales = tokens.scales as Record<string, Record<string, string[]>>;
const modes = report.modes as Record<string, { fg: string; bg: string; ratio: number; min: number; criterion: string; pass: boolean; enforced: boolean }[]>;

function Swatch({ name }: { name: string }) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-border-subtle bg-background p-2 pr-3">
      <div className="size-10 shrink-0 rounded-md border border-border" style={{ background: `var(--${name})` }} />
      <div className="min-w-0 flex-1">
        <p className="truncate font-mono text-xs text-foreground">{name}</p>
        <p className="truncate text-xs text-subtle-foreground">{descriptions[`color.${name}`] ?? " "}</p>
      </div>
      <div className="hidden shrink-0 text-right font-mono text-2xs leading-4 text-subtle-foreground sm:block">
        <p>D {colors.dark[name]?.hex}</p>
        <p>L {colors.light[name]?.hex}</p>
      </div>
    </div>
  );
}

const pairKey = (r: { fg: string; bg: string }) => `${r.fg}|${r.bg}`;

export default function ColorsPage() {
  const rows = modes.dark;
  const lookup = Object.fromEntries(Object.entries(modes).map(([m, list]) => [m, Object.fromEntries(list.map((r) => [pairKey(r), r]))]));

  return (
    <>
      <PageHeader eyebrow="Fundamentos" title="Cores">
        Cores são <strong>geradas</strong> em OKLCH a partir de três sementes, como no gerador de temas do Linear. O resultado é
        validado contra a WCAG 2.2 a cada build.
      </PageHeader>

      <Section id="arquitetura" title="Como o sistema de cor funciona">
        <Prose>
          <p>
            <strong>1. Sementes</strong> — <code>tokens/theme.config.json</code> define o matiz do neutro, da marca e dos status.
          </p>
          <p>
            <strong>2. Primitivos</strong> — escalas de 12 passos (metodologia Radix Colors) para cada matiz, em dark e light. Cada
            passo tem um papel fixo: 1–2 fundos, 3–5 componentes, 6–8 bordas, 9–10 sólidos, 11–12 texto.
          </p>
          <p>
            <strong>3. Semânticos</strong> — nomes de intenção (<code>background</code>, <code>muted-foreground</code>,{" "}
            <code>ring</code>) que apontam para passos. Componentes usam <strong>apenas</strong> semânticos.
          </p>
        </Prose>
      </Section>

      {groups.map((g) => (
        <Section key={g.title} id={g.title.toLowerCase()} title={g.title} description={g.description}>
          <div className="grid gap-2 md:grid-cols-2">
            {g.names.map((n) => (
              <Swatch key={n} name={n} />
            ))}
          </div>
        </Section>
      ))}

      <Section id="escalas" title="Escalas primitivas" description="Passo 1 → 12. Use diretamente só em casos excepcionais (ilustrações, gráficos).">
        <div className="space-y-2 overflow-x-auto">
          {Object.keys(scales.dark).map((scale) => (
            <div key={scale} className="flex min-w-[560px] items-center gap-3">
              <p className="w-14 shrink-0 font-mono text-xs text-muted-foreground">{scale}</p>
              <div className="grid flex-1 grid-cols-12 gap-1">
                {Array.from({ length: 12 }, (_, i) => (
                  <div key={i} title={`${scale}-${i + 1}`} className="h-9 rounded-sm" style={{ background: `var(--${scale}-${i + 1})` }} />
                ))}
              </div>
            </div>
          ))}
          <div className="flex min-w-[560px] gap-3">
            <span className="w-14 shrink-0" />
            <div className="grid flex-1 grid-cols-12 gap-1 text-center font-mono text-2xs text-subtle-foreground">
              {Array.from({ length: 12 }, (_, i) => (
                <span key={i}>{i + 1}</span>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section
        id="contraste"
        title="Relatório de contraste"
        description={
          <>
            Gerado por <code className="font-mono text-xs">npm run tokens</code>. Texto exige 4,5:1 (WCAG 1.4.3); componentes e foco
            exigem 3:1 (1.4.11 / 2.4.13). O build falha se um par obrigatório não passar.
          </>
        }
      >
        <div className="rounded-lg border border-border-subtle bg-background">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Primeiro plano / fundo</TableHead>
                <TableHead>Mín.</TableHead>
                <TableHead>Dark</TableHead>
                <TableHead>Light</TableHead>
                <TableHead>Dark HC</TableHead>
                <TableHead>Light HC</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((r) => (
                <TableRow key={pairKey(r)}>
                  <TableCell className="font-mono text-xs">
                    {r.fg} <span className="text-subtle-foreground">/</span> {r.bg}
                    {!r.enforced && <span className="ml-2 text-subtle-foreground">(informativo)</span>}
                  </TableCell>
                  <TableCell className="text-muted-foreground">{r.min}:1</TableCell>
                  {["dark", "light", "dark-high", "light-high"].map((m) => {
                    const row = lookup[m][pairKey(r)];
                    return (
                      <TableCell key={m} className={cn(!row.pass && "text-danger-text")}>
                        {row.ratio.toFixed(2)}
                        {!row.pass && " ✕"}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          <Badge variant="warning">Trade-off documentado</Badge>
          Bordas de input ficam abaixo de 3:1 no contraste padrão (estética sutil do Linear). Para conformidade estrita com a WCAG
          1.4.11, ative <code className="font-mono text-xs">data-contrast=&quot;high&quot;</code>.
        </div>
      </Section>

      <Section id="uso" title="Uso">
        <CodeBlock
          code={`
// ✅ semânticos — mudam sozinhos com tema e contraste
<p className="text-muted-foreground">Atualizado há 2 min</p>
<div className="bg-card border border-border rounded-lg" />
<span className="bg-success-subtle text-success-text">Concluído</span>

// ⚠️ primitivos — só para ilustração/gráficos
<div className="bg-brand-3" />

// ❌ não existe: a paleta padrão do Tailwind foi removida de propósito
<div className="bg-zinc-900 text-gray-400" />
`}
        />
        <div className="mt-4">
          <DoDont
            doText="Use primary uma vez por região. Deixe o resto da interface neutra para que a cor signifique algo."
            dontText="Comunicar estado só com cor, ou usar subtle-foreground para texto que o usuário precisa ler."
          />
        </div>
      </Section>
    </>
  );
}

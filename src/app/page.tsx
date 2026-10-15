import Link from "next/link";
import { ArrowRightIcon, BoxIcon, ContrastIcon, LayersIcon, PaletteIcon, SparklesIcon, ZapIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Kbd } from "@/components/ui/kbd";
import { Background } from "@/components/effects/background";
import { BorderBeam } from "@/components/effects/border-beam";
import { GlowCard } from "@/components/effects/glow-card";
import { CodeBlock } from "@/components/docs/example";
import { Section } from "@/components/docs/page-header";

const principles = [
  {
    icon: ContrastIcon,
    title: "Dark-first, legível sempre",
    text: "Fundo quase preto com cinzas de croma mínimo. Todo par texto/fundo é validado contra WCAG 2.2 AA no build.",
  },
  {
    icon: LayersIcon,
    title: "Estrutura sentida, não vista",
    text: "Hierarquia por superfícies e espaço. Bordas finas e poucos divisores. A navegação recua; o conteúdo avança.",
  },
  {
    icon: SparklesIcon,
    title: "Luz guia a atenção",
    text: "Glows e realces de 1px no lugar de sombras sólidas — apenas onde a atenção foi conquistada.",
  },
  {
    icon: ZapIcon,
    title: "Rápido e keyboard-first",
    text: "Microinterações ≤ 150 ms, paleta ⌘K e atalhos visíveis. Movimento reduzido é respeitado.",
  },
  {
    icon: PaletteIcon,
    title: "Gerado, não pintado",
    text: "Como no Linear: 3 sementes (neutro, marca, contraste) geram todas as escalas em OKLCH.",
  },
  {
    icon: BoxIcon,
    title: "Padrões abertos",
    text: "Tokens W3C DTCG, escala de 12 passos (Radix), nomes shadcn/ui, Radix Primitives para acessibilidade.",
  },
];

export default function HomePage() {
  return (
    <>
      <section className="relative isolate -mx-5 -mt-10 mb-20 overflow-hidden px-5 pb-16 pt-20 sm:-mx-8 sm:px-8 lg:-mt-14 lg:rounded-t-xl">
        <Background variant="spotlight" />
        <Background variant="grid" className="opacity-60" />
        <div className="flex flex-col items-start gap-6 animate-fade-up">
          <Badge variant="brand" dot>
            v1.0 · Tokens DTCG 2025.10
          </Badge>
          <h1 className="max-w-3xl text-5xl text-gradient sm:text-6xl">Um sistema para construir produtos rápidos e precisos.</h1>
          <p className="max-w-xl text-lg text-muted-foreground">
            Design system dark-first inspirado na linguagem visual do Linear. Clone, rode e comece a construir com tokens,
            componentes e padrões prontos.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Button asChild size="lg" variant="default" className="relative">
              <Link href="/components">
                Ver componentes <ArrowRightIcon />
                <BorderBeam />
              </Link>
            </Button>
            <Button asChild size="lg" variant="ghost">
              <Link href="/foundations/colors">Fundamentos</Link>
            </Button>
            <span className="hidden items-center gap-1.5 text-sm text-subtle-foreground sm:flex">
              Busque com <Kbd>⌘</Kbd>
              <Kbd>K</Kbd>
            </span>
          </div>
        </div>
      </section>

      <Section title="Princípios" description="As decisões que orientam cada token e componente.">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {principles.map(({ icon: Icon, title, text }) => (
            <GlowCard key={title} className="p-5">
              <Icon className="mb-3 size-5 text-brand-text" aria-hidden />
              <h3 className="mb-1 text-base font-semibold">{title}</h3>
              <p className="text-sm text-muted-foreground">{text}</p>
            </GlowCard>
          ))}
        </div>
      </Section>

      <Section title="Começar um projeto novo" description="O repositório é, ao mesmo tempo, a documentação e o template.">
        <CodeBlock
          code={`
# 1. clone como base do novo projeto
git clone git@github.com:heitoroliveiro-dev/designsystem-linear.git meu-produto
cd meu-produto && rm -rf .git && git init

# 2. instale e rode a documentação
npm install
npm run dev            # http://localhost:3000

# 3. personalize a marca (3 sementes) e regenere os tokens
#    edite tokens/theme.config.json → brand.hue
npm run tokens
`}
        />
      </Section>

      <Section title="Arquitetura de tokens" description="Três camadas, do valor bruto à intenção de uso.">
        <div className="grid gap-3 md:grid-cols-3">
          {[
            ["Sementes", "tokens/theme.config.json", "neutral.hue · brand.hue · contraste"],
            ["Primitivos", "tokens/primitives/*.tokens.json", "gray-1…12 · brand-1…12 · radius · duration"],
            ["Semânticos", "tokens/semantic/*.tokens.json", "background · primary · muted-foreground · ring"],
          ].map(([title, path, ex], i) => (
            <div key={title} className="rounded-lg border border-border bg-background p-4">
              <p className="mb-2 font-mono text-xs text-subtle-foreground">0{i + 1}</p>
              <p className="font-medium">{title}</p>
              <p className="mb-3 font-mono text-xs text-brand-text">{path}</p>
              <p className="text-sm text-muted-foreground">{ex}</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}

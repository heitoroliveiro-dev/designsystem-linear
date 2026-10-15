# Design System — Linear UX/UI

Design system **dark-first** inspirado na linguagem visual do [Linear](https://linear.app): fundo quase preto, cinzas de croma mínimo, tipografia Inter, bordas finas, luz no lugar de sombra e microinterações rápidas.

O repositório é **ao mesmo tempo a documentação navegável e o template** para novos projetos: clone, rode e construa.

> Não é afiliado ao Linear. "Linear" descreve o estilo de referência; nenhum ativo de marca do Linear é usado.

---

## Sumário

- [Início rápido](#início-rápido)
- [Usar em um projeto novo](#usar-em-um-projeto-novo)
- [Stack](#stack)
- [Estrutura do repositório](#estrutura-do-repositório)
- [Tokens](#tokens)
- [Componentes](#componentes)
- [Scripts](#scripts)
- [Padrões e referências adotados](#padrões-e-referências-adotados)
- [Documentação detalhada](#documentação-detalhada)

---

## Início rápido

```bash
git clone git@github.com:heitoroliveiro-dev/designsystem-linear.git
cd designsystem-linear
npm install
npm run dev        # http://localhost:3000 — documentação viva
```

Requer Node ≥ 20.9 (veja `.nvmrc`).

## Usar em um projeto novo

**Opção A — usar o repositório como template (recomendado para apps Next.js)**

```bash
git clone git@github.com:heitoroliveiro-dev/designsystem-linear.git meu-produto
cd meu-produto && rm -rf .git && git init
npm install
```

1. Troque a cor de marca em `tokens/theme.config.json` (`brand.hue`) e rode `npm run tokens`.
2. Apague as páginas de documentação que não quiser (`src/app/foundations`, `src/app/components`, …) e o `DocsShell` do `layout.tsx`.
3. Construa usando `src/components/ui` e as classes semânticas (`bg-card`, `text-muted-foreground`…).

**Opção B — levar só o sistema para um projeto existente (Next.js/Vite + Tailwind v4)**

Copie para o seu projeto:

| De | Para | O quê |
|---|---|---|
| `src/styles/` | `src/styles/` | `globals.css`, `tokens.css`, `theme.css`, `effects.css` |
| `src/components/ui/` | `src/components/ui/` | componentes |
| `src/components/effects/` | `src/components/effects/` | glows (opcional) |
| `src/lib/utils.ts` | `src/lib/utils.ts` | `cn()` |
| `components.json` | raiz | para o CLI do shadcn |

Instale as dependências: `radix-ui class-variance-authority clsx tailwind-merge lucide-react tw-animate-css` (+ `cmdk`, `sonner`, `next-themes` se usar Command, Toast e troca de tema). Coloque `class="dark"` no `<html>`.

**Opção C — só os tokens (qualquer stack, sem Tailwind)**

Use `tokens/build/tokens.css` (variáveis CSS puras) ou `tokens/build/tokens.json` (valores resolvidos por modo).

> Detalhes em [docs/08-uso-em-novos-projetos.md](docs/08-uso-em-novos-projetos.md).

## Stack

| Camada | Escolha | Por quê |
|---|---|---|
| Framework | Next.js 16 (App Router) + React 19 | Ecossistema padrão para SaaS |
| Estilo | Tailwind CSS v4 (`@theme` gerado dos tokens) | Utilitários tipados pelos tokens |
| Acessibilidade e comportamento | Radix Primitives (`radix-ui`) | Teclado, foco e ARIA corretos |
| API de componentes | Convenções do shadcn/ui | Você é dono do código; compatível com `npx shadcn add` |
| Tipografia | Inter variável (com `opsz`) + Geist Mono | O Linear usa Inter e Inter Display |
| Ícones | Lucide | Traço de 1,5–2px, consistente |
| Efeitos | CSS puro (`@property`, `conic-gradient`, `mask`) | Glows sem custo de JS de animação |

## Estrutura do repositório

```
.
├── tokens/                         ← FONTE DA VERDADE (W3C DTCG 2025.10)
│   ├── theme.config.json           sementes: neutro, marca, status, curvas
│   ├── primitives/                 escalas de cor (geradas), tipografia, raio, movimento
│   ├── semantic/                   base · dark · light · contrast-high (aliases)
│   └── build/                      tokens.css, tokens.json, contrast-report.json (gerados)
├── scripts/
│   ├── generate-scales.mjs         sementes → escalas OKLCH de 12 passos
│   ├── build-tokens.mjs            DTCG → CSS + @theme Tailwind + verificação WCAG
│   └── lib/color.mjs               conversões OKLCH/sRGB e contraste
├── src/
│   ├── styles/                     globals.css · tokens.css* · theme.css* · effects.css   (*gerados)
│   ├── components/ui/              componentes base (Button, Input, Dialog, Command…)
│   ├── components/effects/         GlowCard, BorderBeam, Background
│   ├── components/docs/            infraestrutura da documentação (pode apagar no seu projeto)
│   ├── lib/utils.ts                cn()
│   └── app/                        documentação navegável (fundamentos, componentes, padrões)
├── docs/                           guias em Markdown (consultáveis no GitHub)
├── AGENTS.md                       regras do sistema para assistentes de IA
└── components.json                 configuração do CLI shadcn
```

## Tokens

Arquitetura em **três camadas**:

```
sementes (theme.config.json)  →  primitivos (gray-1…12, brand-1…12)  →  semânticos (background, primary, ring…)
```

- **Componentes usam apenas tokens semânticos.** A paleta padrão do Tailwind foi removida (`--color-*: initial`), então `bg-zinc-900` simplesmente não existe.
- **Dark é o padrão**, light é completo, e há um **modo de alto contraste** (`<html data-contrast="high">`).
- **Contraste é verificado no build:** `npm run tokens` falha se qualquer par texto/fundo ficar abaixo de 4,5:1 ou se foco/componentes ficarem abaixo de 3:1 (WCAG 2.2 AA).

| Token | Uso | Classe |
|---|---|---|
| `background` | Fundo da aplicação | `bg-background` |
| `card` / `popover` | Superfícies elevadas 1 e 2 | `bg-card`, `bg-popover` |
| `foreground` | Texto primário | `text-foreground` |
| `muted-foreground` | Texto secundário | `text-muted-foreground` |
| `subtle-foreground` | Metadados, placeholders | `text-subtle-foreground` |
| `primary` | Ação principal (marca) | `bg-primary text-primary-foreground` |
| `accent` | Hover/seleção neutra (convenção shadcn) | `hover:bg-accent` |
| `border` / `border-subtle` / `input` | Bordas | `border-border`, `border-input` |
| `ring` | Foco | automático via `:focus-visible` |
| `success` · `warning` · `danger` · `info` | Status (`-subtle`, `-border`, `-text`) | `bg-success-subtle text-success-text` |

Raio: `rounded-xs` 4 · `sm` 6 · `md` 8 · `lg` 12 · `xl` 16. Texto: `text-sm` (13px) é o corpo padrão. Movimento: `duration-(--duration-fast)` + `ease-standard`.

Referência completa: [docs/02-cores.md](docs/02-cores.md) · [docs/03-tipografia.md](docs/03-tipografia.md) · [docs/04-espaco-e-layout.md](docs/04-espaco-e-layout.md).

## Componentes

`src/components/ui/`: **Alert · Avatar · Badge · Button · Card · Checkbox · Command (⌘K) · Dialog · Dropdown Menu · Input · Kbd · Label · Popover · Radio Group · Select · Separator · Skeleton · Sonner (Toast) · Spinner · Switch · Table · Tabs · Textarea · Tooltip**

`src/components/effects/`: **GlowCard · BorderBeam · Background** (grid, dots, spotlight)

```tsx
import { Button } from "@/components/ui/button";

<Button variant="default">Criar issue</Button>   {/* primária: uma por região */}
<Button>Cancelar</Button>                         {/* secondary é o padrão */}
<Button variant="ghost" size="icon-sm" aria-label="Mais"><MoreHorizontalIcon /></Button>
```

Novos componentes do shadcn funcionam direto: `npx shadcn@latest add accordion` — eles herdam os tokens.

Guia: [docs/06-componentes.md](docs/06-componentes.md).

## Scripts

| Comando | O que faz |
|---|---|
| `npm run dev` | Documentação em modo desenvolvimento |
| `npm run tokens` | Gera escalas, CSS e `@theme`; valida contraste WCAG |
| `npm run build` | `tokens` + build de produção |
| `npm run check` | `tokens` + typecheck + lint (o mesmo da CI) |
| `npm run tokens:check` | Falha se os arquivos gerados estiverem desatualizados |

## Padrões e referências adotados

| Tema | Referência |
|---|---|
| Formato de tokens | [W3C Design Tokens Format Module 2025.10](https://www.designtokens.org/tr/2025.10/format/) (DTCG) |
| Escala de cor | [Radix Colors — 12 passos com papéis fixos](https://www.radix-ui.com/colors/docs/palette-composition/understanding-the-scale) |
| Espaço de cor | OKLCH (CSS Color 4). O Linear gera temas em LCH a partir de base + accent + contraste ([fonte](https://linear.app/now/how-we-redesigned-the-linear-ui)) |
| Acessibilidade | [WCAG 2.2](https://www.w3.org/TR/WCAG22/) nível AA (1.4.3, 1.4.11, 2.4.7, 2.5.8, 2.3.3) |
| Nomes e API de componentes | [shadcn/ui theming](https://ui.shadcn.com/docs/theming) |
| Curvas de movimento | Material Design 3 (standard, emphasized decelerate/accelerate) |
| Arquitetura | Tokens em camadas (primitivo → semântico) e componentes em níveis (primitivos → efeitos → padrões) |

Verificação de cada afirmação do estilo Linear (o que é do app e o que é só do marketing) em [docs/01-principios.md](docs/01-principios.md).

## Documentação detalhada

| Arquivo | Conteúdo |
|---|---|
| [01-principios.md](docs/01-principios.md) | Princípios e verificação do estilo Linear |
| [02-cores.md](docs/02-cores.md) | Sistema de cor, escalas, semânticos, contraste |
| [03-tipografia.md](docs/03-tipografia.md) | Fontes, escala, pesos, regras |
| [04-espaco-e-layout.md](docs/04-espaco-e-layout.md) | Grid de 4px, alturas, raio, shell de app |
| [05-elevacao-luz-movimento.md](docs/05-elevacao-luz-movimento.md) | Superfícies, sombras, glow e animação |
| [06-componentes.md](docs/06-componentes.md) | Catálogo, variantes e quando usar cada um |
| [07-acessibilidade.md](docs/07-acessibilidade.md) | Critérios WCAG cobertos e trade-offs |
| [08-uso-em-novos-projetos.md](docs/08-uso-em-novos-projetos.md) | Passo a passo de adoção e personalização |
| [09-governanca.md](docs/09-governanca.md) | Como evoluir o sistema: tokens, componentes, versões |

## Licença

[MIT](LICENSE)

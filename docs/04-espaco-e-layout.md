# 04 · Espaço e layout

## Grid de 4px

Espaçamento usa a escala do Tailwind (`--spacing: 0.25rem`): `1` = 4px, `2` = 8px, `3` = 12px, `4` = 16px, `6` = 24px, `8` = 32px.

| Contexto | Espaço |
|---|---|
| Dentro de componentes (ícone ↔ texto) | 4–8px (`gap-1`–`gap-2`) |
| Elementos relacionados | 12–16px (`gap-3`–`gap-4`) |
| Grupos | 24–32px (`gap-6`–`gap-8`) |
| Seções | 48–64px (`py-12`–`py-16`) |

## Alturas de controle

| Classe | px | Uso |
|---|---|---|
| `h-6` | 24 | Botão `xs`, kbd, badge (mínimo WCAG 2.5.8) |
| `h-7` | 28 | Botão `sm`, item de sidebar |
| **`h-8`** | **32** | **Padrão: botão, input, select, item de menu** |
| `h-9` | 36 | Linha de tabela/lista, item do ⌘K |
| `h-10` | 40 | Botão `lg` (marketing, onboarding) |

Como os controles compartilham alturas, um `Input` e um `Button` alinham na mesma linha sem ajuste.

## Raio

| Classe | px | Uso |
|---|---|---|
| `rounded-xs` | 4 | Checkbox, kbd |
| `rounded-sm` | 6 | Botões `xs` |
| `rounded-md` | 8 | **Padrão**: botões, inputs, itens |
| `rounded-lg` | 12 | Cards, popovers |
| `rounded-xl` | 16 | Dialogs, painel de conteúdo |
| `rounded-full` | — | Avatares, badges |

Elementos aninhados: raio interno = raio externo − padding.

## Shell de aplicação

Siga o modelo da documentação (`src/components/docs/docs-shell.tsx`) e do padrão "App shell" (`/patterns`):

- **Sidebar** de 240px (`w-60`) em `bg-sidebar`, texto `sidebar-foreground` (mais apagado).
- **Conteúdo** em painel `bg-card` com `rounded-xl`, borda sutil e `shadow-raised`, afastado 8px da borda da janela.
- **Cabeçalho de view** de 44–48px com título, contagem, filtros e ação primária à direita.
- **Painel de detalhes** à direita, com 320–400px, a partir de `xl`.

## Breakpoints

Os do Tailwind (mobile-first): `sm` 640 · `md` 768 · `lg` 1024 (sidebar fixa) · `xl` 1280 · `2xl` 1536.

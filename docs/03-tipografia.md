# 03 · Tipografia

## Famílias

| Token | Fonte | Uso |
|---|---|---|
| `font-sans` | **Inter** variável (eixos `wght` 100–900 e `opsz` 14–32) | Toda a interface |
| `font-mono` | **Geist Mono** | Código, IDs (`ENG-123`), atalhos, valores |

As fontes são carregadas com `next/font/google` em `src/app/layout.tsx`, o que garante self-hosting, zero layout shift e `display: swap`. Com `font-optical-sizing: auto`, títulos grandes usam o desenho **Inter Display**, que é a combinação que o Linear usa.

**Trocar para Geist Sans:** em `layout.tsx`, troque `Inter` por `Geist` (de `next/font/google`) mantendo `variable: "--font-face-sans"`.

## Escala

| Classe | px / altura de linha | Peso padrão | Uso |
|---|---|---|---|
| `text-2xs` | 11 / 14 | 510 | Atalhos, contadores |
| `text-xs` | 12 / 16 | 400 | Metadados, labels, tabelas |
| **`text-sm`** | **13 / 20** | 400 | **Corpo padrão da aplicação** |
| `text-base` | 14 / 20 | 400 | Corpo confortável |
| `text-md` | 15 / 24 | 400 | Leitura em documentação |
| `text-lg` | 16 / 24 | 400 | Lead, textos de marketing |
| `text-xl` | 18 / 26 | 510 | Títulos de card/dialog |
| `text-2xl` | 20 / 28 | 590 | Títulos de seção |
| `text-3xl` | 24 / 32 | 590 | Seções grandes |
| `text-4xl` | 32 / 38 | 590 | Título de página |
| `text-5xl`–`7xl` | 40–64 | 590 | Marketing |

Cada tamanho já carrega **altura de linha, tracking e peso** (`--text-*--line-height`, `--letter-spacing`, `--font-weight`). Títulos têm tracking negativo progressivo (−0,3% a −3%). `font-*` sobrescreve o peso quando necessário.

## Pesos

`font-normal` 400 · `font-medium` **510** · `font-semibold` **590** · `font-bold` 680

Pesos intermediários do Inter variável ficam mais refinados que 500/600 em fundos escuros, onde o texto claro "engorda" visualmente.

## Regras

1. **Hierarquia por cor antes de tamanho:** `foreground` → `muted-foreground` → `subtle-foreground`.
2. **Números tabulares** em tabelas, contadores e preços: `tabular-nums` (já aplicado em `Table`).
3. **Linha de leitura** de 60–75 caracteres: `max-w-2xl`.
4. `text-wrap: balance` em títulos e `pretty` em parágrafos (aplicados na base).
5. Evite: texto abaixo de 11px, caixa alta em blocos, itálico para ênfase de UI.

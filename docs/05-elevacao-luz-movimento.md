# 05 · Elevação, luz e movimento

## Superfícies

Em dark mode, **elevar é clarear**: `background` (gray-1) → `card` (gray-2) → `popover` (gray-3). Em light, `card` e `popover` são brancos e a profundidade vem da sombra.

## Tokens de elevação

| Classe | Dark | Light | Uso |
|---|---|---|---|
| `shadow-raised` | realce interno 1px + sombra curta | sombra suave | Botões, cards |
| `shadow-overlay` | realce + sombra profunda | sombra média | Menus, popovers, tooltips |
| `shadow-modal` | realce + sombra muito profunda | sombra ampla | Dialogs, ⌘K |

Os nomes do Tailwind/shadcn (`shadow-xs` … `shadow-2xl`) apontam para esses três níveis, então componentes copiados do shadcn ficam coerentes.

## Luz (`src/styles/effects.css`)

| Utilitário / componente | Efeito |
|---|---|
| `glow` | Halo na cor de marca: anel de 1px + brilho difuso |
| `highlight-top` | Realce de 1px no topo de superfícies escuras |
| `text-gradient` | Título que esmaece de `foreground` para baixo |
| `bg-grid` / `bg-dots` | Padrões de fundo com máscara radial |
| `spotlight` | Holofote no topo de uma seção |
| `<GlowCard>` | Holofote que segue o cursor (fundo + borda) |
| `<BorderBeam>` | Feixe de luz percorrendo a borda |
| `<Background variant>` | `grid` · `dots` · `spotlight` |

**Regra:** uma fonte de luz por tela. Efeitos animados ficam em marketing e pontos de destaque, nunca em listas ou telas de trabalho.

### Aceternity UI / Magic UI

Podem complementar landing pages, com estas condições:

1. Só em rotas de marketing.
2. Copiados para `src/components/effects`, com cores fixas trocadas por tokens.
3. Carregados com `next/dynamic` abaixo da dobra.
4. Com fallback para `prefers-reduced-motion`.

## Movimento

| Token | Valor | Uso |
|---|---|---|
| `--duration-instant` | 50ms | Press |
| `--duration-fast` | 100ms | Hover, cor; saída de overlays |
| `--duration-normal` | 150ms | Microinteração padrão |
| `--duration-moderate` | 200ms | Entrada de menus e dialogs |
| `--duration-slow` | 300ms | Painéis, layout |
| `--duration-slower` | 500ms | Só marketing |

| Curva | Valor | Origem |
|---|---|---|
| `ease-standard` | `cubic-bezier(0.2, 0, 0, 1)` | M3 standard |
| `ease-enter` | `cubic-bezier(0.05, 0.7, 0.1, 1)` | M3 emphasized decelerate |
| `ease-exit` | `cubic-bezier(0.3, 0, 0.8, 0.15)` | M3 emphasized accelerate |

```tsx
<button className="transition-colors duration-(--duration-fast) ease-standard hover:bg-accent" />
```

**Regras:**

- Saída é mais rápida que entrada.
- Anime só `transform`, `opacity` e cor.
- CSS antes de JS.
- `prefers-reduced-motion` zera durações globalmente (em `globals.css`).

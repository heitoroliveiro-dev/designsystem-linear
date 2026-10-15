# 02 · Cores

## Pipeline

```
tokens/theme.config.json ──generate-scales──▶ tokens/primitives/color.{dark,light}.tokens.json
                                                         │
tokens/semantic/{base,dark,light,contrast-high}.tokens.json ──build-tokens──▶ src/styles/tokens.css
                                                                           ├─▶ src/styles/theme.css (@theme Tailwind)
                                                                           ├─▶ tokens/build/tokens.{css,json}
                                                                           └─▶ tokens/build/contrast-report.json
```

Rode `npm run tokens` depois de qualquer mudança em `tokens/`. **Nunca edite os arquivos gerados.**

## Sementes (`tokens/theme.config.json`)

| Chave | Padrão | Efeito |
|---|---|---|
| `neutral.hue` / `chroma` | 70 / 0,004 | Temperatura dos cinzas. Croma > 0,01 começa a parecer colorido. |
| `brand.hue` / `chroma` | 277 / 0,17 | Cor de marca (indigo). **Mude aqui para dar identidade ao produto.** |
| `brand.solidLightness` | 0,53 | Luminosidade do botão primário. Acima de ~0,56, o texto branco falha no contraste. |
| `status.*` | red, green, amber, blue | Cores de feedback. |
| `lightness.dark/light` | 12 valores | Curva de luminosidade dos passos. |

## Escala de 12 passos (metodologia Radix Colors)

| Passo | Papel | Exemplos de semânticos |
|---|---|---|
| 1 | Fundo da aplicação | `background`, `sidebar` |
| 2 | Fundo sutil / superfície 1 | `card` |
| 3 | Fundo de componente | `popover`, `muted`, `secondary`, `*-subtle` |
| 4 | Hover de componente | `accent`, `sidebar-accent` |
| 5 | Ativo/selecionado | `border-subtle` |
| 6 | Borda não interativa | `border` |
| 7 | Borda interativa | `input`, `*-border` |
| 8 | Borda forte / hover | `border-strong` |
| 9 | Sólido (maior croma) | `primary`, `destructive`, `success` |
| 10 | Hover do sólido | `primary-hover`, `ring` (dark), `subtle-foreground` (gray) |
| 11 | Texto de baixo contraste | `muted-foreground`, `*-text` |
| 12 | Texto de alto contraste | `foreground` |

Escalas disponíveis: `gray`, `brand`, `red`, `green`, `amber`, `blue`. Todas viram utilitários (`bg-brand-3`, `text-gray-11`), mas **use primitivos só em ilustrações e gráficos**.

## Tokens semânticos

Seguem a convenção do shadcn/ui: um par `nome` + `nome-foreground`. O sufixo "background" é omitido.

**Superfícies:** `background` · `card` · `popover` · `muted` · `accent` · `sidebar`
**Texto:** `foreground` · `muted-foreground` · `subtle-foreground` · `brand-text`
**Ações:** `primary` (+`-foreground`, `-hover`) · `secondary` · `destructive` · `ring`
**Bordas:** `border-subtle` · `border` · `input` · `border-strong`
**Marca:** `brand` · `brand-subtle` · `brand-border` · `brand-text`
**Status:** `success|warning|info` + `-subtle`, `-border`, `-text` · `danger-subtle|border|text`
**Gráficos:** `chart-1` … `chart-5`
**Sidebar:** `sidebar` · `sidebar-foreground` · `sidebar-primary` · `sidebar-accent` · `sidebar-border` · `sidebar-ring`

> ⚠️ `accent`, na convenção shadcn, é o **fundo de hover neutro**, não a cor de marca. A cor de marca é `primary` / `brand`.

## Modos

| Modo | Como ativar |
|---|---|
| Dark (padrão) | `<html class="dark">` |
| Light | remover a classe `dark` (o `next-themes` faz isso) |
| Alto contraste | `<html data-contrast="high">` (combina com dark e com light) |

## Regras

- Componentes usam **apenas semânticos**. A paleta padrão do Tailwind foi removida.
- Use `primary` uma vez por região. O restante da UI fica neutro.
- Nunca comunique estado só por cor: combine com texto ou ícone (WCAG 1.4.1).
- Opacidade sobre tokens funciona (`bg-primary/90`, `hover:bg-muted/60`), mas não use opacidade para criar texto secundário. Use `muted-foreground`.

## Adicionar um token semântico

1. Adicione em `tokens/semantic/base.tokens.json` (e sobrescritas em `light`/`dark`, se precisar).
2. Se for texto ou foco, adicione o par em `pairs` em `scripts/build-tokens.mjs`.
3. `npm run tokens`. O utilitário `bg-<nome>` / `text-<nome>` é gerado automaticamente.

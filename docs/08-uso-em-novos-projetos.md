# 08 · Uso em novos projetos

## A) Template completo (Next.js)

```bash
git clone git@github.com:heitoroliveiro-dev/designsystem-linear.git meu-produto
cd meu-produto
rm -rf .git && git init && git add -A && git commit -m "chore: base do design system"
npm install
npm run dev
```

**Personalize a identidade (5 minutos):**

1. `tokens/theme.config.json`: altere `brand.hue` (0–360). Exemplos: 150 verde, 25 vermelho, 200 ciano, 300 violeta.
2. `npm run tokens`. Se algum contraste falhar, ajuste `brand.solidLightness` (mais baixo = mais escuro).
3. Opcional: `neutral.hue` (temperatura dos cinzas), raios em `tokens/primitives/dimension.tokens.json`, fonte em `src/app/layout.tsx`.

**Limpe a documentação** quando começar o produto:

```bash
rm -rf src/app/foundations src/app/components src/app/effects src/app/patterns
```

Em `src/app/layout.tsx`, troque `<DocsShell>` pelo seu layout. `src/components/docs` pode ser removido; o `Providers` dali pode ser movido para `src/components/providers.tsx`.

> Dica: mantenha a documentação num branch `docs` ou numa rota `/design` interna. É útil para o time consultar.

## B) Projeto existente com Tailwind v4

1. Copie `src/styles/*`, `src/components/ui/*`, `src/lib/utils.ts`, `components.json` e, se quiser, `src/components/effects/*`.
2. Copie `tokens/` e `scripts/` para continuar gerando tokens.
3. Dependências:
   ```bash
   npm i radix-ui class-variance-authority clsx tailwind-merge lucide-react tw-animate-css cmdk sonner next-themes
   ```
4. Importe `globals.css` no entry point.
5. Coloque `class="dark"` no `<html>` (ou use `next-themes` com `defaultTheme="dark"`).
6. Carregue Inter e Geist Mono e exponha-as como `--font-face-sans` / `--font-face-mono`. Sem isso, o sistema cai para as fontes do sistema operacional.

**Vite/React:** funciona igual. Use `@tailwindcss/vite` e `@fontsource-variable/inter`. Remova `"use client"` (inofensivo) se quiser.

## C) Somente tokens

| Arquivo | Para |
|---|---|
| `tokens/build/tokens.css` | Qualquer projeto web: variáveis CSS (`var(--background)`, `var(--radius-md)`) |
| `tokens/build/tokens.json` | Valores resolvidos por modo (hex/oklch), útil para apps nativos e e-mails |
| `tokens/primitives` + `semantic` | Fonte DTCG, importável no Figma (Tokens Studio) ou no Style Dictionary v4+ |

## Manter projetos derivados atualizados

Como o código é copiado (modelo shadcn), atualizações são **manuais e deliberadas**:

```bash
git remote add ds git@github.com:heitoroliveiro-dev/designsystem-linear.git
git fetch ds
git diff HEAD ds/main -- src/components/ui/button.tsx     # inspecione
git checkout ds/main -- tokens/ scripts/                   # traga tokens
npm run tokens
```

Consulte o `CHANGELOG.md` antes de atualizar.

# AGENTS.md — regras do design system para assistentes de IA

Este projeto usa um design system dark-first no estilo Linear. Ao gerar ou editar UI, siga estas regras.

## Stack
Next.js (App Router) · React 19 · Tailwind CSS v4 · Radix (`radix-ui`) · convenções shadcn/ui · lucide-react · Inter + Geist Mono.

## Regras obrigatórias
1. **Cores: só tokens semânticos.** `bg-background`, `bg-card`, `bg-popover`, `bg-muted`, `hover:bg-accent`, `text-foreground`, `text-muted-foreground`, `text-subtle-foreground`, `border-border`, `border-border-subtle`, `border-input`, `bg-primary text-primary-foreground`, `bg-{success|warning|danger|info}-subtle text-{…}-text`. A paleta padrão do Tailwind (`zinc`, `slate`, `gray-900`…) **não existe**. Nunca use hex/rgb literais.
2. **Reutilize `src/components/ui`** antes de criar markup. Botão = `<Button>`, campo = `<Input>` + `<Label>`, menu = `DropdownMenu`, modal = `Dialog`, busca/⌘K = `Command`.
3. **Uma ação primária por região:** `<Button variant="default">`. O padrão (`secondary`) serve para o resto; `ghost` para ações de baixa ênfase.
4. **Densidade:** corpo `text-sm` (13px), controles `h-8`, linhas de lista `h-9`, grid de 4px.
5. **Raio:** `rounded-md` em controles, `rounded-lg` em cards/popovers, `rounded-xl` em dialogs/painéis.
6. **Elevação:** `shadow-raised` · `shadow-overlay` · `shadow-modal`. Sem sombras pretas customizadas.
7. **Movimento:** `transition-colors duration-(--duration-fast) ease-standard`. No máximo 200ms em overlays. Nada de animar width/height.
8. **Efeitos de luz** (`glow`, `GlowCard`, `BorderBeam`, `Background`) só em marketing/destaque, um por tela.
9. **Acessibilidade:** botão só-ícone com `aria-label`; todo campo com `<Label htmlFor>`; erros com `aria-invalid` + `aria-describedby`; nunca remova o foco visível; estado nunca só por cor.
10. **Ícones:** lucide-react, `size-4` por padrão (herdado dentro de Button/menus).

## Tokens
- Fonte: `tokens/` (W3C DTCG). Depois de editar, rode `npm run tokens`. **Não edite** `src/styles/tokens.css`, `src/styles/theme.css` nem `tokens/build/*`.
- Novo token semântico → `tokens/semantic/base.tokens.json` (+ `light`/`dark` se divergir).
- Mudar identidade → `tokens/theme.config.json` (`brand.hue`).

## Verificação
`npm run check` (tokens + typecheck + lint) e `npm run build` precisam passar.

Referência completa: `README.md` e `docs/`.

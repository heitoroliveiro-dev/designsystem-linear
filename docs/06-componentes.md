# 06 · Componentes

Todos vivem em `src/components/ui`, seguem a API do shadcn/ui (`data-slot`, `cva`, `cn`, `asChild`) e usam Radix Primitives para teclado, foco e ARIA. Veja exemplos interativos em `/components` (`npm run dev`).

## Organização

| Nível | Pasta | Conteúdo |
|---|---|---|
| Base | `src/components/ui` | Controles e superfícies reutilizáveis, sem regra de negócio |
| Efeitos | `src/components/effects` | Camada decorativa de luz (marketing e destaque) |
| Padrões | `src/app/patterns/demos.tsx` | Composições: app shell, estado vazio, formulário |
| Produto | seu código | Componentes com regra de negócio, compostos dos acima |

## Catálogo

| Componente | Variantes / API | Quando usar | Quando **não** usar |
|---|---|---|---|
| **Button** | `variant`: `default` (primária) · `secondary` (padrão) · `outline` · `ghost` · `destructive` · `link`. `size`: `xs` `sm` `default` `lg` `icon-xs` `icon-sm` `icon` `icon-lg`. `loading`, `asChild` | Ações | Navegação pura (use `<Link>`; ou `asChild`) |
| **Badge** | `default` · `brand` · `success` · `warning` · `danger` · `info` · `outline`; `dot` | Status, categorias, contagens | Ações clicáveis |
| **Input / Textarea / Label** | `aria-invalid` para erro | Texto livre | Opções fixas (Select/Radio) |
| **Checkbox / RadioGroup** | `indeterminate` | Escolhas confirmadas por "Salvar" | Efeito imediato (Switch) |
| **Switch** | — | Liga/desliga com efeito imediato | Formulários com submit |
| **Select** | `size`: `sm` `default` | 5–15 opções | < 5 (Radio/Tabs) ou > 15 (Command com busca) |
| **Card** | Header, Title, Description, Action, Content, Footer | Agrupar conteúdo relacionado | Envolver cada item de lista |
| **Tabs** | `variant`: `segmented` · `line` | Alternar visões / seções | Fluxos sequenciais |
| **Dialog** | `showCloseButton` | Confirmação irreversível, formulário curto | Ação reversível (use toast com Desfazer) |
| **Dropdown Menu** | Item `variant="destructive"`, Shortcut, Sub, Checkbox/Radio items | Ações contextuais | Navegação principal |
| **Tooltip** | `shortcut={["⌘","K"]}` | Rótulo de botão só-ícone + atalho | Informação essencial |
| **Popover** | — | Conteúdo interativo ancorado (filtros) | Apenas texto (Tooltip) |
| **Command** | `CommandDialog` para ⌘K global | Paleta de comandos, busca com seleção | — |
| **Table** | linhas 36px, `tabular-nums` | Dados tabulares densos | Layout |
| **Alert** | `default` · `info` · `success` · `warning` · `danger` | Mensagem persistente | Feedback efêmero (toast) |
| **Toast** (`sonner`) | `toast()`, `.success`, `.error`, `action` | Feedback de ação, Desfazer | Erros que exigem ação |
| **Avatar** | `AvatarGroup` | Pessoas | — |
| **Kbd** | `size`: `sm` `default` | Mostrar atalhos | — |
| **Skeleton / Spinner** | — | Carregamento com forma conhecida / ação curta | — |
| **Separator** | `orientation` | Raramente: prefira espaço | Entre todos os itens |

## Convenções de código

```tsx
// 1. Variantes com cva; classes extras via className (cn resolve conflitos)
<Button variant="ghost" size="icon-sm" className="ml-auto" aria-label="Fechar">
  <XIcon />
</Button>

// 2. Composição com asChild
<Button asChild variant="default"><Link href="/new">Criar</Link></Button>

// 3. Ícones: Lucide, tamanho herdado (size-4); botão só-ícone SEMPRE com aria-label
```

## Adicionar componentes do shadcn

```bash
npx shadcn@latest add accordion sheet calendar
```

O `components.json` já aponta para `src/components/ui` e `src/styles/globals.css`. Os componentes adicionados herdam os tokens. Revise e troque `shadow-*`, cores literais e durações pelos tokens do sistema.

## Checklist de um novo componente

- [ ] Baseado em Radix quando houver interação complexa (foco, teclado, portal)
- [ ] Só tokens semânticos; nada de cor literal
- [ ] `data-slot="nome"` na raiz
- [ ] Altura de controle da escala (24/28/32/36/40)
- [ ] Foco visível (`:focus-visible` global ou `ring`)
- [ ] Estados: hover, active, disabled, `aria-invalid`, loading
- [ ] Transições com `--duration-*` e `ease-*`
- [ ] Testado em dark, light e alto contraste
- [ ] Exemplo adicionado em `src/app/components/showcase.tsx`

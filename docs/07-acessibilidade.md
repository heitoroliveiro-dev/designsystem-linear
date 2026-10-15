# 07 · Acessibilidade

Meta: **WCAG 2.2 nível AA**. O estilo dark e sutil é justamente onde produtos costumam falhar, por isso os pontos críticos são verificados automaticamente.

## Critérios cobertos

| Critério | Como o sistema atende |
|---|---|
| **1.4.3 Contraste mínimo** (4,5:1 texto) | `npm run tokens` calcula a razão de cada par semântico em dark, light e alto contraste, e **falha o build** se algum ficar abaixo. Relatório em `tokens/build/contrast-report.json` e em `/foundations/colors`. |
| **1.4.11 Contraste não textual** (3:1) | `primary`, `destructive`, `success`, `info` e `ring` são verificados contra o fundo. Bordas de input: ver trade-off abaixo. |
| **1.4.1 Uso de cor** | Badges e alerts sempre têm texto; status de issue tem ícone com `aria-label`. |
| **2.4.7 Foco visível** | `:focus-visible` global com contorno de 2px na cor `ring` e offset de 2px. Inputs usam borda `ring` + anel. |
| **2.4.13 Aparência do foco** (AAA) | O contorno de 2px atende ao requisito de área; `ring` ≥ 3:1 contra as superfícies (verificado). |
| **2.5.8 Tamanho do alvo** (24×24) | O menor controle tem 24px (`xs`). Checkbox/radio de 16px devem vir com `<Label>`, que amplia a área clicável. |
| **2.3.3 Animação por interação** | `prefers-reduced-motion: reduce` zera animações e transições globalmente. |
| **1.4.12 Espaçamento de texto** | Sem alturas fixas em containers de texto, então o layout tolera os ajustes do critério. |
| **4.1.2 Nome, função, valor** | Radix Primitives fornecem roles e estados ARIA; botões só-ícone exigem `aria-label` ou `sr-only`. |
| **Teclado** | Radix: navegação por setas em menus/select/tabs, `Esc` fecha, foco preso em dialogs e devolvido ao fechar. |

## Trade-off documentado: bordas de input

No contraste padrão, `input` (gray-7) fica em **~1,7:1** contra o fundo. É a estética de borda sutil do Linear. A WCAG 1.4.11 pede 3:1 para a fronteira visual que identifica o campo.

- **Mitigação no padrão:** todo campo tem `<Label>` visível, placeholder e sombra interna, e o foco tem contraste alto.
- **Conformidade estrita:** ative `data-contrast="high"` no `<html>`. Bordas de input passam a **~4:1**, os textos secundários sobem um passo e o foco usa `brand-11`. Exponha esse controle ao usuário, como faz a documentação (ícone de contraste na sidebar).
- **Se o seu produto exige AA estrito por padrão** (governo, saúde, contratos com auditoria), troque `"input": "{color.gray.7}"` por `"{color.gray.9}"` em `tokens/semantic/base.tokens.json`.

## Checklist por tela

- [ ] Um `<h1>` por página, hierarquia de títulos sem saltos
- [ ] Todo controle tem rótulo (visível ou `aria-label`)
- [ ] Erros associados com `aria-describedby` e `aria-invalid`
- [ ] Navegável só com teclado; ordem de foco lógica
- [ ] Nada depende só de hover (ações de hover também aparecem no foco: `focus-visible:opacity-100`)
- [ ] Testado com zoom de 200% e em alto contraste

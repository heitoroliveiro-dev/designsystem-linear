# 01 · Princípios

## Os seis princípios

1. **Dark-first, legível sempre.** Fundo quase preto (`gray-1` ≈ `#070707`) e cinzas com croma mínimo. Nenhum par de texto fica abaixo de 4,5:1, e o build garante isso.
2. **Estrutura sentida, não vista.** A hierarquia vem de superfícies e espaço. Use poucas bordas e menos divisores. A navegação recua e o conteúdo avança.
3. **Luz guia a atenção.** Glow e realce de 1px substituem a sombra sólida, mas só onde a atenção foi conquistada. No máximo uma fonte de luz por tela.
4. **Rápido e keyboard-first.** Microinterações ≤ 150 ms, paleta ⌘K e atalhos visíveis em menus e tooltips.
5. **Gerado, não pintado.** Três sementes geram todas as cores. Para mudar a identidade, troque um número.
6. **Padrões abertos.** DTCG, Radix, shadcn/ui e WCAG. Nada proprietário que precise ser reaprendido.

## Verificação: o "estilo Linear" descrito vs. o que o Linear publica

A descrição de partida foi: *dark mode nativo (OLED), tipografia sem serifa geométrica (Inter/Geist), bordas finas, glows no lugar de sombras e microinterações rápidas*. A comparação abaixo usa o que o próprio Linear publicou.

| Afirmação | Situação | Evidência / ajuste aplicado |
|---|---|---|
| Dark mode nativo e primário | ✅ Confirmado no posicionamento, ⚠️ parcial no produto | O app tem light e dark gerados pelo mesmo sistema. **Aplicado:** dark é o padrão e light é completo. |
| Fundo OLED (preto puro) | ⚠️ Parcial | O site de marketing usa quase-preto (não `#000`). Preto puro causa *smearing* em OLED e halo em texto claro. **Aplicado:** `gray-1` = L 13% (≈ `#070707`). |
| Contrastes sutis em cinza | ✅ Confirmado | No refresh de mar/2026, o Linear trocou o cinza azulado por um **cinza mais quente e menos saturado** e suavizou as bordas. **Aplicado:** neutro com hue 70 e croma 0,004. |
| Cores geradas | ✅ Confirmado | O Linear gera temas em **LCH** a partir de 3 variáveis: base, accent e contraste (antes eram 98). **Aplicado:** OKLCH a partir de `theme.config.json` + modo de alto contraste. |
| Inter / Geist | ✅ Confirmado (Inter) | O Linear usa **Inter Display** nos títulos e Inter no restante. **Aplicado:** Inter variável com eixo `opsz`, que usa o corte Display em tamanhos grandes. Geist entra como mono. |
| Tipografia "geométrica" | ❌ Impreciso | Inter é uma **neo-grotesca**, não geométrica (geométricas são Futura, Circular). O que importa é ser utilitária e legível. |
| Bordas finas | ✅ Confirmado e refinado | 2026: "structure should be felt, not seen". Menos divisores, bordas arredondadas e mais suaves. **Aplicado:** 4 níveis de borda e preferência por espaço. |
| Glows em vez de sombras | ⚠️ Principalmente no marketing | Glows, feixes e grids aparecem no **site**. O app usa superfícies e sombras discretas. **Aplicado:** glows ficam na camada `effects`, separada dos componentes de trabalho. |
| Microinterações rápidas | ✅ Coerente | O Linear não publica durações. **Aplicado:** tokens de 50–300 ms com curvas do Material 3. |
| Sidebar mais apagada | ✅ Confirmado (2026) | "a few notches dimmer". **Aplicado:** `sidebar-foreground` = `gray-11` e conteúdo em painel elevado. |
| Hierarquia | ✅ Confirmado (2026) | "Don't compete for attention you haven't earned". **Aplicado:** uma ação `primary` por região e uma fonte de luz por tela. |

Fontes:
- [How we redesigned the Linear UI](https://linear.app/now/how-we-redesigned-the-linear-ui)
- [Behind the latest design refresh (12/03/2026)](https://linear.app/now/behind-the-latest-design-refresh)
- [Linear Brand](https://linear.app/brand)

## Riscos conhecidos do estilo e como o sistema responde

| Risco | Mitigação |
|---|---|
| **Comoditização**: todo SaaS fica igual | A cor de marca é uma semente (`brand.hue`). Mude matiz, raio e fonte para ganhar identidade sem perder o sistema. |
| **Contraste baixo em texto secundário** | Verificação automática WCAG no build. `subtle-foreground` só sobre `background` e `card`. |
| **Bordas de input abaixo de 3:1** | Trade-off documentado. O modo `data-contrast="high"` resolve (ver [07-acessibilidade](07-acessibilidade.md)). |
| **Custo de performance de efeitos** | Efeitos em CSS puro. Bibliotecas com Framer Motion só em rotas de marketing. |

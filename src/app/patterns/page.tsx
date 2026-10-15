import type { Metadata } from "next";

import { AppShellDemo, EmptyStateDemo, SettingsFormDemo } from "./demos";
import { CodeBlock } from "@/components/docs/example";
import { PageHeader, Prose, Section } from "@/components/docs/page-header";

export const metadata: Metadata = { title: "Padrões" };

export default function PatternsPage() {
  return (
    <>
      <PageHeader eyebrow="Construção" title="Padrões">
        Composições recorrentes de produtos B2B. Copie, adapte e mantenha as regras.
      </PageHeader>

      <Section id="app-shell" title="App shell + lista" description="Sidebar recuada, cabeçalho com filtros, lista densa com linhas de 36px e ações no hover.">
        <AppShellDemo />
      </Section>

      <Section id="empty-state" title="Estado vazio" description="Explique o que aparece aqui, ofereça a ação principal e o atalho.">
        <EmptyStateDemo />
      </Section>

      <Section id="form" title="Formulário de configurações" description="Label à esquerda em telas largas, ajuda abaixo do campo, salvar explícito no rodapé.">
        <SettingsFormDemo />
      </Section>

      <Section id="feedback" title="Feedback e confirmação">
        <Prose>
          <p>
            <strong>Prefira desfazer a confirmar.</strong> Ações reversíveis (arquivar, mover) executam imediatamente e mostram toast com
            &quot;Desfazer&quot;. Use Dialog de confirmação só para ações <strong>irreversíveis</strong>, com o verbo no botão
            (&quot;Excluir projeto&quot;, nunca &quot;OK&quot;).
          </p>
          <p>
            <strong>UI otimista.</strong> Atualize a interface antes da resposta do servidor; reverta com toast de erro se falhar.
          </p>
        </Prose>
      </Section>

      <Section id="atalhos" title="Atalhos de teclado">
        <Prose>
          <p>Convenções consolidadas em ferramentas keyboard-first (Linear, GitHub, Gmail):</p>
        </Prose>
        <div className="mt-4">
          <CodeBlock
            code={`
⌘K / Ctrl+K   paleta de comandos
C             criar item
/             focar busca
J / K         próximo / anterior na lista
X             selecionar item
G depois I    ir para (navegação em sequência)
Esc           fechar / limpar seleção
?             mostrar todos os atalhos
`}
          />
        </div>
      </Section>
    </>
  );
}

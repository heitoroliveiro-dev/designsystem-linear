import type { Metadata } from "next";

import { MotionDemo } from "./motion-demo";
import { CodeBlock } from "@/components/docs/example";
import { DoDont, PageHeader, Prose, Section } from "@/components/docs/page-header";

export const metadata: Metadata = { title: "Movimento" };

const durations = [
  ["--duration-instant", "50ms", "Feedback de press (scale 0.98)"],
  ["--duration-fast", "100ms", "Hover, cor, opacidade; saída de overlays"],
  ["--duration-normal", "150ms", "Padrão de microinteração; switch"],
  ["--duration-moderate", "200ms", "Entrada de menus, popovers, dialogs"],
  ["--duration-slow", "300ms", "Painéis laterais, layout"],
  ["--duration-slower", "500ms", "Somente marketing"],
];

const easings = [
  ["ease-standard", "cubic-bezier(0.2, 0, 0, 1)", "M3 standard — começa e termina na tela"],
  ["ease-enter", "cubic-bezier(0.05, 0.7, 0.1, 1)", "M3 emphasized-decelerate — entrando"],
  ["ease-exit", "cubic-bezier(0.3, 0, 0.8, 0.15)", "M3 emphasized-accelerate — saindo"],
];

export default function MotionPage() {
  return (
    <>
      <PageHeader eyebrow="Fundamentos" title="Movimento">
        Rápido, funcional e quase imperceptível. Animação confirma uma ação ou orienta o olhar — nunca faz o usuário esperar.
      </PageHeader>

      <Section id="duracao" title="Duração">
        <div className="divide-y divide-border-subtle rounded-lg border border-border-subtle bg-background">
          {durations.map(([token, ms, use]) => (
            <div key={token} className="flex flex-wrap items-center gap-x-6 gap-y-1 px-4 py-2.5">
              <span className="w-44 font-mono text-xs text-foreground">{token}</span>
              <span className="w-12 font-mono text-xs text-subtle-foreground">{ms}</span>
              <span className="text-sm text-muted-foreground">{use}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section id="easing" title="Curvas" description="Curvas do Material Design 3. Passe o mouse para comparar.">
        <MotionDemo easings={easings} />
      </Section>

      <Section id="regras" title="Regras">
        <Prose>
          <p>
            <strong>Saída mais rápida que entrada.</strong> Overlays entram em 200ms com <code>ease-enter</code> e saem em 100ms com{" "}
            <code>ease-exit</code>.
          </p>
          <p>
            <strong>Anime apenas transform e opacity</strong> (e cor). Nunca width/height/top — custam layout.
          </p>
          <p>
            <strong>CSS antes de JS.</strong> Todos os efeitos do sistema são CSS. Framer Motion só se houver gesto ou layout animation
            real, e nunca em listas grandes.
          </p>
          <p>
            <strong>prefers-reduced-motion</strong> zera durações globalmente (WCAG 2.3.3).
          </p>
        </Prose>
        <div className="mt-4">
          <DoDont doText="Transições de cor em hover a 100ms." dontText="Animar entrada de cada item de uma lista, ou durações acima de 300ms em telas de trabalho." />
        </div>
        <div className="mt-4">
          <CodeBlock code={`<button className="transition-colors duration-(--duration-fast) ease-standard hover:bg-accent" />`} />
        </div>
      </Section>
    </>
  );
}

export function PageHeader({ eyebrow, title, children }: { eyebrow?: string; title: string; children?: React.ReactNode }) {
  return (
    <header className="mb-12 flex flex-col gap-3 animate-fade-up">
      {eyebrow && <p className="text-sm font-medium text-brand-text">{eyebrow}</p>}
      <h1 className="text-4xl">{title}</h1>
      {children && <div className="max-w-2xl text-md text-muted-foreground">{children}</div>}
    </header>
  );
}

export function Section({ id, title, description, children }: { id?: string; title: string; description?: React.ReactNode; children: React.ReactNode }) {
  return (
    <section id={id} className="mb-16 scroll-mt-20">
      <div className="mb-5 flex flex-col gap-1.5">
        <h2 className="text-2xl">
          {id ? (
            <a href={`#${id}`} className="hover:underline hover:decoration-border-strong hover:underline-offset-4">
              {title}
            </a>
          ) : (
            title
          )}
        </h2>
        {description && <div className="max-w-2xl text-sm text-muted-foreground">{description}</div>}
      </div>
      {children}
    </section>
  );
}

export function Prose({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-2xl space-y-3 text-md text-muted-foreground [&_code]:rounded-xs [&_code]:bg-muted [&_code]:px-1 [&_code]:py-0.5 [&_code]:text-sm [&_code]:text-foreground [&_strong]:font-medium [&_strong]:text-foreground">
      {children}
    </div>
  );
}

export function DoDont({ doText, dontText }: { doText: React.ReactNode; dontText: React.ReactNode }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <div className="rounded-lg border border-success-border bg-success-subtle p-4 text-sm">
        <p className="mb-1 font-medium text-success-text">Faça</p>
        <div className="text-muted-foreground">{doText}</div>
      </div>
      <div className="rounded-lg border border-danger-border bg-danger-subtle p-4 text-sm">
        <p className="mb-1 font-medium text-danger-text">Evite</p>
        <div className="text-muted-foreground">{dontText}</div>
      </div>
    </div>
  );
}

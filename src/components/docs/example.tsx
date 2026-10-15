"use client";

import * as React from "react";
import { CheckIcon, CopyIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

/** Bloco de exemplo: pré-visualização + código copiável. */
export function Example({ code, children, className }: { code: string; children: React.ReactNode; className?: string }) {
  return (
    <Tabs defaultValue="preview" className="gap-2">
      <TabsList variant="line">
        <TabsTrigger value="preview">Preview</TabsTrigger>
        <TabsTrigger value="code">Código</TabsTrigger>
      </TabsList>
      <TabsContent value="preview">
        <div className={cn("flex min-h-36 flex-wrap items-center justify-center gap-3 rounded-lg border border-border-subtle bg-background p-8", className)}>
          {children}
        </div>
      </TabsContent>
      <TabsContent value="code">
        <CodeBlock code={code} />
      </TabsContent>
    </Tabs>
  );
}

export function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = React.useState(false);
  const copy = async () => {
    await navigator.clipboard.writeText(code.trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <div className="relative">
      <pre className="max-h-96 overflow-auto rounded-lg border border-border-subtle bg-background p-4 text-xs leading-relaxed text-muted-foreground">
        <code>{code.trim()}</code>
      </pre>
      <Button variant="ghost" size="icon-xs" onClick={copy} className="absolute right-2 top-2">
        {copied ? <CheckIcon /> : <CopyIcon />}
        <span className="sr-only">Copiar código</span>
      </Button>
    </div>
  );
}

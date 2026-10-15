"use client";

import * as React from "react";
import { toast } from "sonner";
import {
  ArchiveIcon,
  CircleDashedIcon,
  CircleDotIcon,
  CircleIcon,
  FilterIcon,
  InboxIcon,
  LayersIcon,
  ListTodoIcon,
  PlusIcon,
  SlidersHorizontalIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Kbd } from "@/components/ui/kbd";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const issues = [
  { id: "ENG-212", title: "Rate limiting por workspace", status: "progress", label: "API", who: "AL" },
  { id: "ENG-208", title: "Exportar relatório em CSV", status: "progress", label: "Feature", who: "BR" },
  { id: "ENG-205", title: "Erro 500 ao convidar membro", status: "todo", label: "Bug", who: "CS" },
  { id: "ENG-199", title: "Atualizar SDK para v3", status: "todo", label: "Chore", who: "AL" },
  { id: "ENG-190", title: "Onboarding com dados de exemplo", status: "backlog", label: "Feature", who: "DM" },
];

const statusIcon = {
  progress: <CircleDotIcon className="size-4 text-warning-text" aria-label="Em progresso" />,
  todo: <CircleIcon className="size-4 text-muted-foreground" aria-label="A fazer" />,
  backlog: <CircleDashedIcon className="size-4 text-subtle-foreground" aria-label="Backlog" />,
};

export function AppShellDemo() {
  const [selected, setSelected] = React.useState(0);
  const [archived, setArchived] = React.useState<string[]>([]);

  const archive = (id: string) => {
    setArchived((a) => [...a, id]);
    toast(`${id} arquivada`, { action: { label: "Desfazer", onClick: () => setArchived((a) => a.filter((x) => x !== id)) } });
  };

  const visible = issues.filter((i) => !archived.includes(i.id));

  return (
    <div className="flex h-[26rem] overflow-hidden rounded-xl border border-border bg-sidebar text-sm">
      <aside className="hidden w-48 shrink-0 flex-col gap-0.5 p-2 md:flex">
        <div className="mb-2 flex items-center gap-2 px-2 py-1">
          <span className="grid size-5 place-items-center rounded-sm bg-primary text-[10px] font-bold text-primary-foreground">A</span>
          <span className="font-medium">Acme</span>
        </div>
        {[
          [InboxIcon, "Inbox", 3],
          [ListTodoIcon, "Minhas issues", 0],
          [LayersIcon, "Projetos", 0],
        ].map(([Icon, label, count], i) => {
          const I = Icon as typeof InboxIcon;
          return (
            <a
              key={label as string}
              href="#app-shell"
              className={cn(
                "flex h-7 items-center gap-2 rounded-md px-2 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                i === 1 && "bg-sidebar-accent text-sidebar-accent-foreground",
              )}
            >
              <I className="size-4" />
              {label as string}
              {(count as number) > 0 && <span className="ml-auto text-xs text-subtle-foreground">{count as number}</span>}
            </a>
          );
        })}
      </aside>
      <div className="m-1.5 flex min-w-0 flex-1 flex-col rounded-lg border border-border-subtle bg-card shadow-raised md:ml-0">
        <header className="flex h-11 items-center gap-2 border-b border-border-subtle px-3">
          <h3 className="font-medium">Minhas issues</h3>
          <Badge className="ml-1">{visible.length}</Badge>
          <div className="ml-auto flex items-center gap-1">
            <Button size="xs" variant="ghost">
              <FilterIcon /> Filtrar
            </Button>
            <Button size="icon-xs" variant="ghost" aria-label="Exibição">
              <SlidersHorizontalIcon />
            </Button>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size="icon-xs" variant="default" aria-label="Criar issue">
                  <PlusIcon />
                </Button>
              </TooltipTrigger>
              <TooltipContent shortcut={["C"]}>Criar issue</TooltipContent>
            </Tooltip>
          </div>
        </header>
        <ul role="listbox" aria-label="Issues" className="flex-1 overflow-y-auto py-1">
          {visible.map((issue, i) => (
            <li
              key={issue.id}
              role="option"
              aria-selected={selected === i}
              onClick={() => setSelected(i)}
              className={cn(
                "group/row mx-1 flex h-9 cursor-default items-center gap-3 rounded-md px-2 transition-colors duration-(--duration-fast)",
                "hover:bg-accent/60",
                selected === i && "bg-accent",
              )}
            >
              <span className="hidden w-16 shrink-0 font-mono text-xs text-subtle-foreground sm:block">{issue.id}</span>
              {statusIcon[issue.status as keyof typeof statusIcon]}
              <span className="min-w-0 flex-1 truncate">{issue.title}</span>
              <Badge variant="outline" className="hidden text-muted-foreground sm:inline-flex">
                {issue.label}
              </Badge>
              <Button
                size="icon-xs"
                variant="ghost"
                aria-label={`Arquivar ${issue.id}`}
                onClick={(e) => {
                  e.stopPropagation();
                  archive(issue.id);
                }}
                className="opacity-0 group-hover/row:opacity-100 focus-visible:opacity-100"
              >
                <ArchiveIcon />
              </Button>
              <Avatar className="size-5">
                <AvatarFallback className="text-[9px]">{issue.who}</AvatarFallback>
              </Avatar>
            </li>
          ))}
          {visible.length === 0 && <li className="p-8 text-center text-muted-foreground">Tudo arquivado. 🎉</li>}
        </ul>
      </div>
    </div>
  );
}

export function EmptyStateDemo() {
  return (
    <div className="relative isolate flex flex-col items-center gap-4 overflow-hidden rounded-xl border border-dashed border-border bg-background px-6 py-14 text-center">
      <div className="grid size-11 place-items-center rounded-lg border border-border bg-card shadow-raised">
        <LayersIcon className="size-5 text-muted-foreground" />
      </div>
      <div className="space-y-1">
        <p className="text-base font-semibold">Nenhum projeto ainda</p>
        <p className="max-w-sm text-sm text-muted-foreground">Projetos agrupam issues em torno de uma entrega com prazo e responsável.</p>
      </div>
      <div className="flex items-center gap-3">
        <Button variant="default">
          <PlusIcon /> Criar projeto
        </Button>
        <span className="flex items-center gap-1 text-xs text-subtle-foreground">
          ou pressione <Kbd>P</Kbd>
        </span>
      </div>
    </div>
  );
}

export function SettingsFormDemo() {
  const [saving, setSaving] = React.useState(false);
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      toast.success("Configurações salvas");
    }, 900);
  };

  const row = "grid gap-2 py-5 md:grid-cols-[240px_1fr] md:gap-8";

  return (
    <form onSubmit={submit} className="rounded-xl border border-border bg-background">
      <div className="divide-y divide-border-subtle px-5">
        <div className={row}>
          <div>
            <Label htmlFor="ws-name">Nome do workspace</Label>
            <p className="mt-1 text-xs text-subtle-foreground">Visível para todos os membros.</p>
          </div>
          <Input id="ws-name" defaultValue="Acme Inc." className="max-w-sm" />
        </div>
        <div className={row}>
          <div>
            <Label htmlFor="ws-url">URL</Label>
            <p className="mt-1 text-xs text-subtle-foreground">Apenas letras minúsculas e hífens.</p>
          </div>
          <div className="flex max-w-sm items-center">
            <span className="flex h-8 items-center rounded-l-md border border-r-0 border-input bg-muted px-2.5 text-sm text-muted-foreground">
              app.com/
            </span>
            <Input id="ws-url" defaultValue="acme" className="rounded-l-none" />
          </div>
        </div>
        <div className={row}>
          <Label htmlFor="ws-region">Região dos dados</Label>
          <Select defaultValue="sa">
            <SelectTrigger id="ws-region" className="w-full max-w-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sa">América do Sul (São Paulo)</SelectItem>
              <SelectItem value="us">Estados Unidos (Virgínia)</SelectItem>
              <SelectItem value="eu">Europa (Frankfurt)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className={row}>
          <Label htmlFor="ws-about">Descrição</Label>
          <Textarea id="ws-about" placeholder="Sobre o que é este workspace?" className="max-w-sm" />
        </div>
        <div className={row}>
          <div>
            <Label htmlFor="ws-public">Convites por link</Label>
            <p className="mt-1 text-xs text-subtle-foreground">Qualquer pessoa com o link pode entrar.</p>
          </div>
          <Switch id="ws-public" />
        </div>
      </div>
      <footer className="flex items-center justify-end gap-2 rounded-b-xl border-t border-border-subtle bg-card px-5 py-3">
        <Button type="reset" variant="ghost">
          Descartar
        </Button>
        <Button type="submit" variant="default" loading={saving}>
          Salvar alterações
        </Button>
      </footer>
    </form>
  );
}

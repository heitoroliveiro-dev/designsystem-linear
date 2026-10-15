"use client";

import * as React from "react";
import { toast } from "sonner";
import {
  ArchiveIcon,
  BellIcon,
  CalendarIcon,
  CircleDashedIcon,
  CopyIcon,
  InfoIcon,
  LinkIcon,
  MoreHorizontalIcon,
  PencilIcon,
  PlusIcon,
  SettingsIcon,
  TrashIcon,
  TriangleAlertIcon,
  UserIcon,
} from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarGroup } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandShortcut } from "@/components/ui/command";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Kbd } from "@/components/ui/kbd";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Example } from "@/components/docs/example";
import { Section } from "@/components/docs/page-header";


export function ComponentsShowcase() {
  const [showArchived, setShowArchived] = React.useState(false);

  return (
    <>
      <Section id="button" title="Button" description="Seis variantes, oito tamanhos. `default` é a ação primária — uma por região. `secondary` é o padrão.">
        <Example
          code={`
<Button variant="default">Criar issue</Button>
<Button>Secundário</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Excluir</Button>
<Button variant="link">Link</Button>
<Button loading>Salvando</Button>
<Button size="icon" aria-label="Configurações"><SettingsIcon /></Button>
`}
        >
          <Button variant="default">
            <PlusIcon /> Criar issue
          </Button>
          <Button>Secundário</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Excluir</Button>
          <Button variant="link">Link</Button>
          <Button loading>Salvando</Button>
          <Button size="icon" aria-label="Configurações">
            <SettingsIcon />
          </Button>
        </Example>
        <div className="mt-3">
          <Example code={`<Button size="xs">xs</Button> <Button size="sm">sm</Button> <Button>default</Button> <Button size="lg">lg</Button>`}>
            <Button size="xs">xs · 24px</Button>
            <Button size="sm">sm · 28px</Button>
            <Button>default · 32px</Button>
            <Button size="lg">lg · 40px</Button>
          </Example>
        </div>
      </Section>

      <Section id="badge" title="Badge" description="Status e categorias. Cor reforça, texto informa.">
        <Example
          code={`
<Badge>Backlog</Badge>
<Badge variant="brand" dot>Em progresso</Badge>
<Badge variant="success" dot>Concluído</Badge>
<Badge variant="warning">Atenção</Badge>
<Badge variant="danger">Urgente</Badge>
<Badge variant="info">Info</Badge>
<Badge variant="outline">v1.2.0</Badge>
`}
        >
          <Badge>Backlog</Badge>
          <Badge variant="brand" dot>
            Em progresso
          </Badge>
          <Badge variant="success" dot>
            Concluído
          </Badge>
          <Badge variant="warning">Atenção</Badge>
          <Badge variant="danger">Urgente</Badge>
          <Badge variant="info">Info</Badge>
          <Badge variant="outline">v1.2.0</Badge>
        </Example>
      </Section>

      <Section id="input" title="Input · Textarea · Label" description="Sempre com Label associado. Erros via aria-invalid + texto de ajuda.">
        <Example
          className="block"
          code={`
<div className="grid gap-1.5">
  <Label htmlFor="title">Título</Label>
  <Input id="title" placeholder="Ex.: Corrigir login com SSO" />
</div>
<div className="grid gap-1.5">
  <Label htmlFor="email">E-mail</Label>
  <Input id="email" aria-invalid aria-describedby="email-error" defaultValue="nome@" />
  <p id="email-error" className="text-xs text-danger-text">Informe um e-mail válido.</p>
</div>
<Textarea placeholder="Descrição…" />
`}
        >
          <div className="mx-auto grid w-full max-w-sm gap-4">
            <div className="grid gap-1.5">
              <Label htmlFor="title">Título</Label>
              <Input id="title" placeholder="Ex.: Corrigir login com SSO" />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="email">E-mail</Label>
              <Input id="email" aria-invalid aria-describedby="email-error" defaultValue="nome@" />
              <p id="email-error" className="text-xs text-danger-text">
                Informe um e-mail válido.
              </p>
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="desc">Descrição</Label>
              <Textarea id="desc" placeholder="Adicione detalhes…" />
            </div>
            <Input disabled placeholder="Desabilitado" />
          </div>
        </Example>
      </Section>

      <Section id="selection" title="Checkbox · Radio · Switch" description="Checkbox/Radio para escolhas confirmadas por um botão; Switch para efeito imediato.">
        <Example
          code={`
<div className="flex items-center gap-2">
  <Checkbox id="c1" defaultChecked />
  <Label htmlFor="c1">Notificar por e-mail</Label>
</div>
<RadioGroup defaultValue="list">
  <div className="flex items-center gap-2"><RadioGroupItem value="list" id="r1" /><Label htmlFor="r1">Lista</Label></div>
  <div className="flex items-center gap-2"><RadioGroupItem value="board" id="r2" /><Label htmlFor="r2">Quadro</Label></div>
</RadioGroup>
<div className="flex items-center gap-2">
  <Switch id="s1" defaultChecked />
  <Label htmlFor="s1">Sincronizar</Label>
</div>
`}
        >
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <Checkbox id="c1" defaultChecked />
              <Label htmlFor="c1">Notificar por e-mail</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="c2" />
              <Label htmlFor="c2">Resumo semanal</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="c3" disabled />
              <Label htmlFor="c3">Desabilitado</Label>
            </div>
          </div>
          <Separator orientation="vertical" className="!h-20" />
          <RadioGroup defaultValue="list">
            <div className="flex items-center gap-2">
              <RadioGroupItem value="list" id="r1" />
              <Label htmlFor="r1">Lista</Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="board" id="r2" />
              <Label htmlFor="r2">Quadro</Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="timeline" id="r3" />
              <Label htmlFor="r3">Timeline</Label>
            </div>
          </RadioGroup>
          <Separator orientation="vertical" className="!h-20" />
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <Switch id="s1" defaultChecked />
              <Label htmlFor="s1">Sincronizar</Label>
            </div>
            <div className="flex items-center gap-2">
              <Switch id="s2" />
              <Label htmlFor="s2">Modo compacto</Label>
            </div>
          </div>
        </Example>
      </Section>

      <Section id="select" title="Select" description="Para 5–15 opções. Menos que isso: Radio ou Tabs segmentadas. Mais: Command com busca.">
        <Example
          code={`
<Select>
  <SelectTrigger className="w-48"><SelectValue placeholder="Prioridade" /></SelectTrigger>
  <SelectContent>
    <SelectGroup>
      <SelectLabel>Prioridade</SelectLabel>
      <SelectItem value="urgent">Urgente</SelectItem>
      <SelectItem value="high">Alta</SelectItem>
      <SelectItem value="medium">Média</SelectItem>
      <SelectItem value="low">Baixa</SelectItem>
    </SelectGroup>
  </SelectContent>
</Select>
`}
        >
          <Select>
            <SelectTrigger className="w-48" aria-label="Prioridade">
              <SelectValue placeholder="Prioridade" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Prioridade</SelectLabel>
                <SelectItem value="urgent">Urgente</SelectItem>
                <SelectItem value="high">Alta</SelectItem>
                <SelectItem value="medium">Média</SelectItem>
                <SelectItem value="low">Baixa</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </Example>
      </Section>

      <Section id="card" title="Card" description="Agrupa conteúdo relacionado. Header com título, descrição e ação opcional.">
        <Example
          code={`
<Card className="w-full max-w-sm">
  <CardHeader>
    <CardTitle>Ciclo 24</CardTitle>
    <CardDescription>14 – 28 de outubro</CardDescription>
    <CardAction><Button variant="ghost" size="icon-sm"><MoreHorizontalIcon /></Button></CardAction>
  </CardHeader>
  <CardContent>…</CardContent>
  <CardFooter className="border-t border-border-subtle">…</CardFooter>
</Card>
`}
        >
          <Card className="w-full max-w-sm">
            <CardHeader>
              <CardTitle>Ciclo 24</CardTitle>
              <CardDescription>14 – 28 de outubro</CardDescription>
              <CardAction>
                <Button variant="ghost" size="icon-sm" aria-label="Mais opções">
                  <MoreHorizontalIcon />
                </Button>
              </CardAction>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Progresso</span>
                <span className="tabular-nums">68%</span>
              </div>
              <div className="h-1.5 rounded-full bg-muted">
                <div className="h-full w-[68%] rounded-full bg-primary" />
              </div>
            </CardContent>
            <CardFooter className="border-t border-border-subtle">
              <AvatarGroup>
                {["AL", "BR", "CS"].map((i) => (
                  <Avatar key={i}>
                    <AvatarFallback>{i}</AvatarFallback>
                  </Avatar>
                ))}
              </AvatarGroup>
              <span className="ml-auto text-xs text-subtle-foreground">32 issues</span>
            </CardFooter>
          </Card>
        </Example>
      </Section>

      <Section id="tabs" title="Tabs" description="segmented alterna visões do mesmo conteúdo; line navega entre seções.">
        <Example
          className="flex-col"
          code={`
<Tabs defaultValue="list">
  <TabsList>
    <TabsTrigger value="list">Lista</TabsTrigger>
    <TabsTrigger value="board">Quadro</TabsTrigger>
  </TabsList>
</Tabs>

<Tabs defaultValue="overview">
  <TabsList variant="line">
    <TabsTrigger value="overview">Visão geral</TabsTrigger>
    <TabsTrigger value="activity">Atividade</TabsTrigger>
  </TabsList>
</Tabs>
`}
        >
          <Tabs defaultValue="list">
            <TabsList>
              <TabsTrigger value="list">Lista</TabsTrigger>
              <TabsTrigger value="board">Quadro</TabsTrigger>
              <TabsTrigger value="timeline">Timeline</TabsTrigger>
            </TabsList>
          </Tabs>
          <Tabs defaultValue="overview">
            <TabsList variant="line">
              <TabsTrigger value="overview">Visão geral</TabsTrigger>
              <TabsTrigger value="activity">Atividade</TabsTrigger>
              <TabsTrigger value="settings">Configurações</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="pt-2 text-sm text-muted-foreground">
              Conteúdo da aba visão geral.
            </TabsContent>
            <TabsContent value="activity" className="pt-2 text-sm text-muted-foreground">
              Conteúdo da aba atividade.
            </TabsContent>
            <TabsContent value="settings" className="pt-2 text-sm text-muted-foreground">
              Conteúdo da aba configurações.
            </TabsContent>
          </Tabs>
        </Example>
      </Section>

      <Section id="dialog" title="Dialog" description="Interrompe o fluxo: use para confirmações e formulários curtos. Abre no terço superior, como o Linear.">
        <Example
          code={`
<Dialog>
  <DialogTrigger asChild><Button variant="destructive">Excluir projeto</Button></DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Excluir projeto?</DialogTitle>
      <DialogDescription>Esta ação não pode ser desfeita.</DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <DialogClose asChild><Button>Cancelar</Button></DialogClose>
      <Button variant="destructive">Excluir</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
`}
        >
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="destructive">Excluir projeto</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Excluir projeto?</DialogTitle>
                <DialogDescription>
                  O projeto &quot;Mobile v2&quot; e suas 48 issues serão excluídos permanentemente. Esta ação não pode ser desfeita.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose asChild>
                  <Button>Cancelar</Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button variant="destructive" onClick={() => toast("Projeto excluído")}>
                    Excluir
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </Example>
      </Section>

      <Section id="dropdown" title="Dropdown Menu" description="Ações contextuais. Mostre atalhos; agrupe com separadores; destrutivo por último.">
        <Example
          code={`
<DropdownMenu>
  <DropdownMenuTrigger asChild><Button size="icon-sm"><MoreHorizontalIcon /></Button></DropdownMenuTrigger>
  <DropdownMenuContent align="end">
    <DropdownMenuItem><PencilIcon /> Editar <DropdownMenuShortcut>E</DropdownMenuShortcut></DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem variant="destructive"><TrashIcon /> Excluir</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
`}
        >
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button>
                Opções <MoreHorizontalIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              <DropdownMenuLabel>Issue ENG-1234</DropdownMenuLabel>
              <DropdownMenuItem>
                <PencilIcon /> Editar <DropdownMenuShortcut>E</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <UserIcon /> Atribuir <DropdownMenuShortcut>A</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <CircleDashedIcon /> Status
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuItem>Backlog</DropdownMenuItem>
                  <DropdownMenuItem>Em progresso</DropdownMenuItem>
                  <DropdownMenuItem>Concluído</DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
              <DropdownMenuItem>
                <LinkIcon /> Copiar link <DropdownMenuShortcut>⌘⇧,</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem checked={showArchived} onCheckedChange={(v) => setShowArchived(v === true)}>
                Mostrar arquivadas
              </DropdownMenuCheckboxItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive">
                <TrashIcon /> Excluir <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </Example>
      </Section>

      <Section id="tooltip" title="Tooltip" description="Rótulo para botões só-ícone, com o atalho de teclado ao lado.">
        <Example code={`<Tooltip>\n  <TooltipTrigger asChild><Button size="icon" aria-label="Arquivar"><ArchiveIcon /></Button></TooltipTrigger>\n  <TooltipContent shortcut={["⌘", "E"]}>Arquivar</TooltipContent>\n</Tooltip>`}>
          {[
            { icon: ArchiveIcon, label: "Arquivar", keys: ["⌘", "E"] },
            { icon: CopyIcon, label: "Duplicar", keys: ["⌘", "D"] },
            { icon: BellIcon, label: "Inscrever-se", keys: ["S"] },
          ].map(({ icon: Icon, label, keys }) => (
            <Tooltip key={label}>
              <TooltipTrigger asChild>
                <Button size="icon" aria-label={label}>
                  <Icon />
                </Button>
              </TooltipTrigger>
              <TooltipContent shortcut={keys}>{label}</TooltipContent>
            </Tooltip>
          ))}
        </Example>
      </Section>

      <Section id="popover" title="Popover" description="Conteúdo interativo ancorado (filtros, seletores). Diferente do Tooltip, recebe foco.">
        <Example code={`<Popover>\n  <PopoverTrigger asChild><Button><CalendarIcon /> Prazo</Button></PopoverTrigger>\n  <PopoverContent>…</PopoverContent>\n</Popover>`}>
          <Popover>
            <PopoverTrigger asChild>
              <Button>
                <CalendarIcon /> Prazo
              </Button>
            </PopoverTrigger>
            <PopoverContent className="grid gap-3">
              <p className="text-sm font-medium">Definir prazo</p>
              <div className="grid gap-1.5">
                <Label htmlFor="due">Data</Label>
                <Input id="due" type="date" />
              </div>
              <Button variant="default" size="sm">
                Salvar
              </Button>
            </PopoverContent>
          </Popover>
        </Example>
      </Section>

      <Section id="command" title="Command" description="A paleta ⌘K. Busca fuzzy, grupos e atalhos. Use CommandDialog para a versão modal global.">
        <Example
          className="block"
          code={`
<CommandDialog open={open} onOpenChange={setOpen}>
  <CommandInput placeholder="Digite um comando…" />
  <CommandList>
    <CommandEmpty>Nada encontrado.</CommandEmpty>
    <CommandGroup heading="Issues">
      <CommandItem><PlusIcon /> Criar issue <CommandShortcut><Kbd>C</Kbd></CommandShortcut></CommandItem>
    </CommandGroup>
  </CommandList>
</CommandDialog>
`}
        >
          <Command className="mx-auto max-w-md border border-border shadow-overlay">
            <CommandInput placeholder="Digite um comando…" />
            <CommandList>
              <CommandEmpty>Nada encontrado.</CommandEmpty>
              <CommandGroup heading="Issues">
                <CommandItem>
                  <PlusIcon /> Criar issue
                  <CommandShortcut>
                    <Kbd>C</Kbd>
                  </CommandShortcut>
                </CommandItem>
                <CommandItem>
                  <UserIcon /> Atribuir a mim
                  <CommandShortcut>
                    <Kbd>I</Kbd>
                  </CommandShortcut>
                </CommandItem>
              </CommandGroup>
              <CommandGroup heading="Navegação">
                <CommandItem>
                  <SettingsIcon /> Configurações
                  <CommandShortcut>
                    <Kbd>G</Kbd>
                    <Kbd>S</Kbd>
                  </CommandShortcut>
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </Example>
      </Section>

      <Section id="table" title="Table" description="Linhas de 36px, cabeçalho discreto, números tabulares.">
        <Example className="block p-4" code={`<Table>\n  <TableHeader><TableRow><TableHead>ID</TableHead>…</TableRow></TableHeader>\n  <TableBody><TableRow><TableCell>ENG-101</TableCell>…</TableRow></TableBody>\n</Table>`}>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Título</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Estimativa</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                ["ENG-101", "Migrar autenticação para OAuth", "brand", "Em progresso", 5],
                ["ENG-102", "Corrigir paginação da API", "success", "Concluído", 2],
                ["ENG-103", "Timeout no webhook do Stripe", "danger", "Urgente", 3],
                ["ENG-104", "Documentar tokens de design", "default", "Backlog", 1],
              ].map(([id, title, v, status, est]) => (
                <TableRow key={id}>
                  <TableCell className="font-mono text-xs text-subtle-foreground">{id}</TableCell>
                  <TableCell>{title}</TableCell>
                  <TableCell>
                    <Badge variant={v as "brand"} dot>
                      {status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right text-muted-foreground">{est} pts</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Example>
      </Section>

      <Section id="alert" title="Alert" description="Mensagens persistentes no fluxo da página.">
        <Example
          className="flex-col items-stretch"
          code={`
<Alert variant="warning">
  <TriangleAlertIcon />
  <AlertTitle>Cota quase esgotada</AlertTitle>
  <AlertDescription>Você usou 92% das chamadas de API deste mês.</AlertDescription>
</Alert>
`}
        >
          <Alert>
            <InfoIcon />
            <AlertTitle>Nova versão disponível</AlertTitle>
            <AlertDescription>Recarregue a página para atualizar.</AlertDescription>
          </Alert>
          <Alert variant="warning">
            <TriangleAlertIcon />
            <AlertTitle>Cota quase esgotada</AlertTitle>
            <AlertDescription>Você usou 92% das chamadas de API deste mês.</AlertDescription>
          </Alert>
          <Alert variant="danger">
            <TriangleAlertIcon />
            <AlertTitle>Falha na sincronização</AlertTitle>
            <AlertDescription>Não foi possível conectar ao GitHub. Verifique a integração.</AlertDescription>
          </Alert>
        </Example>
      </Section>

      <Section id="toast" title="Toast" description="Feedback efêmero de ações (sonner). Ofereça Desfazer em vez de pedir confirmação.">
        <Example code={`toast("Issue arquivada", { action: { label: "Desfazer", onClick: undo } });\ntoast.success("Alterações salvas");\ntoast.error("Falha ao salvar");`}>
          <Button onClick={() => toast("Issue arquivada", { description: "ENG-1234", action: { label: "Desfazer", onClick: () => toast("Restaurada") } })}>
            Arquivar
          </Button>
          <Button onClick={() => toast.success("Alterações salvas")}>Sucesso</Button>
          <Button onClick={() => toast.error("Falha ao salvar")}>Erro</Button>
        </Example>
      </Section>

      <Section id="avatar" title="Avatar" description="24px em listas, 32px em cabeçalhos. Fallback com iniciais.">
        <Example code={`<AvatarGroup>\n  <Avatar><AvatarFallback>AL</AvatarFallback></Avatar>\n</AvatarGroup>`}>
          <Avatar>
            <AvatarFallback>AL</AvatarFallback>
          </Avatar>
          <Avatar className="size-8">
            <AvatarFallback className="text-xs">BR</AvatarFallback>
          </Avatar>
          <AvatarGroup>
            {["AL", "BR", "CS", "DM"].map((i) => (
              <Avatar key={i} className="size-7">
                <AvatarFallback>{i}</AvatarFallback>
              </Avatar>
            ))}
          </AvatarGroup>
        </Example>
      </Section>

      <Section id="kbd" title="Kbd" description="Atalhos visíveis ensinam o produto keyboard-first.">
        <Example code={`<Kbd>⌘</Kbd><Kbd>K</Kbd>`}>
          <span className="flex items-center gap-1 text-sm text-muted-foreground">
            Abrir paleta <Kbd>⌘</Kbd>
            <Kbd>K</Kbd>
          </span>
          <span className="flex items-center gap-1 text-sm text-muted-foreground">
            Ir para inbox <Kbd>G</Kbd> depois <Kbd>I</Kbd>
          </span>
        </Example>
      </Section>

      <Section id="loading" title="Skeleton · Spinner" description="Skeleton para conteúdo com forma conhecida; Spinner para ações curtas.">
        <Example code={`<Skeleton className="h-4 w-48" />\n<Spinner />`}>
          <div className="flex w-64 items-center gap-3">
            <Skeleton className="size-8 rounded-full" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-3 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          </div>
          <Spinner />
        </Example>
      </Section>

      <Section id="separator" title="Separator" description="Use pouco. Espaço separa melhor que linhas.">
        <Example code={`<Separator />\n<Separator orientation="vertical" />`}>
          <div className="w-64 text-sm">
            <p>Projeto</p>
            <Separator className="my-3" />
            <div className="flex h-4 items-center gap-3 text-muted-foreground">
              <span>Issues</span>
              <Separator orientation="vertical" />
              <span>Ciclos</span>
              <Separator orientation="vertical" />
              <span>Docs</span>
            </div>
          </div>
        </Example>
      </Section>
    </>
  );
}

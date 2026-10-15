"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { FileTextIcon, MoonIcon, SearchIcon, SunIcon } from "lucide-react";

import { Kbd } from "@/components/ui/kbd";
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "@/components/ui/command";
import { nav } from "@/components/docs/nav";

/** Busca da documentação (⌘K / Ctrl+K) — o próprio sistema usando seu componente Command. */
export function DocsCommand() {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const { setTheme } = useTheme();

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const run = (fn: () => void) => {
    setOpen(false);
    fn();
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex h-8 w-full items-center gap-2 rounded-md border border-border bg-card px-2.5 text-sm text-subtle-foreground shadow-raised transition-colors duration-(--duration-fast) hover:border-border-strong hover:text-muted-foreground"
      >
        <SearchIcon className="size-4" />
        Buscar
        <span className="ml-auto flex gap-0.5">
          <Kbd size="sm">⌘</Kbd>
          <Kbd size="sm">K</Kbd>
        </span>
      </button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Buscar página ou ação…" />
        <CommandList>
          <CommandEmpty>Nada encontrado.</CommandEmpty>
          {nav.map((section) => (
            <CommandGroup key={section.title} heading={section.title}>
              {section.items.map((item) => (
                <CommandItem key={item.href} value={`${section.title} ${item.title}`} onSelect={() => run(() => router.push(item.href))}>
                  <FileTextIcon />
                  {item.title}
                </CommandItem>
              ))}
            </CommandGroup>
          ))}
          <CommandSeparator />
          <CommandGroup heading="Tema">
            <CommandItem onSelect={() => run(() => setTheme("dark"))}>
              <MoonIcon /> Modo escuro
            </CommandItem>
            <CommandItem onSelect={() => run(() => setTheme("light"))}>
              <SunIcon /> Modo claro
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}

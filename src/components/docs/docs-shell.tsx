"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MenuIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { nav } from "@/components/docs/nav";
import { DocsCommand } from "@/components/docs/docs-command";
import { ThemeControls } from "@/components/docs/theme-controls";

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 rounded-md text-sm font-semibold text-foreground">
      <span aria-hidden className="grid size-5 place-items-center rounded-sm bg-primary text-[10px] font-bold text-primary-foreground glow">
        DS
      </span>
      Design System
    </Link>
  );
}

function SidebarNav({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  return (
    <nav aria-label="Documentação" className="flex flex-col gap-5">
      {nav.map((section) => (
        <div key={section.title} className="flex flex-col gap-0.5">
          <p className="px-2 pb-1 text-xs font-medium text-subtle-foreground">{section.title}</p>
          {section.items.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onNavigate}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex h-7 items-center rounded-md px-2 text-sm text-sidebar-foreground transition-colors duration-(--duration-fast)",
                  "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  active && "bg-sidebar-accent font-medium text-sidebar-accent-foreground",
                )}
              >
                {item.title}
              </Link>
            );
          })}
        </div>
      ))}
    </nav>
  );
}

/**
 * Shell no padrão de app do Linear: sidebar apagada à esquerda e conteúdo em painel
 * elevado (bg-card) com cantos arredondados — a hierarquia vem da superfície, não de bordas.
 */
export function DocsShell({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  return (
    <div className="flex min-h-dvh bg-sidebar">
      <aside className="sticky top-0 hidden h-dvh w-60 shrink-0 flex-col gap-4 p-3 lg:flex">
        <div className="flex h-8 items-center justify-between pl-2">
          <Logo />
          <ThemeControls />
        </div>
        <DocsCommand />
        <div className="-mx-1 overflow-y-auto px-1 pt-1">
          <SidebarNav />
        </div>
        <p className="mt-auto px-2 text-xs text-subtle-foreground">v1.0.0 · tokens DTCG 2025.10</p>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col lg:py-2 lg:pr-2">
        <header className="sticky top-0 z-40 flex h-12 items-center justify-between border-b border-border-subtle bg-sidebar px-4 lg:hidden">
          <Logo />
          <div className="flex items-center gap-1">
            <ThemeControls />
            <Button variant="ghost" size="icon-sm" aria-expanded={mobileOpen} onClick={() => setMobileOpen((o) => !o)}>
              <MenuIcon />
              <span className="sr-only">Menu</span>
            </Button>
          </div>
        </header>
        {mobileOpen && (
          <div className="border-b border-border-subtle bg-sidebar p-4 lg:hidden">
            <div className="mb-4">
              <DocsCommand />
            </div>
            <SidebarNav onNavigate={() => setMobileOpen(false)} />
          </div>
        )}
        <main className="flex-1 bg-card lg:rounded-xl lg:border lg:border-border-subtle lg:shadow-raised">
          <div className="mx-auto w-full max-w-5xl px-5 py-10 sm:px-8 lg:py-14">{children}</div>
        </main>
      </div>
    </div>
  );
}

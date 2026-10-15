"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { ContrastIcon, MoonIcon, SunIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { CONTRAST_KEY } from "@/components/docs/contrast";


/** O atributo data-contrast do <html> é a fonte da verdade; o React apenas o observa. */
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-contrast"] });
  return () => observer.disconnect();
}
const getSnapshot = () => document.documentElement.dataset.contrast === "high";
const getServerSnapshot = () => false;

/** Alterna dark/light e o modo de alto contraste (data-contrast="high" no <html>). */
export function ThemeControls() {
  const { resolvedTheme, setTheme } = useTheme();
  const high = React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggleContrast = () => {
    const root = document.documentElement;
    if (high) delete root.dataset.contrast;
    else root.dataset.contrast = "high";
    try {
      localStorage.setItem(CONTRAST_KEY, high ? "default" : "high");
    } catch {
      // armazenamento indisponível (modo privado): o toggle vale só para esta sessão
    }
  };

  return (
    <div className="flex items-center gap-0.5">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon-sm" aria-pressed={high} onClick={toggleContrast} className={high ? "text-foreground" : undefined}>
            <ContrastIcon />
            <span className="sr-only">Alto contraste</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>{high ? "Contraste padrão" : "Alto contraste"}</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon-sm" onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")}>
            {/* Ícones trocados por CSS: evita divergência de hidratação */}
            <SunIcon className="hidden dark:block" />
            <MoonIcon className="dark:hidden" />
            <span className="sr-only">Alternar tema</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>Alternar tema</TooltipContent>
      </Tooltip>
    </div>
  );
}

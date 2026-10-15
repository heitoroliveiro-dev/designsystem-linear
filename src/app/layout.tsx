import type { Metadata } from "next";
import { Geist_Mono, Inter } from "next/font/google";

import "@/styles/globals.css";
import { Providers } from "@/components/docs/providers";
import { DocsShell } from "@/components/docs/docs-shell";
import { contrastScript } from "@/components/docs/contrast";

/* Inter variável com eixo de tamanho óptico (opsz 14–32): títulos grandes usam o corte "Display". */
const inter = Inter({ subsets: ["latin"], axes: ["opsz"], variable: "--font-face-sans", display: "swap" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-face-mono", display: "swap" });

export const metadata: Metadata = {
  title: { default: "Design System", template: "%s · Design System" },
  description: "Design system dark-first no estilo Linear: tokens DTCG, Tailwind v4, Radix e componentes shadcn/ui.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`dark ${inter.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: contrastScript }} />
      </head>
      <body>
        <Providers>
          <DocsShell>{children}</DocsShell>
        </Providers>
      </body>
    </html>
  );
}

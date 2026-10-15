export type NavItem = { title: string; href: string };
export type NavSection = { title: string; items: NavItem[] };

export const nav: NavSection[] = [
  {
    title: "Começo",
    items: [{ title: "Visão geral", href: "/" }],
  },
  {
    title: "Fundamentos",
    items: [
      { title: "Cores", href: "/foundations/colors" },
      { title: "Tipografia", href: "/foundations/typography" },
      { title: "Espaço e layout", href: "/foundations/layout" },
      { title: "Elevação e luz", href: "/foundations/elevation" },
      { title: "Movimento", href: "/foundations/motion" },
    ],
  },
  {
    title: "Construção",
    items: [
      { title: "Componentes", href: "/components" },
      { title: "Efeitos", href: "/effects" },
      { title: "Padrões", href: "/patterns" },
    ],
  },
];

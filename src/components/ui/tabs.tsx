"use client";

import * as React from "react";
import { Tabs as TabsPrimitive } from "radix-ui";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

function Tabs({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return <TabsPrimitive.Root data-slot="tabs" className={cn("flex flex-col gap-3", className)} {...props} />;
}

const tabsListVariants = cva("inline-flex w-fit items-center text-muted-foreground", {
  variants: {
    variant: {
      /** Controle segmentado — alterna visões do mesmo conteúdo. */
      segmented: "h-8 gap-0.5 rounded-lg border border-border bg-muted p-0.5",
      /** Sublinhado — navegação entre seções. */
      line: "h-9 gap-4 border-b border-border-subtle",
    },
  },
  defaultVariants: { variant: "segmented" },
});

function TabsList({ className, variant, ...props }: React.ComponentProps<typeof TabsPrimitive.List> & VariantProps<typeof tabsListVariants>) {
  return <TabsPrimitive.List data-slot="tabs-list" data-variant={variant ?? "segmented"} className={cn(tabsListVariants({ variant }), "group/tabs", className)} {...props} />;
}

function TabsTrigger({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "inline-flex h-full items-center justify-center gap-1.5 whitespace-nowrap text-sm font-medium",
        "transition-[color,background-color,box-shadow] duration-(--duration-fast) ease-standard hover:text-foreground",
        "disabled:pointer-events-none disabled:opacity-50 data-[state=active]:text-foreground",
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        "group-data-[variant=segmented]/tabs:rounded-md group-data-[variant=segmented]/tabs:px-2.5",
        "group-data-[variant=segmented]/tabs:data-[state=active]:bg-popover group-data-[variant=segmented]/tabs:data-[state=active]:shadow-raised",
        "group-data-[variant=line]/tabs:relative group-data-[variant=line]/tabs:px-0.5",
        "group-data-[variant=line]/tabs:after:absolute group-data-[variant=line]/tabs:after:inset-x-0 group-data-[variant=line]/tabs:after:-bottom-px group-data-[variant=line]/tabs:after:h-0.5 group-data-[variant=line]/tabs:after:rounded-full",
        "group-data-[variant=line]/tabs:data-[state=active]:after:bg-foreground",
        className,
      )}
      {...props}
    />
  );
}

function TabsContent({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return <TabsPrimitive.Content data-slot="tabs-content" className={cn("flex-1 outline-none", className)} {...props} />;
}

export { Tabs, TabsList, TabsTrigger, TabsContent };

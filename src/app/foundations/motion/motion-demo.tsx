"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";

const easeClass: Record<string, string> = {
  "ease-standard": "ease-standard",
  "ease-enter": "ease-enter",
  "ease-exit": "ease-exit",
};

export function MotionDemo({ easings }: { easings: string[][] }) {
  const [on, setOn] = React.useState(false);
  return (
    <div className="space-y-3 rounded-lg border border-border-subtle bg-background p-4">
      {easings.map(([cls, value, use]) => (
        <div key={cls} className="space-y-1.5">
          <div className="flex flex-wrap items-baseline gap-x-4">
            <span className="font-mono text-xs text-foreground">{cls}</span>
            <span className="font-mono text-2xs text-subtle-foreground">{value}</span>
            <span className="text-xs text-muted-foreground">{use}</span>
          </div>
          <div className="relative h-6 rounded-md bg-muted">
            <div
              className={`absolute left-0.5 top-0.5 size-5 rounded-sm bg-primary transition-transform duration-(--duration-slower) ${easeClass[cls]}`}
              style={{ transform: on ? "translateX(calc(min(560px, 60vw)))" : "none" }}
            />
          </div>
        </div>
      ))}
      <Button size="sm" onClick={() => setOn((v) => !v)}>
        Animar
      </Button>
    </div>
  );
}

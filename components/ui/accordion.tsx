"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { Plus } from "lucide-react";

import { cn } from "@/lib/utils";

const Accordion = AccordionPrimitive.Root;

function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      className={cn("border-b border-line", className)}
      {...props}
    />
  );
}

function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        className={cn(
          // Altura mínima generosa: alvo de toque confortável no mobile.
          "group flex flex-1 items-start justify-between gap-6 py-6 text-left",
          "text-h4 text-primary transition-colors duration-150 hover:text-primary/80",
          className,
        )}
        {...props}
      >
        {children}
        <Plus
          className="mt-0.5 size-5 shrink-0 text-subtle transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-data-[state=open]:rotate-45"
          strokeWidth={1.5}
          aria-hidden="true"
        />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      className="overflow-hidden data-[state=closed]:animate-[acc-up_250ms_cubic-bezier(0.16,1,0.3,1)] data-[state=open]:animate-[acc-down_250ms_cubic-bezier(0.16,1,0.3,1)]"
      {...props}
    >
      <div className={cn("max-w-[68ch] pb-6 pr-10 text-muted", className)}>
        {children}
      </div>
    </AccordionPrimitive.Content>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };

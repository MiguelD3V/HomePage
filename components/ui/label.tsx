"use client";

import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";

import { cn } from "@/lib/utils";

/** Sempre um <label> real associado ao campo. Placeholder nunca é rótulo:
 *  ele some quando o usuário digita, e leitores de tela o ignoram. */
function Label({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      className={cn(
        "text-caption font-medium text-muted select-none",
        className,
      )}
      {...props}
    />
  );
}

export { Label };

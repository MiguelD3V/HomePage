import * as React from "react";

import { cn } from "@/lib/utils";

/** Eyebrow / badge. Mono + uppercase + tracking largo é o principal recurso
 *  "tech" disponível numa paleta sem cor. */
function Badge({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-line bg-[rgb(var(--fg-rgb)/0.03)] px-3 py-1.5",
        "font-mono text-eyebrow uppercase text-muted",
        className,
      )}
      {...props}
    />
  );
}

export { Badge };

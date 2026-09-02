import * as React from "react";

import { cn } from "@/lib/utils";

function Input({
  className,
  type = "text",
  ...props
}: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      className={cn(
        "h-11 w-full rounded-md border border-line bg-elevated px-4 text-[0.9375rem] text-primary",
        "placeholder:text-subtle",
        "transition-colors duration-150",
        "hover:border-line-strong focus:border-line-focus focus:outline-none focus:ring-2 focus:ring-[rgb(var(--fg-rgb)/0.1)]",
        "aria-[invalid=true]:border-error aria-[invalid=true]:focus:ring-error/20",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

function Textarea({
  className,
  ...props
}: React.ComponentProps<"textarea">) {
  return (
    <textarea
      className={cn(
        "min-h-24 w-full resize-y rounded-md border border-line bg-elevated px-4 py-3 text-[0.9375rem] text-primary",
        "placeholder:text-subtle",
        "transition-colors duration-150",
        "hover:border-line-strong focus:border-line-focus focus:outline-none focus:ring-2 focus:ring-[rgb(var(--fg-rgb)/0.1)]",
        "aria-[invalid=true]:border-error",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

export { Input, Textarea };

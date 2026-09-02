import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * REGRA DO SISTEMA: `primary` é o único elemento da página com fundo branco
 * sólido. Numa página inteiramente preta, esse é o ponto de maior contraste
 * possível — é o que substitui a cor de destaque que a paleta não tem.
 * Usar fundo branco em qualquer outro lugar colapsa a hierarquia.
 */
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] disabled:pointer-events-none disabled:opacity-50 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        // `sheen`: um brilho atravessa o botão no hover. Como o preenchimento
        // já é a cor de maior contraste, o brilho é feito da cor inversa —
        // ver o utilitário em globals.css. A seta acompanha, igual à ghost.
        primary:
          "sheen bg-accent text-inverse hover:bg-accent-hover hover:glow-accent hover:-translate-y-px active:translate-y-0 active:scale-[0.98] [&_svg:last-child]:transition-transform [&_svg:last-child]:duration-300 hover:[&_svg:last-child]:translate-x-1",
        secondary:
          "bg-[rgb(var(--fg-rgb)/0.06)] text-primary border border-line-strong hover:bg-[rgb(var(--fg-rgb)/0.1)] hover:border-line-focus hover:-translate-y-px",
        ghost:
          "text-muted hover:text-primary [&_svg:last-child]:transition-transform [&_svg:last-child]:duration-200 hover:[&_svg:last-child]:translate-x-0.5",
      },
      size: {
        sm: "h-9 px-4 text-[0.875rem] [&_svg]:size-4",
        md: "h-11 px-6 text-[0.9375rem] [&_svg]:size-4",
        lg: "h-12 px-8 text-base [&_svg]:size-[1.125rem]",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    loading?: boolean;
  };

function Button({
  className,
  variant,
  size,
  asChild = false,
  loading = false,
  children,
  disabled,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      className={cn(buttonVariants({ variant, size }), className)}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...props}
    >
      {loading ? (
        <>
          <Loader2 className="animate-spin" aria-hidden="true" />
          Enviando...
        </>
      ) : (
        children
      )}
    </Comp>
  );
}

export { Button, buttonVariants };

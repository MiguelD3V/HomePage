import * as React from "react";

import { cn } from "@/lib/utils";

/** Wrapper de largura máxima. Usado em todas as páginas do site. */
export function Container({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return <div className={cn("container-page", className)} {...props} />;
}

type SectionProps = React.ComponentProps<"section"> & {
  /** id do heading da seção — liga a região ao seu título para leitores de tela. */
  labelledBy?: string;
  /** Adia a pintura de seções abaixo da dobra. Não usar no hero. */
  deferPaint?: boolean;
  /** Alterna o fundo entre escuro e claro para dar ritmo à página — quebra
   *  a monotonia de uma home inteiramente preta sem depender de cor.
   *  Escopa os tokens via `data-tone`: todo componente filho (Card, Badge,
   *  Button, o próprio formulário) já lê a cor certa sem saber em qual tom
   *  está renderizando. Ver `[data-tone="light"]` em globals.css. */
  tone?: "dark" | "light";
};

export function Section({
  className,
  labelledBy,
  deferPaint = true,
  tone = "dark",
  ...props
}: SectionProps) {
  return (
    <section
      data-tone={tone === "light" ? "light" : undefined}
      aria-labelledby={labelledBy}
      className={cn(
        // bg/text explícitos: antes cada seção herdava o preto do <body>
        // por trás; agora que uma seção pode ser clara, ela precisa pintar
        // seu próprio retângulo de fundo.
        "section-y relative bg-[var(--color-base)] text-[var(--color-muted)]",
        deferPaint && "defer-paint",
        className,
      )}
      {...props}
    />
  );
}

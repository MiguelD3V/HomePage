"use client";

import * as React from "react";

import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";
import { cn } from "@/lib/utils";

/**
 * Holofote que segue o cursor sobre uma grade de cards.
 *
 * UM listener para a grade inteira, não um por card. Com 4 blocos no bento
 * isso é a diferença entre 1 e 4 handlers de pointermove disputando a thread
 * principal — e o custo não escala quando a grade crescer.
 *
 * O trabalho por frame é deliberadamente mínimo: `closest()` para achar o
 * card sob o cursor e duas escritas de custom property. A pintura fica com o
 * compositor, via o `radial-gradient` do utilitário `spotlight` em
 * globals.css. Nada aqui invalida layout.
 *
 * Coalescido em requestAnimationFrame porque pointermove dispara acima da
 * taxa de atualização da tela: sem isso o navegador recalcularia estilo
 * várias vezes para pintar um frame só.
 *
 * Dispositivos de toque nunca chegam a montar o listener — `pointer: fine`
 * exclui a única plataforma onde o efeito não existe mas o custo existiria.
 */
export function SpotlightGroup({
  as = "div",
  children,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  /** A grade às vezes é semanticamente uma lista (<ul>), às vezes só um
   *  contêiner de layout (<div>). O efeito não deve ditar a semântica. */
  as?: "div" | "ul";
}) {
  // Alargado para ElementType: com a união "div" | "ul" o JSX exige uma ref
  // que satisfaça os dois elementos ao mesmo tempo, o que nenhum objeto real
  // satisfaz. As props públicas seguem tipadas pela assinatura acima.
  const Tag = as as React.ElementType;
  const ref = React.useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();

  React.useEffect(() => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    let frame = 0;
    let card: HTMLElement | null = null;
    let x = 0;
    let y = 0;

    const paint = () => {
      frame = 0;
      if (!card) return;
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${x - rect.left}px`);
      card.style.setProperty("--my", `${y - rect.top}px`);
    };

    const onMove = (event: PointerEvent) => {
      const target = (event.target as HTMLElement | null)?.closest<HTMLElement>(
        "[data-spotlight]",
      );
      if (!target) return;
      card = target;
      x = event.clientX;
      y = event.clientY;
      if (!frame) frame = requestAnimationFrame(paint);
    };

    el.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      el.removeEventListener("pointermove", onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [reduced]);

  return (
    <Tag ref={ref} className={cn(className)} {...props}>
      {children}
    </Tag>
  );
}

"use client";

import * as React from "react";

import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: React.ReactNode;
  /** Atraso em segundos. Use 0.06–0.08 de stagger entre itens irmãos. */
  delay?: number;
  /** Elemento renderizado. Dentro de uma <ul> o wrapper precisa ser o
   *  próprio <li> — um <div> entre a lista e seus itens é markup inválido e
   *  faz o leitor de tela perder a contagem de itens da lista. */
  as?: "div" | "li";
  className?: string;
};

/**
 * Animação de entrada por scroll — CSS + IntersectionObserver, sem
 * biblioteca.
 *
 * Este componente aparece ~30 vezes na home. Implementado com Framer Motion,
 * ele sozinho puxava o motor de animação para o bundle de primeira carga
 * (~55 KB gzip) para fazer um fade-and-rise que o CSS faz nativamente. O
 * Framer Motion continua no projeto, mas onde ele realmente ganha: as
 * transições entre passos do formulário — que carregam sob demanda.
 *
 * `once`: anima uma vez e desconecta o observer. Re-animar ao subir a página
 * irrita e passa sensação de instabilidade.
 *
 * Sem JavaScript, o CSS deixaria tudo invisível — por isso o `data-reveal` e
 * a regra em <noscript> no layout, que força a visibilidade nesse cenário.
 */
export function Reveal({
  children,
  delay = 0,
  as = "div",
  className,
}: RevealProps) {
  // Alargado para ElementType: com a união "div" | "li" o JSX exigiria uma
  // ref que satisfaça os dois elementos simultaneamente. A API pública
  // continua restrita pelo tipo RevealProps.
  const Tag = as as React.ElementType;
  const ref = React.useRef<HTMLElement>(null);
  const [visible, setVisible] = React.useState(false);
  const reduced = usePrefersReducedMotion();

  React.useEffect(() => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -80px 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [reduced]);

  // Movimento reduzido: nada de transform, nada de estado inicial oculto.
  if (reduced) {
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <Tag
      ref={ref}
      data-reveal=""
      data-visible={visible || undefined}
      style={delay ? { transitionDelay: `${delay}s` } : undefined}
      className={cn("reveal", className)}
    >
      {children}
    </Tag>
  );
}

"use client";

import * as React from "react";
import { ArrowRight, MessageCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { trackCtaClick, trackWhatsappClick } from "@/lib/analytics";
import { CTA_PRIMARY, whatsappUrl } from "@/lib/site";

/**
 * CTA primário. Existe como componente próprio por dois motivos:
 * 1. garantir que o rótulo seja idêntico nos 6 pontos de conversão;
 * 2. registrar a *origem* do clique — o dado que revela qual ponto da página
 *    realmente carrega a conversão.
 */
export function CtaButton({
  source,
  label = CTA_PRIMARY,
  size = "md",
  className,
  withIcon = true,
}: {
  source: string;
  label?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
  withIcon?: boolean;
}) {
  return (
    <Button asChild size={size} className={className}>
      <a href="#contato" onClick={() => trackCtaClick(source)}>
        {label}
        {withIcon ? <ArrowRight aria-hidden="true" /> : null}
      </a>
    </Button>
  );
}

/** Rota de menor fricção. Sempre secundária ao formulário: converte mais
 *  fácil, mas entrega lead menos qualificado e sem registro estruturado. */
export function WhatsappButton({
  source,
  label = "Chamar no WhatsApp",
  variant = "secondary",
  size = "md",
  className,
}: {
  source: string;
  label?: string;
  variant?: "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  return (
    <Button asChild variant={variant} size={size} className={className}>
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackWhatsappClick(source)}
      >
        <MessageCircle aria-hidden="true" />
        {label}
      </a>
    </Button>
  );
}

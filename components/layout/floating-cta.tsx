"use client";

import * as React from "react";
import { ArrowRight, MessageCircle } from "lucide-react";

import { trackCtaClick, trackWhatsappClick } from "@/lib/analytics";
import { CTA_PRIMARY_SHORT, whatsappUrl } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Elementos flutuantes de conversão.
 *
 * Transições em CSS, sem biblioteca de animação: são dois elementos que
 * deslizam e desaparecem. Trazer o Framer Motion para o bundle de primeira
 * carga por causa disso não se paga.
 *
 * Ambos ficam sempre montados e alternam classes — evita o custo de
 * montar/desmontar e mantém a animação de saída sem AnimatePresence.
 */

/** Observa se um elemento está visível — usado para esconder a barra sticky
 *  quando o próprio formulário entra em tela (senão ela o cobriria). */
function useIsVisible(selector: string) {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const el = document.querySelector(selector);
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: "-10% 0px -10% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [selector]);

  return visible;
}

function useScrolledPast(fraction: number) {
  const [past, setPast] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setPast(max > 0 && window.scrollY / max > fraction);
    };
    onScroll();
    // passive: não bloqueia a thread de rolagem
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [fraction]);

  return past;
}

/**
 * Barra fixa de CTA no mobile. O scroll da home é longo; sem ela, quem
 * decide no meio da página precisa procurar onde converter.
 */
export function StickyMobileCTA() {
  const pastHero = useScrolledPast(0.12);
  const formVisible = useIsVisible("#contato");
  const show = pastHero && !formVisible;

  return (
    <div
      aria-hidden={!show}
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 border-t border-line bg-black/85 p-4 pb-[max(1rem,env(safe-area-inset-bottom))] backdrop-blur-xl md:hidden",
        "transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
        show ? "translate-y-0" : "translate-y-full",
      )}
    >
      <a
        href="#contato"
        tabIndex={show ? undefined : -1}
        onClick={() => trackCtaClick("sticky_mobile")}
        className="flex h-12 w-full items-center justify-center gap-2 rounded-md bg-accent text-base font-medium text-inverse"
      >
        {CTA_PRIMARY_SHORT}
        <ArrowRight className="size-4" aria-hidden="true" />
      </a>
    </div>
  );
}

/**
 * FAB de WhatsApp. Monocromático — um botão verde de WhatsApp destruiria a
 * paleta, e é exatamente o tipo de detalhe que faz um site premium parecer
 * genérico.
 */
export function WhatsAppFab() {
  const show = useScrolledPast(0.3);
  const formVisible = useIsVisible("#contato");

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar com a MarkePro no WhatsApp"
      aria-hidden={!show}
      tabIndex={show ? undefined : -1}
      onClick={() => trackWhatsappClick("fab")}
      className={cn(
        "elev-3 fixed right-5 z-40 flex size-13 items-center justify-center rounded-full",
        "border border-line-strong bg-elevated text-primary",
        "transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-surface-hover",
        show ? "scale-100 opacity-100" : "pointer-events-none scale-75 opacity-0",
        // Sobe acima da barra sticky no mobile para não colidir com ela.
        formVisible ? "bottom-5" : "bottom-24 md:bottom-6",
      )}
    >
      <MessageCircle className="size-6" strokeWidth={1.5} aria-hidden="true" />
    </a>
  );
}

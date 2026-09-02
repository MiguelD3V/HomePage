"use client";

import * as React from "react";
import { Menu } from "lucide-react";

import { CtaButton } from "@/components/common/cta-button";
import { Logo } from "@/components/layout/logo";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { NAV_LINKS } from "@/lib/constants";
import { CTA_PRIMARY_SHORT } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Navbar sticky.
 *
 * Nunca esconde ao rolar: esconder o CTA é abrir mão de conversão. Menu
 * enxuto de propósito — cada link extra é uma chance de sair do funil.
 */
export function Navbar() {
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const progressRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    let frame = 0;

    const measure = () => {
      frame = 0;
      setScrolled(window.scrollY > 24);

      // A barra de progresso é escrita direto no DOM, sem passar por estado:
      // ela muda a cada pixel de rolagem, e um setState por frame forçaria a
      // navbar inteira a re-renderizar durante toda a rolagem da página.
      const bar = progressRef.current;
      if (bar) {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const ratio = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
        bar.style.transform = `scaleX(${ratio})`;
      }
    };

    // Coalesce em rAF: o evento de scroll dispara mais vezes que a tela
    // atualiza, e medir o documento a cada disparo custa layout.
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    measure();
    // passive: não bloqueia a thread de rolagem
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full transition-all duration-300",
        scrolled
          ? "border-b border-line bg-black/70 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <nav
        aria-label="Navegação principal"
        className="container-page flex h-16 items-center justify-between md:h-18"
      >
        <a href="#topo" className="rounded-md" aria-label="MarkePro, ir ao topo">
          <Logo />
        </a>

        {/* Desktop */}
        <div className="hidden items-center gap-8 md:flex">
          <ul className="flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="link-underline text-body-sm text-muted transition-colors hover:text-primary"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <CtaButton
            source="navbar"
            label={CTA_PRIMARY_SHORT}
            size="sm"
            withIcon={false}
          />
        </div>

        {/* Mobile */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            className="-mr-2 rounded-md p-2 text-primary md:hidden"
            aria-label="Abrir menu"
          >
            <Menu className="size-6" strokeWidth={1.5} aria-hidden="true" />
          </SheetTrigger>

          <SheetContent>
            <SheetTitle className="sr-only">Menu de navegação</SheetTitle>

            <Logo className="mb-12" />

            <ul className="flex flex-col gap-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <SheetClose asChild>
                    <a
                      href={link.href}
                      // Alvo de toque generoso: 48px+ de altura
                      className="block py-3 text-h3 text-primary"
                    >
                      {link.label}
                    </a>
                  </SheetClose>
                </li>
              ))}
            </ul>

            <div className="mt-auto pt-8">
              <SheetClose asChild>
                <div>
                  <CtaButton
                    source="menu_mobile"
                    size="lg"
                    className="w-full"
                  />
                </div>
              </SheetClose>
            </div>
          </SheetContent>
        </Sheet>
      </nav>

      {/* Progresso de leitura. Aparece só depois que a rolagem começa — no
          topo ele seria um traço de largura zero pendurado na navbar
          transparente. `scaleX` sobre origem à esquerda: só compositor,
          nenhum layout por frame. */}
      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-x-0 bottom-0 h-px transition-opacity duration-300",
          scrolled ? "opacity-100" : "opacity-0",
        )}
      >
        <div
          ref={progressRef}
          className="h-full origin-left scale-x-0 bg-gradient-to-r from-transparent via-[rgb(var(--fg-rgb)/0.5)] to-[rgb(var(--fg-rgb)/0.9)]"
        />
      </div>
    </header>
  );
}

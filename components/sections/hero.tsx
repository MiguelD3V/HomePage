import { ArrowRight, Check } from "lucide-react";

import {
  GlowOrb,
  GridBackground,
  NoiseOverlay,
  ScrollCue,
} from "@/components/common/backgrounds";
import { CtaButton } from "@/components/common/cta-button";
import { Container } from "@/components/common/section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { HERO } from "@/lib/constants";

/**
 * Hero — a única seção que 100% dos visitantes vê.
 *
 * Server Component de propósito: o <h1> é o elemento de LCP e precisa estar
 * no HTML inicial, sem esperar hidratação. Nada anima na entrada aqui — só o
 * conteúdo abaixo da dobra usa <Reveal>.
 *
 * Altura ~88vh, não 100vh: deixar a próxima seção espiando é o que induz o
 * scroll. Um hero de tela cheia parece uma página de uma seção só.
 */
export function Hero() {
  return (
    <section
      id="topo"
      aria-labelledby="hero-title"
      className="relative flex min-h-[88svh] items-center overflow-hidden pb-20 pt-16 md:pb-28"
    >
      <GridBackground />
      {/* Duas fontes de luz à deriva, em fases diferentes: uma sozinha lê
          como uma vinheta estática; duas fora de fase leem como ambiente. */}
      <GlowOrb
        className="left-1/2 top-[-10%] -translate-x-1/2"
        size={900}
        drift="normal"
      />
      <GlowOrb
        className="left-[-10%] top-1/3 hidden md:block"
        size={520}
        intensity={0.045}
        drift="slow"
      />
      <NoiseOverlay />

      <Container>
        <div className="mx-auto flex max-w-[860px] flex-col items-center text-center">
          {/* Entrada escalonada em CSS puro (`enter-up` + delay inline).
              Não usa <Reveal>: aqui o conteúdo já está na tela no primeiro
              frame, e esperar IntersectionObserver + hidratação para revelá-lo
              atrasaria a percepção da dobra. O <h1> fica de fora de propósito
              — é o elemento de LCP e não pode nascer com opacidade zero. */}
          <div className="enter-up">
            <Badge>{HERO.eyebrow}</Badge>
          </div>

          <h1 id="hero-title" className="mt-8 text-display">
            {HERO.title[0]}{" "}
            <span className="text-subtle">{HERO.title[1]}</span>
          </h1>

          <p
            className="enter-up mt-6 max-w-[560px] text-body-lg text-muted"
            style={{ animationDelay: "120ms" }}
          >
            {HERO.description}
          </p>

          {/* Dois CTAs: o secundário captura quem ainda não está pronto para
              dar o contato. Sem ele, esse visitante simplesmente sai. */}
          <div
            className="enter-up mt-10 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center"
            style={{ animationDelay: "220ms" }}
          >
            <CtaButton source="hero" size="lg" className="w-full sm:w-auto" />
            <Button asChild variant="ghost" size="lg" className="w-full sm:w-auto">
              <a href="#servicos">
                Ver serviços
                <ArrowRight aria-hidden="true" />
              </a>
            </Button>
          </div>

          {/* Responde às três objeções do instante do clique.
              Cada item virou uma pílula com marcador próprio: no mobile a
              lista separada por "·" quebrava em pontos arbitrários e as três
              frases viravam um bloco único e ilegível. */}
          <ul
            className="enter-up mt-10 flex flex-wrap items-center justify-center gap-2"
            style={{ animationDelay: "320ms" }}
          >
            {HERO.microcopy.map((item) => (
              <li
                key={item}
                className="flex items-center gap-2 rounded-full border border-line bg-[rgb(var(--fg-rgb)/0.02)] px-3 py-1.5 text-caption text-subtle transition-colors duration-300 hover:border-line-strong hover:text-muted"
              >
                <Check
                  className="size-3.5 shrink-0"
                  strokeWidth={2}
                  aria-hidden="true"
                />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </Container>

      {/* Ancorado ao rodapé do hero, fora do fluxo do conteúdo centralizado
          para não interferir na medida de texto. */}
      <ScrollCue className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 md:block" />
    </section>
  );
}

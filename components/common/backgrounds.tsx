import { cn } from "@/lib/utils";

/**
 * Grade técnica de fundo. CSS puro, custo zero de rede.
 * A máscara radial faz a grade desvanecer nas bordas, evitando que ela
 * "corte" a seção com uma linha dura.
 */
export function GridBackground({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 -z-10", className)}
      style={{
        // --fg-rgb inverte com o tom da seção (branco em fundo escuro,
        // preto em fundo claro) — sem isso a grade some em seções brancas.
        backgroundImage:
          "linear-gradient(to right, rgb(var(--fg-rgb) / 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgb(var(--fg-rgb) / 0.05) 1px, transparent 1px)",
        backgroundSize: "64px 64px",
        maskImage:
          "radial-gradient(ellipse 80% 60% at 50% 40%, #000 40%, transparent 100%)",
        WebkitMaskImage:
          "radial-gradient(ellipse 80% 60% at 50% 40%, #000 40%, transparent 100%)",
      }}
    />
  );
}

/**
 * Fonte de luz. É daqui que vem a profundidade da página — numa paleta sem
 * cor, "cor" é luz.
 *
 * `blur(120px)` é caro de pintar: no máximo 2–3 orbs na página inteira, e
 * menores no mobile.
 */
export function GlowOrb({
  className,
  size = 800,
  intensity = 0.06,
  drift,
}: {
  className?: string;
  size?: number;
  intensity?: number;
  /** Deriva lenta e contínua. `slow` roda em contratempo: dois orbs à deriva
   *  em fases diferentes leem como luz ambiente; em fase, leem como um único
   *  elemento pulsando — que é exatamente o efeito barato a evitar. */
  drift?: "normal" | "slow";
}) {
  return (
    // Dois nós de propósito: o externo posiciona (e carrega o
    // `-translate-x-1/2` de centralização vindo por className), o interno
    // anima. Num nó só, a animação de transform sobrescreveria a
    // centralização e o orb saltaria para o lado ao iniciar.
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute -z-10", className)}
      // O tamanho fica no nó EXTERNO: o `-translate-x-1/2` que centraliza o
      // orb vem por className e é relativo à largura do próprio elemento.
      // Num wrapper sem dimensão ele deslocaria metade de zero, e o orb
      // sairia do centro.
      style={{ width: size, height: size, maxWidth: "100vw" }}
    >
      <div
        className={cn(
          "size-full rounded-full blur-[120px]",
          drift === "normal" && "orb-drift",
          drift === "slow" && "orb-drift-slow",
        )}
        style={{
          // --fg-rgb inverte com o tom: glow branco em seção escura, sombra
          // suave preta em seção clara — a mesma peça serve os dois casos.
          background: `radial-gradient(circle, rgb(var(--fg-rgb) / ${intensity}) 0%, transparent 70%)`,
        }}
      />
    </div>
  );
}

/**
 * Indicador de rolagem do hero. Um traço que desce dentro de um trilho.
 *
 * Existe porque o hero tem 88svh: a próxima seção já espia por baixo, mas o
 * movimento é o que confirma ao visitante que há mais página. Puramente
 * decorativo — some para leitores de tela e para quem pediu menos movimento.
 */
export function ScrollCue({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none h-10 w-px overflow-hidden bg-[rgb(var(--fg-rgb)/0.12)]",
        className,
      )}
    >
      <div className="h-1/2 w-full animate-[scroll-cue_2.4s_var(--ease-out-expo)_infinite] bg-[rgb(var(--fg-rgb)/0.55)]" />
    </div>
  );
}

/** Ruído sobre gradientes: sem ele o banding em fundo preto é visível. */
export function NoiseOverlay() {
  return <div aria-hidden="true" className="noise-overlay -z-10" />;
}

/** Desvanecimento entre seções, evitando transições duras de fundo. */
export function SectionFade({
  position = "top",
}: {
  position?: "top" | "bottom";
}) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-x-0 -z-10 h-32",
        position === "top" ? "top-0" : "bottom-0",
      )}
      style={{
        // var(--color-base) segue o tom da seção — preto ou branco.
        background: `linear-gradient(to ${position === "top" ? "bottom" : "top"}, var(--color-base), transparent)`,
      }}
    />
  );
}

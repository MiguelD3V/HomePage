"use client";

import dynamic from "next/dynamic";

/**
 * O formulário é a última seção da página, mas seu JavaScript
 * (react-hook-form + a lógica dos 3 passos) entrava no bundle de primeira
 * carga e atrasava a interatividade do topo — onde o usuário realmente está
 * nos primeiros segundos.
 *
 * Com `ssr: false`, o chunk só é buscado depois da hidratação. O placeholder
 * reserva a altura do card para que a chegada do formulário não empurre o
 * layout (CLS).
 *
 * Quem está sem JavaScript não perde a conversão: o link de WhatsApp na
 * coluna ao lado é HTML puro e continua funcionando.
 */
const MultiStepForm = dynamic(
  () => import("@/components/forms/multi-step-form").then((m) => m.MultiStepForm),
  {
    ssr: false,
    loading: () => (
      <div
        className="elev-2 min-h-[560px] rounded-xl border border-line bg-surface p-6 md:p-10"
        aria-busy="true"
        aria-label="Carregando formulário"
      >
        <div className="flex items-center gap-2">
          <div className="h-0.5 flex-1 rounded-full bg-accent" />
          <div className="h-0.5 flex-1 rounded-full bg-[rgb(var(--fg-rgb)/0.1)]" />
          <div className="h-0.5 flex-1 rounded-full bg-[rgb(var(--fg-rgb)/0.1)]" />
        </div>
        <div className="mt-6 h-3 w-24 rounded bg-[rgb(var(--fg-rgb)/0.05)]" />
        <div className="mt-4 h-7 w-3/5 rounded bg-[rgb(var(--fg-rgb)/0.05)]" />
        <div className="mt-3 h-4 w-2/5 rounded bg-[rgb(var(--fg-rgb)/0.05)]" />
        <div className="mt-8 flex flex-wrap gap-2">
          {[112, 96, 128, 104, 144, 88, 72, 96].map((w, i) => (
            <div
              key={i}
              className="h-10 rounded-sm bg-[rgb(var(--fg-rgb)/0.05)]"
              style={{ width: w }}
            />
          ))}
        </div>
      </div>
    ),
  },
);

export function LazyForm() {
  return <MultiStepForm />;
}

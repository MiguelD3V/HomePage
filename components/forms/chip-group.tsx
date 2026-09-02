"use client";

import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

type ChipGroupProps = {
  options: readonly string[];
  /** Opções atualmente selecionadas (apenas para pintar o estado). */
  value: string[];
  /** Recebe a opção clicada — nunca a lista final.
   *
   *  Deixar o cálculo da nova lista com o pai é deliberado: se este
   *  componente montasse a lista a partir da prop `value`, dois cliques na
   *  mesma renderização leriam o mesmo estado e o segundo descartaria o
   *  primeiro. O pai lê o valor vivo do formulário e não tem esse problema. */
  onToggle: (option: string) => void;
  mode?: "single" | "multiple";
  /** Rótulo acessível do grupo. */
  label: string;
};

/**
 * Seleção por clique — a mecânica central dos passos 1 e 2.
 *
 * Digitar é o que faz formulário ser abandonado. Os dois primeiros passos não
 * têm um único campo de texto: quem clicou uma vez tende a terminar, e o
 * custo psicológico só aparece no passo 3, quando o compromisso já foi feito.
 *
 * Botões reais (não divs) para funcionar por teclado.
 */
export function ChipGroup({
  options,
  value,
  onToggle,
  mode = "multiple",
  label,
}: ChipGroupProps) {
  return (
    <div
      role="group"
      aria-label={label}
      data-mode={mode}
      className="flex flex-wrap gap-2"
    >
      {options.map((option) => {
        const selected = value.includes(option);
        return (
          <button
            key={option}
            type="button"
            onClick={() => onToggle(option)}
            aria-pressed={selected}
            className={cn(
              "inline-flex items-center gap-2 rounded-sm border px-4 py-2.5 text-body-sm",
              "transition-all duration-150 ease-[cubic-bezier(0.16,1,0.3,1)]",
              selected
                ? "border-line-focus bg-[rgb(var(--fg-rgb)/0.1)] text-primary"
                : "border-line bg-[rgb(var(--fg-rgb)/0.02)] text-muted hover:border-line-strong hover:text-primary",
            )}
          >
            {selected ? (
              <Check className="size-3.5" strokeWidth={2} aria-hidden="true" />
            ) : null}
            {option}
          </button>
        );
      })}
    </div>
  );
}

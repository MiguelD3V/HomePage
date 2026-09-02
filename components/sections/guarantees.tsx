import { Icon } from "@/components/common/cards";
import { Container } from "@/components/common/section";
import { GUARANTEES } from "@/lib/constants";

/**
 * Faixa de garantias — ocupa o slot onde normalmente ficariam os logos de
 * clientes.
 *
 * É o segundo espaço de maior valor da página. Sem prova social, deixá-lo
 * vazio enfraqueceria tudo que vem abaixo; preenchê-lo com compromissos
 * verificáveis é a troca honesta.
 *
 * É uma faixa, não um bloco de cards: altura contida, sem elevação.
 */
export function Guarantees() {
  return (
    <section
      aria-label="Nossos compromissos"
      className="border-y border-line bg-[var(--color-base)]"
    >
      <Container>
        <ul className="grid grid-cols-2 md:grid-cols-4">
          {GUARANTEES.map((item, i) => (
            <li
              key={item.text}
              className={[
                "group relative flex items-start gap-3 px-3 py-7 md:items-center md:px-6",
                "transition-colors duration-300",
                // Separadores só entre colunas, nunca na primeira de cada linha
                i % 2 !== 0 ? "border-l border-line" : "",
                "md:border-l md:first:border-l-0",
                i < 2 ? "border-b border-line md:border-b-0" : "",
              ].join(" ")}
            >
              {/* Traço que se acende no topo da célula sob o cursor. É o que
                  transforma uma faixa estática em algo que responde — sem
                  mover nada de lugar e sem tocar na altura da faixa. */}
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-px origin-center scale-x-0 bg-gradient-to-r from-transparent via-[rgb(var(--fg-rgb)/0.35)] to-transparent transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
              />
              <Icon
                name={item.icon}
                className="mt-0.5 shrink-0 text-subtle transition-colors duration-300 group-hover:text-primary md:mt-0"
              />
              <span className="text-caption text-muted transition-colors duration-300 group-hover:text-primary md:text-body-sm">
                {item.text}
              </span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

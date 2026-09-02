import { ProcessStep } from "@/components/common/cards";
import { CtaButton } from "@/components/common/cta-button";
import { Reveal } from "@/components/common/reveal";
import { Container, Section } from "@/components/common/section";
import { SectionHeader } from "@/components/common/section-header";
import { PROCESS } from "@/lib/constants";

/**
 * Processo — o substituto direto da seção de cases.
 *
 * Sem histórico de clientes, previsibilidade é o único ativo de credibilidade
 * disponível. O bloqueio que resta ao visitante neste ponto da página não é
 * "eles sabem fazer?", é "o que acontece se eu chamar?".
 *
 * Quando existirem 3 cases reais, uma <Cases /> entra depois desta seção e
 * absorve parte da carga de credibilidade que hoje mora aqui.
 *
 * Tom claro: alterna com Diferenciais (escura) antes e Faq (escura) depois.
 */
export function Process() {
  return (
    <Section id="processo" labelledBy="processo-title" tone="light">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <SectionHeader
                id="processo-title"
                eyebrow={PROCESS.eyebrow}
                title={PROCESS.title}
                description={PROCESS.description}
                className="lg:sticky lg:top-32"
              />
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <ol>
              {PROCESS.steps.map((step, i) => (
                <Reveal key={step.number} delay={i * 0.06}>
                  <li>
                    <ProcessStep
                      number={step.number}
                      title={step.title}
                      description={step.description}
                      meta={step.meta}
                      isLast={i === PROCESS.steps.length - 1}
                    />
                  </li>
                </Reveal>
              ))}
            </ol>

            {/* Admitir a novidade antes que o visitante a descubra:
                converte a fraqueza em sinal de honestidade e transforma a
                objeção em escassez legítima. */}
            <Reveal>
              <div className="elev-1 mt-12 rounded-lg border border-line bg-surface p-8">
                <h3 className="text-h4 text-primary">
                  {PROCESS.transparency.title}
                </h3>
                <p className="mt-4 max-w-[60ch] text-body-sm text-muted">
                  {PROCESS.transparency.body}
                </p>
                <p className="mt-4 border-l-2 border-line-focus pl-4 text-body-sm text-primary">
                  {PROCESS.transparency.highlight}
                </p>
              </div>
            </Reveal>

            <Reveal>
              <div className="mt-10">
                <CtaButton source="pos_processo" />
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}

import { Check } from "lucide-react";

import { GlowOrb } from "@/components/common/backgrounds";
import { WhatsappButton } from "@/components/common/cta-button";
import { Reveal } from "@/components/common/reveal";
import { Container, Section } from "@/components/common/section";
import { SectionHeader } from "@/components/common/section-header";
import { LazyForm } from "@/components/forms/lazy-form";
import { CTA_SECTION } from "@/lib/constants";

/**
 * CTA final + formulário — a seção mais importante da página.
 *
 * Fica no fim porque captura quem leu tudo. Quem não quis ler já passou por
 * outras cinco portas de conversão no caminho.
 *
 * A coluna esquerda é sticky no desktop: os reforços de confiança
 * ("resposta em 24h", "sem compromisso") ficam visíveis enquanto o usuário
 * preenche, que é exatamente quando a dúvida volta.
 *
 * Tom claro: fecha a página no branco, simétrico ao hero que abre no preto.
 */
export function Cta() {
  return (
    <Section
      id="contato"
      labelledBy="contato-title"
      tone="light"
      className="relative overflow-hidden"
    >
      <GlowOrb
        className="left-1/2 top-0 -translate-x-1/2"
        size={700}
        intensity={0.07}
      />

      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <div className="lg:sticky lg:top-32">
                <SectionHeader
                  id="contato-title"
                  eyebrow={CTA_SECTION.eyebrow}
                  title={CTA_SECTION.title}
                  description={CTA_SECTION.description}
                />

                <ul className="mt-8 flex flex-col gap-3">
                  {CTA_SECTION.reassurances.map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <Check
                        className="size-4 shrink-0 text-primary"
                        strokeWidth={1.5}
                        aria-hidden="true"
                      />
                      <span className="text-body-sm text-muted">{item}</span>
                    </li>
                  ))}
                </ul>

                {/* Escape de menor fricção para quem não quer preencher nada. */}
                <div className="mt-8 border-t border-line pt-8">
                  <p className="mb-3 text-body-sm text-subtle">
                    Prefere conversar agora?
                  </p>
                  <WhatsappButton source="secao_contato" />
                </div>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal delay={0.1}>
              <LazyForm />
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}

"use client";

import { CtaButton } from "@/components/common/cta-button";
import { Reveal } from "@/components/common/reveal";
import { Container, Section } from "@/components/common/section";
import { SectionHeader } from "@/components/common/section-header";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQ } from "@/lib/constants";

/**
 * FAQ, imediatamente antes do formulário.
 *
 * Este é o lugar de custo mais baixo para responder objeções: cada objeção
 * não respondida aqui vira um lead perdido no formulário.
 *
 * Layout em duas colunas com header sticky — reduz a altura da seção e lê
 * melhor que uma lista centralizada e longa.
 *
 * Tom escuro: alterna com Processo (clara) antes e o CTA final (claro)
 * depois. Tem CTA próprio mesmo levando direto ao formulário — quem decide
 * já na primeira dúvida respondida não deveria precisar rolar mais.
 */
export function Faq() {
  return (
    <Section id="faq" labelledBy="faq-title">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <Reveal>
              <SectionHeader
                id="faq-title"
                eyebrow={FAQ.eyebrow}
                title={FAQ.title}
                className="lg:sticky lg:top-32"
              />
            </Reveal>
          </div>

          <div className="lg:col-span-8">
            <Reveal>
              {/* single + collapsible: uma resposta por vez mantém a seção
                  curta e evita que o usuário perca o contexto. */}
              <Accordion type="single" collapsible className="border-t border-line">
                {FAQ.items.map((item, i) => (
                  <AccordionItem key={item.question} value={`item-${i}`}>
                    {/* O AccordionHeader do Radix já renderiza um <h3>.
                        Um heading próprio aqui criaria h3 dentro de h3. */}
                    <AccordionTrigger>{item.question}</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-body-sm">{item.answer}</p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Reveal>

            <Reveal>
              <div className="mt-10 flex flex-col items-start gap-4 border-t border-line pt-10">
                <p className="text-body text-muted">Ainda com dúvidas?</p>
                <CtaButton source="pos_faq" />
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}

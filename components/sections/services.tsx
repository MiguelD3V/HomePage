"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

import { GlowOrb } from "@/components/common/backgrounds";
import { ServiceCard } from "@/components/common/cards";
import { CtaButton } from "@/components/common/cta-button";
import { Reveal } from "@/components/common/reveal";
import { SpotlightGroup } from "@/components/common/spotlight-group";
import { Container, Section } from "@/components/common/section";
import { SectionHeader } from "@/components/common/section-header";
import { SERVICES_SECTION, SERVICE_PILLARS } from "@/lib/constants";

/**
 * Serviços agrupados em dois pilares.
 *
 * Tabs, e não uma grade única: a divisão em duas frentes *é* a mensagem de
 * posicionamento. Custa um clique e transforma a seção em argumento.
 *
 * 3 serviços por pilar, de propósito: em 1 linha de 3 colunas o grid nunca
 * quebra numa segunda linha incompleta (o problema de ter 5 itens num grid
 * de 3 colunas — sobra um card sozinho na última linha).
 *
 * SEO: os dois painéis ficam montados no DOM (`forceMount`) — os serviços
 * de cada pilar precisam ser rastreáveis mesmo que só um esteja visível.
 *
 * Tom claro: primeira seção branca da página, logo depois do hero e da
 * faixa de garantias (ambos escuros) — o contraste de abrir com uma tela
 * clara é o que dá o "respiro" que a home preta inteira não tinha.
 */
export function Services() {
  const [active, setActive] = React.useState(SERVICE_PILLARS[0].id);
  const activeIndex = SERVICE_PILLARS.findIndex((p) => p.id === active);

  return (
    <Section id="servicos" labelledBy="servicos-title" tone="light" className="overflow-hidden">
      <GlowOrb className="left-1/2 top-0 -translate-x-1/2" size={700} intensity={0.05} />

      <Container>
        <Reveal>
          <SectionHeader
            id="servicos-title"
            eyebrow={SERVICES_SECTION.eyebrow}
            title={SERVICES_SECTION.title}
            description={SERVICES_SECTION.description}
            align="center"
            className="mx-auto items-center text-center"
          />
        </Reveal>

        <TabsPrimitive.Root
          value={active}
          onValueChange={setActive}
          className="mt-12 md:mt-16"
        >
          <Reveal>
            <TabsPrimitive.List
              aria-label="Frentes de atuação"
              className="relative mx-auto grid w-fit grid-cols-2 rounded-md border border-line bg-surface p-1"
            >
              {/* Indicador deslizante em CSS transform.
                  Colunas de largura igual permitem posicionar por índice, sem
                  precisar do motor de layout do Framer Motion (que exigiria
                  o bundle `domMax`, muito maior). */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-1 left-1 w-[calc(50%-0.25rem)] rounded-[7px] border border-line-strong bg-[rgb(var(--fg-rgb)/0.06)] transition-transform duration-250 ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{ transform: `translateX(${activeIndex * 100}%)` }}
              />
              {SERVICE_PILLARS.map((pillar) => (
                <TabsPrimitive.Trigger
                  key={pillar.id}
                  value={pillar.id}
                  className="relative rounded-[7px] px-6 py-2 text-body-sm text-muted transition-colors duration-200 data-[state=active]:text-primary"
                >
                  {pillar.label}
                </TabsPrimitive.Trigger>
              ))}
            </TabsPrimitive.List>
          </Reveal>

          {SERVICE_PILLARS.map((pillar) => (
            <TabsPrimitive.Content
              key={pillar.id}
              value={pillar.id}
              forceMount
              className="mt-10 focus-visible:outline-none data-[state=inactive]:hidden"
            >
              <p className="mb-8 text-center text-body-sm text-subtle">
                {pillar.description}
              </p>

              {/* Sem o passo intermediário de 2 colunas: com exatamente 3
                  cards, um grid de 2 colunas sempre sobra 1 card sozinho
                  na segunda linha. Pula direto de 1 coluna (mobile e tablet
                  empilhados, onde 3 colunas apertariam demais o texto) para
                  3 no desktop — uma linha só, sem quebra e com largura
                  confortável para o título não quebrar dentro do card. */}
              <SpotlightGroup as="ul" className="grid gap-4 lg:grid-cols-3">
                {pillar.services.map((service, i) => (
                  // `as="li"`: o <Reveal> É o item da lista. Um <div> entre a
                  // <ul> e seus <li> é markup inválido e quebra a contagem de
                  // itens anunciada pelo leitor de tela.
                  <Reveal as="li" key={service.title} delay={i * 0.06} className="h-full">
                    <ServiceCard
                      title={service.title}
                      description={service.description}
                      icon={service.icon}
                    />
                  </Reveal>
                ))}
              </SpotlightGroup>
            </TabsPrimitive.Content>
          ))}
        </TabsPrimitive.Root>

        {/* Captura o visitante exatamente onde ele fica sobrecarregado
            com as opções e não sabe qual serviço pedir. */}
        <Reveal>
          <div className="mt-14 flex flex-col items-center gap-4 text-center">
            <p className="text-body text-muted">{SERVICES_SECTION.ctaLabel}</p>
            <CtaButton source="pos_servicos" />
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

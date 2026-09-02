import { BentoCard } from "@/components/common/cards";
import { GlowOrb } from "@/components/common/backgrounds";
import { CtaButton } from "@/components/common/cta-button";
import { Reveal } from "@/components/common/reveal";
import { SpotlightGroup } from "@/components/common/spotlight-group";
import { Container, Section } from "@/components/common/section";
import { SectionHeader } from "@/components/common/section-header";
import { DIFFERENTIATORS } from "@/lib/constants";

/**
 * Diferenciais em bento grid.
 *
 * O desequilíbrio 7/5 + 5/7 é proposital: numa paleta sem cor, a assimetria
 * de layout é uma das poucas fontes de interesse visual disponíveis. Quatro
 * blocos de mesmo tamanho leriam como tabela.
 *
 * No mobile a ordem vira A → D → B → C: os dois argumentos mais fortes
 * primeiro, porque a chance de o usuário ler o quarto bloco é baixa.
 *
 * Tom escuro: alterna com Serviços (clara) antes e Processo (clara) depois.
 * Toda tela de conteúdo carrega seu próprio CTA — o visitante nunca precisa
 * rolar até o fim da página para converter.
 */
export function Differentiators() {
  return (
    <Section id="diferenciais" labelledBy="diferenciais-title" className="overflow-hidden">
      <GlowOrb className="right-[-20%] top-1/3" size={600} intensity={0.05} drift="slow" />

      <Container>
        <Reveal>
          <SectionHeader
            id="diferenciais-title"
            eyebrow={DIFFERENTIATORS.eyebrow}
            title={DIFFERENTIATORS.title}
          />
        </Reveal>

        <SpotlightGroup className="mt-12 grid gap-4 md:grid-cols-12 md:mt-16">
          {DIFFERENTIATORS.items.map((item, i) => (
            <Reveal
              key={item.id}
              delay={i * 0.08}
              className={[
                item.span === "lg" ? "md:col-span-7" : "md:col-span-5",
                // Ordem no mobile: A, D, B, C
                item.id === "transparencia" ? "order-2 md:order-none" : "",
                item.id === "stack" ? "order-3 md:order-none" : "",
                item.id === "ia" ? "order-4 md:order-none" : "",
              ].join(" ")}
            >
              <BentoCard
                title={item.title}
                description={item.description}
                icon={item.icon}
                // Borda com gradiente só no bloco central do argumento.
                featured={item.id === "time"}
              />
            </Reveal>
          ))}
        </SpotlightGroup>

        <Reveal>
          <div className="mt-14 flex justify-center">
            <CtaButton source="pos_diferenciais" />
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

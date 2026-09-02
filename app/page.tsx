import { Cta } from "@/components/sections/cta";
import { Differentiators } from "@/components/sections/differentiators";
import { Faq } from "@/components/sections/faq";
import { Guarantees } from "@/components/sections/guarantees";
import { Hero } from "@/components/sections/hero";
import { Process } from "@/components/sections/process";
import { Services } from "@/components/sections/services";
import { StickyMobileCTA, WhatsAppFab } from "@/components/layout/floating-cta";

/**
 * Home da MarkePro.
 *
 * A página alterna telas escuras e claras (Hero+Guarantees escuros →
 * Serviços claro → Diferenciais escuro → Processo claro → Faq escuro → Cta
 * final claro) para dar ritmo visual sem depender de cor — o preto absoluto
 * contínuo cansava o olho na versão anterior. Cada tela de conteúdo carrega
 * seu próprio CTA, para que o visitante nunca precise rolar até o fim só
 * para converter.
 *
 * Página estática: nenhum dado é buscado em tempo de request, então tudo é
 * renderizado no build.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Guarantees />
      <Services />
      <Differentiators />
      <Process />
      {/* Quando existirem 3 cases reais, <Cases /> entra aqui (tom claro). */}
      <Faq />
      <Cta />

      <StickyMobileCTA />
      <WhatsAppFab />
    </>
  );
}

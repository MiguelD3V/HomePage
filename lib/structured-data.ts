import { FAQ, SERVICE_PILLARS } from "@/lib/constants";
import { site } from "@/lib/site";

/**
 * JSON-LD. O FAQPage é o de maior retorno prático: torna a página elegível
 * a rich result no Google, o que aumenta CTR sem custo de mídia.
 */

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${site.url}/#organization`,
    name: site.name,
    url: site.url,
    description: site.description,
    email: site.email,
    telephone: `+${site.whatsapp}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: site.city,
      addressRegion: site.state,
      addressCountry: "BR",
    },
    areaServed: { "@type": "Country", name: "Brasil" },
    sameAs: [site.social.instagram],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Serviços da MarkePro",
      itemListElement: SERVICE_PILLARS.flatMap((pillar) =>
        pillar.services.map((service) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: service.title,
            description: service.description,
          },
        })),
      ),
    },
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    url: site.url,
    name: site.name,
    inLanguage: "pt-BR",
    publisher: { "@id": `${site.url}/#organization` },
  };
}

export function faqSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

/** Renderiza os schemas num único <script>, evitando 3 tags separadas. */
export function jsonLd() {
  return JSON.stringify([organizationSchema(), websiteSchema(), faqSchema()]);
}

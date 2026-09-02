/**
 * Configuração institucional da MarkePro.
 *
 * ⚠️ PENDENTE — os campos marcados abaixo precisam ser confirmados com o
 * cliente antes do lançamento. Estão preenchidos com valores plausíveis para
 * que a página funcione ponta a ponta, mas NÃO são dados reais.
 */

export const site = {
  name: "MarkePro",
  /** ⚠️ PENDENTE: domínio definitivo. Usado em canonical, OG e sitemap. */
  url: "https://markepro.com.br",
  tagline: "Marketing digital e desenvolvimento de software",
  description:
    "Criamos sites, landing pages, sistemas e chatbots com IA — e cuidamos do tráfego pago, SEO e branding que trazem clientes. Diagnóstico gratuito em 24h.",

  whatsapp: "5516996320168",
  whatsappMessage:
    "Olá! Vim pelo site da MarkePro e queria falar sobre um projeto.",

  /** ⚠️ PENDENTE: e-mail comercial real. */
  email: "contato@markepro.com.br",

  /** ⚠️ PENDENTE: cidade/UF sede — usada no footer e no SEO local. */
  city: "São Paulo",
  state: "SP",

  /** ⚠️ PENDENTE: CNPJ real. Existência jurídica verificável é sinal de
   *  confiança barato e eficaz para uma empresa sem cases. */
  cnpj: "00.000.000/0001-00",

  social: {
    instagram: "https://instagram.com/agencia_markepro",
  },
} as const;

export const whatsappUrl = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
  site.whatsappMessage,
)}`;

/** Rótulo do CTA primário. Idêntico em todos os 6 pontos de conversão:
 *  variar o texto obriga o usuário a reprocessar a decisão a cada encontro. */
export const CTA_PRIMARY = "Solicitar diagnóstico gratuito";
export const CTA_PRIMARY_SHORT = "Solicitar diagnóstico";

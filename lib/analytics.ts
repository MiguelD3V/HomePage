/**
 * Camada fina de tracking. Silenciosa se GA4/Pixel não estiverem carregados,
 * para que a ausência de analytics nunca quebre uma interação.
 */

type GtagWindow = Window & {
  gtag?: (...args: unknown[]) => void;
  fbq?: (...args: unknown[]) => void;
};

function track(event: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  const w = window as GtagWindow;
  w.gtag?.("event", event, params);
  w.fbq?.("trackCustom", event, params);
}

/** Origem do clique importa mais que a contagem: revela qual dos 6 pontos
 *  de conversão realmente carrega a página. */
export function trackCtaClick(source: string) {
  track("cta_click", { source });
}

export function trackFormStep(step: number) {
  track("form_step", { step });
}

export function trackFormSubmit(services: string[]) {
  track("form_submit", { services: services.join(", ") });
}

export function trackWhatsappClick(source: string) {
  track("whatsapp_click", { source });
}

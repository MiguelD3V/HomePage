"use server";

import type { LeadActionResult } from "@/lib/lead";
import { leadPayloadSchema } from "@/lib/schemas";

/**
 * Recebe o lead do formulário multi-step.
 *
 * Server Action em vez de rota de API: elimina uma rota pública, o fetch
 * manual e o JavaScript de cliente correspondente.
 *
 * A validação de cliente (react-hook-form + Zod) é conveniência de UX.
 * A validação que vale é esta — o mesmo schema, executado no servidor.
 *
 * ⚠️ CONFIGURAÇÃO NECESSÁRIA (.env.local):
 *   RESEND_API_KEY    chave da Resend para envio de e-mail
 *   LEAD_TO_EMAIL     caixa que recebe os leads
 *   LEAD_FROM_EMAIL   remetente verificado na Resend
 *   LEAD_WEBHOOK_URL  (opcional) webhook de CRM, recebe o mesmo payload
 */

/** Preenchimento em menos de 3s não é humano: são 3 passos e 3 campos. */
const MIN_FILL_MS = 3000;

function formatLeadEmail(data: {
  name: string;
  email: string;
  phone: string;
  company?: string;
  message?: string;
  services: string[];
  companySize?: string;
  timeline?: string;
  budget?: string;
}) {
  const rows = [
    ["Nome", data.name],
    ["E-mail", data.email],
    ["WhatsApp", data.phone],
    ["Empresa", data.company || "—"],
    ["Serviços", data.services.join(", ")],
    ["Porte", data.companySize || "—"],
    ["Prazo", data.timeline || "—"],
    ["Investimento", data.budget || "—"],
    ["Mensagem", data.message || "—"],
  ];

  return rows
    .map(([label, value]) => `<p><strong>${label}:</strong> ${value}</p>`)
    .join("\n");
}

async function deliver(data: Parameters<typeof formatLeadEmail>[0]) {
  const tasks: Promise<unknown>[] = [];

  const { RESEND_API_KEY, LEAD_TO_EMAIL, LEAD_FROM_EMAIL, LEAD_WEBHOOK_URL } =
    process.env;

  if (RESEND_API_KEY && LEAD_TO_EMAIL && LEAD_FROM_EMAIL) {
    tasks.push(
      fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: LEAD_FROM_EMAIL,
          to: LEAD_TO_EMAIL,
          reply_to: data.email,
          subject: `Novo lead: ${data.name} — ${data.services.join(", ")}`,
          html: formatLeadEmail(data),
        }),
      }).then((res) => {
        if (!res.ok) throw new Error(`Resend respondeu ${res.status}`);
      }),
    );
  }

  if (LEAD_WEBHOOK_URL) {
    tasks.push(
      fetch(LEAD_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }).then((res) => {
        if (!res.ok) throw new Error(`Webhook respondeu ${res.status}`);
      }),
    );
  }

  if (tasks.length === 0) {
    // Em desenvolvimento, logar é suficiente para testar o fluxo completo.
    // Em produção, aceitar silenciosamente significaria perder o lead — é
    // melhor falhar e oferecer o WhatsApp como rota alternativa.
    if (process.env.NODE_ENV === "production") {
      throw new Error("Nenhum destino de lead configurado");
    }
    console.info("[lead] Nenhum destino configurado. Payload recebido:", data);
    return;
  }

  await Promise.all(tasks);
}

export async function submitLead(input: unknown): Promise<LeadActionResult> {
  const parsed = leadPayloadSchema.safeParse(input);

  if (!parsed.success) {
    return {
      status: "error",
      message: "Confira os dados do formulário e tente novamente.",
    };
  }

  const { website, startedAt, ...data } = parsed.data;

  // Honeypot: campo escondido preenchido = bot. Respondemos "sucesso" para
  // não ensinar o bot a contornar a checagem.
  if (website) return { status: "success" };

  if (startedAt && Date.now() - startedAt < MIN_FILL_MS) {
    return { status: "success" };
  }

  try {
    await deliver(data);
    return { status: "success" };
  } catch (error) {
    console.error("[lead] Falha ao entregar:", error);
    return {
      status: "error",
      message:
        "Não conseguimos enviar agora. Tente de novo ou fale com a gente no WhatsApp.",
    };
  }
}

/**
 * Tipos, mensagens e validação do lead — SEM dependência de Zod.
 *
 * Existe separado de `schemas.ts` por uma razão de performance medida:
 * qualquer import de valor vindo de `schemas.ts` arrasta o Zod inteiro para
 * o bundle do cliente (~90 KB gzip). O formulário só precisa validar 3
 * campos, então validá-los à mão no cliente e manter o Zod exclusivamente no
 * servidor (Server Action) custa poucas linhas e devolve o orçamento de JS.
 *
 * As mensagens vivem aqui e são reaproveitadas pelo schema do servidor:
 * uma fonte só, dois consumidores.
 */

export type LeadInput = {
  services: string[];
  companySize?: string;
  timeline?: string;
  budget?: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  message?: string;
  /** Honeypot. */
  website?: string;
};

export const MESSAGES = {
  services: "Escolha pelo menos uma opção para continuarmos.",
  name: "Precisamos do seu nome para saber com quem falamos.",
  email: "Precisamos de um e-mail válido para enviar a proposta.",
  phone: "Confira o número — usamos o WhatsApp para responder.",
  messageTooLong: "Mensagem muito longa.",
} as const;

/** Aceita os formatos que brasileiros realmente digitam:
 *  (11) 98888-7777 · 11988887777 · +55 11 98888-7777 */
export const PHONE_REGEX =
  /^(?:\+?55)?\s?(?:\(?[1-9]{2}\)?)\s?9?\d{4}[-\s]?\d{4}$/;

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Campos validados em cada passo. Bloquear o avanço revalidando só o passo
 *  atual evita mostrar erros de campos que o usuário ainda nem viu. */
export const STEP_FIELDS = {
  1: ["services"],
  2: [],
  3: ["name", "email", "phone"],
} as const satisfies Record<number, readonly (keyof LeadInput)[]>;

type FieldErrors = Partial<
  Record<keyof LeadInput, { type: string; message: string }>
>;

/** Validação de cliente. É conveniência de UX — a que vale roda no servidor. */
export function validateLead(values: LeadInput): FieldErrors {
  const errors: FieldErrors = {};

  if (!values.services || values.services.length === 0) {
    errors.services = { type: "required", message: MESSAGES.services };
  }

  if (!values.name || values.name.trim().length < 2) {
    errors.name = { type: "required", message: MESSAGES.name };
  }

  if (!values.email || !EMAIL_REGEX.test(values.email.trim())) {
    errors.email = { type: "pattern", message: MESSAGES.email };
  }

  if (!values.phone || !PHONE_REGEX.test(values.phone.trim())) {
    errors.phone = { type: "pattern", message: MESSAGES.phone };
  }

  if (values.message && values.message.length > 2000) {
    errors.message = { type: "maxLength", message: MESSAGES.messageTooLong };
  }

  return errors;
}

export type LeadActionResult =
  | { status: "success" }
  | { status: "error"; message: string };

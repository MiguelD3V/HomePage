import { z } from "zod";

import {
  EMAIL_REGEX,
  MESSAGES,
  PHONE_REGEX,
  type LeadInput,
} from "@/lib/lead";

/**
 * Schema do servidor. Este módulo nunca deve ser importado por um componente
 * de cliente — ele arrasta o Zod para o bundle. O cliente usa `lib/lead.ts`.
 *
 * A validação de cliente é conveniência de UX. Esta é a que vale: roda dentro
 * da Server Action, sobre dados que o navegador pode ter adulterado.
 */

export const leadSchema = z.object({
  services: z.array(z.string()).min(1, MESSAGES.services),

  companySize: z.string().optional(),
  timeline: z.string().optional(),
  budget: z.string().optional(),

  name: z.string().trim().min(2, MESSAGES.name),
  email: z.string().trim().toLowerCase().regex(EMAIL_REGEX, MESSAGES.email),
  phone: z.string().trim().regex(PHONE_REGEX, MESSAGES.phone),

  company: z.string().trim().optional(),
  message: z.string().trim().max(2000, MESSAGES.messageTooLong).optional(),

  /** Honeypot. Preenchido = bot. Evita CAPTCHA, que custa conversão real. */
  website: z.string().max(0).optional(),
});

/** O que a Server Action recebe: os campos do form + o carimbo de tempo
 *  usado na checagem anti-bot (que não é um campo preenchido pelo usuário). */
export const leadPayloadSchema = leadSchema.extend({
  startedAt: z.number().optional(),
});

export type LeadPayload = z.infer<typeof leadPayloadSchema>;

/** Garante em tempo de compilação que o schema do servidor e o tipo usado
 *  pelo cliente não saiam de sincronia. */
type _SchemaMatchesClientType = z.infer<typeof leadSchema> extends LeadInput
  ? true
  : never;
const _typeCheck: _SchemaMatchesClientType = true;
void _typeCheck;

"use client";

import * as React from "react";
import { useForm, type Resolver } from "react-hook-form";
import {
  AnimatePresence,
  LazyMotion,
  domAnimation,
  m,
  useReducedMotion,
} from "framer-motion";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";

import { WhatsappButton } from "@/components/common/cta-button";
import { ChipGroup } from "@/components/forms/chip-group";
import { FormField } from "@/components/forms/form-field";
import { Button } from "@/components/ui/button";
import { submitLead } from "@/app/actions/submit-lead";
import { trackFormStep, trackFormSubmit } from "@/lib/analytics";
import {
  FORM_BUDGETS,
  FORM_COMPANY_SIZES,
  FORM_SERVICES,
  FORM_TIMELINES,
} from "@/lib/constants";
import {
  STEP_FIELDS,
  validateLead,
  type LeadInput,
} from "@/lib/lead";

/**
 * Resolver artesanal no lugar do `zodResolver`.
 *
 * Motivo medido: importar o resolver do Zod arrastava o Zod inteiro para o
 * bundle do cliente. São 3 campos obrigatórios — validá-los à mão custa 10
 * linhas. O Zod continua validando no servidor, que é onde a validação
 * realmente protege alguma coisa.
 */
const resolver: Resolver<LeadInput> = async (values) => {
  const errors = validateLead(values);
  return Object.keys(errors).length > 0
    ? { values: {}, errors }
    : { values, errors: {} };
};

const STEPS = [
  {
    title: "O que você precisa?",
    subtitle: "Pode marcar mais de um.",
  },
  {
    title: "Sobre o seu projeto",
    subtitle: "Ajuda a gente a preparar uma proposta realista.",
  },
  {
    title: "Onde a gente te responde?",
    subtitle: "Só o essencial. Nada de spam.",
  },
] as const;

/**
 * Formulário multi-step — o principal ativo de conversão da página.
 *
 * Decisões de UX, cada uma com um motivo:
 * - Passos 1 e 2 são 100% clique. Pedir e-mail primeiro é o erro clássico.
 * - Apenas 3 campos obrigatórios (nome, e-mail, WhatsApp). Cada obrigatório
 *   extra derruba a taxa de conclusão.
 * - Validação no blur, não a cada tecla: validar enquanto se digita mostra
 *   erro antes de o usuário terminar, o que é agressivo e aumenta o abandono.
 * - Voltar nunca perde dados — o estado vive no formulário, não no passo.
 * - Sem CAPTCHA: honeypot + tempo mínimo no servidor. CAPTCHA custa
 *   conversão real para barrar spam que dá para barrar de graça.
 */
export function MultiStepForm() {
  const [step, setStep] = React.useState(1);
  const [submitState, setSubmitState] = React.useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = React.useState("");
  const startedAt = React.useRef(Date.now());
  const headingRef = React.useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();

  const {
    register,
    handleSubmit,
    trigger,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useForm<LeadInput>({
    resolver,
    mode: "onBlur",
    // Defaults como string vazia, nunca `undefined`: um campo que nasce
    // indefinido não entra no estado do formulário e some no envio.
    defaultValues: {
      services: [],
      companySize: "",
      timeline: "",
      budget: "",
      name: "",
      email: "",
      phone: "",
      company: "",
      message: "",
      website: "",
    },
  });

  const services = watch("services");
  const companySize = watch("companySize");
  const timeline = watch("timeline");
  const budget = watch("budget");

  /** Alterna um serviço lendo o valor VIVO do formulário.
   *  Usar o `services` da renderização faria dois cliques seguidos lerem o
   *  mesmo array, e o segundo descartaria a escolha do primeiro. */
  function toggleService(option: string) {
    const current = getValues("services") ?? [];
    setValue(
      "services",
      current.includes(option)
        ? current.filter((s) => s !== option)
        : [...current, option],
      { shouldValidate: true, shouldDirty: true },
    );
  }

  /** Campos de escolha única: clicar na opção já ativa desmarca. */
  function selectOne(
    field: "companySize" | "timeline" | "budget",
    option: string,
  ) {
    setValue(field, getValues(field) === option ? "" : option, {
      shouldDirty: true,
    });
  }

  async function goNext() {
    const fields = STEP_FIELDS[step as 1 | 2 | 3];
    const valid = fields.length === 0 || (await trigger(fields));
    if (!valid) return;

    const next = step + 1;
    setStep(next);
    trackFormStep(next);
    // Move o foco para o título do passo: sem isso, quem usa leitor de tela
    // não percebe que o conteúdo mudou.
    requestAnimationFrame(() => headingRef.current?.focus());
  }

  function goBack() {
    setStep((s) => Math.max(1, s - 1));
    requestAnimationFrame(() => headingRef.current?.focus());
  }

  async function onSubmit(data: LeadInput) {
    setSubmitState("loading");
    const result = await submitLead({ ...data, startedAt: startedAt.current });

    if (result.status === "success") {
      trackFormSubmit(data.services);
      setSubmitState("success");
      return;
    }

    setErrorMessage(result.message);
    setSubmitState("error");
  }

  /* --- Estado de sucesso: substitui o card inteiro --------------------- */
  if (submitState === "success") {
    return (
      <div className="gradient-border elev-2 rounded-xl border border-line bg-surface p-8 md:p-10">
        <div className="flex flex-col items-start gap-5">
          <CheckCircle2
            className="size-10 text-success"
            strokeWidth={1.5}
            aria-hidden="true"
          />
          <div role="status">
            <h3 className="text-h3 text-primary">Recebemos sua solicitação.</h3>
            <p className="mt-3 max-w-[46ch] text-body-sm text-muted">
              Você recebe nosso retorno em até 24 horas no WhatsApp informado.
              Se preferir adiantar a conversa, chame a gente por lá.
            </p>
          </div>
          <WhatsappButton source="form_sucesso" className="mt-2" />
        </div>
      </div>
    );
  }

  const isLastStep = step === STEPS.length;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="gradient-border elev-2 rounded-xl border border-line bg-surface p-6 md:p-10"
    >
      {/* Progresso: saber onde está e quanto falta reduz abandono. */}
      <div className="flex items-center gap-2" aria-hidden="true">
        {STEPS.map((_, i) => (
          <div
            key={i}
            className={`h-0.5 flex-1 rounded-full transition-colors duration-300 ${
              i < step ? "bg-accent" : "bg-[rgb(var(--fg-rgb)/0.1)]"
            }`}
          />
        ))}
      </div>

      <p className="mt-6 font-mono text-eyebrow uppercase text-subtle">
        Passo {step} de {STEPS.length}
      </p>

      <p
        ref={headingRef}
        tabIndex={-1}
        className="mt-2 text-h3 text-primary focus:outline-none"
      >
        {STEPS[step - 1].title}
      </p>
      <p className="mt-2 text-body-sm text-subtle">{STEPS[step - 1].subtitle}</p>

      {/* LazyMotion aqui e não no layout: este módulo é o único que usa
          Framer Motion, e ele só é buscado depois da hidratação. Assim o
          motor de animação fica inteiramente fora da primeira carga. */}
      <LazyMotion features={domAnimation} strict>
        <div className="mt-8">
          <AnimatePresence mode="wait" initial={false}>
          <m.div
            key={step}
            initial={reduce ? false : { opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduce ? undefined : { opacity: 0, x: -12 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* --- Passo 1: só clique ---------------------------------- */}
            {step === 1 ? (
              <div className="flex flex-col gap-3">
                <ChipGroup
                  label="Serviços de interesse"
                  options={FORM_SERVICES}
                  value={services ?? []}
                  onToggle={toggleService}
                />
                {errors.services ? (
                  <p role="alert" className="text-caption text-error">
                    {errors.services.message}
                  </p>
                ) : null}
              </div>
            ) : null}

            {/* --- Passo 2: só clique, tudo opcional -------------------- */}
            {step === 2 ? (
              <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-3">
                  <span className="text-caption font-medium text-muted">
                    Porte da empresa
                  </span>
                  <ChipGroup
                    label="Porte da empresa"
                    mode="single"
                    options={FORM_COMPANY_SIZES}
                    value={companySize ? [companySize] : []}
                    onToggle={(o) => selectOne("companySize", o)}
                  />
                </div>

                <div className="flex flex-col gap-3">
                  <span className="text-caption font-medium text-muted">
                    Quando pretende começar
                  </span>
                  <ChipGroup
                    label="Prazo desejado"
                    mode="single"
                    options={FORM_TIMELINES}
                    value={timeline ? [timeline] : []}
                    onToggle={(o) => selectOne("timeline", o)}
                  />
                </div>

                <div className="flex flex-col gap-3">
                  <span className="text-caption font-medium text-muted">
                    Faixa de investimento
                  </span>
                  <ChipGroup
                    label="Faixa de investimento"
                    mode="single"
                    options={FORM_BUDGETS}
                    value={budget ? [budget] : []}
                    onToggle={(o) => selectOne("budget", o)}
                  />
                </div>
              </div>
            ) : null}

            {/* --- Passo 3: os únicos campos de digitação --------------- */}
            {step === 3 ? (
              <div className="flex flex-col gap-5">
                <FormField
                  id="name"
                  label="Nome"
                  required
                  autoComplete="name"
                  placeholder="Como podemos te chamar"
                  error={errors.name?.message}
                  {...register("name")}
                />
                <FormField
                  id="email"
                  label="E-mail"
                  required
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  placeholder="voce@empresa.com.br"
                  error={errors.email?.message}
                  {...register("email")}
                />
                <FormField
                  id="phone"
                  label="WhatsApp"
                  required
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="(11) 98888-7777"
                  error={errors.phone?.message}
                  {...register("phone")}
                />
                <FormField
                  id="company"
                  label="Empresa"
                  autoComplete="organization"
                  placeholder="Nome da sua empresa"
                  error={errors.company?.message}
                  {...register("company")}
                />
                <FormField
                  id="message"
                  label="Mensagem"
                  multiline
                  placeholder="Conte rapidamente o que você precisa"
                  error={errors.message?.message}
                  {...register("message")}
                />

                {/* Honeypot: invisível para humanos, irresistível para bots.
                    aria-hidden + tabIndex mantém leitores de tela fora dele. */}
                <div
                  aria-hidden="true"
                  className="absolute left-[-9999px] h-0 w-0 overflow-hidden"
                >
                  <label htmlFor="website">Não preencha este campo</label>
                  <input
                    id="website"
                    tabIndex={-1}
                    autoComplete="off"
                    {...register("website")}
                  />
                </div>
              </div>
            ) : null}
            </m.div>
          </AnimatePresence>
        </div>
      </LazyMotion>

      {submitState === "error" ? (
        <div
          role="alert"
          className="mt-6 rounded-md border border-error/30 bg-error/5 p-4"
        >
          <p className="text-body-sm text-error">{errorMessage}</p>
          <WhatsappButton
            source="form_erro"
            variant="ghost"
            size="sm"
            className="mt-2 px-0"
            label="Falar no WhatsApp"
          />
        </div>
      ) : null}

      <div className="mt-8 flex items-center gap-3">
        {step > 1 ? (
          <Button
            type="button"
            variant="secondary"
            onClick={goBack}
            disabled={submitState === "loading"}
          >
            <ArrowLeft aria-hidden="true" />
            Voltar
          </Button>
        ) : null}

        {isLastStep ? (
          <Button
            type="submit"
            className="flex-1"
            loading={submitState === "loading"}
          >
            Enviar
            <ArrowRight aria-hidden="true" />
          </Button>
        ) : (
          <Button type="button" onClick={goNext} className="flex-1">
            Continuar
            <ArrowRight aria-hidden="true" />
          </Button>
        )}
      </div>
    </form>
  );
}

import type { IconKey } from "@/lib/icons";

/**
 * Todo o conteúdo textual da home vive aqui — nunca hardcoded no JSX.
 *
 * Motivo: permite reordenar seções, reaproveitar o mesmo conteúdo nas páginas
 * internas (/servicos, /servicos/[slug], /contato) e migrar para um CMS depois
 * sem reescrever um único componente.
 */

/* ==========================================================================
   Navegação
   ========================================================================== */

export const NAV_LINKS = [
  { label: "Serviços", href: "#servicos" },
  { label: "Como trabalhamos", href: "#processo" },
  { label: "Perguntas frequentes", href: "#faq" },
] as const;

/* ==========================================================================
   Hero
   ========================================================================== */

export const HERO = {
  eyebrow: "Marketing digital + Desenvolvimento",
  /** Duas frases curtas: comunicam os dois lados do negócio e permitem
   *  quebra de linha natural com peso visual equilibrado. */
  title: ["A tecnologia que sua empresa precisa.", "E o público que vai usar ela."],
  description:
    "Somos a MarkePro: desenvolvemos sites, sistemas, chatbots com IA e automações — e cuidamos do tráfego, do SEO e da marca que trazem clientes até eles. Um time só, um responsável só.",
  /** Responde às três objeções que surgem no instante do clique no CTA:
   *  "vão demorar?", "vão me perseguir?", "vai virar orçamento aberto?" */
  microcopy: [
    "Resposta em até 24h",
    "Sem compromisso",
    "Escopo e valor fechados antes de começar",
  ],
} as const;

/* ==========================================================================
   Faixa de garantias — substitui a faixa de logos de clientes.
   É o slot de maior valor depois do hero; deixá-lo vazio enfraqueceria tudo
   abaixo. Cada item é um compromisso operacional verificável.
   ========================================================================== */

export const GUARANTEES: { icon: IconKey; text: string }[] = [
  { icon: "fileCheck", text: "Escopo e preço fechados antes de iniciar" },
  { icon: "calendar", text: "Entregas revisadas toda semana" },
  { icon: "unlock", text: "Código-fonte é seu, sem aprisionamento" },
  { icon: "message", text: "Canal direto com quem executa" },
];

/* ==========================================================================
   Serviços — agrupados em dois pilares.
   A divisão em duas frentes *é* a mensagem de posicionamento: agrupar
   comunica amplitude sem achatar o diferencial numa grade de 9 cards iguais.
   ========================================================================== */

export type Service = {
  /** Nome completo e buscável — vai para o <h3>, importa para SEO. */
  title: string;
  description: string;
  icon: IconKey;
};

export const SERVICE_PILLARS: {
  id: string;
  label: string;
  description: string;
  services: Service[];
}[] = [
  {
    id: "tecnologia",
    label: "Tecnologia",
    description: "Construímos o que sua empresa precisa para operar e vender.",
    services: [
      {
        title: "Criação de sites institucionais",
        description: "Presença digital rápida, indexável e fácil de atualizar.",
        icon: "globe",
      },
      {
        title: "Landing pages de alta conversão",
        description: "Páginas desenhadas para uma única ação, sem distração.",
        icon: "pointer",
      },
      {
        /** Encurtado de "Desenvolvimento de sistemas web personalizados"
         *  para caber numa única linha no card. */
        title: "Sistemas web personalizados",
        description: "Software sob medida para o processo real da sua empresa.",
        icon: "boxes",
      },
    ],
  },
  {
    id: "marketing",
    label: "Marketing",
    description: "Trazemos as pessoas certas até o que construímos.",
    services: [
      {
        title: "Marketing digital para empresas",
        description: "Estratégia e execução de aquisição ponta a ponta.",
        icon: "megaphone",
      },
      {
        title: "Gestão de tráfego pago",
        description: "Meta e Google Ads com verba medida por retorno, não por alcance.",
        icon: "target",
      },
      {
        title: "SEO",
        description: "Ser encontrado por quem já está procurando o que você vende.",
        icon: "search",
      },
    ],
  },
];

export const SERVICES_SECTION = {
  eyebrow: "O que fazemos",
  title: "Duas frentes. Um time só.",
  /** Remove a pressão de contratar tudo (objeção clássica a full-service)
   *  e ao mesmo tempo planta a expansão futura de contrato. */
  description:
    "Você escolhe o que precisa agora — e tem o resto disponível quando precisar.",
  ctaLabel: "Não sabe por onde começar?",
} as const;

/* ==========================================================================
   Diferenciais (bento)
   ========================================================================== */

export const DIFFERENTIATORS = {
  eyebrow: "Por que a MarkePro",
  title: "O que muda quando tudo está no mesmo lugar",
  items: [
    {
      id: "time",
      title: "Um time para os dois lados",
      description:
        "Quem constrói a página conversa todo dia com quem gerencia os anúncios. Nada se perde na tradução, e não existe fornecedor culpando fornecedor.",
      icon: "handshake" as IconKey,
      span: "lg" as const,
    },
    {
      id: "stack",
      title: "Stack moderno de verdade",
      description:
        "Next.js, React e TypeScript. Sem construtor visual, sem template genérico, sem site que trava. Performance é requisito, não bônus.",
      icon: "layers" as IconKey,
      span: "sm" as const,
    },
    {
      id: "ia",
      title: "IA que resolve",
      description:
        "Chatbots que entendem contexto e qualificam lead sozinhos. Automações que eliminam trabalho manual de verdade.",
      icon: "sparkles" as IconKey,
      span: "sm" as const,
    },
    {
      id: "transparencia",
      title: "Transparência total",
      description:
        "Escopo e valor fechados antes de começar. Entregas revisadas toda semana. O código e as contas são seus, sempre.",
      icon: "fileCheck" as IconKey,
      span: "lg" as const,
    },
  ],
} as const;

/* ==========================================================================
   Processo — o substituto direto da seção de cases.
   Sem histórico, previsibilidade é o ativo de credibilidade disponível.
   ========================================================================== */

export const PROCESS = {
  eyebrow: "Como trabalhamos",
  title: "Você sabe exatamente o que vai acontecer",
  description:
    "Nenhuma etapa começa sem a sua aprovação da anterior. Sem surpresa no meio do caminho.",
  steps: [
    {
      number: "01",
      title: "Diagnóstico",
      description:
        "Conversa de 30 minutos para entender seu objetivo, seu contexto e suas restrições reais.",
      meta: "Em até 24h do seu contato",
    },
    {
      number: "02",
      title: "Proposta e escopo",
      description:
        "Documento com entregáveis, prazo e valor fechados. O que está escrito é o que será cobrado.",
      meta: "Até 3 dias úteis",
    },
    {
      number: "03",
      title: "Execução com entregas semanais",
      description:
        "Você acompanha o progresso toda semana e aprova cada etapa antes da seguinte começar.",
      meta: "Conforme o escopo",
    },
    {
      number: "04",
      title: "Entrega, medição e suporte",
      description:
        "Publicação, rastreamento configurado, código entregue e acompanhamento depois do lançamento.",
      meta: "Contínuo",
    },
  ],
  /** Admitir a novidade ANTES que o visitante a descubra converte uma
   *  fraqueza em sinal de honestidade — e transforma a objeção em escassez
   *  legítima. Esconder e ser pego depois custa o negócio inteiro. */
  transparency: {
    title: "Somos uma operação nova — e trabalhamos de um jeito que isso não seja risco pra você.",
    body: "Escopo e valor fechados antes de começar. Entregas revisadas toda semana, com sua aprovação a cada etapa. Se algo não fizer sentido, você percebe na primeira semana, não no final do projeto.",
    highlight:
      "Nossos primeiros clientes entram em condição de fundador, com preço diferenciado e acompanhamento próximo.",
  },
} as const;

/* ==========================================================================
   FAQ
   ========================================================================== */

export const FAQ = {
  eyebrow: "Perguntas frequentes",
  title: "Antes de você perguntar",
  items: [
    {
      question: "Quanto custa um projeto com a MarkePro?",
      /** ⚠️ PENDENTE: substituir pelas faixas reais definidas com o cliente.
       *  Não remover os valores — fugir do preço é a principal causa de
       *  abandono em página de agência: o visitante presume "caro demais". */
      answer:
        "Landing pages começam em R$ 2.500. Sites institucionais, em R$ 4.500. Sistemas web e automações são orçados por escopo, a partir de R$ 12.000. Gestão de tráfego e SEO funcionam por mensalidade, a partir de R$ 1.500. O diagnóstico e a proposta são sempre gratuitos, e o valor é fechado antes de qualquer trabalho começar.",
    },
    {
      question: "Quanto tempo leva para ficar pronto?",
      /** ⚠️ PENDENTE: confirmar prazos médios reais com o cliente. */
      answer:
        "Uma landing page leva de 1 a 2 semanas. Um site institucional, de 3 a 5 semanas. Sistemas sob medida dependem do escopo, e o prazo é fechado na proposta — junto com o valor. Tráfego pago e SEO começam a rodar na primeira semana, mas resultado consistente aparece a partir do segundo mês.",
    },
    {
      question: "Vocês fazem só marketing, só desenvolvimento, ou os dois juntos?",
      answer:
        "Os dois, juntos ou separados. Você pode contratar apenas um site ou apenas a gestão de tráfego, sem problema. Mas o melhor resultado aparece quando as duas frentes conversam — porque aí a página é construída pensando no tráfego que vai receber, e a campanha é construída sabendo exatamente como a página converte.",
    },
    {
      question: "Já tenho site. Vocês trabalham em cima do que existe?",
      answer:
        "Sim. Avaliamos o que você já tem e dizemos com honestidade se vale a pena melhorar ou refazer. Se der para aproveitar, aproveitamos — refazer do zero nem sempre é a resposta certa, e não vamos vender isso se não for.",
    },
    {
      question: "A MarkePro é uma agência nova. Por que eu deveria confiar?",
      /** Esta pergunta DEVE existir na FAQ: se não estiver, o visitante a faz
       *  mentalmente e fica sem resposta — objeção não respondida vira lead
       *  perdido no formulário. */
      answer:
        "Somos novos e não escondemos isso. Por isso assumimos o risco no nosso lado: escopo e valor fechados antes de começar, entregas revisadas toda semana e sua aprovação a cada etapa. Você não precisa confiar às cegas — você acompanha o trabalho desde a primeira semana. E este site que você está navegando foi feito por nós: é a amostra mais direta do nosso padrão.",
    },
    {
      question: "O que acontece depois da entrega? Tem suporte?",
      answer:
        "Todo projeto sai com 30 dias de suporte para ajustes e correções. Depois disso, você pode seguir sozinho — o código é seu e é documentado — ou contratar manutenção mensal, que inclui atualizações, monitoramento e pequenas evoluções.",
    },
    {
      question: "O código e as contas de anúncio ficam comigo?",
      answer:
        "Sempre. O repositório de código, o domínio, a hospedagem e as contas de anúncio ficam no seu nome, com você como administrador. Não trabalhamos com aprisionamento: se um dia quiser trocar de fornecedor, leva tudo com você.",
    },
    {
      question: "Vocês atendem empresas de outras cidades?",
      answer:
        "Sim, atendemos todo o Brasil de forma remota. Reuniões por vídeo, acompanhamento por WhatsApp e entregas semanais funcionam igual para quem está do lado ou do outro lado do país.",
    },
  ],
} as const;

/* ==========================================================================
   CTA final + formulário
   ========================================================================== */

export const CTA_SECTION = {
  eyebrow: "Vamos conversar",
  title: "Vamos entender o seu caso?",
  description:
    "Conte o que você precisa. Em até 24h a gente responde com um diagnóstico e um caminho — sem custo e sem compromisso.",
  reassurances: [
    "Resposta em até 24 horas",
    "Diagnóstico e proposta sem custo",
    "Sem compromisso de contratação",
  ],
} as const;

/* --- Opções do formulário (passo 1 e 2) ----------------------------------- */

/** Passo 1 é 100% clique, zero digitação: quem clica uma vez tende a
 *  terminar. Pedir e-mail primeiro é o erro clássico que mata a conclusão. */
export const FORM_SERVICES = [
  "Site institucional",
  "Landing page",
  "Sistema web",
  "Chatbot com IA",
  "Automação de processos",
  "Tráfego pago",
  "SEO",
  "Branding",
  "Ainda não sei",
] as const;

export const FORM_COMPANY_SIZES = [
  "Sou autônomo",
  "2 a 10 pessoas",
  "11 a 50 pessoas",
  "Mais de 50 pessoas",
] as const;

export const FORM_TIMELINES = [
  "O quanto antes",
  "Nos próximos 30 dias",
  "Em 2 a 3 meses",
  "Ainda estou pesquisando",
] as const;

/** ⚠️ PENDENTE: alinhar as faixas com a tabela de preços real. */
export const FORM_BUDGETS = [
  "Até R$ 5 mil",
  "R$ 5 a 15 mil",
  "R$ 15 a 40 mil",
  "Acima de R$ 40 mil",
  "Prefiro não informar",
] as const;

/* ==========================================================================
   Footer
   ========================================================================== */

export const FOOTER_LINKS = {
  servicos: {
    title: "Serviços",
    links: [
      { label: "Sites institucionais", href: "#servicos" },
      { label: "Landing pages", href: "#servicos" },
      { label: "Sistemas web", href: "#servicos" },
      { label: "Marketing digital", href: "#servicos" },
      { label: "Tráfego pago", href: "#servicos" },
      { label: "SEO", href: "#servicos" },
    ],
  },
  empresa: {
    title: "Empresa",
    links: [
      { label: "Como trabalhamos", href: "#processo" },
      { label: "Perguntas frequentes", href: "#faq" },
      { label: "Fale com a gente", href: "#contato" },
    ],
  },
} as const;

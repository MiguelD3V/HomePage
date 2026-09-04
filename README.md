# MarkePro — Home Page

Home page da MarkePro, agência que une marketing digital e desenvolvimento de software.

Stack: **Next.js 16** (App Router) · **React 19** · **TypeScript** · **Tailwind CSS v4** · **Framer Motion** · **Lucide React** · **React Hook Form** · primitivos no estilo **shadcn/ui** sobre Radix.

---

## Rodando

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # gera export estático em out/
npm start        # serve out/ localmente, para conferir o export
```

Build gera export estático puro (`output: "export"` em `next.config.mjs`): a pasta `out/` sai pronta para subir em qualquer hospedagem de arquivos estáticos, sem precisar de Node rodando no servidor.

---

## ⚠️ Antes de publicar

Estes itens estão preenchidos com **valores de exemplo** e precisam ser trocados. Todos estão marcados com `⚠️ PENDENTE` no código.

| Onde | O que trocar |
|---|---|
| [lib/site.ts](lib/site.ts) | Domínio, e-mail, cidade/UF, **CNPJ** (WhatsApp e Instagram já atualizados; LinkedIn removido do footer) |
| [lib/constants.ts](lib/constants.ts) | **Faixas de preço** e **prazos** na FAQ (perguntas 1 e 2) |
| [lib/constants.ts](lib/constants.ts) | `FORM_BUDGETS` — alinhar com a tabela de preços real |
| [components/layout/logo.tsx](components/layout/logo.tsx) | Wordmark tipográfico → SVG da identidade visual |

**Sobre os preços:** eles estão na FAQ de propósito. Fugir do preço é a principal causa de abandono em página de agência — o visitante presume "caro demais" e sai. Troque os números, não remova a resposta.

### Envio de leads

O formulário multi-step não fala com nenhum servidor: ao enviar, ele monta a mensagem com os dados preenchidos e abre o WhatsApp (`https://wa.me/...`) já com o texto pronto para o visitante conferir e mandar. O número usado é `site.whatsapp` em [lib/site.ts](lib/site.ts). Não há `.env` a configurar para isso — a antiga integração por e-mail (Resend) foi removida.

---

## Estrutura

```
app/
  layout.tsx            metadata, fontes, JSON-LD, skip link
  page.tsx              composição das 7 seções
  globals.css           tokens do design system + utilitários
  sitemap.ts · robots.ts · opengraph-image.tsx
components/
  ui/                   primitivos (Button, Input, Accordion, Sheet, Badge…)
  common/               SectionHeader, Reveal, cards, backgrounds, CTAs
  layout/               Navbar, Footer, elementos flutuantes
  sections/             uma por seção da home
  forms/                MultiStepForm, ChipGroup, FormField
lib/
  constants.ts          TODO o conteúdo textual
  site.ts               dados institucionais
  lead.ts               tipos + validação de cliente
  icons.ts              registro de ícones por chave string
```

**Regra:** nenhum texto fica hardcoded no JSX. Tudo vive em `lib/constants.ts`, o que permite reordenar seções, reaproveitar conteúdo nas páginas internas e migrar para um CMS depois sem tocar em componente.

---

## Design system

Paleta **monocromática**, alternando telas pretas e brancas ao longo da página (dark-only foi a versão anterior — ver decisão abaixo). A hierarquia é construída por contraste tonal, escala e espaço — não por cor.

**A regra que faz o sistema funcionar:** em cada tela, o preenchimento sólido na cor de maior contraste é exclusivo do CTA primário — branco sobre preto numa seção escura, preto sobre branco numa clara. Usar esse preenchimento em qualquer outro elemento colapsa a hierarquia.

Única exceção à monocromia: as cores de validação do formulário (`--color-error`, `--color-success`), sempre acompanhadas de ícone e texto — cor nunca é o único indicador.

Tokens em [app/globals.css](app/globals.css).

---

## Decisões que valem conhecer antes de mexer

**A página alterna telas pretas e brancas.** A versão inicial era inteiramente preta; ficou repetitiva ao rolar a página inteira. `<Section tone="light" | "dark">` ([components/common/section.tsx](components/common/section.tsx)) escopa os tokens de cor via `data-tone` — todo componente filho (Card, Badge, Button, o formulário inteiro) já lê a cor certa sem saber em qual tom está. Sequência atual: Hero+Garantias (escuro) → Serviços (claro) → Diferenciais (escuro) → Processo (claro) → Faq (escuro) → Cta final (claro). Navbar, Footer e os elementos flutuantes (WhatsApp, sticky mobile) ficam fora de qualquer `Section` e continuam sempre escuros — chrome de marca não alterna. Toda tela de conteúdo carrega seu próprio CTA (`CtaButton source="..."`), para o visitante nunca precisar rolar até o fim só para converter.

**Sem cases, a seção de cases virou seção de processo.** A MarkePro não tem clientes ainda. Logos falsos ou métricas inventadas são o erro que mata agências novas quando descoberto. O substituto é previsibilidade — escopo fechado, entregas semanais, código entregue — e a novidade da empresa é admitida abertamente na FAQ e no fim do Processo. Quando existirem 3 cases reais, `<Cases />` entra logo depois do Processo (marcado com comentário em [app/page.tsx](app/page.tsx)), em tom claro para manter a alternância.

**As seções de Problema e de Stack técnico foram removidas.** Deixavam a página mais longa e repetitiva sem aumentar a conversão. O argumento de "por que os dois juntos" que a seção de Problema carregava já está coberto por Diferenciais; a prova de competência técnica que a Stack carregava (Lighthouse, tecnologias) pode voltar como um bloco pequeno dentro de outra seção se fizer falta — não precisa da seção própria.

**Framer Motion está fora do bundle de primeira carga.** O `<Reveal>` aparece ~30 vezes na home; implementado com Framer Motion, ele sozinho puxava o motor de animação (~55 KB gzip) para fazer um fade-and-rise que o CSS faz nativamente. O Framer Motion continua no projeto, mas só nas transições entre passos do formulário — que carregam sob demanda.

**Zod não vai para o cliente.** `zodResolver` arrastava o Zod inteiro para o bundle. São 3 campos obrigatórios: [lib/lead.ts](lib/lead.ts) valida à mão no cliente, [lib/schemas.ts](lib/schemas.ts) valida com Zod no servidor. Um teste de tipo garante que os dois não saiam de sincronia.

**O formulário carrega sob demanda.** É a última seção da página, mas seu JS entrava no first-load e atrasava a interatividade do topo. Ver [components/forms/lazy-form.tsx](components/forms/lazy-form.tsx).

**Chips leem o valor vivo do formulário, não o do render.** Dois cliques rápidos na seleção múltipla liam o mesmo array e o segundo descartava o primeiro. `getValues()` em vez do valor observado resolve — ver `toggleService` em [components/forms/multi-step-form.tsx](components/forms/multi-step-form.tsx).

**Os dois painéis de Serviços ficam montados no DOM** (`forceMount` no Radix Tabs). Os 9 serviços precisam ser rastreáveis mesmo com só um pilar visível.

---

## Verificado

Testado com Chrome headless via CDP contra o build de produção:

- Build de produção limpo; todas as rotas estáticas
- Estrutura de headings: 1 `h1`, 8 `h2`, 23 `h3`, sem níveis pulados
- Os 6 serviços em destaque (3 Tecnologia + 3 Marketing) presentes no HTML do servidor, cada pilar em uma única linha de 3 colunas no desktop — sem card órfão numa segunda linha
- Troca de aba Tecnologia/Marketing testada com clique de mouse real (via CDP), não só `.click()` sintético — o Radix Tabs ativa no pointerdown, não no evento `click`
- Zero scroll horizontal em 320 / 360 / 390 / 768 / 1024 / 1440 / 1920px, com as seções claras e escuras alternadas
- Formulário ponta a ponta **no card claro**: bloqueio sem seleção, seleção múltipla íntegra, passo 2 persistido, Voltar preserva dados, validação de e-mail e telefone (contraste de erro conferido sobre fundo branco), envio entregue ao webhook
- Os dois CTAs novos (Diferenciais e Faq, seções escuras) renderizam com a inversão de contraste correta — fundo branco sólido, texto preto
- Acordeão da FAQ abre; menu mobile abre com foco preso no dialog
- Ordem de tabulação correta, começando pelo skip link
- Nenhuma exceção de JavaScript

**Não verificado ainda** (precisa de ambiente real): Lighthouse com throttling, Core Web Vitals de campo, leitor de tela, Safari/iOS, rich results no Google.

### Orçamento de JavaScript

First-load: **~210 KB gzip**, dos quais ~150 KB são baseline de React 19 + Next 16. O plano original mirava 120 KB, número escrito para Next 15 — não é alcançável nesta versão. O código da aplicação em si é ~60 KB gzip.

Se precisar cortar mais: trocar o `Accordion` do Radix por `<details>/<summary>` nativo economiza ~10 KB **e** faz a FAQ funcionar sem JavaScript.

---

## Analytics

[lib/analytics.ts](lib/analytics.ts) já expõe os eventos (`cta_click` com origem, `form_step`, `form_submit`, `whatsapp_click`). Falta apenas carregar GA4 e Meta Pixel via `@next/third-parties`, com `strategy="afterInteractive"` — nenhum script de terceiro pode bloquear a renderização.

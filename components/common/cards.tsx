import * as React from "react";

import { icons, type IconKey } from "@/lib/icons";
import { cn } from "@/lib/utils";

/** Resolve a chave de ícone para o componente Lucide.
 *  strokeWidth 1.5 em todos: o default de 2px é pesado demais para o visual. */
export function Icon({
  name,
  className,
  size = 20,
}: {
  name: IconKey;
  className?: string;
  size?: number;
}) {
  const Cmp = icons[name];
  return (
    <Cmp
      className={className}
      size={size}
      strokeWidth={1.5}
      aria-hidden="true"
    />
  );
}

/**
 * Contêiner do ícone.
 *
 * Um ícone solto num card grande fica órfão — sem peso visual e sem âncora.
 * Dentro de um quadro com borda ele vira um elemento do sistema, e ganha um
 * estado de hover próprio que reforça que o card inteiro é uma unidade.
 */
export function IconTile({
  name,
  size = 20,
  className,
}: {
  name: IconKey;
  size?: number;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center rounded-md border border-line",
        "bg-[rgb(var(--fg-rgb)/0.03)] text-subtle",
        "transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
        "group-hover:border-line-strong group-hover:bg-[rgb(var(--fg-rgb)/0.07)] group-hover:text-primary",
        className,
      )}
    >
      <Icon name={name} size={size} />
    </div>
  );
}

/**
 * Card padrão do sistema.
 *
 * Hover move 2px — o bastante para ser sentido, discreto o bastante para não
 * parecer brincadeira. Profundidade vem de borda + brilho superior (elev-1),
 * porque sombra projetada some em fundo preto.
 *
 * `data-spotlight` marca o card como alvo do holofote que segue o cursor —
 * quem escreve as coordenadas é o <SpotlightGroup> que envolve a grade. O
 * card não sabe da existência do mouse; só declara que aceita o efeito.
 */
export function Card({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-spotlight=""
      className={cn(
        "elev-1 spotlight group relative rounded-lg border border-line bg-surface p-6",
        "transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
        "hover:-translate-y-1 hover:border-line-strong hover:bg-surface-hover hover:elev-hover",
        className,
      )}
      {...props}
    />
  );
}

/** Card de serviço. Sem botão interno: 9 botões competindo destruiriam a
 *  hierarquia da página. O card inteiro vira link quando houver /servicos/[slug]. */
export function ServiceCard({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: IconKey;
}) {
  return (
    <Card className="flex h-full flex-col">
      <IconTile name={icon} className="size-10" />
      <h3 className="mt-5 text-h4 text-primary">{title}</h3>
      <p className="mt-2 text-body-sm text-muted">{description}</p>

      {/* Régua que cresce da esquerda no hover: fecha o card com um sinal de
          fim de bloco e dá ao conjunto um estado ativo perceptível mesmo
          quando o cursor está sobre o texto, longe do ícone.
          O espaçamento vive no wrapper — `pt` no próprio traço pintaria a
          faixa inteira, já que o fundo cobre a caixa de padding. */}
      <div aria-hidden="true" className="mt-auto pt-6">
        <span className="block h-px w-full origin-left scale-x-0 bg-gradient-to-r from-line-strong to-transparent transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100" />
      </div>
    </Card>
  );
}

/** Bloco do bento. A assimetria (col-span) é controlada pelo wrapper na
 *  seção, não aqui — assim o card serve a qualquer arranjo de grid. */
export function BentoCard({
  title,
  description,
  icon,
  featured = false,
}: {
  title: string;
  description: string;
  icon: IconKey;
  featured?: boolean;
}) {
  return (
    <Card
      className={cn(
        "flex h-full flex-col p-8",
        // Borda cônica animada: assinatura visual da página, UM elemento só.
        // Ela é o que diferencia o argumento central dos outros três.
        featured && "gradient-border-anim",
      )}
    >
      <IconTile name={icon} size={24} className="size-12" />
      <h3 className="mt-6 text-h3 text-primary">{title}</h3>
      <p className="mt-3 max-w-[46ch] text-body-sm text-muted">{description}</p>
    </Card>
  );
}

/** Etapa do processo. No desktop, a linha vertical conecta as etapas; a
 *  última não desenha a linha para não sobrar um traço solto. */
export function ProcessStep({
  number,
  title,
  description,
  meta,
  isLast = false,
}: {
  number: string;
  title: string;
  description: string;
  meta: string;
  isLast?: boolean;
}) {
  return (
    <div className="group relative flex gap-6 pb-12 last:pb-0 md:gap-8">
      {/* Marcador + linha conectora */}
      <div className="flex flex-col items-center">
        {/* O anel expande no hover a partir do marcador. `ring` não altera
            layout, então nada empurra o texto ao lado. */}
        <div className="elev-1 flex size-11 shrink-0 items-center justify-center rounded-full border border-line-strong bg-surface font-mono text-caption text-primary ring-0 ring-[rgb(var(--fg-rgb)/0.08)] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:ring-6 tabular">
          {number}
        </div>
        {!isLast ? (
          <div
            aria-hidden="true"
            className="timeline-fill mt-2 w-px flex-1 bg-gradient-to-b from-line-strong to-transparent"
          />
        ) : null}
      </div>

      <div className="pt-1.5">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h3 className="text-h4 text-primary">{title}</h3>
          <span className="font-mono text-eyebrow uppercase text-subtle">
            {meta}
          </span>
        </div>
        <p className="mt-2 max-w-[54ch] text-body-sm text-muted">
          {description}
        </p>
      </div>
    </div>
  );
}

/** Estatística. tabular-nums evita que os números "dancem" no alinhamento. */
export function StatItem({
  value,
  suffix,
  label,
}: {
  value: string;
  suffix?: string;
  label: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="text-h2 text-primary tabular">
        {value}
        {suffix ? <span className="text-subtle">{suffix}</span> : null}
      </div>
      <p className="max-w-[24ch] text-body-sm text-muted">{label}</p>
    </div>
  );
}

/** Item de garantia / benefício com ícone. Reusado na faixa de garantias,
 *  nas listas de reforço do CTA e no footer. */
export function IconFeature({
  icon,
  text,
  className,
}: {
  icon: IconKey;
  text: string;
  className?: string;
}) {
  return (
    <div className={cn("flex items-start gap-3", className)}>
      <Icon name={icon} className="mt-0.5 shrink-0 text-subtle" size={18} />
      <span className="text-body-sm text-muted">{text}</span>
    </div>
  );
}

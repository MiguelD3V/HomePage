import * as React from "react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  /** id aplicado ao heading — deve casar com o `labelledBy` da <Section>. */
  id?: string;
  align?: "left" | "center";
  as?: "h2" | "h3";
  className?: string;
};

/**
 * O componente mais reutilizado do site: toda seção de toda página usa este.
 *
 * Alternar entre `left` e `center` entre seções cria ritmo — se tudo for
 * centralizado, a página fica monótona e perde a leitura de "editorial".
 */
export function SectionHeader({
  eyebrow,
  title,
  description,
  id,
  align = "left",
  as: Heading = "h2",
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {/* w-fit é obrigatório: num container flex-col o padrão é `stretch`,
          o que faria o badge ocupar a largura inteira da coluna. */}
      {eyebrow ? <Badge className="mb-6 w-fit">{eyebrow}</Badge> : null}

      <Heading id={id} className="text-h2 max-w-[20ch]">
        {title}
      </Heading>

      {description ? (
        <p className="mt-5 max-w-[52ch] text-body-lg text-muted">
          {description}
        </p>
      ) : null}
    </div>
  );
}

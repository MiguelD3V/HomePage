import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Marca: apenas o monograma, sem wordmark.
 *
 * O glifo é uma máscara CSS pintada com currentColor (ver `logo-mark` em
 * globals.css), e não um <img>. Motivo: o arquivo é um glifo branco, e a
 * página alterna seções escuras e claras — como <img> ele sumiria em
 * qualquer seção clara. Como máscara, herda a cor do texto e inverte junto
 * com o tom, igual a todo o resto do sistema.
 *
 * `role="img"` + aria-label não são decoração: sem o wordmark, este
 * elemento é a única identificação da marca no footer e no menu mobile
 * (só a navbar embrulha a logo num link com rótulo próprio). Sem o rótulo
 * aqui, esses dois pontos ficariam mudos para leitores de tela.
 *
 * A proporção 1.62:1 vem do recorte real do glifo, não é arbitrária: h-6
 * (24px) resulta em 38.9px de largura, daí o w-10 (40px). `mask-size:
 * contain` garante que a marca nunca distorça se as duas divergirem.
 *
 * NOTA: a fonte é raster (PNG 512px). Funciona bem porque a marca é usada
 * pequena, mas um SVG seria menor e nítido em qualquer tamanho — vale a
 * troca quando houver o vetor original.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <span
      role="img"
      aria-label={site.name}
      className={cn("logo-mark block h-6 w-10 shrink-0 text-primary", className)}
    />
  );
}

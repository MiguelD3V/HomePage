import fs from "node:fs";
import path from "node:path";
import { ImageResponse } from "next/og";

import { site } from "@/lib/site";

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * O monograma entra embutido em base64: esta imagem é gerada no build, e o
 * renderizador não tem servidor de onde buscar `/logo-mark.png`. O arquivo
 * é o glifo branco sobre transparência, que cai direto sobre o fundo preto
 * sem precisar de máscara.
 */
const mark = `data:image/png;base64,${fs
  .readFileSync(path.join(process.cwd(), "public", "logo-mark.png"))
  .toString("base64")}`;

/**
 * Imagem de compartilhamento gerada no build.
 *
 * Fundo preto com o lockup da marca — coerente com a paleta do site. Um
 * preview genérico ou quebrado é a primeira impressão em todo link
 * compartilhado, então vale o esforço de gerar um próprio.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#000000",
          padding: 80,
          fontFamily: "sans-serif",
        }}
      >
        {/* Só o monograma, como no site. Maior do que era no lockup: sozinho
            num canvas de 1200x630, o tamanho anterior ficava perdido no
            canto. Dimensões na proporção real do glifo (1.62:1). */}
        <div style={{ display: "flex" }}>
          <img src={mark} width={91} height={56} alt="" />
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 24,
          }}
        >
          <div
            style={{
              fontSize: 68,
              fontWeight: 600,
              letterSpacing: "-0.045em",
              lineHeight: 1.05,
              color: "#FAFAFA",
              maxWidth: 900,
            }}
          >
            A tecnologia que sua empresa precisa.
          </div>
          <div style={{ fontSize: 30, color: "#71717A" }}>
            E o público que vai usar ela.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 22,
            color: "#71717A",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          Marketing digital + Desenvolvimento
        </div>
      </div>
    ),
    size,
  );
}

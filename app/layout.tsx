import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { jsonLd } from "@/lib/structured-data";
import { site } from "@/lib/site";

import "./globals.css";

export const metadata: Metadata = {
  // Sem metadataBase as URLs de OG saem relativas e quebram no compartilhamento.
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Marketing Digital e Desenvolvimento de Software`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    "agência de marketing digital",
    "desenvolvimento de software para empresas",
    "criação de sites profissionais",
    "agência de marketing e tecnologia",
    "landing page de alta conversão",
    "desenvolvimento de sistemas web",
    "chatbot com inteligência artificial",
    "automação de processos empresariais",
    "gestão de tráfego pago",
    "consultoria de SEO",
    "branding e identidade visual",
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: site.url,
    siteName: site.name,
    title: `${site.name} | Marketing Digital e Desenvolvimento de Software`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | Marketing Digital e Desenvolvimento de Software`,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-BR"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          // Conteúdo estático gerado por nós, não entrada de usuário.
          dangerouslySetInnerHTML={{ __html: jsonLd() }}
        />
        {/* Sem JS, o estado inicial do <Reveal> deixaria os blocos animados
            invisíveis. Esta regra garante que todo o conteúdo seja legível.
            `filter` entra junto: a entrada usa blur-out, e sem zerá-lo aqui
            o conteúdo apareceria visível porém borrado. */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important;filter:none!important}`}</style>
        </noscript>
      </head>
      <body className="antialiased">
        <a
          href="#conteudo"
          className="sr-only rounded-md bg-accent px-4 py-2 text-inverse focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50"
        >
          Pular para o conteúdo
        </a>

        <Navbar />
        <main id="conteudo">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

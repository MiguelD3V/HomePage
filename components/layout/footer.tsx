import { Mail, MapPin, MessageCircle } from "lucide-react";

import { Container } from "@/components/common/section";
import { Logo } from "@/components/layout/logo";
import { InstagramIcon } from "@/components/layout/social-icons";
import { FOOTER_LINKS } from "@/lib/constants";
import { site, whatsappUrl } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line">
      <Container className="py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Marca */}
          <div className="lg:col-span-1">
            <Logo />
            <p className="mt-4 max-w-[30ch] text-body-sm text-muted">
              {site.tagline} para empresas que querem crescer com tecnologia.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href={site.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram da MarkePro"
                className="rounded-md border border-line p-2 text-subtle transition-colors hover:border-line-strong hover:text-primary"
              >
                <InstagramIcon className="size-4" />
              </a>
            </div>
          </div>

          {/* Colunas de links */}
          {Object.values(FOOTER_LINKS).map((group) => (
            <nav key={group.title} aria-label={group.title}>
              <h2 className="font-mono text-eyebrow uppercase text-subtle">
                {group.title}
              </h2>
              <ul className="mt-5 flex flex-col gap-3">
                {group.links.map((link, i) => (
                  <li key={`${link.href}-${i}`}>
                    <a
                      href={link.href}
                      className="text-body-sm text-muted transition-colors hover:text-primary"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {/* Contato */}
          <div>
            <h2 className="font-mono text-eyebrow uppercase text-subtle">
              Contato
            </h2>
            <ul className="mt-5 flex flex-col gap-3">
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="flex items-center gap-2 text-body-sm text-muted transition-colors hover:text-primary"
                >
                  <Mail className="size-4 shrink-0" strokeWidth={1.5} aria-hidden="true" />
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-body-sm text-muted transition-colors hover:text-primary"
                >
                  <MessageCircle className="size-4 shrink-0" strokeWidth={1.5} aria-hidden="true" />
                  WhatsApp
                </a>
              </li>
              <li className="flex items-center gap-2 text-body-sm text-muted">
                <MapPin className="size-4 shrink-0" strokeWidth={1.5} aria-hidden="true" />
                {site.city} — {site.state}
              </li>
            </ul>
          </div>
        </div>

        {/* Linha inferior. CNPJ visível: para uma empresa sem cases,
            existência jurídica verificável é sinal de confiança barato. */}
        <div className="mt-16 flex flex-col gap-3 border-t border-line pt-8 text-caption text-subtle md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {site.name}. Todos os direitos reservados.
          </p>
          <p className="tabular">CNPJ {site.cnpj}</p>
        </div>
      </Container>
    </footer>
  );
}

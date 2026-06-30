import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Instagram, MessageCircle, Mail } from "lucide-react";

const footerLinks = {
  experiencias: [
    { label: "Futebol", href: "/eventos?cat=futebol" },
    { label: "Fórmula 1", href: "/eventos?cat=formula1" },
    { label: "NFL", href: "/eventos?cat=nfl" },
    { label: "NBA", href: "/eventos?cat=nba" },
    { label: "Tênis", href: "/eventos?cat=tenis" },
  ],
  empresa: [
    { label: "Sobre nós", href: "/sobre" },
    { label: "Blog", href: "/blog" },
    { label: "Contato", href: "/contato" },
    { label: "Destinos", href: "/destinos" },
  ],
  legal: [
    { label: "Termos de uso", href: "/termos" },
    { label: "Privacidade", href: "/privacidade" },
    { label: "LGPD", href: "/lgpd" },
  ],
};

const socialLinks = [
  {
    label: "Instagram",
    href: "https://instagram.com/bluepandatravel",
    icon: Instagram,
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/5511940440078",
    icon: MessageCircle,
  },
];

export function Footer() {
  return (
    <footer className="bg-[#050e20] border-t border-white/5">
      <div className="container-bp py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Image
              src="/images/logo.png"
              alt="Blue Panda Travel"
              width={200}
              height={70}
              className="h-56 w-auto object-contain mb-6"
            />
            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
              Plataforma premium de experiências esportivas internacionais.
              Transformamos grandes eventos em memórias inesquecíveis.
            </p>
            <div className="flex items-center gap-4 mt-6">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-gold hover:border-gold/50 transition-colors"
                  aria-label={link.label}
                >
                  <link.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Experiências */}
          <div>
            <h4 className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-4">
              Experiências
            </h4>
            <ul className="space-y-3">
              {footerLinks.experiencias.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Empresa */}
          <div>
            <h4 className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-4">
              Empresa
            </h4>
            <ul className="space-y-3">
              {footerLinks.empresa.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h4 className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-4">
              Contato
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://wa.me/5511940440078"
                  className="flex items-center gap-2 text-sm text-white/60 hover:text-gold transition-colors"
                >
                  <MessageCircle size={14} />
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href="mailto:contato@bluepandatravel.com.br"
                  className="flex items-center gap-2 text-sm text-white/60 hover:text-gold transition-colors"
                >
                  <Mail size={14} />
                  E-mail
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/bluepanda.travel"
                  className="flex items-center gap-2 text-sm text-white/60 hover:text-gold transition-colors"
                >
                  <Instagram size={14} />
                  @bluepanda.travel
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30">
            © {new Date().getFullYear()} Blue Panda Travel. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-6">
            {footerLinks.legal.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs text-white/30 hover:text-gold/70 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

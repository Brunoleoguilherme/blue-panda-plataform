import { Analytics } from '@vercel/analytics/next';
import type { Metadata } from "next";
import "./globals.css";
import { Inter, Libre_Baskerville } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const libreBaskerville = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const BASE = "https://www.bluepandatravel.com.br";

export const metadata: Metadata = {
  metadataBase: new URL(BASE),
  title: {
    default: "Blue Panda Travel · Experiências Esportivas Premium",
    template: "%s · Blue Panda Travel",
  },
  description:
    "Acesso aos maiores eventos esportivos do mundo com atendimento premium, hospitalidade e organização impecável. NFL, Fórmula 1, Champions League, NBA e mais.",
  keywords: [
    "viagens esportivas",
    "experiências esportivas premium",
    "turismo esportivo",
    "NFL Brasil",
    "Fórmula 1 Mônaco",
    "Champions League",
    "Super Bowl",
    "hospitality esportivo",
    "pacotes para eventos esportivos",
  ],
  alternates: { canonical: BASE },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: BASE,
    siteName: "Blue Panda Travel",
    title: "Blue Panda Travel · Experiências Esportivas Premium",
    description:
      "Acesso aos maiores eventos esportivos do mundo com hospitalidade premium e atendimento dedicado.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Blue Panda Travel",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blue Panda Travel · Experiências Esportivas Premium",
    description:
      "Acesso aos maiores eventos esportivos do mundo com hospitalidade premium.",
    images: ["/images/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  name: "Blue Panda Travel",
  url: BASE,
  logo: `${BASE}/images/logo.png`,
  image: `${BASE}/images/og-image.jpg`,
  description:
    "Empresa brasileira especializada em experiências e viagens para os maiores eventos esportivos do mundo, com hospitalidade premium e atendimento bilíngue.",
  email: "contato@bluepandatravel.com.br",
  telephone: "+55-11-94044-0078",
  areaServed: "Worldwide",
  knowsLanguage: ["pt-BR", "en"],
  sameAs: ["https://instagram.com/bluepanda.travel"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${libreBaskerville.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  );
}

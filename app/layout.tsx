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

export const metadata: Metadata = {
  title: {
    default: "Blue Panda Travel · Experiências Esportivas Premium",
    template: "%s · Blue Panda Travel",
  },
  description:
    "Acesso aos maiores eventos esportivos do mundo com atendimento premium, hospitalidade e organização impecável.",
  keywords: [
    "viagens esportivas",
    "experiências premium",
    "NFL Brasil",
    "Formula 1",
    "Champions League",
    "Super Bowl",
  ],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://bluepandatravel.com.br",
    siteName: "Blue Panda Travel",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Blue Panda Travel",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${libreBaskerville.variable}`}>
      <body>{children}</body>
    </html>
  );
}

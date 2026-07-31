import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getEventBySlug, getPublishedEventSlugs } from "@/lib/events";
import { EventoHero } from "./evento-hero";
import { EventoIncluso } from "./evento-incluso";
import { EventoInclusoFlag } from "./evento-incluso-flag";
import { EventoCronograma } from "./evento-cronograma";
import { EventoFaq } from "./evento-faq";
import { EventoCta } from "./evento-cta";

const BASE = "https://www.bluepandatravel.com.br";

export const revalidate = 60;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getPublishedEventSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEventBySlug(slug);
  if (!event) return {};

  const url = `${BASE}/eventos/${event.slug}`;
  const image = event.coverImage.startsWith("http")
    ? event.coverImage
    : `${BASE}${event.coverImage}`;

  return {
    title: event.title,
    description: event.description,
    alternates: { canonical: url },
    openGraph: {
      title: event.title,
      description: event.description,
      url,
      type: "website",
      images: [{ url: image, width: 1200, height: 630, alt: event.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: event.title,
      description: event.description,
      images: [image],
    },
  };
}

export default async function EventoPage({ params }: Props) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);
  if (!event) notFound();

  const url = `${BASE}/eventos/${event.slug}`;
  const image = event.coverImage.startsWith("http")
    ? event.coverImage
    : `${BASE}${event.coverImage}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SportsEvent",
    name: event.title,
    description: event.description,
    startDate: event.date || undefined,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    image: [image],
    url,
    location: {
      "@type": "Place",
      name: event.location,
      address: {
        "@type": "PostalAddress",
        addressLocality: event.location,
        addressCountry: event.country,
      },
    },
    organizer: {
      "@type": "Organization",
      name: "Blue Panda Travel",
      url: BASE,
    },
    ...(event.status === "open"
      ? {
          offers: {
            "@type": "Offer",
            availability: "https://schema.org/InStock",
            url,
            category: "Pacote de experiência esportiva premium",
          },
        }
      : {}),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <EventoHero event={event} />
      {event.category === "flag" ? <EventoInclusoFlag /> : <EventoIncluso />}
      <EventoCronograma event={event} />
      <EventoFaq />
      <EventoCta event={event} />
    </>
  );
}

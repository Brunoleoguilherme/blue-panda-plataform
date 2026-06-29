import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { events } from "@/lib/events-data";
import { EventoHero } from "./evento-hero";
import { EventoIncluso } from "./evento-incluso";
import { EventoInclusoFlag } from "./evento-incluso-flag";
import { EventoCronograma } from "./evento-cronograma";
import { EventoFaq } from "./evento-faq";
import { EventoCta } from "./evento-cta";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return events.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const event = events.find((e) => e.slug === slug);
  if (!event) return {};
  return {
    title: event.title,
    description: event.description,
  };
}

export default async function EventoPage({ params }: Props) {
  const { slug } = await params;
  const event = events.find((e) => e.slug === slug);
  if (!event) notFound();

  return (
    <>
      <EventoHero event={event} />
      {event.category === "flag" ? <EventoInclusoFlag /> : <EventoIncluso />}
      <EventoCronograma event={event} />
      <EventoFaq />
      <EventoCta event={event} />
    </>
  );
}

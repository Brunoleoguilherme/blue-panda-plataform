import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { experiencias, getExperiencia } from "@/lib/experiencias-data";
import { events } from "@/lib/events-data";
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CtaSection } from "@/components/sections/cta-section";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return experiencias.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const exp = getExperiencia(slug);
  if (!exp) return {};
  return {
    title: exp.titulo,
    description: exp.descricao,
  };
}

export default async function ExperienciaPage({ params }: Props) {
  const { slug } = await params;
  const exp = getExperiencia(slug);
  if (!exp) notFound();

  const eventosRelacionados = events.filter((e) =>
    exp.eventosRelacionados.includes(e.slug)
  );

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={exp.imagem}
            alt={exp.titulo}
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/60 to-midnight/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-midnight/80 via-midnight/30 to-transparent" />
        </div>

        <div className="container-bp relative z-10 pt-44 pb-10 w-full">
          <Link
            href="/experiencias"
            className="inline-flex items-center gap-2 text-xs text-white/40 hover:text-gold transition-colors mb-5"
          >
            <ArrowLeft size={14} /> Todas as experiências
          </Link>

          <span className="inline-block text-xs font-semibold text-gold/80 uppercase tracking-widest mb-4 bg-gold/10 border border-gold/20 rounded-badge px-3 py-1">
            {exp.categoria}
          </span>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight max-w-3xl mb-3">
            {exp.tituloParte1}
            <br />
            {exp.tituloParte2}
          </h1>
          <p className="text-lg text-gold/70 font-semibold mb-3">{exp.subtitulo}</p>
          <p className="text-white/60 max-w-xl leading-relaxed">{exp.descricao}</p>
        </div>
      </section>

      {/* Conteúdo */}
      <section className="py-10 md:py-14 bg-midnight">
        <div className="container-bp">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-10">
              <p className="text-white/70 text-lg leading-relaxed font-serif italic border-l-2 border-gold/40 pl-6">
                {exp.conteudo.intro}
              </p>

              {exp.conteudo.topicos.map((topico, i) => (
                <div key={i} className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle size={18} className="text-gold flex-shrink-0" />
                    <h2 className="text-xl font-bold text-white">{topico.titulo}</h2>
                  </div>
                  <p className="text-white/55 leading-relaxed pl-7">{topico.texto}</p>
                </div>
              ))}
            </div>

            {/* Sidebar — Eventos relacionados */}
            <div className="space-y-6">
              <div className="p-6 rounded-xl border border-white/5 bg-navy/40">
                <p className="text-xs font-semibold text-gold uppercase tracking-widest mb-5">
                  Próximos eventos
                </p>

                {eventosRelacionados.length > 0 ? (
                  <div className="space-y-4">
                    {eventosRelacionados.map((evento) => (
                      <Link key={evento.slug} href={`/eventos/${evento.slug}`}>
                        <div className="group relative overflow-hidden rounded-lg border border-white/5 hover:border-gold/20 transition-all cursor-pointer">
                          <div className="relative h-28">
                            <Image
                              src={evento.coverImage}
                              alt={evento.title}
                              fill
                              className="object-cover transition-transform duration-500 group-hover:scale-105"
                              sizes="300px"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-midnight/90 to-transparent" />
                            <div className="absolute bottom-0 left-0 right-0 p-3">
                              <p className="text-xs font-bold text-white">{evento.title}</p>
                              <p className="text-xs text-white/40">{evento.location}, {evento.country}</p>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-white/30">Em breve novos eventos desta categoria.</p>
                )}
              </div>

              {/* CTA */}
              <div className="p-6 rounded-xl border border-gold/20 bg-gold/5 text-center space-y-4">
                <p className="text-sm font-semibold text-white leading-relaxed">
                  Pronto para viver essa experiência?
                </p>
                <Link href="/contato" className="block">
                  <Button variant="primary" size="md" className="w-full group">
                    {exp.conteudo.cta}
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  );
}

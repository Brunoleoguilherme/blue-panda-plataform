import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar, ArrowRight } from "lucide-react";
import { posts, formatarData } from "@/lib/blog-data";
import { CtaSection } from "@/components/sections/cta-section";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: post.titulo,
    description: post.resumo,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  const relacionados = posts.filter(
    (p) => p.slug !== slug && p.categoria === post.categoria
  ).slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={post.imagem}
            alt={post.titulo}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/70 to-midnight/30" />
        </div>
        <div className="container-bp relative z-10 pb-16 pt-40">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs text-white/40 hover:text-gold transition-colors mb-6"
          >
            <ArrowLeft size={14} /> Voltar ao Blog
          </Link>
          <div className="max-w-3xl">
            <span className="inline-block text-xs font-semibold text-gold bg-gold/10 border border-gold/20 rounded-badge px-3 py-1 uppercase tracking-widest mb-4 capitalize">
              {post.categoria}
            </span>
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              {post.titulo}
            </h1>
            <div className="flex items-center gap-6 text-xs text-white/40">
              <span className="flex items-center gap-1.5">
                <Calendar size={12} /> {formatarData(post.publicadoEm)}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={12} /> {post.tempoLeitura} min de leitura
              </span>
              <span className="flex items-center gap-2">
                <div className="relative w-6 h-6 rounded-full overflow-hidden">
                  <Image
                    src={post.autorFoto}
                    alt={post.autor}
                    fill
                    className="object-cover"
                    sizes="24px"
                  />
                </div>
                {post.autor}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Conteúdo */}
      <section className="section bg-midnight">
        <div className="container-bp">
          <div className="max-w-3xl mx-auto">
            {/* Resumo / Intro */}
            <p className="text-xl text-white/70 font-serif italic leading-relaxed mb-10 pb-10 border-b border-white/10">
              {post.resumo}
            </p>

            {/* Placeholder content */}
            <div className="prose prose-invert prose-lg max-w-none space-y-6 text-white/60 leading-relaxed">
              <p>
                Este artigo está sendo preparado pela equipe Blue Panda com
                conteúdo exclusivo e aprofundado sobre o tema. Em breve
                publicaremos o guia completo com todas as informações que você
                precisa para viver essa experiência com excelência.
              </p>
              <p>
                Enquanto isso, entre em contato com nossa equipe pelo WhatsApp
                ou pelo formulário de contato para tirar suas dúvidas e planejar
                sua próxima experiência esportiva internacional.
              </p>
              <div className="bg-navy/50 border border-gold/15 rounded-xl p-6 my-8">
                <p className="text-gold font-semibold text-sm mb-2">
                  💡 Dica Blue Panda
                </p>
                <p className="text-white/60 text-sm">
                  Planeje com antecedência. Os melhores ingressos e hotéis
                  esgotam rapidamente para eventos como este. Nossa equipe pode
                  ajudá-lo a garantir a melhor experiência possível.
                </p>
              </div>
            </div>

            {/* CTA inline */}
            <div className="mt-12 p-8 rounded-xl border border-gold/15 bg-navy/40 text-center">
              <p className="text-white font-bold text-lg mb-2">
                Quer viver essa experiência?
              </p>
              <p className="text-white/50 text-sm mb-5">
                Nossa equipe planeja tudo para você.
              </p>
              <Link
                href="/contato"
                className="inline-flex items-center gap-2 h-12 px-6 rounded-btn bg-gradient-gold text-midnight text-sm font-bold hover:brightness-110 transition-all"
              >
                Planejar minha experiência <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Artigos relacionados */}
      {relacionados.length > 0 && (
        <section className="pb-20 bg-midnight">
          <div className="container-bp">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-xl font-bold text-white mb-6">
                Artigos relacionados
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {relacionados.map((rel) => (
                  <Link key={rel.slug} href={`/blog/${rel.slug}`}>
                    <article className="group overflow-hidden rounded-xl border border-white/5 hover:border-gold/20 transition-colors cursor-pointer">
                      <div className="relative h-32 overflow-hidden">
                        <Image
                          src={rel.imagem}
                          alt={rel.titulo}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 640px) 100vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-midnight/80 to-transparent" />
                      </div>
                      <div className="p-4 bg-navy">
                        <p className="text-xs font-semibold text-white group-hover:text-gold transition-colors leading-snug">
                          {rel.titulo}
                        </p>
                        <p className="text-xs text-white/30 mt-1 flex items-center gap-1">
                          <Clock size={10} /> {rel.tempoLeitura} min
                        </p>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      <CtaSection />
    </>
  );
}

import type { Metadata } from "next";
import { BlogClient } from "./blog-client";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Guias, dicas, relatos e tudo sobre experiências esportivas internacionais. O blog da Blue Panda.",
};

export default function BlogPage() {
  return (
    <>
      <div className="relative pt-40 sm:pt-52 pb-20 sm:pb-28 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/hero-blog.jpg')" }} />
        <div className="absolute inset-0 bg-midnight/80" />
        <div className="container-bp relative z-10">
          <p className="text-xs font-semibold text-gold uppercase tracking-widest mb-3">
            Conteúdo exclusivo
          </p>
          <h1 className="text-3xl sm:text-5xl font-bold text-white mb-4">Blog</h1>
          <p className="text-white/50 text-lg max-w-xl">
            Bastidores, perspectivas, informações e notícias para quem entende que a experiência começa muito antes do evento. Se prepare para ficar por dentro de tudo dos maiores eventos esportivos do mundo.
          </p>
        </div>
      </div>
      <BlogClient />
    </>
  );
}

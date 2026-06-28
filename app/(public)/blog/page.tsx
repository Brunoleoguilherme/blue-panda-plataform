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
      <div className="pt-36 pb-16 bg-[#060f22]">
        <div className="container-bp">
          <p className="text-xs font-semibold text-gold uppercase tracking-widest mb-3">
            Conteúdo exclusivo
          </p>
          <h1 className="text-5xl font-bold text-white mb-4">Blog</h1>
          <p className="text-white/50 text-lg max-w-xl">
            Guias, dicas, relatos e tudo que você precisa saber para viver
            experiências esportivas inesquecíveis.
          </p>
        </div>
      </div>
      <BlogClient />
    </>
  );
}

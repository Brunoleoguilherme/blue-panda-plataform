"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CtaSection() {
  return (
    <section className="relative overflow-hidden py-28">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=2400')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-midnight/95 via-midnight/80 to-midnight/95" />

      {/* Gold accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      <div className="container-bp relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl mx-auto"
        >
          <p className="text-xs font-semibold text-gold uppercase tracking-widest mb-4">
            Pronto para viver isso?
          </p>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            A sua próxima experiência
            <br />
            <span className="text-gold-gradient">começa agora.</span>
          </h2>
          <p className="text-white/60 text-lg mb-10 leading-relaxed">
            Fale com nossa equipe e planeje uma experiência feita exclusivamente
            para você.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/contato">
              <Button variant="primary" size="lg" className="group">
                Planejar Minha Experiência
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Button>
            </Link>
            <a
              href="https://wa.me/5511999999999"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" size="lg" className="group">
                <MessageCircle size={18} />
                Falar pelo WhatsApp
              </Button>
            </a>
          </div>
        </motion.div>
      </div>

      {/* Bottom accent */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
    </section>
  );
}

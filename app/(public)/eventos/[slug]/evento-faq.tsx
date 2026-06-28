"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    pergunta: "Como funciona o processo de compra?",
    resposta:
      "Após o contato inicial, nossa equipe monta uma proposta personalizada com todos os detalhes do pacote. Você recebe o contrato, realiza o pagamento e ganha acesso ao Portal do Cliente onde acompanha tudo em tempo real.",
  },
  {
    pergunta: "O ingresso é garantido?",
    resposta:
      "Sim. Trabalhamos apenas com ingressos 100% oficiais adquiridos diretamente das organizações responsáveis pelos eventos. Você recebe o comprovante de autenticidade antes da viagem.",
  },
  {
    pergunta: "Qual é a forma de pagamento?",
    resposta:
      "Aceitamos parcelamento em até 12x no cartão de crédito, PIX e transferência bancária. O pagamento pode ser dividido em parcelas ao longo dos meses antes da viagem.",
  },
  {
    pergunta: "E se o evento for cancelado?",
    resposta:
      "Em caso de cancelamento oficial do evento, garantimos reembolso integral ou crédito para uma próxima experiência. Nossos contratos são claros e protegem o cliente em todas as situações.",
  },
  {
    pergunta: "Preciso de visto para viajar?",
    resposta:
      "Depende do destino. Nossa equipe orienta sobre toda a documentação necessária — passaporte, visto, ESTA — e acompanha o processo para garantir que tudo esteja em ordem antes da viagem.",
  },
  {
    pergunta: "Posso personalizar o pacote?",
    resposta:
      "Sim. Cada pacote pode ser adaptado às suas necessidades — número de dias, categoria de hotel, experiências adicionais, upgrade de ingresso, passeios extras e muito mais.",
  },
];

export function EventoFaq() {
  const [aberto, setAberto] = useState<number | null>(0);

  return (
    <section className="section bg-[#060f22]">
      <div className="container-bp">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <p className="text-xs font-semibold text-gold uppercase tracking-widest mb-3">
            Dúvidas frequentes
          </p>
          <h2 className="text-4xl font-bold text-white">Perguntas frequentes</h2>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="rounded-xl border border-white/5 bg-navy/30 overflow-hidden"
            >
              <button
                onClick={() => setAberto(aberto === i ? null : i)}
                className="w-full flex items-center justify-between p-6 text-left gap-4 hover:bg-white/2 transition-colors"
              >
                <span
                  className={`text-sm font-semibold transition-colors ${
                    aberto === i ? "text-gold" : "text-white"
                  }`}
                >
                  {faq.pergunta}
                </span>
                <span className="flex-shrink-0 w-7 h-7 rounded-full border border-white/10 flex items-center justify-center text-white/40">
                  {aberto === i ? <Minus size={14} /> : <Plus size={14} />}
                </span>
              </button>

              <AnimatePresence>
                {aberto === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-6 pt-0">
                      <div className="h-px bg-white/5 mb-4" />
                      <p className="text-sm text-white/55 leading-relaxed">
                        {faq.resposta}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

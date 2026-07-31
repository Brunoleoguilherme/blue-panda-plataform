"use client";

import { useEffect } from "react";

// Último nível de proteção: só é acionado se o próprio layout raiz falhar.
// Por isso renderiza <html>/<body> próprios e usa estilos inline, sem depender
// de nada externo além do React.
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="pt-BR">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#081A3A",
          color: "#fff",
          fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
          padding: "24px",
        }}
      >
        <div style={{ maxWidth: 420, textAlign: "center" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/logo.png"
            alt="Blue Panda Travel"
            style={{ height: 56, width: "auto", margin: "0 auto 40px" }}
          />
          <p
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: "#C8A54D",
              textTransform: "uppercase",
              letterSpacing: "0.3em",
              margin: "0 0 16px",
            }}
          >
            Erro inesperado
          </p>
          <h1
            style={{
              fontSize: 30,
              fontWeight: 700,
              margin: "0 0 16px",
              lineHeight: 1.2,
            }}
          >
            Algo não saiu como esperado
          </h1>
          <p
            style={{
              color: "rgba(255,255,255,0.5)",
              fontSize: 14,
              lineHeight: 1.6,
              margin: "0 0 40px",
            }}
          >
            Tivemos um problema ao carregar o site. Tente novamente em instantes.
          </p>
          <button
            onClick={() => reset()}
            style={{
              background: "linear-gradient(135deg, #C8A54D, #DDBB67)",
              color: "#081A3A",
              fontWeight: 700,
              fontSize: 14,
              padding: "14px 28px",
              borderRadius: 14,
              border: "none",
              cursor: "pointer",
            }}
          >
            Tentar novamente
          </button>
        </div>
      </body>
    </html>
  );
}

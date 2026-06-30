import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./features/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // Blue Panda Official Palette
        midnight: {
          DEFAULT: "#081A3A",
          foreground: "#FFFFFF",
        },
        navy: {
          DEFAULT: "#0F2F63",
          foreground: "#FFFFFF",
        },
        azure: {
          DEFAULT: "#3F6FB5",
          foreground: "#FFFFFF",
        },
        gold: {
          DEFAULT: "#C8A54D",
          light: "#DDBB67",
          foreground: "#081A3A",
        },
        surface: {
          DEFAULT: "#F8F9FB",
          border: "#E9EDF3",
        },
        muted: {
          DEFAULT: "#6B7280",
          foreground: "#6B7280",
        },
        // shadcn/ui compatibility
        background: "#081A3A",
        foreground: "#FFFFFF",
        card: {
          DEFAULT: "#0F2F63",
          foreground: "#FFFFFF",
        },
        popover: {
          DEFAULT: "#0F2F63",
          foreground: "#FFFFFF",
        },
        primary: {
          DEFAULT: "#C8A54D",
          foreground: "#081A3A",
        },
        secondary: {
          DEFAULT: "#0F2F63",
          foreground: "#FFFFFF",
        },
        accent: {
          DEFAULT: "#DDBB67",
          foreground: "#081A3A",
        },
        destructive: {
          DEFAULT: "#EF4444",
          foreground: "#FFFFFF",
        },
        border: "#E9EDF3",
        input: "#E9EDF3",
        ring: "#C8A54D",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
      },
      fontSize: {
        hero: ["72px", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        display: ["56px", { lineHeight: "1.15", letterSpacing: "-0.02em" }],
        h1: ["40px", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
        h2: ["28px", { lineHeight: "1.3", letterSpacing: "-0.01em" }],
        h3: ["22px", { lineHeight: "1.4" }],
        body: ["18px", { lineHeight: "1.6" }],
        sm: ["16px", { lineHeight: "1.5" }],
        xs: ["14px", { lineHeight: "1.5" }],
      },
      borderRadius: {
        lg: "16px",
        xl: "24px",
        btn: "14px",
        badge: "999px",
      },
      boxShadow: {
        card: "0 10px 40px rgba(0,0,0,0.08)",
        "card-hover": "0 20px 60px rgba(0,0,0,0.15)",
        gold: "0 8px 32px rgba(200,165,77,0.2)",
      },
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
      },
      backdropBlur: {
        glass: "20px",
      },
      backgroundImage: {
        "gradient-midnight":
          "linear-gradient(180deg, #081A3A 0%, #0F2F63 100%)",
        "gradient-gold":
          "linear-gradient(135deg, #C8A54D 0%, #DDBB67 100%)",
        "gradient-overlay":
          "linear-gradient(to bottom, rgba(8,26,58,0.3) 0%, rgba(8,26,58,0.85) 100%)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(24px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-up": "fade-up 0.6s ease-out forwards",
        "fade-in": "fade-in 0.4s ease-out forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;

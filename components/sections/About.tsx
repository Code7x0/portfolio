"use client";

import { motion } from "framer-motion";
import { ABOUT, SITE_CONFIG, EXPERTISE, TECH_STACK } from "@/lib/constants";
import { X } from "lucide-react";
import { useState } from "react";

const ease = [0.16, 1, 0.3, 1] as const;

const TECH_ICONS: Record<string, string> = {
  "Next.js": "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/nextdotjs.svg",
  "React": "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/react.svg",
  "TypeScript": "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/typescript.svg",
  "Node.js": "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/nodedotjs.svg",
  "MongoDB": "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/mongodb.svg",
  "Tailwind CSS": "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/tailwindcss.svg",
  "Shopify": "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/shopify.svg",
  "Docker": "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/docker.svg",
};

export default function About() {
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);

  return (
    <section
      id="about"
      className="section"
      style={{
        background: "var(--bg)",
        position: "relative",
      }}
      aria-label="About"
    >
      <div className="wrap">
        
        {/* Header - Centered */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "60px" }}>
          <span style={{
            fontFamily: "var(--font-mono)",
            fontWeight: 500,
            fontSize: "0.85rem",
            color: "var(--text-dim)",
            letterSpacing: "0.05em",
            marginBottom: "12px",
            textTransform: "uppercase",
          }}>
            Bio
          </span>
          <h2 style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: "clamp(2.5rem, 5vw, 4rem)",
            letterSpacing: "-0.03em",
            color: "var(--text)",
            textTransform: "uppercase",
            margin: 0,
            lineHeight: 1,
          }}>
            {ABOUT.heading}
          </h2>
        </div>

        {/* Content Layout */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.1fr",
            gap: "clamp(40px, 8vw, 80px)",
            alignItems: "start",
            maxWidth: "1024px",
            margin: "0 auto",
          }}
          className="about-grid"
        >
          {/* LEFT: Landscape Window Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.7, ease, delay: 0.1 }}
          >
            {/* Outer Frame (The extra border) */}
            <div style={{
              border: "1px solid rgba(255, 255, 255, 0.15)",
              padding: "clamp(12px, 2vw, 24px)",
              background: "transparent",
            }}>
              <div style={{
                background: "var(--surface)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                overflow: "hidden",
                boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
              }}>
                {/* Window Bar */}
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "12px 16px",
                  background: "#1a1a1a",
                }}>
                  <span style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.85rem",
                    color: "var(--text-dim)",
                  }}>
                    {SITE_CONFIG.name.toLowerCase().replace(" ", "-")}.png
                  </span>
                  <X size={18} color="var(--text-dim)" />
                </div>
                
                {/* Photo Area */}
                <div className="about-photo-area">
                  <div className="about-photo-overlay desktop-img" style={{ background: "none" }}>
                    <img
                      src="/about-desktop.jpg"
                      alt={SITE_CONFIG.name}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </div>
                  <div className="about-photo-overlay mobile-img" style={{ background: "none" }}>
                    <img
                      src="/about-mobile.jpg"
                      alt={SITE_CONFIG.name}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT: Text content */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.7, ease, delay: 0.2 }}
            style={{ 
              display: "flex", 
              flexDirection: "column", 
              gap: "28px"
            }}
          >
            <div>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {ABOUT.paragraphs.map((p, i) => (
                  <p
                    key={i}
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "clamp(0.95rem, 1.2vw, 1.05rem)",
                      color: "var(--text-sub)",
                      lineHeight: 1.55,
                      margin: 0,
                    }}
                  >
                    {p}
                  </p>
                ))}
              </div>
            </div>

            {/* Expertise */}
            <div>
              <h4 style={{
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                fontSize: "0.9rem",
                color: "var(--text-dim)",
                letterSpacing: "0.05em",
                marginBottom: "10px",
                textTransform: "uppercase",
              }}>
                Expertise
              </h4>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {EXPERTISE.map(s => (
                  <span key={s} style={{
                    padding: "6px 14px",
                    background: "var(--text)",
                    color: "var(--bg)",
                    borderRadius: "999px",
                    fontFamily: "var(--font-body)",
                    fontWeight: 500,
                    fontSize: "0.85rem",
                  }}>
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Tech Stack (Icons) */}
            <div>
              <h4 style={{
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                fontSize: "0.9rem",
                color: "var(--text-dim)",
                letterSpacing: "0.05em",
                marginBottom: "12px",
                textTransform: "uppercase",
              }}>
                Technologies
              </h4>
              <div style={{ 
                display: "grid", 
                gridTemplateColumns: "repeat(auto-fill, minmax(44px, 1fr))", 
                gap: "12px" 
              }}>
                {TECH_STACK.map(tech => (
                  <div
                    key={tech}
                    onMouseEnter={() => setHoveredTech(tech)}
                    onMouseLeave={() => setHoveredTech(null)}
                    style={{
                      position: "relative",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "44px",
                      height: "44px",
                      borderRadius: "10px",
                      background: "var(--surface)",
                      border: "1px solid var(--border)",
                      transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                      transform: hoveredTech === tech ? "translateY(-4px)" : "translateY(0)",
                      boxShadow: hoveredTech === tech ? "0 8px 24px rgba(255,255,255,0.05)" : "none",
                      cursor: "pointer",
                    }}
                  >
                    <img 
                      src={TECH_ICONS[tech]} 
                      alt={tech} 
                      style={{ 
                        width: "22px", 
                        height: "22px", 
                        filter: "invert(1) opacity(0.8)",
                        transition: "all 0.3s ease",
                        opacity: hoveredTech === tech ? 1 : 0.8,
                      }} 
                    />
                    
                    {/* Tooltip */}
                    {hoveredTech === tech && (
                      <motion.div
                        initial={{ opacity: 0, y: 4, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.15 }}
                        style={{
                          position: "absolute",
                          bottom: "100%",
                          left: "50%",
                          transform: "translateX(-50%)",
                          marginBottom: "8px",
                          background: "var(--text)",
                          color: "var(--bg)",
                          padding: "4px 10px",
                          borderRadius: "6px",
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.7rem",
                          fontWeight: 600,
                          whiteSpace: "nowrap",
                          pointerEvents: "none",
                          zIndex: 10,
                        }}
                      >
                        {tech}
                      </motion.div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
          </motion.div>
        </div>
      </div>

      <style>{`
        .about-photo-area {
          width: 100%;
          aspect-ratio: 3/4;
          background: var(--border);
          position: relative;
        }
        .about-photo-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom right, var(--surface), var(--bg));
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .about-photo-overlay.desktop-img { display: flex; }
        .about-photo-overlay.mobile-img { display: none; }

        @media (max-width: 860px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
          .about-photo-area { aspect-ratio: 16/9; }
          .about-photo-overlay.desktop-img { display: none !important; }
          .about-photo-overlay.mobile-img { display: flex !important; }
        }
      `}</style>
    </section>
  );
}

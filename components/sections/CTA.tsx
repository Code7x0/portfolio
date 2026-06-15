"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef } from "react";
import { SITE_CONFIG, CTA } from "@/lib/constants";

const ease = [0.16, 1, 0.3, 1] as const;

function WhatsAppIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.489-1.761-1.663-2.06-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

/* ── Magnetic 3D Button ── */
function MagneticWhatsApp() {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const smoothX = useSpring(x, { damping: 15, stiffness: 150, mass: 0.1 });
  const smoothY = useSpring(y, { damping: 15, stiffness: 150, mass: 0.1 });

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    x.set((clientX - (left + width / 2)) * 0.25);
    y.set((clientY - (top + height / 2)) * 0.25);
  };

  const reset = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      style={{ x: smoothX, y: smoothY, display: "inline-flex" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease, delay: 0.4 }}
        style={{ position: "relative", display: "inline-flex" }}
      >
        {/* 3D depth layer — the "shadow plate" beneath */}
        <div style={{
          position: "absolute",
          inset: 0,
          borderRadius: "999px",
          background: "#072b17",
          transform: "translateY(6px)",
          zIndex: 0,
        }} />

        <motion.a
          ref={ref}
          href={SITE_CONFIG.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          data-no-invert
          whileHover={{ y: -3 }}
          whileTap={{ y: 4 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
          style={{
            position: "relative",
            zIndex: 1,
            display: "flex",
            alignItems: "center",
            gap: "14px",
            background: "linear-gradient(to bottom, #1a7a42, #145c34)",
            color: "#d4edda",
            padding: "22px 52px",
            borderRadius: "999px",
            fontFamily: "var(--font-body)",
            fontWeight: 700,
            fontSize: "clamp(1rem, 1.5vw, 1.15rem)",
            textDecoration: "none",
            letterSpacing: "0em",
            border: "1.5px solid rgba(255,255,255,0.1)",
            borderTop: "1.5px solid rgba(255,255,255,0.2)",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08)",
            transition: "background 0.3s ease, box-shadow 0.4s ease",
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.background = "linear-gradient(to bottom, #1f9050, #177040)";
            (e.currentTarget as HTMLElement).style.boxShadow = "inset 0 1px 0 rgba(255,255,255,0.12), 0 0 50px 8px rgba(20, 92, 52, 0.35)";
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.background = "linear-gradient(to bottom, #1a7a42, #145c34)";
            (e.currentTarget as HTMLElement).style.boxShadow = "inset 0 1px 0 rgba(255,255,255,0.08)";
          }}
        >
          <WhatsAppIcon size={22} />
          {CTA.cta_primary}
        </motion.a>
      </motion.div>
    </motion.div>
  );
}

export default function CTASection() {
  return (
    <section
      id="contact"
      style={{
        background: "var(--bg)",
        position: "relative",
        overflow: "hidden",
        padding: "clamp(80px, 14vw, 180px) 0",
      }}
      aria-label="Contact CTA"
    >
      {/* Subtle radial glow behind */}
      <div style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "80vw",
        height: "80vw",
        maxWidth: "900px",
        maxHeight: "900px",
        background: "radial-gradient(circle at center, rgba(20, 92, 52, 0.06) 0%, transparent 70%)",
        pointerEvents: "none",
        zIndex: 0,
      }} />

      <div className="wrap" style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>

        {/* Label */}
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease }}
          style={{
            fontFamily: "var(--font-mono)",
            fontWeight: 500,
            fontSize: "0.85rem",
            color: "var(--text-dim)",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBottom: "clamp(24px, 4vw, 40px)",
          }}
        >
          Let&apos;s Work Together
        </motion.span>

        {/* Massive Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75, ease, delay: 0.1 }}
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: "clamp(3.5rem, 10vw, 9rem)",
            letterSpacing: "-0.04em",
            lineHeight: 0.95,
            color: "var(--text)",
            textTransform: "uppercase",
            margin: 0,
            marginBottom: "clamp(24px, 4vw, 48px)",
          }}
        >
          {CTA.heading}
        </motion.h2>

        {/* Divider line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease, delay: 0.25 }}
          style={{
            width: "clamp(60px, 8vw, 120px)",
            height: "1px",
            background: "var(--border-mid)",
            marginBottom: "clamp(24px, 4vw, 48px)",
            transformOrigin: "center",
          }}
        />

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease, delay: 0.3 }}
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 400,
            fontSize: "clamp(1rem, 1.5vw, 1.2rem)",
            color: "var(--text-sub)",
            lineHeight: 1.65,
            maxWidth: "520px",
            margin: "0 auto",
            marginBottom: "clamp(40px, 6vw, 72px)",
          }}
        >
          {CTA.subtext}
        </motion.p>

        {/* Magnetic 3D WhatsApp Button */}
        <MagneticWhatsApp />

      </div>
    </section>
  );
}

"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { SITE_CONFIG, HERO } from "@/lib/constants";

const ease = [0.16, 1, 0.3, 1] as const;

/* ── Custom Pixel Space Invader Icon ──────────────────── */
function PixelIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" style={{ opacity: 0.6, display: "inline-block", flexShrink: 0 }}>
      <path d="M3 3h2v2H3zm8 0h2v2h-2zM1 6h2v2H1zm12 0h2v2h-2zM3 9h10v2H3zm2 3h6v2H5z" />
    </svg>
  );
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Mouse position tracking for parallax and tilt
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springConfig = { damping: 30, stiffness: 100, mass: 1 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothY, [0, 1], [3, -3]);
  const rotateY = useTransform(smoothX, [0, 1], [-3, 3]);
  const translateX = useTransform(smoothX, [0, 1], [-20, 20]);
  const translateY = useTransform(smoothY, [0, 1], [-20, 20]);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);

    const handleMouseMove = (e: MouseEvent) => {
      if (isMobile) return;
      mouseX.set(e.clientX / window.innerWidth);
      mouseY.set(e.clientY / window.innerHeight);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseX, mouseY, isMobile]);

  return (
    <section
      id="hero"
      aria-label="Hero"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "var(--bg)",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Soft Background Glow */}
      <motion.div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "120vw",
          height: "120vh",
          background: "radial-gradient(circle at center, rgba(255,255,255,0.03) 0%, transparent 60%)",
          transform: "translate(-50%, -50%)",
          x: useTransform(smoothX, [0, 1], [-30, 30]),
          y: useTransform(smoothY, [0, 1], [-30, 30]),
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Spacer for fixed nav */}
      <div style={{ flexShrink: 0, height: "clamp(120px, 15vh, 180px)", zIndex: 1 }} />

      {/* ── Mockup Window Wrapper ── */}
      <div
        ref={containerRef}
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: "0 clamp(16px, 4vw, 48px)",
          perspective: "1200px",
          zIndex: 1,
        }}
      >
        <motion.div
          style={{
            width: "100%",
            maxWidth: "960px",
            position: "relative",
            rotateX: isMobile ? 0 : rotateX,
            rotateY: isMobile ? 0 : rotateY,
            x: isMobile ? 0 : translateX,
            y: isMobile ? 0 : translateY,
            transformStyle: "preserve-3d",
          }}
        >
          {/* Fading Half-Window Frame */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease }}
            style={{
              background: "rgba(255, 255, 255, 0.02)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              borderRadius: "20px 20px 0 0",
              borderTop: "1px solid rgba(255, 255, 255, 0.15)",
              borderLeft: "1px solid rgba(255, 255, 255, 0.15)",
              borderRight: "1px solid rgba(255, 255, 255, 0.15)",
              borderBottom: "none",
              boxShadow: "0 20px 60px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)",
              display: "flex",
              flexDirection: "column",
              WebkitMaskImage: "linear-gradient(to bottom, black 55%, transparent 100%)",
              maskImage: "linear-gradient(to bottom, black 55%, transparent 100%)",
              minHeight: "450px",
            }}
          >
            {/* Window Title Bar */}
            <div style={{
              height: "50px",
              borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0 20px",
              userSelect: "none",
            }}>
              {/* Left side: Pixel Icon + title */}
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <PixelIcon />
                <span style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.8rem",
                  color: "var(--text-sub)",
                  letterSpacing: "0.02em",
                }}>
                  untitled...
                </span>
              </div>

              {/* Right side: Badge */}
              <div style={{
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "999px",
                padding: "4px 14px",
                fontSize: "0.75rem",
                color: "var(--text-dim)",
                fontFamily: "var(--font-mono)",
                letterSpacing: "0.01em",
              }}>
                not saved
              </div>
            </div>

            {/* Window Content — Editor Layout */}
            <div
              style={{
                flex: 1,
                display: "flex",
                padding: "clamp(32px, 5vw, 56px) clamp(20px, 4vw, 44px) 140px",
                position: "relative",
                gap: "clamp(12px, 2vw, 28px)",
              }}
            >
              {/* Line numbers column */}
              <div style={{
                display: "flex",
                flexDirection: "column",
                flexShrink: 0,
                userSelect: "none",
              }}>
                {[1,2,3,4,5,6,7,8,9].map((n) => (
                  <motion.span
                    key={n}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: n <= 4 ? 0.2 : 0.07 }}
                    transition={{ delay: 0.1 + n * 0.05, duration: 0.4 }}
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "clamp(0.65rem, 1vw, 0.8rem)",
                      color: "var(--text-dim)",
                      lineHeight: "1.95",
                      minWidth: "20px",
                      display: "block",
                    }}
                  >{n}</motion.span>
                ))}
              </div>

              {/* Thin vertical rule */}
              <div style={{
                width: "1px",
                background: "rgba(255,255,255,0.06)",
                flexShrink: 0,
                alignSelf: "stretch",
              }} />

              {/* Main text content — left aligned */}
              <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                
                {/* Author Name — thin monospace comment style */}
                <motion.p
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, ease, delay: 0.15 }}
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontWeight: 300,
                    fontSize: "clamp(0.7rem, 1vw, 0.82rem)",
                    color: "var(--text-dim)",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    marginBottom: "clamp(8px, 1.5vw, 16px)",
                    lineHeight: "1.95",
                    opacity: 0.6,
                  }}
                >
                  // {SITE_CONFIG.name}
                </motion.p>

                {/* Editorial Headline — left aligned, with italic serif accent */}
                <motion.h1
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.75, ease, delay: 0.25 }}
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: "clamp(2rem, 5.5vw, 4.6rem)",
                    lineHeight: 1.03,
                    letterSpacing: "-0.035em",
                    color: "var(--text)",
                    margin: 0,
                    textShadow: "0 0 40px rgba(255, 255, 255, 0.12)",
                  }}
                >
                  I turn business<br />
                  <em style={{ fontStyle: "italic", fontWeight: 300, fontFamily: "var(--font-serif)", letterSpacing: "-0.01em" }}>ideas</em>{" "}into<br />
                  digital products.
                  {/* Blinking cursor */}
                  <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 1.05, repeat: Infinity, ease: "easeInOut" }}
                    style={{
                      display: "inline-block",
                      width: "3px",
                      height: "0.82em",
                      background: "var(--text)",
                      marginLeft: "8px",
                      verticalAlign: "middle",
                      opacity: 0.65,
                      flexShrink: 0,
                    }}
                  />
                </motion.h1>

                {/* Subheadline */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, ease, delay: 0.5 }}
                  style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: 400,
                    fontSize: "clamp(0.9rem, 1.3vw, 1.1rem)",
                    lineHeight: 1.65,
                    color: "var(--text-sub)",
                    marginTop: "clamp(16px, 2.5vw, 28px)",
                    maxWidth: "500px",
                  }}
                >
                  {HERO.subtext}
                </motion.p>

                {/* Meta row — stack descriptor + location */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, ease, delay: 0.65 }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "24px",
                    marginTop: "clamp(16px, 2.5vw, 28px)",
                    flexWrap: "wrap",
                  }}
                >
                  <span style={{
                    fontFamily: "var(--font-mono)",
                    fontWeight: 400,
                    fontSize: "clamp(0.65rem, 0.9vw, 0.78rem)",
                    color: "var(--text-dim)",
                    letterSpacing: "0.05em",
                  }}>
                    {SITE_CONFIG.descriptor}
                  </span>
                  <span style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    fontFamily: "var(--font-mono)",
                    fontWeight: 400,
                    fontSize: "clamp(0.65rem, 0.9vw, 0.78rem)",
                    color: "var(--text-dim)",
                    letterSpacing: "0.04em",
                  }}>
                    <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#25D366", display: "inline-block", flexShrink: 0 }} />
                    {SITE_CONFIG.location}
                  </span>
                </motion.div>

              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* ── Scroll Chevron ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.0, duration: 0.6 }}
        style={{
          position: "absolute",
          bottom: "40px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          color: "var(--text-dim)",
        }}
      >
        <motion.svg
          width="24" height="24" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <polyline points="6 9 12 15 18 9" />
        </motion.svg>
      </motion.div>
    </section>
  );
}

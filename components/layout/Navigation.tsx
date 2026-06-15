"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { Mail, X } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

const ease = [0.16, 1, 0.3, 1] as const;

/* ── SVG Icons ─────────────────────────────────────── */
function GithubIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function LinkedinIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

/* ── Data ──────────── */
const NAV_LINKS = [
  { label: "Projects", href: "#projects" },
  { label: "About",   href: "#about"    },
  { label: "Contact", href: "#contact"  },
];

const SOCIAL_LINKS = [
  { label: "GitHub",   href: SITE_CONFIG.github,            Icon: GithubIcon  },
  { label: "LinkedIn", href: SITE_CONFIG.linkedin,          Icon: LinkedinIcon },
  { label: "Email",    href: `mailto:${SITE_CONFIG.email}`, Icon: Mail        },
];

function scrollTo(href: string) {
  document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
}

/* ── Magnetic Wrapper ─────────────────────────────── */
function Magnetic({ children }: { children: React.ReactElement }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const smoothX = useSpring(x, springConfig);
  const smoothY = useSpring(y, springConfig);

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    x.set(middleX * 0.2); // Pull strength
    y.set(middleY * 0.2);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      style={{ x: smoothX, y: smoothY, display: "inline-flex" }}
    >
      {children}
    </motion.div>
  );
}

/* ── Simple Icon Button (No Box) ──────────────────── */
function IconBtn({
  href, label, size = 26, children, onClick,
}: {
  href?: string; label: string; size?: number; children: React.ReactNode; onClick?: () => void;
}) {
  const style: React.CSSProperties = {
    display: "flex", alignItems: "center", justifyContent: "center",
    color: "var(--text)",
    transition: "transform 0.2s, opacity 0.2s, color 0.2s",
    textDecoration: "none", cursor: "pointer",
    opacity: 0.85,
    padding: "6px",
  };

  const Component = href ? (
    <a href={href} target={href.startsWith("mailto") ? "_self" : "_blank"}
      rel="noopener noreferrer" aria-label={label} style={style}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.opacity = "1";
        (e.currentTarget as HTMLElement).style.transform = "scale(1.1)";
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.opacity = "0.85";
        (e.currentTarget as HTMLElement).style.transform = "scale(1)";
      }}>
      {children}
    </a>
  ) : (
    <button aria-label={label} style={{ ...style, background: "none", border: "none" }}
      onClick={onClick}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.opacity = "1";
        (e.currentTarget as HTMLElement).style.transform = "scale(1.1)";
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.opacity = "0.85";
        (e.currentTarget as HTMLElement).style.transform = "scale(1)";
      }}>
      {children}
    </button>
  );

  return <Magnetic>{Component}</Magnetic>;
}

export default function Navigation() {
  const [active,     setActive]     = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const ids = ["projects", "about", "contact"];
      for (const id of [...ids].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 140) { setActive(`#${id}`); return; }
      }
      setActive("");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      {/* ══════════ HEADER ══════════ */}
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease }}
        style={{
          position: "fixed",
          top: 0, left: 0, right: 0,
          zIndex: 50,
          background: "var(--bg)",
          borderBottom: "none",
          padding: "18px 0",
          transition: "background 0.3s",
        }}
      >
        <div className="wrap" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "24px", maxWidth: "1600px" }}>

          {/* ── LEFT: Avatar + name ── */}
          <a href="/" aria-label="Home"
            style={{ display: "flex", alignItems: "center", gap: "16px", textDecoration: "none", flexShrink: 0 }}>
            {/* Circle avatar */}
            <div style={{
              width: "56px", height: "56px", borderRadius: "50%",
              background: "var(--text)",
              border: "none",
              flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <span style={{
                fontFamily: "var(--font-display)", fontWeight: 700,
                fontSize: "1.2rem", color: "var(--bg)",
                letterSpacing: "-0.02em", userSelect: "none",
              }}>K</span>
            </div>

            <div>
              <p style={{
                fontFamily: "var(--font-body)", fontWeight: 600,
                fontSize: "1.05rem", letterSpacing: "-0.025em",
                color: "var(--text)", lineHeight: 1.15,
              }}>{SITE_CONFIG.name}</p>
              <p style={{
                fontFamily: "var(--font-mono)", fontWeight: 500,
                fontSize: "0.75rem", color: "var(--text-dim)", letterSpacing: "0.05em",
                lineHeight: 1.3, marginTop: "4px", maxWidth: "210px",
              }}>Full Stack Developer</p>
            </div>
          </a>

          {/* ── CENTER: Pill nav (desktop only) ── */}
          <nav aria-label="Main navigation" className="hidden md:flex">
            <div style={{
              display: "flex", alignItems: "center", gap: "2px",
              padding: "6px 8px", borderRadius: "999px",
              background: "rgba(128,128,128,0.05)",
              border: "1px solid var(--border)",
              boxShadow: "0 10px 30px -10px rgba(0,0,0,0.1), 0 1px 3px rgba(0,0,0,0.05)",
            }}>
              {NAV_LINKS.map(({ label, href }) => (
                <Magnetic key={href}>
                  <button onClick={() => scrollTo(href)}
                    style={{
                      padding: "8px 24px", borderRadius: "999px",
                      fontFamily: "var(--font-body)", fontSize: "0.95rem",
                      fontWeight: 500, letterSpacing: "-0.01em",
                      background: active === href ? "var(--text)" : "transparent",
                      color: active === href ? "var(--bg)" : "var(--text)",
                      border: "none", cursor: "pointer", transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                      whiteSpace: "nowrap",
                    }}
                    onMouseEnter={e => { if (active !== href) (e.currentTarget as HTMLElement).style.opacity = "0.7"; }}
                    onMouseLeave={e => { if (active !== href) (e.currentTarget as HTMLElement).style.opacity = "1"; }}
                  >
                    {label}
                  </button>
                </Magnetic>
              ))}
            </div>
          </nav>

          {/* ── RIGHT: social icons (desktop) + @ hamburger (mobile/tablet) ── */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px", flexShrink: 0 }}>
            {/* Desktop: GitHub, LinkedIn, Email */}
            <div className="hidden md:flex items-center" style={{ gap: "16px" }}>
              {SOCIAL_LINKS.map(({ label, href, Icon }) => (
                <IconBtn key={label} href={href} label={label}>
                  <Icon size={22} />
                </IconBtn>
              ))}
            </div>

            {/* Mobile/tablet: @ button acts as hamburger */}
            <Magnetic>
              <button
                onClick={() => setMobileOpen(v => !v)}
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileOpen}
                className="md:hidden flex items-center justify-center"
                style={{
                  width: "56px", height: "56px", borderRadius: "50%",
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  color: "var(--text)",
                  cursor: "pointer",
                  fontSize: mobileOpen ? "0" : "1.2rem",
                  fontFamily: "var(--font-body)", fontWeight: 600,
                  transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                }}
              >
                {mobileOpen
                  ? <X size={22} />
                  : <span style={{ fontSize: "1.2rem", lineHeight: 1, letterSpacing: "-0.02em", fontFamily: "var(--font-body)", fontWeight: 600, color: "var(--text)" }}>@</span>
                }
              </button>
            </Magnetic>
          </div>

        </div>
      </motion.header>

      {/* ══════════ MOBILE OVERLAY ══════════ */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-10%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-10%", transition: { duration: 0.3, ease } }}
            transition={{ duration: 0.5, ease }}
            style={{
              position: "fixed", inset: 0, zIndex: 40,
              background: "var(--bg)",
              display: "flex", flexDirection: "column",
            }}
          >
            {/* Padding to push below fixed header */}
            <div style={{ height: "100px", flexShrink: 0 }} />

            {/* Nav links */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 32px" }}>
              {NAV_LINKS.map(({ label, href }, i) => (
                <motion.button key={href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.08, duration: 0.5, ease }}
                  onClick={() => { setMobileOpen(false); scrollTo(href); }}
                  style={{
                    background: "none", border: "none",
                    borderBottom: i < NAV_LINKS.length - 1 ? "1px solid var(--border)" : "none",
                    fontFamily: "var(--font-display)", fontWeight: 600,
                    fontSize: "clamp(2.5rem, 10vw, 3.5rem)", letterSpacing: "-0.04em", lineHeight: 1,
                    color: "var(--text)", cursor: "pointer",
                    textAlign: "left", padding: "28px 0", width: "100%", transition: "color 0.15s",
                    opacity: 0.85
                  }}
                  onTouchStart={e => (e.currentTarget.style.opacity = "1")}
                  onTouchEnd={e => (e.currentTarget.style.opacity = "0.85")}
                >
                  {label}
                </motion.button>
              ))}
            </div>

            {/* Social icons row */}
            <div style={{
              padding: "32px",
              display: "flex", gap: "16px", justifyContent: "center",
              borderTop: "1px solid var(--border)",
            }}>
              {SOCIAL_LINKS.map(({ label, href, Icon }, i) => (
                <motion.div key={label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.05, duration: 0.4, ease }}
                >
                  <IconBtn href={href} label={label} size={48}>
                    <Icon size={24} />
                  </IconBtn>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

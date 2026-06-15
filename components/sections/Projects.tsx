"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { PROJECTS } from "@/lib/constants";

const ease = [0.16, 1, 0.3, 1] as const;

/* ── Filter Categories ── */
const CATEGORIES = ["ALL", "WEB / SOFTWARE", "ECOMMERCE", "CORPORATE"];

/* ── Project Card ── */
function ProjectCard({ project, index }: { project: typeof PROJECTS[number]; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, ease, delay: (index % 3) * 0.1 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        flexDirection: "column",
        background: "var(--surface)",
        borderRadius: "16px",
        overflow: "hidden",
        textDecoration: "none",
        border: "1px solid var(--border)",
        transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        boxShadow: hovered ? "0 20px 40px rgba(0,0,0,0.1), 0 0 0 1px var(--text)" : "0 4px 20px rgba(0,0,0,0.05), 0 0 0 0px transparent",
        cursor: "pointer",
        position: "relative",
      }}
    >
      {/* Image Container */}
      <div style={{
        width: "100%",
        aspectRatio: "16/10",
        background: "var(--border)",
        overflow: "hidden",
        position: "relative",
      }}>
        {/* Real images representation */}
        <div style={{
          position: "absolute", inset: 0,
          background: `url(${project.image}) center/cover no-repeat`,
          transition: "transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
          transform: hovered ? "scale(1.06)" : "scale(1)",
        }} />
        
        {/* Overlay gradient for depth */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to top, rgba(0,0,0,0.2) 0%, transparent 100%)",
          opacity: hovered ? 0 : 1,
          transition: "opacity 0.4s",
        }} />
      </div>

      {/* Content */}
      <div style={{ padding: "24px" }}>
        <h3 style={{
          fontFamily: "var(--font-display)",
          fontWeight: 600,
          fontSize: "1.15rem",
          color: "var(--text)",
          letterSpacing: "-0.02em",
          marginBottom: "8px",
        }}>
          {project.name}
        </h3>
        <p style={{
          fontFamily: "var(--font-body)",
          fontSize: "0.9rem",
          color: "var(--text-sub)",
          lineHeight: 1.5,
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}>
          {project.description}
        </p>
      </div>
    </motion.a>
  );
}

/* ── Section ── */
export default function Projects() {
  return (
    <section
      id="projects"
      className="section"
      style={{ background: "var(--bg)" }}
      aria-label="Selected work"
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
            Projects
          </span>
          <h2 style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: "clamp(2.5rem, 5vw, 4rem)",
            letterSpacing: "-0.03em",
            color: "var(--text)",
            margin: 0,
            lineHeight: 1,
          }}>
            Selected Works
          </h2>
        </div>

        {/* Filters & Count Row */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "16px",
          marginBottom: "40px",
        }}>
          {/* Filters */}
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {CATEGORIES.map((cat, i) => (
              <button key={cat} style={{
                padding: "8px 18px",
                borderRadius: "999px",
                background: i === 0 ? "var(--text)" : "var(--surface)",
                border: "1px solid var(--border)",
                color: i === 0 ? "var(--bg)" : "var(--text-sub)",
                fontFamily: "var(--font-mono)",
                fontSize: "0.75rem",
                fontWeight: 500,
                letterSpacing: "0.05em",
                cursor: "pointer",
                transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
              onMouseEnter={e => {
                if(i !== 0) {
                  (e.currentTarget as HTMLElement).style.color = "var(--text)";
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--text-dim)";
                }
              }}
              onMouseLeave={e => {
                if(i !== 0) {
                  (e.currentTarget as HTMLElement).style.color = "var(--text-sub)";
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                }
              }}>
                {cat}
              </button>
            ))}
          </div>

          {/* Counter Badge */}
          <div style={{
            width: "40px", height: "40px",
            borderRadius: "50%",
            background: "var(--surface)",
            border: "1px solid var(--border)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "var(--font-body)",
            fontSize: "0.9rem",
            fontWeight: 600,
            color: "var(--text)",
          }}>
            {PROJECTS.length}
          </div>
        </div>

        {/* CSS Grid for Cards */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
          gap: "32px",
        }}>
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}

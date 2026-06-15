"use client";

import { motion } from "framer-motion";
import { TRUST_BAR } from "@/lib/constants";

const items = [
  ...TRUST_BAR.stats,
  ...TRUST_BAR.stats,
  ...TRUST_BAR.stats, // Triple for seamless loop
];

export default function TrustBar() {
  return (
    <section
      aria-label="Trust indicators"
      className="relative py-10 overflow-hidden border-y border-white/[0.05]"
    >
      {/* Fade masks */}
      <div className="absolute inset-y-0 left-0 w-32 z-10 pointer-events-none"
        style={{ background: "linear-gradient(90deg, var(--bg) 0%, transparent 100%)" }}
      />
      <div className="absolute inset-y-0 right-0 w-32 z-10 pointer-events-none"
        style={{ background: "linear-gradient(-90deg, var(--bg) 0%, transparent 100%)" }}
      />

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex whitespace-nowrap animate-marquee"
        style={{ width: "max-content" }}
      >
        {items.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-4 mx-8">
            <span className="text-sm font-medium text-white/40 tracking-wide">
              {item.label}
            </span>
            <span className="text-white/15 text-xs">✦</span>
          </span>
        ))}
      </motion.div>

      {/* Tagline below marquee */}
      <div className="flex justify-center mt-6">
        <p className="text-white/20 text-xs font-mono uppercase tracking-widest">
          {TRUST_BAR.tagline}
        </p>
      </div>
    </section>
  );
}

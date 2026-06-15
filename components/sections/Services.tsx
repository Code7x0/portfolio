"use client";

import { motion } from "framer-motion";
import { Monitor, ShoppingBag, Code2, Zap, ArrowUpRight } from "lucide-react";
import { SERVICES, SITE_CONFIG } from "@/lib/constants";

const ICONS = {
  Monitor,
  ShoppingBag,
  Code2,
  Zap,
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export default function Services() {
  return (
    <section
      id="services"
      className="section-padding scroll-mt-20"
      aria-label="Services section"
    >
      <div className="container-narrow">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" as const }}
          className="mb-16"
        >
          <span className="text-label block mb-4">Services</span>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <h2
              className="text-display max-w-md"
              style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}
            >
              What I Build
            </h2>
            <a
              href={SITE_CONFIG.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost self-start sm:self-auto group text-sm"
            >
              Discuss your project
              <ArrowUpRight
                size={14}
                className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 opacity-50"
              />
            </a>
          </div>
        </motion.div>

        {/* Service cards grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          {SERVICES.map((service, index) => {
            const Icon = ICONS[service.icon as keyof typeof ICONS];
            return (
              <motion.div
                key={service.id}
                variants={cardVariants}
                className="card group relative p-8 overflow-hidden glow-border cursor-default"
              >
                {/* Background glow on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.025) 0%, transparent 60%)" }}
                />

                {/* Index number */}
                <span className="absolute top-6 right-6 text-4xl font-display font-bold text-white/[0.04] select-none">
                  0{index + 1}
                </span>

                {/* Icon */}
                <div className="w-10 h-10 flex items-center justify-center rounded-lg border border-white/8 bg-white/[0.04] mb-6 transition-all duration-300 group-hover:border-white/15 group-hover:bg-white/[0.07]">
                  <Icon size={18} className="text-white/50 group-hover:text-white/80 transition-colors duration-300" />
                </div>

                {/* Content */}
                <h3 className="text-heading text-lg text-white mb-3">{service.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{service.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

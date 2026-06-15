"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { FAQ } from "@/lib/constants";

function FAQItem({
  question,
  answer,
  index,
}: {
  question: string;
  answer: string;
  index: number;
}) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: "easeOut" as const }}
      className="accordion-item"
    >
      <button
        className="accordion-trigger"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        id={`faq-trigger-${index}`}
        aria-controls={`faq-content-${index}`}
      >
        <span className="pr-6 text-white/75 hover:text-white transition-colors duration-200 text-[0.95rem] sm:text-base">
          {question}
        </span>
        <motion.span
          className="flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-full border border-white/8 text-white/40 bg-white/[0.03] transition-colors duration-200"
          animate={{ rotate: open ? 0 : 0 }}
        >
          {open ? <Minus size={13} /> : <Plus size={13} />}
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={`faq-content-${index}`}
            role="region"
            aria-labelledby={`faq-trigger-${index}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" as const }}
            className="accordion-content"
          >
            <p className="pb-6 text-white/40 leading-relaxed text-sm sm:text-base">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQSection() {
  return (
    <section
      id="faq"
      className="section-padding scroll-mt-20"
      aria-label="Frequently asked questions"
    >
      <div className="container-narrow">
        <div className="max-w-3xl mx-auto">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" as const }}
            className="mb-14 text-center"
          >
            <span className="text-label block mb-4">FAQ</span>
            <h2
              className="text-display"
              style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}
            >
              Common Questions
            </h2>
          </motion.div>

          {/* Accordion */}
          <div className="border-t border-white/[0.06]">
            {FAQ.map((item, i) => (
              <FAQItem
                key={i}
                question={item.question}
                answer={item.answer}
                index={i}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

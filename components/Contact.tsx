"use client";

import { motion } from "framer-motion";

import { SectionLabel } from "@/components/SectionLabel";
import { fadeUp, stagger } from "@/lib/animations";

const contactLinks = [
  {
    label: "→ gouravjoshi615@gmail.com",
    href: "mailto:gouravjoshi615@gmail.com",
  },
  {
    label: "→ linkedin.com/in/gourav-joshi ↗",
    href: "https://linkedin.com/in/gourav-joshi",
  },
];

export function Contact() {
  return (
    <motion.section
      id="contact"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={stagger}
      className="scroll-mt-24 px-6 py-32 text-center md:px-20 md:scroll-mt-28"
    >
      <motion.div variants={fadeUp} className="flex justify-center">
        <SectionLabel label="contact" />
      </motion.div>
      <motion.h2
        variants={fadeUp}
        custom={1}
        className="mt-4 font-sans text-4xl font-bold text-primary md:text-6xl"
      >
        Let&apos;s build something.
      </motion.h2>
      <motion.p
        variants={fadeUp}
        custom={2}
        className="mx-auto mt-4 max-w-sm font-mono text-sm text-muted"
      >
        Open to backend roles, freelance projects, and interesting problems.
      </motion.p>

      <div className="mt-16 flex flex-col items-center gap-4">
        {contactLinks.map((link, index) => (
          <motion.a
            key={link.label}
            variants={fadeUp}
            custom={index + 3}
            href={link.href}
            target={link.href.startsWith("http") ? "_blank" : undefined}
            rel={link.href.startsWith("http") ? "noreferrer" : undefined}
            className="flex items-center gap-3 border-b border-accent/0 font-mono text-sm text-muted transition-colors duration-200 hover:border-accent/40 hover:text-accent"
          >
            {link.label}
          </motion.a>
        ))}
      </div>

      <motion.div
        variants={fadeUp}
        custom={5}
        className="mt-12 inline-flex items-center gap-2 border border-border px-4 py-2 font-mono text-xs text-muted"
      >
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
        <span>status: available_for_work</span>
      </motion.div>
    </motion.section>
  );
}

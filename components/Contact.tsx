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
    href: "https://www.linkedin.com/in/gourav-joshi-86ba722b1",
  },
  {
    label: "→ github.com/gourav-joshi224 ↗",
    href: "https://github.com/gourav-joshi224",
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
      className="scroll-mt-24 px-6 py-28 md:px-8 md:scroll-mt-28"
    >
      <div className="site-shell mx-auto">
        <motion.div variants={fadeUp}>
          <SectionLabel label="contact" />
        </motion.div>
        <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(280px,0.95fr)]">
          <div>
            <motion.h2
              variants={fadeUp}
              custom={1}
              className="font-display text-[clamp(2.8rem,6vw,5rem)] font-bold leading-[0.96] tracking-[-0.05em] text-text1"
            >
              Let&apos;s build backend systems with fewer surprises.
            </motion.h2>
            <motion.p
              variants={fadeUp}
              custom={2}
              className="body-text mt-5 max-w-xl text-base font-normal text-text2"
            >
              Open to backend roles, freelance builds, and architecture problems
              where reliability, performance, and clean design still matter.
            </motion.p>

            <div className="mt-10 flex flex-col gap-4">
              {contactLinks.map((link, index) => (
                <motion.a
                  key={link.label}
                  variants={fadeUp}
                  custom={index + 3}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                  className="w-fit border-b border-transparent font-mono text-sm text-text2 transition-colors duration-200 hover:border-[color:var(--border-hover)] hover:text-accent"
                >
                  {link.label}
                </motion.a>
              ))}
            </div>
          </div>

          <motion.div variants={fadeUp} custom={6} className="site-panel p-6">
            <div className="font-mono text-[0.72rem] uppercase tracking-[0.16em] text-text3">
              What I&apos;m open to
            </div>

            <div className="mt-5 space-y-3 text-sm text-text2">
              <div>› Full-time backend roles</div>
              <div>› Contract / freelance projects</div>
              <div>› Technical architecture consulting</div>
              <div>› Open source collaboration</div>
            </div>

            <div className="mt-8 border-t border-border pt-4 font-mono text-[0.72rem] uppercase tracking-[0.14em] text-text3">
              Typically responds within 24 hours
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}

"use client";

import { motion } from "framer-motion";

import { SectionLabel } from "@/components/SectionLabel";
import { fadeUp, stagger } from "@/lib/animations";

const workEntry = {
  role: "Backend Developer",
  company: "Unthinkable Solution LLP · Sep 2022 – Present",
  bullets: [
    "Engineered scalable RESTful APIs with NestJS, boosting system efficiency by 20% and cutting request latency by 30%.",
    "Optimized PL/SQL and TypeORM queries achieving 30% faster data retrieval on large datasets.",
    "Shipped consistently in Agile sprints, collaborating across product and design.",
  ],
};

const educationEntries = [
  {
    title: "M.Tech. in Computer Science",
    subtitle: "BITS Pilani · 2022 – Present",
  },
  {
    title: "Bachelor of Computer Application",
    subtitle: "IGNOU · 2018 – 2021",
  },
];

export function Experience() {
  return (
    <motion.section
      id="experience"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={stagger}
      className="scroll-mt-24 bg-surface/30 px-6 py-32 md:px-20 md:scroll-mt-28"
    >
      <motion.div variants={fadeUp}>
        <SectionLabel label="experience" />
      </motion.div>
      <motion.h2
        variants={fadeUp}
        custom={1}
        className="mt-4 font-sans text-3xl font-bold text-primary md:text-4xl"
      >
        Where I&apos;ve worked.
      </motion.h2>

      <div className="relative mx-auto mt-16 max-w-2xl pl-10">
        <div className="absolute left-0 top-0 h-full w-px bg-border" />

        <motion.div variants={fadeUp} custom={2} className="relative pb-12 pl-10">
          <span className="absolute left-[-4px] top-1.5 h-2 w-2 rounded-full bg-accent ring-2 ring-accent/20 ring-offset-2 ring-offset-bg" />
          <h3 className="font-sans text-lg font-bold text-primary">
            {workEntry.role}
          </h3>
          <p className="mt-1 font-mono text-xs text-accent">{workEntry.company}</p>
          <div className="mt-4 space-y-2">
            {workEntry.bullets.map((bullet) => (
              <div key={bullet} className="flex items-start gap-3">
                <span className="font-mono text-accent">›</span>
                <p className="text-sm leading-relaxed text-muted">{bullet}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="mt-12 space-y-10">
          {educationEntries.map((entry, index) => (
            <motion.div
              key={entry.title}
              variants={fadeUp}
              custom={index + 3}
              className="relative pl-10"
            >
              <span className="absolute left-[-4px] top-1.5 h-2 w-2 rounded-full bg-amber ring-2 ring-amber/20 ring-offset-2 ring-offset-bg" />
              <h3 className="font-sans text-lg font-bold text-primary">
                {entry.title}
              </h3>
              <p className="mt-1 font-mono text-xs text-amber">{entry.subtitle}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

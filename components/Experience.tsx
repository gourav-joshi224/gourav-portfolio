"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

import { SectionLabel } from "@/components/SectionLabel";
import { fadeUp, stagger } from "@/lib/animations";

type Metric = {
  value: string;
  label: string;
};

type WorkEntry = {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
  bullets: string[];
  tech: string[];
  metrics: Metric[];
};

type EducationEntry = {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
};

const entries: Array<WorkEntry | EducationEntry> = [
  {
    id: "unthinkable",
    role: "Associate Software Engineer → Backend Developer",
    company: "UNTHINKABLE SOLUTION LLP",
    period: "Sep 2022 – Present",
    description:
      "I work across platform APIs, payments, and high-load backend systems where reliability matters more than novelty.",
    bullets: [
      "Rebuilt the API layer for ITPO venue booking using NestJS, reducing response latency by 30% and cutting server errors during peak load by 65%.",
      "Designed and shipped a payment + refund microservice with full webhook lifecycle handling, including retry logic, idempotency keys, and failure recovery, processing thousands of transactions without data loss.",
      "Optimized 15+ complex PostgreSQL queries using TypeORM, achieving 30% faster data retrieval on datasets exceeding 100k rows, measured and verified with EXPLAIN ANALYZE.",
    ],
    tech: ["NestJS", "PostgreSQL", "TypeORM", "AWS", "Docker"],
    metrics: [
      { value: "30%", label: "latency reduced" },
      { value: "3+", label: "microservices shipped" },
      { value: "100k+", label: "rows optimized" },
    ],
  },
  {
    id: "bits",
    role: "M.Tech. in Computer Science",
    company: "BITS PILANI",
    period: "2022 – Present",
    description:
      "Specializing in computer science with focus on distributed systems and algorithms. Part-time while working full-time.",
  },
  {
    id: "ignou",
    role: "Bachelor of Computer Application",
    company: "IGNOU",
    period: "2018 – 2021",
    description:
      "Foundation in computer applications, data structures, and software engineering principles.",
  },
];

function isWorkEntry(entry: WorkEntry | EducationEntry): entry is WorkEntry {
  return "bullets" in entry;
}

export function Experience() {
  const [openEntry, setOpenEntry] = useState("unthinkable");

  return (
    <motion.section
      id="experience"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={stagger}
      className="scroll-mt-24 px-6 py-28 md:px-8 md:scroll-mt-28"
    >
      <div className="mx-auto max-w-[1200px]">
        <motion.div variants={fadeUp}>
          <SectionLabel label="experience" />
        </motion.div>
        <motion.h2
          variants={fadeUp}
          custom={1}
          className="mt-6 font-display text-[clamp(2.6rem,5vw,3.5rem)] font-bold tracking-[-0.04em] text-text1"
        >
          Experience with measurable output.
        </motion.h2>

        <div className="mt-14 space-y-4">
          {entries.map((entry, index) => {
            const isOpen = openEntry === entry.id;

            return (
              <motion.div
                key={entry.id}
                variants={fadeUp}
                custom={index + 2}
                className="site-panel overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setOpenEntry((current) => (current === entry.id ? "" : entry.id))}
                  className="flex w-full items-center justify-between gap-4 p-6 text-left"
                >
                  <div>
                    <div className="font-display text-2xl font-semibold tracking-[-0.03em] text-text1">
                      {entry.role}
                    </div>
                    <div className="mt-2 font-mono text-[0.72rem] uppercase tracking-[0.16em] text-accent">
                      {entry.company}
                    </div>
                  </div>

                  <div className="flex items-center gap-5">
                    <span className="font-mono text-[0.72rem] uppercase tracking-[0.16em] text-text3">
                      {entry.period}
                    </span>
                    <span
                      className={`font-mono text-xl text-text3 transition-transform duration-300 ${
                        isOpen ? "rotate-45 text-accent" : ""
                      }`}
                    >
                      +
                    </span>
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden border-t border-border"
                    >
                      <div className="p-6 pt-5">
                        <p className="body-text max-w-3xl text-base font-normal text-text2">
                          {entry.description}
                        </p>

                        {isWorkEntry(entry) ? (
                          <>
                            <div className="mt-6 space-y-4">
                              {entry.bullets.map((bullet) => (
                                <div key={bullet} className="flex items-start gap-3">
                                  <span className="mt-0.5 font-mono text-accent">›</span>
                                  <p className="body-text text-base font-normal text-text2">
                                    {bullet}
                                  </p>
                                </div>
                              ))}
                            </div>

                            <div className="mt-6 flex flex-wrap gap-2">
                              {entry.tech.map((tech) => (
                                <span
                                  key={tech}
                                  className="border border-border px-3 py-1 font-mono text-[0.72rem] uppercase tracking-[0.12em] text-text2"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>

                            <div className="mt-8 grid gap-4 sm:grid-cols-3">
                              {entry.metrics.map((metric) => (
                                <div
                                  key={metric.label}
                                  className="border border-border bg-surface2 p-4"
                                >
                                  <div className="font-display text-3xl font-semibold text-accent">
                                    {metric.value}
                                  </div>
                                  <div className="mt-2 font-mono text-[0.72rem] uppercase tracking-[0.14em] text-text3">
                                    {metric.label}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </>
                        ) : null}
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}

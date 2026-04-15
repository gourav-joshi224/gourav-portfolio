"use client";

import { motion } from "framer-motion";

import { SectionLabel } from "@/components/SectionLabel";
import { fadeUp, stagger } from "@/lib/animations";

const terminalLines = [
  { text: "$ whoami", tone: "command" },
  { text: "gourav_joshi", tone: "output" },
  { text: "$ cat role.txt", tone: "command" },
  { text: "Backend Developer", tone: "output" },
  { text: "$ cat status.txt", tone: "command" },
  { text: "Available for opportunities", tone: "output" },
  { text: "$ uptime", tone: "command" },
  { text: "3+ years in production", tone: "output" },
  { text: "$ git log --oneline -3", tone: "command" },
  { text: "a3f8b21 feat: AI interview evaluation engine", tone: "log" },
  { text: "b92c441 fix: webhook retry with exponential backoff", tone: "log" },
  { text: "c4d1093 perf: 30% query optimization on booking system", tone: "log" },
  { text: "$ echo $LOCATION", tone: "command" },
  { text: "India 🇮🇳", tone: "output" },
];

export function About() {
  return (
    <motion.section
      id="about"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={stagger}
      className="scroll-mt-24 px-4 py-20 sm:px-6 sm:py-24 md:px-8 md:py-28 md:scroll-mt-28"
    >
      <div className="mx-auto max-w-[900px]">
        <motion.div variants={fadeUp}>
          <SectionLabel label="about_me" />
        </motion.div>

        <motion.h2
          variants={fadeUp}
          custom={1}
          className="pull-quote mt-6 max-w-[680px] font-display text-[clamp(1.6rem,5vw,3.5rem)] font-bold text-text1"
        >
          I&apos;ve shipped backend systems for government AI platforms, trade
          fair booking engines, and AI interview tools. I care about the code
          that runs behind the scenes.
        </motion.h2>

        <div className="mt-10 grid gap-8 sm:mt-12 sm:gap-10 md:mt-14 md:grid-cols-[minmax(0,1.15fr)_minmax(260px,0.85fr)]">
          <motion.div variants={fadeUp} custom={2}>
            <p className="body-text mb-5 border-l-2 border-border pl-4 text-base font-normal leading-[1.82] text-text2 sm:mb-6">
              I design and build backend infrastructure, from NestJS
              microservices to PostgreSQL schemas and event-driven pipelines,
              for systems that need to stay up.
            </p>
            <p className="body-text mb-5 border-l-2 border-border pl-4 text-base font-normal leading-[1.82] text-text2 sm:mb-6">
              I&apos;m obsessed with the invisible: latency that nobody notices,
              database queries that never timeout, APIs that fail gracefully.
              Clean code isn&apos;t aesthetic preference; it&apos;s risk
              management.
            </p>
            <p className="body-text border-l-2 border-border pl-4 text-base font-normal leading-[1.82] text-text2">
              I&apos;m also mid-way through an M.Tech at BITS Pilani, which
              means I spend evenings reading distributed systems papers instead
              of watching Netflix. Make of that what you will.
            </p>
          </motion.div>

          <motion.div variants={fadeUp} custom={3} className="site-panel p-5 md:p-6">
            <div className="mb-5 flex items-center gap-2 border-b border-border pb-3">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-[rgba(0,255,135,0.7)]" />
              <span className="ml-2 font-mono text-[0.72rem] uppercase tracking-[0.16em] text-text3">
                gourav@portfolio:~
              </span>
            </div>

            <div className="space-y-2 font-mono text-[0.78rem] leading-7">
              {terminalLines.map((line, index) => (
                <motion.div
                  key={`${line.text}-${index}`}
                  variants={fadeUp}
                  custom={index * 0.35}
                  className={
                    line.tone === "command"
                      ? "text-accent"
                      : line.tone === "output"
                        ? "text-text1"
                        : "text-text2"
                  }
                >
                  {line.text}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}

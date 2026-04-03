"use client";

import { motion } from "framer-motion";

import { GlassCard } from "@/components/GlassCard";
import { SectionLabel } from "@/components/SectionLabel";
import { fadeUp, stagger } from "@/lib/animations";

const terminalLines = [
  "$ whoami",
  "gourav_joshi",
  "",
  "$ cat status.txt",
  "Available for opportunities",
  "",
  "$ uptime",
  "3+ years in production",
  "",
  "$ echo $LOCATION",
  "India 🇮🇳",
];

export function About() {
  return (
    <motion.section
      id="about"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={stagger}
      className="scroll-mt-24 px-6 py-32 md:px-20 md:scroll-mt-28"
    >
      <div className="grid grid-cols-1 gap-16 md:grid-cols-5">
        <div className="md:col-span-3">
          <motion.div variants={fadeUp}>
            <SectionLabel label="about_me" />
          </motion.div>
          <motion.h2
            variants={fadeUp}
            custom={1}
            className="mt-4 font-sans text-3xl font-bold text-primary md:text-4xl"
          >
            The engineer behind the architecture.
          </motion.h2>
          <motion.div
            variants={fadeUp}
            custom={2}
            className="mt-4 font-sans"
          >
            <p className="mb-6 border-l border-accent/15 pl-4 text-base leading-[1.9] text-neutral-400">
              I&apos;m Gourav — a backend developer currently at Unthinkable
              Solutions, where I architect APIs and microservices that handle
              real-world scale.
            </p>
            <p className="mb-6 border-l border-accent/15 pl-4 text-base leading-[1.9] text-neutral-400">
              I care deeply about system design: clean separation of concerns,
              minimal latency, and code that the next developer won&apos;t curse
              me for.
            </p>
            <p className="border-l border-accent/15 pl-4 text-base leading-[1.9] text-neutral-400">
              When I&apos;m not pushing commits, I&apos;m pursuing my M.Tech at
              BITS Pilani and exploring everything from distributed systems to
              database internals.
            </p>
          </motion.div>
        </div>

        <div className="md:col-span-2">
          <GlassCard className="p-6 md:p-8" index={3}>
            <div className="mb-4 flex items-center gap-2 border-b border-border pb-3">
              <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-accent/70" />
              <span className="ml-2 font-mono text-xs text-muted">
                gourav@portfolio:~
              </span>
            </div>

            <div className="space-y-1 font-mono text-xs leading-7">
              {terminalLines.map((line, index) => {
                if (!line) {
                  return <div key={`empty-${index}`} className="h-2" />;
                }

                const isCommand = line.startsWith("$");

                return (
                  <motion.div
                    key={line}
                    variants={fadeUp}
                    custom={index * 2}
                    className={
                      isCommand
                        ? "text-accent"
                        : line === "Available for opportunities"
                          ? "text-primary"
                          : "text-muted"
                    }
                  >
                    {line}
                  </motion.div>
                );
              })}
            </div>
          </GlassCard>
        </div>
      </div>
    </motion.section>
  );
}

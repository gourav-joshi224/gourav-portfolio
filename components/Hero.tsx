"use client";

import { animate, motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import { fadeUp, stagger } from "@/lib/animations";

const heroLines = [
  { text: "I build", accent: false, size: "text-[clamp(4.3rem,11vw,8rem)]" },
  { text: "systems", accent: true, size: "text-[clamp(4.3rem,11vw,8rem)]" },
  { text: "that scale.", accent: false, size: "text-[clamp(3.4rem,8vw,5.5rem)]" },
];

const tickerItems = [
  "Node.js",
  "NestJS",
  "PostgreSQL",
  "TypeScript",
  "Redis",
  "Docker",
  "AWS",
  "Microservices",
  "REST APIs",
  "TypeORM",
  "JWT",
  "OAuth2",
  "MongoDB",
  "Firebase",
];

function StatCounter({
  value,
  suffix = "",
  label,
}: {
  value: number;
  suffix?: string;
  label: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, amount: 0.8 });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) {
      return;
    }

    const controls = animate(0, value, {
      duration: 1.2,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => setDisplayValue(Math.round(latest)),
    });

    return () => controls.stop();
  }, [isInView, value]);

  return (
    <div ref={ref} className="min-w-[96px]">
      <div className="font-display text-4xl font-semibold leading-none text-accent">
        {displayValue}
        {suffix}
      </div>
      <div className="mt-2 font-mono text-[0.72rem] uppercase tracking-[0.14em] text-text3">
        {label}
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <motion.section
      id="hero"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={stagger}
      className="relative min-h-screen scroll-mt-24 overflow-hidden px-6 pb-24 pt-24 md:px-8 md:scroll-mt-28"
    >
      <div className="grid-dots absolute inset-0 opacity-60" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,255,135,0.12),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(200,255,0,0.05),transparent_18%)]" />

      <div className="relative z-10 mx-auto grid min-h-[calc(100vh-6rem)] max-w-[1200px] items-center gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(360px,0.9fr)]">
        <div className="max-w-[680px]">
          <motion.div
            variants={fadeUp}
            className="inline-flex w-fit items-center gap-2 border border-border px-3 py-1 font-mono text-[0.72rem] uppercase tracking-[0.14em] text-text3"
          >
            <span className="status-dot h-2 w-2 rounded-full bg-accent" />
            Available for opportunities
          </motion.div>

          <motion.h1
            variants={fadeUp}
            custom={1}
            className="hero-headline mt-8 space-y-2 font-display font-bold"
          >
            {heroLines.map((line, index) => (
              <motion.div
                key={line.text}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.15,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`block ${line.size} ${
                  line.accent ? "text-accent" : "text-text1"
                }`}
              >
                {line.text}
              </motion.div>
            ))}
          </motion.h1>

          <motion.p
            variants={fadeUp}
            custom={3}
            className="body-text mt-8 max-w-xl text-lg font-normal text-text2"
          >
            Backend developer at Unthinkable Solutions. 3+ years shipping NestJS
            APIs, PostgreSQL systems, and event-driven architecture at
            production scale.
          </motion.p>

          <motion.div
            variants={fadeUp}
            custom={4}
            className="mt-8 flex flex-wrap items-start gap-6"
          >
            <StatCounter value={3} suffix="+" label="years experience" />
            <div className="hidden h-14 w-px bg-border sm:block" />
            <StatCounter value={20} suffix="%" label="latency reduced" />
            <div className="hidden h-14 w-px bg-border sm:block" />
            <StatCounter value={3} label="production systems" />
          </motion.div>

          <motion.div
            variants={fadeUp}
            custom={5}
            className="mt-10 flex flex-wrap gap-4"
          >
            <motion.a
              href="#projects"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="site-button-primary px-6 py-3 font-mono text-[0.72rem] uppercase tracking-[0.16em]"
            >
              View Projects
            </motion.a>
            <motion.a
              href="/gourav-joshi-cv.pdf"
              download
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="site-button-secondary px-6 py-3 font-mono text-[0.72rem] uppercase tracking-[0.16em] transition-colors duration-200 hover:border-[rgba(0,255,135,0.3)] hover:text-accent"
            >
              Download CV
            </motion.a>
          </motion.div>
        </div>

        <motion.div variants={fadeUp} custom={6} className="site-panel relative overflow-hidden p-6 lg:p-8">
          <div className="accent-grid absolute inset-x-8 top-8 h-40 opacity-60" />
          <div className="relative min-h-[420px]">
            <div className="pointer-events-none absolute inset-x-0 top-0 font-display text-[8rem] font-semibold leading-none tracking-[-0.08em] text-[rgba(255,255,255,0.07)] sm:text-[9rem]">
              GJ
            </div>

            <div className="relative mt-40 space-y-4">
              <div className="border border-border bg-surface2 p-4">
                <div className="font-mono text-[0.72rem] uppercase tracking-[0.16em] text-text3">
                  Currently building
                </div>
                <div className="mt-2 flex items-center gap-2 text-sm text-text1">
                  <span className="status-dot h-2 w-2 rounded-full bg-accent" />
                  AI-powered interview systems
                </div>
              </div>

              <div className="border border-border bg-surface2 p-4">
                <div className="font-mono text-[0.72rem] uppercase tracking-[0.16em] text-text3">
                  Primary stack
                </div>
                <div className="mt-2 text-sm text-text1">
                  Node · NestJS · PostgreSQL
                </div>
              </div>

              <div className="border border-border bg-surface2 p-4">
                <div className="font-mono text-[0.72rem] uppercase tracking-[0.16em] text-text3">
                  Based in
                </div>
                <div className="mt-2 text-sm text-text1">
                  India 🇮🇳 · Open to remote
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 w-full overflow-hidden border-t border-border bg-[rgba(8,8,8,0.78)] py-4 backdrop-blur-sm">
        <div className="marquee-track">
          {[...tickerItems, ...tickerItems].map((item, index) => (
            <span
              key={`${item}-${index}`}
              className="pr-8 font-mono text-[0.72rem] uppercase tracking-[0.12em] text-[#222222]"
            >
              {item} ·
            </span>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

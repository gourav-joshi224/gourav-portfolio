"use client";

import { motion } from "framer-motion";

import { fadeUp, stagger } from "@/lib/animations";

const heroLines = [
  { text: "I build", accent: false, size: "text-[clamp(3rem,12vw,8rem)]" },
  { text: "systems", accent: true, size: "text-[clamp(3rem,12vw,8rem)]" },
  { text: "that scale.", accent: false, size: "text-[clamp(2.45rem,9vw,5.5rem)]" },
];

const tickerItems = [
  "Node.js",
  "NestJS",
  "PostgreSQL",
  "TypeScript",
  "Python",
  "Redis",
  "Docker",
  "AWS",
  "Lambda",
  "S3",
  "SNS",
  "SQS",
  "Microservices",
  "REST APIs",
  "TypeORM",
  "JWT",
  "OAuth2",
  "MongoDB",
  "Firebase",
];

const stats = [
  { value: "5+", label: "Production Systems" },
  { value: "3", label: "Govt. Platforms" },
  { value: "3+", label: "Years in Production" },
];

const projects = [
  "ITPO Booking",
  "AI Kosha",
  "DPDP",
  "UMANG",
  "Interview Instructor",
];

export function Hero() {
  return (
    <motion.section
      id="hero"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={stagger}
      className="relative scroll-mt-24 overflow-hidden px-4 pb-20 pt-20 sm:min-h-screen sm:px-6 sm:pb-24 sm:pt-24 md:px-8 md:scroll-mt-28"
    >
      <div className="grid-dots absolute inset-0 opacity-60" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at top right, var(--bg-glow-1), transparent 24%), radial-gradient(circle at bottom left, var(--bg-glow-2), transparent 18%)",
        }}
      />

      <div className="site-shell relative z-10 mx-auto grid min-h-[calc(100vh-6rem)] items-start gap-8 sm:items-center sm:gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(280px,0.9fr)] lg:gap-12">
        <div className="max-w-[680px]">
          <motion.div
            variants={fadeUp}
            className="inline-flex min-h-9 w-fit items-center gap-2 border border-border px-3 py-1.5 font-mono text-[0.72rem] uppercase tracking-[0.14em] text-text3"
          >
            <span className="status-dot h-2 w-2 rounded-full bg-accent" />
            Available for opportunities
          </motion.div>

          <motion.h1
            variants={fadeUp}
            custom={1}
            aria-label="I build systems that scale."
            className="hero-headline mt-7 space-y-1.5 sm:mt-8 sm:space-y-2 font-display font-bold"
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
            className="body-text mt-6 max-w-xl text-base font-normal leading-[1.82] text-text2 sm:mt-8 sm:text-lg"
          >
            Backend developer with 3+ years shipping NestJS APIs, PostgreSQL
            systems, and event-driven architecture for production workloads.
          </motion.p>

          <motion.div
            variants={fadeUp}
            custom={4}
            className="mt-8 grid grid-cols-3 gap-4 sm:flex sm:flex-wrap sm:items-start sm:gap-6"
          >
            {stats.map((stat, index) => (
              <div key={stat.label} className="min-w-0">
                <div
                  className={`font-display text-[1.7rem] font-bold leading-none sm:text-3xl ${
                    index === 0 ? "text-accent" : "text-text1"
                  }`}
                >
                  {stat.value}
                </div>
                <div className="mt-2 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-text3 sm:text-[0.72rem]">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>

          <div className="mb-0 mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 sm:gap-x-6">
            <span className="font-mono text-xs uppercase tracking-widest text-text3">
              Shipped for →
            </span>
            {projects.map((project, index) => {
              const isGovernmentProject = project === "DPDP" || project === "UMANG" || project === "ITPO Booking" || project === "AI Kosha";

              return (
                <span key={project} className="inline-flex items-center gap-2">
                  <span className={isGovernmentProject ? "text-accent" : "text-text3"}>
                    {isGovernmentProject ? "●" : "○"}
                  </span>
                  <span className="font-mono text-xs text-text3">{project}</span>
                  {index < projects.length - 1 ? (
                    <span className="text-text3">·</span>
                  ) : null}
                </span>
              );
            })}
          </div>

          <motion.div
            variants={fadeUp}
            custom={5}
            className="mt-8 flex flex-wrap gap-3 sm:mt-10 sm:gap-4"
          >
            <motion.a
              href="#projects"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="site-button-primary min-h-11 px-5 py-3 font-mono text-[0.72rem] uppercase tracking-[0.16em] sm:px-6"
            >
              View Projects
            </motion.a>
            <motion.a
              href="/gourav-joshi-cv.pdf"
              download
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="site-button-secondary min-h-11 px-5 py-3 font-mono text-[0.72rem] uppercase tracking-[0.16em] transition-colors duration-200 hover:border-[color:var(--border-hover)] hover:text-accent sm:px-6"
            >
              Download CV
            </motion.a>
          </motion.div>
        </div>

        <motion.div variants={fadeUp} custom={6} className="site-panel relative overflow-hidden p-5 sm:p-6 lg:p-8">
          <div className="accent-grid absolute inset-x-8 top-8 h-40 opacity-60" />
          <div className="relative min-h-[288px] sm:min-h-[420px]">
            <div
              className="pointer-events-none absolute inset-x-0 top-0 font-display text-[6.3rem] font-semibold leading-none tracking-[-0.08em] sm:text-[9rem]"
              style={{ color: "var(--hero-mark)" }}
            >
              GJ
            </div>

            <div className="relative mt-28 space-y-3.5 sm:mt-40 sm:space-y-4">
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

      <div
        className="absolute bottom-0 left-0 w-full overflow-hidden border-t border-border py-4 backdrop-blur-sm"
        style={{ background: "var(--marquee-bg)" }}
      >
        <div className="marquee-track">
          {[...tickerItems, ...tickerItems].map((item, index) => (
            <span
              key={`${item}-${index}`}
              className="pr-8 font-mono text-[0.72rem] uppercase tracking-[0.12em]"
              style={{ color: "var(--marquee-text)" }}
            >
              {item} ·
            </span>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

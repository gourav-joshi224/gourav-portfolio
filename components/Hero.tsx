"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import { fadeUp, stagger } from "@/lib/animations";

const bootLine = "> initializing portfolio.sh";
const lineOne = ["I", "build", "systems"];
const lineTwo = ["that", "don't", "break."];
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

export function Hero() {
  const [typedText, setTypedText] = useState("");

  useEffect(() => {
    let index = 0;

    const interval = window.setInterval(() => {
      index += 1;
      setTypedText(bootLine.slice(0, index));

      if (index >= bootLine.length) {
        window.clearInterval(interval);
      }
    }, 60);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <motion.section
      id="hero"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={stagger}
      className="relative flex min-h-screen scroll-mt-24 items-center overflow-hidden px-6 pt-28 md:px-20 md:scroll-mt-28"
    >
      <div
        className="absolute inset-0 opacity-80"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at center, transparent 0%, rgba(8,8,8,0.08) 45%, rgba(8,8,8,0.92) 100%)",
        }}
      />

      <div className="relative z-10 max-w-3xl">
        <div className="mb-6 flex items-center gap-1 font-mono text-sm text-accent">
          <span>{typedText}</span>
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY }}
          >
            _
          </motion.span>
        </div>

        <div className="space-y-2">
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            {lineOne.map((word, index) => (
              <motion.span
                key={word}
                variants={fadeUp}
                custom={index * 1.5}
                className="font-sans text-4xl font-extrabold leading-none text-primary sm:text-5xl md:text-7xl"
              >
                {word}
              </motion.span>
            ))}
          </div>

          <div className="ml-8 flex flex-wrap gap-x-4 gap-y-2 md:ml-16">
            {lineTwo.map((word, index) => (
              <motion.span
                key={word}
                variants={fadeUp}
                custom={(index + lineOne.length) * 1.5}
                className="font-sans text-4xl font-extrabold leading-none text-primary sm:text-5xl md:text-7xl"
              >
                {word}
              </motion.span>
            ))}
          </div>
        </div>

        <motion.p
          variants={fadeUp}
          custom={7}
          className="mt-6 max-w-md font-mono text-sm leading-relaxed text-muted"
        >
          Backend developer. 3+ years shipping scalable APIs, microservices, and
          event-driven architecture with Node.js, NestJS &amp; PostgreSQL.
        </motion.p>

        <motion.div
          variants={fadeUp}
          custom={8}
          className="mt-10 flex flex-wrap gap-4"
        >
          <motion.a
            href="#projects"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="rounded-none bg-accent px-6 py-3 font-mono text-xs uppercase tracking-widest text-bg transition hover:bg-accent/90"
          >
            View Projects
          </motion.a>
          <motion.a
            href="/gourav-joshi-cv.pdf"
            download
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="rounded-none border border-border px-6 py-3 font-mono text-xs uppercase tracking-widest text-primary transition hover:border-accent/40 hover:text-accent"
          >
            Download CV
          </motion.a>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 w-full overflow-hidden border-t border-border bg-bg/60 py-4 backdrop-blur-sm">
        <div className="marquee-track">
          {[...tickerItems, ...tickerItems].map((item, index) => (
            <span
              key={`${item}-${index}`}
              className="pr-8 font-mono text-xs text-dim"
            >
              {item} ·
            </span>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

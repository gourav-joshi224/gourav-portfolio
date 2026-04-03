"use client";

import { motion } from "framer-motion";

import { GlassCard } from "@/components/GlassCard";
import { SectionLabel } from "@/components/SectionLabel";
import { fadeUp, stagger } from "@/lib/animations";

const skillGroups = [
  { label: "Languages", tags: ["JavaScript (ES6+)", "TypeScript", "SQL"] },
  { label: "Frameworks", tags: ["Node.js", "NestJS", "Express"] },
  { label: "Databases", tags: ["PostgreSQL", "MongoDB", "TypeORM"] },
  {
    label: "Cloud & Infra",
    tags: ["AWS S3", "AWS SES", "AWS SNS", "Docker", "Firebase"],
  },
  { label: "Auth & Security", tags: ["JWT", "OAuth2", "RBAC", "Encryption"] },
  {
    label: "Dev Practices",
    tags: ["Microservices", "REST APIs", "Redis", "CI/CD", "Agile"],
  },
];

export function Skills() {
  return (
    <motion.section
      id="skills"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={stagger}
      className="scroll-mt-24 px-6 py-32 md:px-20 md:scroll-mt-28"
    >
      <motion.div variants={fadeUp}>
        <SectionLabel label="tech_stack" />
      </motion.div>
      <motion.h2
        variants={fadeUp}
        custom={1}
        className="mt-4 font-sans text-3xl font-bold text-primary md:text-4xl"
      >
        What I work with.
      </motion.h2>

      <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group, index) => (
          <GlassCard key={group.label} index={index + 2} className="p-6">
            <div className="mb-4 font-mono text-xs uppercase tracking-widest text-muted">
              {group.label}
            </div>
            <motion.div variants={stagger} className="flex flex-wrap gap-2">
              {group.tags.map((tag, tagIndex) => (
                <motion.span
                  key={tag}
                  variants={fadeUp}
                  custom={tagIndex}
                  className="rounded-none border border-border px-3 py-1.5 font-mono text-xs text-primary transition-all duration-200 hover:border-accent/40 hover:bg-accent-dim hover:text-accent"
                >
                  {tag}
                </motion.span>
              ))}
            </motion.div>
          </GlassCard>
        ))}
      </div>
    </motion.section>
  );
}

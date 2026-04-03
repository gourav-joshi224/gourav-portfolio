"use client";

import { motion } from "framer-motion";

import { GlassCard } from "@/components/GlassCard";
import { SectionLabel } from "@/components/SectionLabel";
import { fadeUp, stagger } from "@/lib/animations";

const projects = [
  {
    name: "ITPO Venue Booking System",
    tags: ["NestJS", "TypeORM", "PostgreSQL", "JWT", "OAuth2"],
    description:
      "Payment & refund microservice with full webhook lifecycle. Real-time hall availability engine with dynamic date handling.",
    url: "https://booking.indiatradefair.com/",
  },
  {
    name: "AI Kosha",
    tags: ["NestJS", "TypeORM", "REST API", "TypeScript"],
    description:
      "Backend infrastructure for India's national AI platform. High-throughput APIs handling large datasets with token-based auth.",
    url: "https://aikosh.indiaai.gov.in/home",
  },
  {
    name: "Interview Instructor",
    tags: ["Next.js", "NestJS", "AI", "PostgreSQL", "REST API"],
    description:
      "AI-powered mock interview platform. Conducts real-time interviews, evaluates answers intelligently, and gives structured feedback to help candidates improve.",
    url: "https://interview-instructor.onrender.com/",
  },
];

export function Projects() {
  return (
    <motion.section
      id="projects"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={stagger}
      className="scroll-mt-24 bg-transparent px-6 py-32 md:px-20 md:scroll-mt-28"
    >
      <motion.div variants={fadeUp}>
        <SectionLabel label="key_projects" />
      </motion.div>
      <motion.h2
        variants={fadeUp}
        custom={1}
        className="mt-4 font-sans text-3xl font-bold text-primary md:text-4xl"
      >
        Things I&apos;ve shipped.
      </motion.h2>
      <motion.p
        variants={fadeUp}
        custom={2}
        className="mt-2 font-mono text-xs text-muted"
      >
        Selected work from production systems.
      </motion.p>

      <div className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-3">
        {projects.map((project, index) => (
          <GlassCard
            key={project.name}
            index={index + 3}
            className="group h-full p-8"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.02)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              borderColor: "rgba(255, 255, 255, 0.06)",
              borderTopColor: "rgba(0, 255, 135, 0.15)",
            }}
            whileHover={{
              y: -4,
              backgroundColor: "rgba(255, 255, 255, 0.04)",
              borderColor: "rgba(0, 255, 135, 0.25)",
              borderTopColor: "rgba(0, 255, 135, 0.25)",
              boxShadow: "0 0 32px rgba(0, 255, 135, 0.05)",
            }}
          >
            <div className="mb-6 h-px w-8 bg-accent" />
            <h3 className="font-sans text-lg font-bold text-primary">
              {project.name}
            </h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-none bg-accent-dim px-2 py-0.5 font-mono text-xs text-accent"
                >
                  {tag}
                </span>
              ))}
            </div>
            <p className="mt-4 font-sans text-sm leading-relaxed text-muted">
              {project.description}
            </p>
            <div className="mt-8 flex items-center justify-between border-t border-border pt-6">
              <span className="font-mono text-xs text-muted">View Project</span>
              <a
                href={project.url}
                target="_blank"
                rel="noreferrer"
                className="font-mono text-lg text-muted transition-all duration-200 group-hover:translate-x-1 group-hover:text-accent"
                aria-label={`View ${project.name}`}
              >
                ↗
              </a>
            </div>
          </GlassCard>
        ))}
      </div>
    </motion.section>
  );
}

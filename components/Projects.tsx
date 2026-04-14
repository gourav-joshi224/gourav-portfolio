"use client";

import { motion } from "framer-motion";
import Link from "next/link";

import { SectionLabel } from "@/components/SectionLabel";
import { fadeUp, stagger } from "@/lib/animations";

const projects = [
  {
    number: "01",
    name: "ITPO Venue Booking System",
    role: "Backend Developer · 2023 – Present",
    tags: ["NestJS", "TypeORM", "PostgreSQL", "JWT", "OAuth2"],
    description:
      "India Trade Fair needed a real-time venue booking engine handling thousands of concurrent reservations with zero double-bookings. I built the payment microservice, refund webhook lifecycle, and hall availability system.",
    url: "https://booking.indiatradefair.com/",
    caseStudyUrl: "/blog/nestjs-vs-express-production",
    scale: "Production",
    projectRole: "Backend Developer",
    stack: "NestJS · PostgreSQL · TypeORM",
    status: "Live",
  },
  {
    number: "02",
    name: "AI Kosha",
    role: "Backend Developer · 2024 – Present",
    tags: ["NestJS", "TypeORM", "REST API", "TypeScript"],
    description:
      "India's national AI platform needed a backend that could serve high-volume API traffic from researchers and government agencies. I architected the data retrieval layer and token-based auth system.",
    url: "https://aikosh.indiaai.gov.in/home",
    caseStudyUrl: "/blog/ai-backend-architecture-shift",
    scale: "Production",
    projectRole: "Backend Developer",
    stack: "NestJS · PostgreSQL · REST APIs",
    status: "Live",
  },
  {
    number: "03",
    name: "Interview Instructor",
    role: "Builder · Personal Project",
    tags: ["Next.js", "NestJS", "AI", "PostgreSQL", "REST API"],
    description:
      "I built this as a personal project to explore AI-driven evaluation. It conducts real interviews using NestJS + Next.js, evaluates answers with an LLM, and generates structured feedback reports.",
    url: "https://interview-instructor.onrender.com/",
    caseStudyUrl: "/blog/ai-backend-architecture-shift",
    scale: "Personal project",
    projectRole: "Backend + Product",
    stack: "NestJS · Next.js · PostgreSQL",
    status: "In development",
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
      className="scroll-mt-24 bg-transparent px-6 py-28 md:px-8 md:scroll-mt-28"
    >
      <div className="site-shell mx-auto">
        <motion.div variants={fadeUp}>
          <SectionLabel label="key_projects" />
        </motion.div>
        <motion.h2
          variants={fadeUp}
          custom={1}
          className="mt-6 font-display text-[clamp(1.6rem,5vw,3.5rem)] font-bold tracking-[-0.04em] text-text1"
        >
          Systems with real stakes.
        </motion.h2>
        <motion.p
          variants={fadeUp}
          custom={2}
          className="body-text mt-4 max-w-2xl text-base font-normal text-text2"
        >
          Production work across booking, AI infrastructure, and applied LLM
          systems.
        </motion.p>

        <div className="mt-14">
          {projects.map((project, index) => (
            <motion.article
              key={project.name}
              variants={fadeUp}
              custom={index + 3}
              className="group grid gap-8 border-t border-border py-12 transition-colors duration-300 hover:border-[color:var(--border-hover)] lg:grid-cols-[minmax(0,1.08fr)_minmax(300px,0.92fr)]"
            >
              <div>
                <div className="font-mono text-[0.72rem] uppercase tracking-[0.18em] text-text3">
                  {project.number} /
                </div>
                <h3 className="mt-3 font-display text-[clamp(1.5rem,4vw,3rem)] font-semibold leading-[1.06] tracking-[-0.04em] text-text1">
                  {project.name}
                </h3>
                <div className="mt-4 font-mono text-[0.72rem] uppercase tracking-[0.16em] text-accent">
                  {project.role}
                </div>
                <p className="body-text mt-5 max-w-[540px] text-base font-normal text-text2">
                  {project.description}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="border border-border px-3 py-1 font-mono text-[0.72rem] uppercase tracking-[0.12em] text-text2"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-8 flex flex-wrap gap-6">
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noreferrer"
                    className="font-mono text-[0.72rem] uppercase tracking-[0.16em] text-text1 transition-colors duration-200 hover:text-accent"
                  >
                    View Live ↗
                  </a>
                  <Link
                    href={project.caseStudyUrl}
                    className="font-mono text-[0.72rem] uppercase tracking-[0.16em] text-text3 transition-colors duration-200 hover:text-accent"
                  >
                    Case Study →
                  </Link>
                </div>
              </div>

              <div className="site-panel border-l-2 border-l-transparent p-6 transition-all duration-300 group-hover:translate-x-px group-hover:border-l-accent">
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-border pb-4">
                    <span className="font-mono text-[0.72rem] uppercase tracking-[0.16em] text-text3">
                      Scale
                    </span>
                    <span className="font-mono text-sm text-text1">
                      {project.scale}
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-b border-border pb-4">
                    <span className="font-mono text-[0.72rem] uppercase tracking-[0.16em] text-text3">
                      Role
                    </span>
                    <span className="font-mono text-sm text-text1">
                      {project.projectRole}
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-b border-border pb-4">
                    <span className="font-mono text-[0.72rem] uppercase tracking-[0.16em] text-text3">
                      Stack
                    </span>
                    <span className="font-mono text-sm text-text1">
                      {project.stack}
                    </span>
                  </div>
                </div>

                <div className="mt-6 inline-flex items-center gap-2 border border-border bg-surface2 px-3 py-2 font-mono text-[0.72rem] uppercase tracking-[0.14em] text-text2">
                  <span
                    className={`status-dot h-1.5 w-1.5 rounded-full ${
                      project.status === "Live" ? "bg-accent" : "bg-amber"
                    }`}
                  />
                  {project.status}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

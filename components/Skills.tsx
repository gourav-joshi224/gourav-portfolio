"use client";

import { motion } from "framer-motion";

import { SectionLabel } from "@/components/SectionLabel";
import { fadeUp, stagger } from "@/lib/animations";

const skillGroups = [
  {
    label: "Backend Core",
    primary: ["NestJS", "Node.js", "PostgreSQL", "TypeScript"],
    secondary: ["Express", "TypeORM", "REST APIs", "Redis"],
    tertiary: ["JWT", "OAuth2", "RBAC"],
  },
  {
    label: "Infrastructure",
    primary: ["Docker", "AWS", "Microservices"],
    secondary: ["MongoDB", "Firebase", "CI/CD"],
    tertiary: ["SES", "SNS", "S3"],
  },
  {
    label: "System Thinking",
    primary: ["API Design", "Database Design", "System Design"],
    secondary: ["Performance Tuning", "Observability", "Event-Driven Systems"],
    tertiary: ["AI Integration", "Agile", "Testing"],
  },
];

const radarSkills = [
  { label: "API Design", value: 95 },
  { label: "Database", value: 85 },
  { label: "System Design", value: 80 },
  { label: "DevOps/Cloud", value: 65 },
  { label: "AI Integration", value: 70 },
];

function getRadarPoint(index: number, value: number, radius = 92, center = 120) {
  const angle = (Math.PI * 2 * index) / radarSkills.length - Math.PI / 2;
  const scaledRadius = (radius * value) / 100;

  return {
    x: center + Math.cos(angle) * scaledRadius,
    y: center + Math.sin(angle) * scaledRadius,
  };
}

export function Skills() {
  const polygonPoints = radarSkills
    .map((skill, index) => {
      const point = getRadarPoint(index, skill.value);
      return `${point.x},${point.y}`;
    })
    .join(" ");

  return (
    <motion.section
      id="skills"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={stagger}
      className="scroll-mt-24 px-6 py-28 md:px-8 md:scroll-mt-28"
    >
      <div className="mx-auto max-w-[1200px]">
        <motion.div variants={fadeUp}>
          <SectionLabel label="tech_stack" />
        </motion.div>
        <motion.h2
          variants={fadeUp}
          custom={1}
          className="mt-6 font-display text-[clamp(2.6rem,5vw,3.5rem)] font-bold tracking-[-0.04em] text-text1"
        >
          What I use to make systems hold up.
        </motion.h2>

        <div className="mt-14 grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(300px,0.9fr)]">
          <div className="space-y-8">
            {skillGroups.map((group, index) => (
              <motion.div
                key={group.label}
                variants={fadeUp}
                custom={index + 2}
                className="site-panel p-6"
              >
                <div className="font-mono text-[0.72rem] uppercase tracking-[0.16em] text-text3">
                  {group.label}
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {group.primary.map((tag) => (
                    <span
                      key={tag}
                      className="border border-[rgba(0,255,135,0.2)] bg-accentDim px-3 py-1 font-mono text-[0.72rem] uppercase tracking-[0.12em] text-accent"
                    >
                      {tag}
                    </span>
                  ))}
                  {group.secondary.map((tag) => (
                    <span
                      key={tag}
                      className="border border-border bg-surface px-3 py-1 font-mono text-[0.72rem] uppercase tracking-[0.12em] text-text2"
                    >
                      {tag}
                    </span>
                  ))}
                  {group.tertiary.map((tag) => (
                    <span
                      key={tag}
                      className="border border-[rgba(255,255,255,0.05)] px-3 py-1 font-mono text-[0.72rem] uppercase tracking-[0.12em] text-text3"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}

            <motion.div
              variants={fadeUp}
              custom={5}
              className="font-mono text-[0.72rem] uppercase tracking-[0.16em] text-text3"
            >
              <span className="mr-4 text-accent">● Daily</span>
              <span className="mr-4 text-text2">● Strong</span>
              <span>○ Familiar</span>
            </motion.div>
          </div>

          <motion.div variants={fadeUp} custom={6} className="site-panel p-6">
            <div className="font-mono text-[0.72rem] uppercase tracking-[0.16em] text-text3">
              Capability shape
            </div>

            <div className="mt-6 overflow-hidden">
              <svg viewBox="0 0 240 240" className="mx-auto h-[320px] w-full max-w-[320px]">
                {[25, 50, 75, 100].map((ring) => {
                  const points = radarSkills
                    .map((_, index) => {
                      const point = getRadarPoint(index, ring);
                      return `${point.x},${point.y}`;
                    })
                    .join(" ");

                  return (
                    <polygon
                      key={ring}
                      points={points}
                      fill="none"
                      stroke="rgba(255,255,255,0.08)"
                      strokeWidth="1"
                    />
                  );
                })}

                {radarSkills.map((skill, index) => {
                  const endPoint = getRadarPoint(index, 100);
                  const labelPoint = getRadarPoint(index, 118, 96);

                  return (
                    <g key={skill.label}>
                      <line
                        x1="120"
                        y1="120"
                        x2={endPoint.x}
                        y2={endPoint.y}
                        stroke="rgba(255,255,255,0.08)"
                        strokeWidth="1"
                      />
                      <text
                        x={labelPoint.x}
                        y={labelPoint.y}
                        fill="var(--text-3)"
                        fontSize="8"
                        fontFamily="var(--font-mono)"
                        textAnchor={
                          labelPoint.x > 128 ? "start" : labelPoint.x < 112 ? "end" : "middle"
                        }
                      >
                        {skill.label}
                      </text>
                    </g>
                  );
                })}

                <polygon
                  points={polygonPoints}
                  fill="rgba(0,255,135,0.15)"
                  stroke="var(--accent)"
                  strokeWidth="1.5"
                />
              </svg>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}

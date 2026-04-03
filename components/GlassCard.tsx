"use client";

import { motion, type HTMLMotionProps } from "framer-motion";

import { fadeUp } from "@/lib/animations";

type GlassCardProps = HTMLMotionProps<"div"> & {
  index?: number;
};

export function GlassCard({
  children,
  className = "",
  index = 0,
  ...props
}: GlassCardProps) {
  return (
    <motion.div
      variants={fadeUp}
      custom={index}
      className={`rounded-none border border-border bg-card backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-border-hover hover:shadow-[0_0_24px_rgba(0,255,135,0.07)] ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
}

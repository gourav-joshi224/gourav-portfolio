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
      className={`site-panel rounded-none ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
}

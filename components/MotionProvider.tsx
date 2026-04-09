"use client";

import { MotionConfig } from "framer-motion";

type Props = {
  children: React.ReactNode;
};

export function MotionProvider({ children }: Props) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

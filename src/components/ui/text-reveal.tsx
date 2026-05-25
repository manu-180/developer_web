"use client";

import { motion, useInView, type Variants } from "motion/react";
import { useRef } from "react";
import { cn } from "@/lib/utils";

type Props = {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div";
  once?: boolean;
  amount?: number;
};

const lineVariants: Variants = {
  hidden: { y: "120%" },
  show: (i: number) => ({
    y: "0%",
    transition: {
      duration: 0.95,
      delay: i,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export function WordsReveal({
  text,
  className,
  delay = 0,
  stagger = 0.04,
  as: Tag = "div",
  once = true,
  amount = 0.4,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, amount });
  const words = text.split(" ");

  return (
    <Tag ref={ref as never} className={cn("inline-block", className)}>
      {words.map((w, i) => (
        <span
          key={`${w}-${i}`}
          className="inline-flex overflow-hidden align-baseline pr-[0.22em]"
          style={{ lineHeight: "0.92" }}
        >
          <motion.span
            custom={delay + i * stagger}
            variants={lineVariants}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            className="inline-block will-change-transform"
          >
            {w}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

export function CharsReveal({
  text,
  className,
  delay = 0,
  stagger = 0.025,
  as: Tag = "div",
  once = true,
  amount = 0.4,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, amount });
  const chars = Array.from(text);

  return (
    <Tag ref={ref as never} className={cn("inline-block", className)}>
      {chars.map((c, i) => (
        <span
          key={`${c}-${i}`}
          className="inline-flex overflow-hidden align-baseline"
          style={{ lineHeight: "0.92" }}
        >
          <motion.span
            custom={delay + i * stagger}
            variants={lineVariants}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            className="inline-block will-change-transform"
          >
            {c === " " ? " " : c}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

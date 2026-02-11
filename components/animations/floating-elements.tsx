"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface FloatingElementProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}

export function FloatingElement({
  children,
  delay = 0,
  duration = 3,
  className = ""
}: FloatingElementProps) {
  return (
    <motion.div
      className={className}
      animate={{
        y: [0, -10, 0],
        opacity: [0.7, 1, 0.7]
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      {children}
    </motion.div>
  );
}

interface FloatingElementsProps {
  elements: Array<{ content: ReactNode; delay?: number }>;
  className?: string;
}

export function FloatingElements({ elements, className = "" }: FloatingElementsProps) {
  return (
    <div className={`relative ${className}`}>
      {elements.map((element, index) => (
        <FloatingElement
          key={index}
          delay={element.delay ?? index * 0.2}
          className="absolute"
        >
          {element.content}
        </FloatingElement>
      ))}
    </div>
  );
}

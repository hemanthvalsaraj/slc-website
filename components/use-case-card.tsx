"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { useInView } from "react-intersection-observer";

interface UseCaseCardProps {
  title: string;
  problem: string;
  solution: string;
  code?: string;
  icon?: ReactNode;
  delay?: number;
}

export function UseCaseCard({
  title,
  problem,
  solution,
  code,
  icon,
  delay = 0
}: UseCaseCardProps) {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -4 }}
      className="glass p-6 sm:p-8 group cursor-pointer transition-all duration-300"
    >
      {icon && (
        <div className="mb-4 text-2xl opacity-60 group-hover:opacity-100 transition-opacity">
          {icon}
        </div>
      )}
      <h3 className="text-xl font-semibold mb-4 text-zinc-100 group-hover:text-white transition-colors">
        {title}
      </h3>
      <div className="space-y-4 mb-4">
        <div>
          <p className="text-xs uppercase tracking-[0.1em] text-zinc-500 mb-2 font-medium">Problem</p>
          <p className="text-sm text-zinc-400 leading-relaxed">{problem}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.1em] text-zinc-500 mb-2 font-medium">Solution</p>
          <p className="text-sm text-zinc-300 leading-relaxed">{solution}</p>
        </div>
      </div>
      {code && (
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="mt-4 pt-4 border-t border-white/5"
        >
          <pre className="text-xs text-zinc-400 overflow-x-auto">
            <code>{code}</code>
          </pre>
        </motion.div>
      )}
    </motion.div>
  );
}

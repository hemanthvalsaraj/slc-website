"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export function ProblemSection() {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  const problems = [
    {
      icon: "⏱️",
      title: "Weeks of setup",
      description: "Setting up servers, databases, Redis, and monitoring takes forever"
    },
    {
      icon: "💰",
      title: "Expensive infrastructure",
      description: "Pay $200-500/month even when you're just experimenting"
    },
    {
      icon: "🔧",
      title: "Constant maintenance",
      description: "Keep everything updated, scaled, and monitored"
    },
    {
      icon: "😫",
      title: "Backend complexity",
      description: "You're a frontend dev—why do you need to learn all this?"
    }
  ];

  return (
    <section className="px-6 sm:px-10 py-20 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-xs tracking-[0.1em] uppercase text-zinc-500 mb-4 font-medium">
            The Problem
          </p>
          <h2 className="text-4xl sm:text-5xl font-semibold mb-6 leading-tight tracking-tight">
            Why frontend developers don't build
          </h2>
          <p className="text-base text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            You have an idea. You want to build it. But the backend setup is so overwhelming
            that you never start. Sound familiar?
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {problems.map((problem, index) => (
            <motion.div
              key={problem.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass p-6 text-center"
            >
              <div className="text-4xl mb-4">{problem.icon}</div>
              <h3 className="text-lg font-semibold mb-2 text-zinc-100">{problem.title}</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">{problem.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

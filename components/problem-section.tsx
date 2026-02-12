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
      icon: "💾",
      title: "Need state? You need a database",
      description: "Serverless functions are stateless. Want a counter or session? Time to set up Redis or a database."
    },
    {
      icon: "🔌",
      title: "Database setup for simple things",
      description: "Chat rooms, shopping carts, rate limiting—each needs its own database setup and connection management."
    },
    {
      icon: "📚",
      title: "Learning curve for state",
      description: "You're comfortable with React, but adding backend state means learning databases, Redis, and connection pooling."
    },
    {
      icon: "⚡",
      title: "Overkill for simple state",
      description: "A full database or Redis instance just to track a counter or store a session feels like too much."
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
            Building stateful features shouldn't require a database
          </h2>
          <p className="text-base text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            You want to add a counter, a chat room, or a shopping cart. But serverless functions are stateless, 
            so you need Redis or a database—just for simple stateful operations.
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

"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export function SolutionSection() {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  const solutions = [
    {
      title: "Write your code",
      description: "Just write a simple function. No infrastructure knowledge needed.",
      icon: "✍️"
    },
    {
      title: "Deploy instantly",
      description: "One command. Your backend is live in seconds.",
      icon: "🚀"
    },
    {
      title: "State persists automatically",
      description: "Your code remembers everything. No databases to manage.",
      icon: "💾"
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
            The Solution
          </p>
          <h2 className="text-4xl sm:text-5xl font-semibold mb-6 leading-tight tracking-tight">
            SLC: Backend logic that remembers, zero setup required
          </h2>
          <p className="text-base text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Stop worrying about infrastructure. Focus on building features. SLC handles all
            the backend complexity so you can ship faster.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {solutions.map((solution, index) => (
            <motion.div
              key={solution.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="glass p-8 text-center"
            >
              <div className="text-5xl mb-6">{solution.icon}</div>
              <h3 className="text-xl font-semibold mb-3 text-zinc-100">{solution.title}</h3>
              <p className="text-zinc-400 leading-relaxed">{solution.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { InteractiveCode } from "./interactive-code";

const step1Code = `// 1. Write your worker
export default async function handler(ctx) {
  const state = await ctx.state.get();
  state.count = (state.count || 0) + 1;
  await ctx.state.set(state);
  return { count: state.count };
}`;

const step2Code = `// 2. Deploy
slc deploy`;

const step3Code = `// 3. Use it
fetch('https://api.slc.run/v1/invoke/my-app/user-123', {
  method: 'POST',
  body: JSON.stringify({})
});`;

export function HowItWorksSection() {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  const steps = [
    {
      number: "01",
      title: "Write your code",
      description: "Just write a simple function. No infrastructure setup needed.",
      code: step1Code
    },
    {
      number: "02",
      title: "Deploy",
      description: "One command. Your backend is live in seconds.",
      code: step2Code
    },
    {
      number: "03",
      title: "Use it",
      description: "Call your function. State persists automatically between calls.",
      code: step3Code
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
            How It Works
          </p>
          <h2 className="text-4xl sm:text-5xl font-semibold mb-6 leading-tight tracking-tight">
            Three steps. That's it.
          </h2>
          <p className="text-base text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            No servers. No databases. No complexity. Just write, deploy, and use.
          </p>
        </motion.div>

        <div className="space-y-12">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="grid md:grid-cols-2 gap-8 items-center"
            >
              <div className={index % 2 === 1 ? "md:order-2" : ""}>
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-6xl font-bold text-zinc-800">{step.number}</span>
                  <h3 className="text-2xl font-semibold text-zinc-100">{step.title}</h3>
                </div>
                <p className="text-zinc-400 text-base leading-relaxed">{step.description}</p>
              </div>
              <div className={index % 2 === 1 ? "md:order-1" : ""}>
                <InteractiveCode code={step.code} language="typescript" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

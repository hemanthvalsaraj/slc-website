"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Counter, TimeCounter, CostCounter } from "./animations/comparison-counters";

const traditionalTasks = [
  { task: "Set up server infrastructure (AWS/GCP/Azure)", time: "2-3 days" },
  { task: "Configure auto-scaling and load balancing", time: "1-2 days" },
  { task: "Set up database (PostgreSQL/MySQL)", time: "1-2 days" },
  { task: "Configure database migrations and backups", time: "1 day" },
  { task: "Set up Redis for caching and sessions", time: "1 day" },
  { task: "Configure monitoring and alerting (Datadog/New Relic)", time: "1-2 days" },
  { task: "Set up CI/CD pipeline", time: "1-2 days" },
  { task: "Configure security and authentication", time: "1-2 days" },
  { task: "Set up logging and error tracking", time: "1 day" },
  { task: "Testing and debugging infrastructure", time: "2-3 days" },
  { task: "Documentation and team onboarding", time: "1-2 days" }
];

const slcTasks = [
  { task: "Write your worker function", time: "5 min" },
  { task: "Deploy with `slc deploy`", time: "30 sec" },
  { task: "Start using your backend", time: "Instant" }
];

export function ComparisonSection() {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  const totalTraditionalTime = traditionalTasks.reduce((acc, task) => {
    const timeStr = task.time;
    if (timeStr.includes("days")) {
      const days = parseInt(timeStr.split("-")[0]) || parseInt(timeStr.split(" ")[0]);
      return acc + days;
    }
    return acc;
  }, 0);

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
          <p className="text-xs tracking-[0.15em] uppercase text-zinc-500 mb-4 font-medium">
            The Difference
          </p>
          <h2 className="text-4xl sm:text-5xl font-semibold mb-6 leading-tight tracking-tight">
            Stop spending weeks on setup. Start building in minutes.
          </h2>
          <p className="text-base text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            See how SLC compares to traditional backend setups. Every task, every minute
            counted.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Traditional Setup Table */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass p-8 overflow-hidden"
          >
            <div className="flex items-center gap-3 mb-10">
              <div className="w-1.5 h-1.5 bg-red-400"></div>
              <h3 className="text-xl font-semibold text-zinc-100">Traditional Setup</h3>
            </div>
            <div className="mb-10 pb-10 border-b border-white/10">
              <div className="mb-6">
                <TimeCounter minutes={totalTraditionalTime * 1440} label="Total Time" format="readable" />
              </div>
              <div>
                <CostCounter amount={350} period="month" label="Monthly Cost" />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-4 text-xs uppercase tracking-[0.1em] text-zinc-400 font-medium">
                      Task
                    </th>
                    <th className="text-right py-4 text-xs uppercase tracking-[0.1em] text-zinc-400 font-medium w-28">
                      Time
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {traditionalTasks.map((item, index) => (
                    <motion.tr
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                      transition={{ duration: 0.4, delay: 0.3 + index * 0.05 }}
                      className="border-b border-white/5 hover:bg-white/5 transition-colors"
                    >
                      <td className="py-4 text-sm text-zinc-200 leading-relaxed">
                        {item.task}
                      </td>
                      <td className="py-4 text-sm text-zinc-400 text-right font-medium whitespace-nowrap">
                        {item.time}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* SLC Workers Table */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="glass p-8 overflow-hidden border border-white/10"
          >
            <div className="flex items-center gap-3 mb-10">
              <div className="w-1.5 h-1.5 bg-green-400"></div>
              <h3 className="text-xl font-semibold text-zinc-100">With SLC Workers</h3>
            </div>
            <div className="mb-10 pb-10 border-b border-white/10">
              <div className="mb-6">
                <TimeCounter minutes={5} label="Total Time" />
              </div>
              <div>
                <CostCounter amount={0.01} period="request" label="Pay Per Use" />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-4 text-xs uppercase tracking-[0.1em] text-zinc-400 font-medium">
                      Task
                    </th>
                    <th className="text-right py-4 text-xs uppercase tracking-[0.1em] text-zinc-400 font-medium w-28">
                      Time
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {slcTasks.map((item, index) => (
                    <motion.tr
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                      transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                      className="border-b border-white/5 hover:bg-white/5 transition-colors last:border-b-0"
                    >
                      <td className="py-4 text-sm text-zinc-200 leading-relaxed">
                        <span className="text-green-400 mr-2.5">✓</span>
                        {item.task}
                      </td>
                      <td className="py-4 text-sm text-green-400 text-right font-medium whitespace-nowrap">
                        {item.time}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center"
        >
          <div className="glass p-8 inline-block">
            <p className="text-base text-zinc-300 mb-2 font-medium">
              <Counter value={99.95} suffix="%" duration={2} decimals={1} /> less time
            </p>
            <p className="text-xs text-zinc-500 uppercase tracking-[0.1em]">
              Time saved vs traditional setup
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

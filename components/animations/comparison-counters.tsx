"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface CounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  decimals?: number;
}

export function Counter({
  value,
  suffix = "",
  prefix = "",
  duration = 2,
  decimals = 0
}: CounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    const startValue = 0;

    const animate = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);

      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const current = startValue + (value - startValue) * easeOutQuart;

      setCount(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(value);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, value, duration]);

  const formatNumber = (num: number) => {
    if (decimals === 0) return Math.floor(num).toLocaleString();
    return num.toFixed(decimals).toLocaleString();
  };

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
    >
      {prefix}
      {formatNumber(count)}
      {suffix}
    </motion.span>
  );
}

interface TimeCounterProps {
  minutes: number;
  label: string;
  format?: "minutes" | "readable";
}

export function TimeCounter({ minutes, label, format = "minutes" }: TimeCounterProps) {
  const formatTime = (mins: number) => {
    if (format === "readable") {
      if (mins >= 10080) {
        const weeks = Math.floor(mins / 10080);
        return `${weeks} week${weeks > 1 ? "s" : ""}`;
      } else if (mins >= 1440) {
        const days = Math.floor(mins / 1440);
        return `${days} day${days > 1 ? "s" : ""}`;
      } else if (mins >= 60) {
        const hours = Math.floor(mins / 60);
        return `${hours} hour${hours > 1 ? "s" : ""}`;
      }
      return `${mins} min`;
    }
    return `${mins} min`;
  };

  return (
    <div className="flex flex-col items-center">
      <div className="text-4xl sm:text-5xl font-semibold mb-2">
        {format === "readable" ? (
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {formatTime(minutes)}
          </motion.span>
        ) : (
          <Counter value={minutes} suffix=" min" duration={2.5} />
        )}
      </div>
      <div className="text-sm text-zinc-400 uppercase tracking-wider">{label}</div>
    </div>
  );
}

interface CostCounterProps {
  amount: number;
  period: string;
  label: string;
}

export function CostCounter({ amount, period, label }: CostCounterProps) {
  const decimals = amount < 1 ? 2 : 0;
  return (
    <div className="flex flex-col items-center">
      <div className="text-4xl sm:text-5xl font-semibold mb-2 flex items-baseline gap-1">
        <Counter value={amount} prefix="$" duration={2.5} decimals={decimals} />
        {period && <span className="text-2xl text-zinc-500">/{period}</span>}
      </div>
      <div className="text-sm text-zinc-400 uppercase tracking-wider">{label}</div>
    </div>
  );
}

"use client";

import { useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

export function WaitlistForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string>("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("Sending...");

    const formData = new FormData(event.currentTarget);
    const payload = {
      email: formData.get("email"),
      intent: formData.get("intent")
    };

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      setStatus("success");
      setMessage("You're on the list. We'll be in touch.");
      event.currentTarget.reset();
    } catch (error) {
      console.error(error);
      setStatus("error");
      setMessage("Something went wrong. Try again later.");
    }
  }

  const messageColor =
    status === "success"
      ? "text-emerald-400"
      : status === "error"
        ? "text-rose-400"
        : "text-zinc-500";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="email" className="block text-sm text-zinc-400 mb-2">
          Email*
        </label>
        <input
          id="email"
          name="email"
          required
          type="email"
          placeholder="dev@studio.com"
          className="w-full rounded-2xl bg-black/60 border border-white/10 px-4 py-3 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-white/40"
        />
      </div>
      <div>
        <label htmlFor="intent" className="block text-sm text-zinc-400 mb-2">
          What do you want to build? (optional)
        </label>
        <textarea
          id="intent"
          name="intent"
          rows={3}
          placeholder="Counters, sessions, workflows..."
          className="w-full rounded-2xl bg-black/60 border border-white/10 px-4 py-3 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-white/40"
        />
      </div>
      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full inline-flex items-center justify-center px-6 py-3 rounded-full bg-white text-black font-semibold uppercase tracking-[0.2em] transition hover:bg-zinc-200 disabled:opacity-60"
      >
        {status === "loading" ? "Sending..." : "Get Early Access"}
      </button>
      <p className={`text-sm text-center min-h-5 ${messageColor}`}>{message}</p>
    </form>
  );
}


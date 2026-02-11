"use client";

import { UseCaseCard } from "./use-case-card";

const useCases = [
  {
    title: "Real-time Chat App",
    problem:
      "Building chat requires WebSockets, message storage, and real-time sync. That's weeks of work.",
    solution:
      "Each chat room is an actor that remembers all messages. Add a message, it persists. No database needed.",
    code: `// Chat room backend
const messages = state.messages || [];
messages.push({ userId, text, time });
await state.set({ messages });
return { messages };`,
    icon: "💬"
  },
  {
    title: "Shopping Cart",
    problem:
      "Shopping carts reset on page refresh. You need sessions, Redis, and database setup.",
    solution:
      "Each user's cart is an actor. Add items, they persist. Close the browser? Still there when you return.",
    code: `// Shopping cart backend
const cart = state.cart || [];
cart.push({ productId, quantity });
await state.set({ cart });
return { cart };`,
    icon: "🛒"
  },
  {
    title: "Multiplayer Game State",
    problem:
      "Game state needs real-time sync, conflict resolution, and persistence. Complex backend required.",
    solution:
      "Each game room is an actor. Player moves update state instantly. State persists between sessions.",
    code: `// Game state backend
const players = state.players || {};
players[userId] = { x, y, score };
await state.set({ players });
return { players };`,
    icon: "🎮"
  },
  {
    title: "Live Dashboard",
    problem:
      "Real-time dashboards need WebSockets, data aggregation, and caching layers.",
    solution:
      "Each dashboard is an actor. Update metrics, they persist. View anytime, always current.",
    code: `// Dashboard backend
const metrics = state.metrics || {};
metrics[metricName] = value;
await state.set({ metrics });
return { metrics };`,
    icon: "📊"
  },
  {
    title: "Rate Limiter",
    problem:
      "API rate limiting needs Redis, distributed locks, and careful configuration.",
    solution:
      "Each API key is an actor. Track requests, enforce limits. No Redis needed.",
    code: `// Rate limiter backend
const requests = state.requests || [];
requests.push(Date.now());
const recent = requests.filter(t => t > Date.now() - 60000);
await state.set({ requests: recent });
return { remaining: 100 - recent.length };`,
    icon: "⚡"
  },
  {
    title: "User Sessions",
    problem:
      "Sessions need secure storage, expiration logic, and database management.",
    solution:
      "Each user session is an actor. Store data, it persists. Set expiration, it cleans up.",
    code: `// Session backend
await state.set({ 
  userId, 
  data, 
  expiresAt: Date.now() + 3600000 
});
return { session: await state.get() };`,
    icon: "🔐"
  }
];

export function UseCasesSection() {
  return (
    <section className="px-6 sm:px-10 py-20 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs tracking-[0.1em] uppercase text-zinc-500 mb-4 font-medium">
            What You Can Build
          </p>
          <h2 className="text-4xl sm:text-5xl font-semibold mb-6 leading-tight tracking-tight">
            Real features, built in minutes
          </h2>
          <p className="text-base text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            These aren't demos. These are real features you can build today. Each one would
            take weeks with traditional backend setup. With SLC, it's minutes.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {useCases.map((useCase, index) => (
            <UseCaseCard key={useCase.title} {...useCase} delay={index * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}

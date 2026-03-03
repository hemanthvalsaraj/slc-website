export interface DemoBoilerplate {
  id: string;
  name: string;
  description: string;
  workerCode: string;
  exampleUsage: string;
}

export const DEMO_BOILERPLATES: Record<string, DemoBoilerplate> = {
  "rate-limiting": {
    id: "rate-limiting",
    name: "Rate limiting",
    description:
      "Per-actor in-memory rate limiting. Track requests over a sliding window and block when limits are exceeded.",
    workerCode: `export default async function handler(ctx) {
  const state = await ctx.state.get();
  const now = Date.now();

  const windowMs = 60 * 1000; // 1 minute
  const limit = 5; // 5 requests per minute

  const events = (state.events || []).filter(
    (ts) => now - ts < windowMs
  );

  if (events.length >= limit) {
    return {
      allowed: false,
      remaining: 0,
      resetInMs: windowMs - (now - events[0]),
      message: "Rate limit exceeded",
    };
  }

  events.push(now);
  await ctx.state.set({ events });

  return {
    allowed: true,
    remaining: Math.max(0, limit - events.length),
    windowMs,
  };
}`,
    exampleUsage: `fetch('https://api.slc.run/v1/invoke/{projectId}/demo-app/rate-1', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', 'x-slc-api-key': '{apiKey}' },
  body: JSON.stringify({})
})`,
  },
  counters: {
    id: "counters",
    name: "Counters",
    description:
      "Simple persistent counters per actor. Great for understanding durable state.",
    workerCode: `export default async function handler(ctx) {
  const state = await ctx.state.get();
  const { action } = ctx.request.body || {};

  let count = state.count || 0;

  if (action === "increment") {
    count++;
  } else if (action === "decrement") {
    count--;
  } else if (action === "reset") {
    count = 0;
  }

  await ctx.state.set({ count });

  return { count, action: action || "get" };
}`,
    exampleUsage: `fetch('https://api.slc.run/v1/invoke/{projectId}/demo-app/counter-1', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', 'x-slc-api-key': '{apiKey}' },
  body: JSON.stringify({ action: 'increment' })
})`,
  },
  "session-cache": {
    id: "session-cache",
    name: "Session cache",
    description:
      "Store arbitrary session data per actor. Think of it like a tiny key-value cache for a user or session.",
    workerCode: `export default async function handler(ctx) {
  const state = await ctx.state.get();
  const { action, key, value } = ctx.request.body || {};

  const session = state.session || {};

  if (action === "set" && key) {
    session[key] = value;
    await ctx.state.set({ session });
    return { ok: true, session };
  }

  if (action === "get" && key) {
    return { value: session[key] ?? null };
  }

  if (action === "clear") {
    await ctx.state.set({ session: {} });
    return { ok: true, session: {} };
  }

  return { session };
}`,
    exampleUsage: `fetch('https://api.slc.run/v1/invoke/{projectId}/demo-app/session-1', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', 'x-slc-api-key': '{apiKey}' },
  body: JSON.stringify({ action: 'set', key: 'theme', value: 'dark' })
})`,
  },
  "temporary-user-state": {
    id: "temporary-user-state",
    name: "Temporary user state",
    description:
      "Short-lived user state with an explicit TTL field you can check on each request.",
    workerCode: `export default async function handler(ctx) {
  const state = await ctx.state.get();
  const { action, data, ttlMs } = ctx.request.body || {};
  const now = Date.now();

  const current = state.data || null;
  const expiresAt = state.expiresAt || null;

  if (action === "set") {
    const ttl = typeof ttlMs === "number" ? ttlMs : 5 * 60 * 1000; // default 5 min
    const next = {
      data: data ?? {},
      expiresAt: now + ttl,
    };
    await ctx.state.set(next);
    return { ...next, now };
  }

  if (!current || !expiresAt || now > expiresAt) {
    return {
      data: null,
      expired: true,
      now,
      expiresAt,
    };
  }

  return {
    data: current,
    expired: false,
    now,
    expiresAt,
  };
}`,
    exampleUsage: `fetch('https://api.slc.run/v1/invoke/{projectId}/demo-app/temp-1', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', 'x-slc-api-key': '{apiKey}' },
  body: JSON.stringify({ action: 'set', data: { step: 1 }, ttlMs: 300000 })
})`,
  },
  "background-job-progress": {
    id: "background-job-progress",
    name: "Background job progress",
    description:
      "Track progress of a long-running job per actor. Poll to see how far along you are.",
    workerCode: `export default async function handler(ctx) {
  const state = await ctx.state.get();
  const { action } = ctx.request.body || {};

  const job = state.job || { status: "idle", progress: 0 };

  if (action === "start") {
    const next = { status: "running", progress: 0, startedAt: Date.now() };
    await ctx.state.set({ job: next });
    return next;
  }

  if (action === "advance" && job.status === "running") {
    const progress = Math.min(100, (job.progress || 0) + 20);
    const status = progress >= 100 ? "done" : "running";
    const next = { ...job, progress, status, updatedAt: Date.now() };
    await ctx.state.set({ job: next });
    return next;
  }

  if (action === "reset") {
    const next = { status: "idle", progress: 0 };
    await ctx.state.set({ job: next });
    return next;
  }

  // Default: just return current job
  return job;
}`,
    exampleUsage: `fetch('https://api.slc.run/v1/invoke/{projectId}/demo-app/job-1', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', 'x-slc-api-key': '{apiKey}' },
  body: JSON.stringify({ action: 'start' })
})`,
  },
  "shopping-cart": {
    id: "shopping-cart",
    name: "Shopping cart",
    description:
      "A persistent shopping cart that maintains items and quantities per user.",
    workerCode: `export default async function handler(ctx) {
  const state = await ctx.state.get();
  const { action, itemId, itemName, quantity } = ctx.request.body || {};
  
  let items = state.items || [];
  
  if (action === "add" && itemName) {
    const existingItem = items.find(item => item.name === itemName);
    if (existingItem) {
      existingItem.quantity = (existingItem.quantity || 1) + (quantity || 1);
    } else {
      items.push({
        id: itemId || Date.now().toString(),
        name: itemName,
        quantity: quantity || 1
      });
    }
    await ctx.state.set({ items });
  } else if (action === "update" && itemId && quantity !== undefined) {
    items = items.map(item => 
      item.id === itemId ? { ...item, quantity } : item
    );
    await ctx.state.set({ items });
  } else if (action === "remove" && itemId) {
    items = items.filter(item => item.id !== itemId);
    await ctx.state.set({ items });
  } else if (action === "clear") {
    items = [];
    await ctx.state.set({ items });
  }
  
  const totalItems = items.reduce((sum, item) => sum + (item.quantity || 1), 0);
  
  return { items, totalItems };
}`,
    exampleUsage: `fetch('https://api.slc.run/v1/invoke/{projectId}/demo-app/cart-1', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', 'x-slc-api-key': '{apiKey}' },
  body: JSON.stringify({ action: 'add', itemName: 'Product A', quantity: 2 })
})`,
  },
};

export function getBoilerplate(id: string): DemoBoilerplate | undefined {
  return DEMO_BOILERPLATES[id];
}

export function getAllBoilerplates(): DemoBoilerplate[] {
  return Object.values(DEMO_BOILERPLATES);
}

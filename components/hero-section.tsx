"use client";

import { motion } from "framer-motion";
import { TabbedCode } from "./tabbed-code";

const workerCode = `export default async function handler(ctx) {
  const state = await ctx.state.get();
  const { userId, message } = ctx.request.body;
  
  // Get or initialize messages
  const messages = state.messages || [];
  
  // Add new message with timestamp
  messages.push({
    userId,
    message,
    timestamp: Date.now()
  });
  
  // Save state - persists automatically!
  await ctx.state.set({ messages });
  
  return { 
    messages,
    messageCount: messages.length
  };
}`;

const frontendCode = `// React component example
function ChatRoom() {
  const [messages, setMessages] = useState([]);
  const roomId = "room-123";
  
  const sendMessage = async (text) => {
    const response = await fetch(
      \`https://api.slc.run/v1/invoke/my-app/chat/\${roomId}\`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: "user-123",
          message: text
        })
      }
    );
    
    const data = await response.json();
    setMessages(data.messages);
  };
  
  return (
    <div>
      {messages.map((msg, i) => (
        <div key={i}>
          {msg.userId}: {msg.message}
        </div>
      ))}
    </div>
  );
}`;

const resultCode = `// Response after sending messages
{
  "messages": [
    { "userId": "user-1", "message": "Hello!", "timestamp": 1234567890 },
    { "userId": "user-2", "message": "Hey there!", "timestamp": 1234567891 }
  ],
  "messageCount": 2
}

// Messages persist even after:
// - User closes browser
// - Server restarts
// - Days pass by
// - No database needed!`;

const codeTabs = [
  {
    id: "worker",
    label: "Worker",
    code: workerCode,
    language: "typescript"
  },
  {
    id: "frontend",
    label: "Frontend",
    code: frontendCode,
    language: "typescript"
  },
  {
    id: "result",
    label: "Result",
    code: resultCode,
    language: "json"
  }
];

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center px-6 sm:px-10 py-20 sm:py-32 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] via-transparent to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Content */}
          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="mb-6"
            >
              <span className="inline-block text-xs uppercase tracking-[0.1em] text-zinc-500 font-medium mb-8">
                Backend logic that remembers
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-5xl sm:text-6xl lg:text-7xl font-semibold leading-[1.1] mb-6 tracking-tight"
            >
              Backend features that{" "}
              <span className="relative inline-block">
                <span className="relative z-10">remember</span>
                <motion.span
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.8, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute bottom-2 left-0 h-3 bg-white/10 -z-0"
                />
              </span>
              . No backend setup.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-base text-zinc-400 leading-relaxed mb-10 max-w-xl"
            >
              Build stateful features that persist data even after users close the browser. No
              sessions, Redis, or databases needed. Just write your code and deploy.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-12"
            >
              <a
                href="#waitlist"
                className="group relative inline-flex items-center justify-center px-8 py-4 bg-white text-black text-sm font-semibold tracking-wide uppercase transition-all duration-200 hover:bg-zinc-100"
              >
                <span className="relative z-10">Get Early Access</span>
                <motion.div
                  className="absolute inset-0 bg-white/20"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                  style={{ transformOrigin: "left" }}
                />
              </a>
              <div className="flex items-center gap-6 text-sm text-zinc-500">
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-green-400"></span>
                  No credit card
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-green-400"></span>
                  Deploy in minutes
                </span>
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-3 gap-8 pt-8 border-t border-white/5"
            >
              <div>
                <div className="text-2xl sm:text-3xl font-semibold mb-1">5 min</div>
                <div className="text-xs text-zinc-500 uppercase tracking-wider">Setup Time</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-semibold mb-1">$0.01</div>
                <div className="text-xs text-zinc-500 uppercase tracking-wider">Per Request</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-semibold mb-1">0</div>
                <div className="text-xs text-zinc-500 uppercase tracking-wider">Infrastructure</div>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Tabbed Code */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="relative">
              <TabbedCode tabs={codeTabs} className="w-full" />
            </div>

            {/* Feature highlights */}
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="glass p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-1 h-1 bg-green-400"></div>
                  <span className="text-xs uppercase tracking-wider text-zinc-400 font-medium">
                    Persistent State
                  </span>
                </div>
                <p className="text-sm text-zinc-500">
                  Data persists across sessions
                </p>
              </div>
              <div className="glass p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-1 h-1 bg-green-400"></div>
                  <span className="text-xs uppercase tracking-wider text-zinc-400 font-medium">
                    Zero Infrastructure
                  </span>
                </div>
                <p className="text-sm text-zinc-500">
                  No Redis or database needed
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

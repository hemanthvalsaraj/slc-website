"use client";

import { useState, useEffect } from "react";

interface Message {
  userId: string;
  message: string;
  timestamp: number;
}

interface ChatDemoProps {
  projectId: string;
  apiKey: string;
  appName: string;
  actorId?: string;
}

export function ChatDemo({ projectId, apiKey, appName, actorId = "room-1" }: ChatDemoProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [userId] = useState(() => `user-${Math.random().toString(36).substring(2, 9)}`);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const apiUrl = `https://api.slc.run/v1/invoke/${projectId}/${appName}/${actorId}`;

  const fetchMessages = async () => {
    try {
      setError(null);
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-slc-api-key": apiKey,
        },
        body: JSON.stringify({ action: "get" }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: "Unknown error" }));
        throw new Error(errorData.error || `HTTP ${response.status}`);
      }

      const data = await response.json();
      setMessages(data.messages || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch messages");
    }
  };

  useEffect(() => {
    fetchMessages();
    // Poll for new messages every 2 seconds
    const interval = setInterval(fetchMessages, 2000);
    return () => clearInterval(interval);
  }, []);

  const sendMessage = async () => {
    if (!input.trim()) return;

    try {
      setLoading(true);
      setError(null);
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-slc-api-key": apiKey,
        },
        body: JSON.stringify({
          action: "send",
          userId,
          message: input.trim(),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: "Unknown error" }));
        throw new Error(errorData.error || `HTTP ${response.status}`);
      }

      const data = await response.json();
      setMessages(data.messages || []);
      setInput("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  const clearMessages = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-slc-api-key": apiKey,
        },
        body: JSON.stringify({ action: "clear" }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: "Unknown error" }));
        throw new Error(errorData.error || `HTTP ${response.status}`);
      }

      const data = await response.json();
      setMessages(data.messages || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to clear messages");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="glass p-6 flex flex-col h-96">
        <div className="flex-1 overflow-y-auto space-y-2 mb-4">
          {messages.length === 0 ? (
            <div className="text-center text-zinc-500 text-sm py-8">
              No messages yet. Send a message to get started!
            </div>
          ) : (
            messages.map((msg, idx) => (
              <div key={idx} className="flex flex-col">
                <div className="text-xs text-zinc-500 mb-1">{msg.userId}</div>
                <div className="bg-white/5 rounded px-3 py-2 inline-block max-w-[80%]">
                  {msg.message}
                </div>
              </div>
            ))
          )}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Type a message..."
            disabled={loading}
            className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded text-sm focus:outline-none focus:border-white/20 disabled:opacity-50"
          />
          <button
            onClick={sendMessage}
            disabled={loading || !input.trim()}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition text-sm font-medium uppercase tracking-wider"
          >
            Send
          </button>
          <button
            onClick={clearMessages}
            disabled={loading}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition text-sm font-medium uppercase tracking-wider"
          >
            Clear
          </button>
        </div>
        {error && (
          <div className="mt-2 text-sm text-red-400">{error}</div>
        )}
      </div>
      <div className="text-xs text-zinc-500 space-y-2">
        <p>You are: {userId} • Messages persist across refreshes!</p>
        <p className="font-mono break-all">API: {apiUrl}</p>
      </div>
    </div>
  );
}

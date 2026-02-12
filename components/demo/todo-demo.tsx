"use client";

import { useState, useEffect } from "react";

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
}

interface TodoDemoProps {
  projectId: string;
  apiKey: string;
  appName: string;
  actorId?: string;
}

export function TodoDemo({ projectId, apiKey, appName, actorId = "todo-1" }: TodoDemoProps) {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const apiUrl = `https://api.slc.run/v1/invoke/${projectId}/${appName}/${actorId}`;

  const fetchTodos = async () => {
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
      setTodos(data.todos || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch todos");
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async () => {
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
          action: "add",
          text: input.trim(),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: "Unknown error" }));
        throw new Error(errorData.error || `HTTP ${response.status}`);
      }

      const data = await response.json();
      setTodos(data.todos || []);
      setInput("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add todo");
    } finally {
      setLoading(false);
    }
  };

  const toggleTodo = async (id: string) => {
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
          action: "toggle",
          id,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: "Unknown error" }));
        throw new Error(errorData.error || `HTTP ${response.status}`);
      }

      const data = await response.json();
      setTodos(data.todos || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to toggle todo");
    } finally {
      setLoading(false);
    }
  };

  const removeTodo = async (id: string) => {
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
          action: "remove",
          id,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: "Unknown error" }));
        throw new Error(errorData.error || `HTTP ${response.status}`);
      }

      const data = await response.json();
      setTodos(data.todos || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to remove todo");
    } finally {
      setLoading(false);
    }
  };

  const clearTodos = async () => {
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
      setTodos(data.todos || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to clear todos");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="glass p-6">
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && addTodo()}
            placeholder="Add a todo..."
            disabled={loading}
            className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded text-sm focus:outline-none focus:border-white/20 disabled:opacity-50"
          />
          <button
            onClick={addTodo}
            disabled={loading || !input.trim()}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition text-sm font-medium uppercase tracking-wider"
          >
            Add
          </button>
          {todos.length > 0 && (
            <button
              onClick={clearTodos}
              disabled={loading}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition text-sm font-medium uppercase tracking-wider"
            >
              Clear All
            </button>
          )}
        </div>
        {error && (
          <div className="mb-4 text-sm text-red-400">{error}</div>
        )}
        <div className="space-y-2">
          {todos.length === 0 ? (
            <div className="text-center text-zinc-500 text-sm py-8">
              No todos yet. Add one to get started!
            </div>
          ) : (
            todos.map((todo) => (
              <div
                key={todo.id}
                className="flex items-center gap-3 p-3 bg-white/5 rounded"
              >
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                  disabled={loading}
                  className="w-4 h-4"
                />
                <span
                  className={`flex-1 ${todo.completed ? "line-through text-zinc-500" : ""}`}
                >
                  {todo.text}
                </span>
                <button
                  onClick={() => removeTodo(todo.id)}
                  disabled={loading}
                  className="px-3 py-1 text-xs bg-red-500/20 hover:bg-red-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition uppercase tracking-wider"
                >
                  Remove
                </button>
              </div>
            ))
          )}
        </div>
      </div>
      <div className="text-xs text-zinc-500 space-y-2">
        <p>Total: {todos.length} • Completed: {todos.filter((t) => t.completed).length}</p>
        <p className="font-mono break-all">API: {apiUrl}</p>
      </div>
    </div>
  );
}

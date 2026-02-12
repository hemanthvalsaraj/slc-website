"use client";

import { useState, useEffect } from "react";

interface CartItem {
  id: string;
  name: string;
  quantity: number;
}

interface ShoppingCartDemoProps {
  projectId: string;
  apiKey: string;
  appName: string;
  actorId?: string;
}

export function ShoppingCartDemo({ projectId, apiKey, appName, actorId = "cart-1" }: ShoppingCartDemoProps) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const apiUrl = `https://api.slc.run/v1/invoke/${projectId}/${appName}/${actorId}`;

  const fetchCart = async () => {
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
      setItems(data.items || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch cart");
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const addItem = async () => {
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
          itemName: input.trim(),
          quantity: 1,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: "Unknown error" }));
        throw new Error(errorData.error || `HTTP ${response.status}`);
      }

      const data = await response.json();
      setItems(data.items || []);
      setInput("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add item");
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (itemId: string, quantity: number) => {
    if (quantity < 1) {
      removeItem(itemId);
      return;
    }

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
          action: "update",
          itemId,
          quantity,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: "Unknown error" }));
        throw new Error(errorData.error || `HTTP ${response.status}`);
      }

      const data = await response.json();
      setItems(data.items || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update quantity");
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async (itemId: string) => {
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
          itemId,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: "Unknown error" }));
        throw new Error(errorData.error || `HTTP ${response.status}`);
      }

      const data = await response.json();
      setItems(data.items || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to remove item");
    } finally {
      setLoading(false);
    }
  };

  const clearCart = async () => {
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
      setItems(data.items || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to clear cart");
    } finally {
      setLoading(false);
    }
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="space-y-4">
      <div className="glass p-6">
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && addItem()}
            placeholder="Add item to cart..."
            disabled={loading}
            className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded text-sm focus:outline-none focus:border-white/20 disabled:opacity-50"
          />
          <button
            onClick={addItem}
            disabled={loading || !input.trim()}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition text-sm font-medium uppercase tracking-wider"
          >
            Add
          </button>
          {items.length > 0 && (
            <button
              onClick={clearCart}
              disabled={loading}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition text-sm font-medium uppercase tracking-wider"
            >
              Clear
            </button>
          )}
        </div>
        {error && (
          <div className="mb-4 text-sm text-red-400">{error}</div>
        )}
        <div className="space-y-2">
          {items.length === 0 ? (
            <div className="text-center text-zinc-500 text-sm py-8">
              Cart is empty. Add items to get started!
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 p-3 bg-white/5 rounded"
              >
                <span className="flex-1 font-medium">{item.name}</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    disabled={loading}
                    className="w-8 h-8 flex items-center justify-center bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition"
                  >
                    −
                  </button>
                  <span className="w-12 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    disabled={loading}
                    className="w-8 h-8 flex items-center justify-center bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => removeItem(item.id)}
                  disabled={loading}
                  className="px-3 py-1 text-xs bg-red-500/20 hover:bg-red-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition uppercase tracking-wider"
                >
                  Remove
                </button>
              </div>
            ))
          )}
        </div>
        {items.length > 0 && (
          <div className="mt-4 pt-4 border-t border-white/10">
            <div className="flex justify-between items-center">
              <span className="text-sm text-zinc-400">Total Items:</span>
              <span className="text-lg font-semibold">{totalItems}</span>
            </div>
          </div>
        )}
      </div>
      <div className="text-xs text-zinc-500 space-y-2">
        <p>Cart state persists across refreshes!</p>
        <p className="font-mono break-all">API: {apiUrl}</p>
      </div>
    </div>
  );
}

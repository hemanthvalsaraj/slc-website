export interface DemoBoilerplate {
  id: string;
  name: string;
  description: string;
  workerCode: string;
  exampleUsage: string;
}

export const DEMO_BOILERPLATES: Record<string, DemoBoilerplate> = {
  counter: {
    id: 'counter',
    name: 'Counter',
    description: 'A simple counter that increments and decrements. Perfect for understanding state persistence.',
    workerCode: `export default async function handler(ctx) {
  const state = await ctx.state.get();
  const { action } = ctx.request.body || {};
  
  let count = state.count || 0;
  
  if (action === 'increment') {
    count++;
  } else if (action === 'decrement') {
    count--;
  } else if (action === 'reset') {
    count = 0;
  }
  
  await ctx.state.set({ count });
  
  return { count, action: action || 'get' };
}`,
    exampleUsage: `fetch('https://api.slc.run/v1/invoke/{projectId}/demo-app/counter-1', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', 'x-slc-api-key': '{apiKey}' },
  body: JSON.stringify({ action: 'increment' })
})`,
  },
  chat: {
    id: 'chat',
    name: 'Chat Room',
    description: 'A real-time chat room where messages persist. Multiple users can send messages that are stored in state.',
    workerCode: `export default async function handler(ctx) {
  const state = await ctx.state.get();
  const { action, userId, message } = ctx.request.body || {};
  
  let messages = state.messages || [];
  
  if (action === 'send' && userId && message) {
    messages.push({
      userId,
      message,
      timestamp: Date.now()
    });
    await ctx.state.set({ messages });
  } else if (action === 'clear') {
    messages = [];
    await ctx.state.set({ messages });
  }
  
  return { messages, messageCount: messages.length };
}`,
    exampleUsage: `fetch('https://api.slc.run/v1/invoke/{projectId}/demo-app/room-1', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', 'x-slc-api-key': '{apiKey}' },
  body: JSON.stringify({ 
    action: 'send', 
    userId: 'user-123', 
    message: 'Hello!' 
  })
})`,
  },
  todo: {
    id: 'todo',
    name: 'Todo List',
    description: 'A persistent todo list. Add, complete, and remove tasks that persist across sessions.',
    workerCode: `export default async function handler(ctx) {
  const state = await ctx.state.get();
  const { action, id, text } = ctx.request.body || {};
  
  let todos = state.todos || [];
  
  if (action === 'add' && text) {
    const newTodo = {
      id: Date.now().toString(),
      text,
      completed: false,
      createdAt: Date.now()
    };
    todos.push(newTodo);
    await ctx.state.set({ todos });
  } else if (action === 'toggle' && id) {
    todos = todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    await ctx.state.set({ todos });
  } else if (action === 'remove' && id) {
    todos = todos.filter(todo => todo.id !== id);
    await ctx.state.set({ todos });
  } else if (action === 'clear') {
    todos = [];
    await ctx.state.set({ todos });
  }
  
  return { todos, count: todos.length };
}`,
    exampleUsage: `fetch('https://api.slc.run/v1/invoke/{projectId}/demo-app/todo-1', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', 'x-slc-api-key': '{apiKey}' },
  body: JSON.stringify({ action: 'add', text: 'Learn SLC' })
})`,
  },
  'shopping-cart': {
    id: 'shopping-cart',
    name: 'Shopping Cart',
    description: 'A shopping cart that maintains items and quantities. Perfect for e-commerce state management.',
    workerCode: `export default async function handler(ctx) {
  const state = await ctx.state.get();
  const { action, itemId, itemName, quantity } = ctx.request.body || {};
  
  let items = state.items || [];
  
  if (action === 'add' && itemName) {
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
  } else if (action === 'update' && itemId && quantity !== undefined) {
    items = items.map(item => 
      item.id === itemId ? { ...item, quantity } : item
    );
    await ctx.state.set({ items });
  } else if (action === 'remove' && itemId) {
    items = items.filter(item => item.id !== itemId);
    await ctx.state.set({ items });
  } else if (action === 'clear') {
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

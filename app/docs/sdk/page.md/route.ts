import { NextResponse } from "next/server";

export const dynamic = "force-static";

export async function GET() {
  const markdown = `# SDK Documentation

A production-ready TypeScript/JavaScript SDK for interacting with the SLC Durable Actors API.

## Features

- ✅ **Type-safe** - Full TypeScript support with comprehensive type definitions
- ✅ **Universal** - Works in both Node.js (18+) and modern browsers
- ✅ **Simple API** - Clean, intuitive interface for actor state management
- ✅ **Error handling** - Comprehensive error types for different failure scenarios
- ✅ **Production-ready** - Built with best practices and proper error handling

## Installation

\`\`\`bash
npm install @slcrun/sdk
\`\`\`

## Quick Start

\`\`\`typescript
import { SLC } from '@slcrun/sdk';

// Initialize the client (defaults to production API)
const client = new SLC({
  projectId: 'my-project',
  apiKey: process.env.SLC_API_KEY!, // or provide directly
  endpoint: 'https://api.slc.run', // Optional: defaults to production
});

// Get an actor instance
const actor = client.actor('my-app', 'user-123');

// Get actor state
const state = await actor.get();
console.log(state); // {} if actor doesn't exist, or full state object

// Set state (merges with existing state)
await actor.set({ name: 'John Doe', age: 30 });

// Update state
await actor.set({ age: 31, preferences: { theme: 'dark', lang: 'en' } });

// Get updated state
const updatedState = await actor.get();
console.log(updatedState); // { name: 'John Doe', age: 31, preferences: {...} }

// Invoke the app handler
const result = await actor.invoke({ action: 'increment' });

// Delete actor state
await actor.clear();
\`\`\`

## API Reference

### SLC

Main client class for interacting with Durable Actors.

#### Constructor

\`\`\`typescript
new SLC(config: SLCSDKConfig)
\`\`\`

**Options:**
- \`endpoint?: string\` - Base URL for the API (default: \`"https://api.slc.run"\`)
- \`projectId: string\` - Your project ID (required)
- \`apiKey?: string\` - API key for authentication (or set \`SLC_API_KEY\` env var)
- \`apiVersion?: string\` - API version to use (default: \`"v1"\`)
- \`httpClient?: HTTPClient\` - Custom HTTP client implementation (for testing or advanced use cases)

### actor(appName: string, actorId: string)

Get an actor instance for a specific app and actor ID.

**Parameters:**
- \`appName\`: The name of your deployed app
- \`actorId\`: Unique identifier for the actor instance

Returns an \`Actor\` instance with methods: \`get()\`, \`set()\`, \`clear()\`, \`invoke()\`

### Actor Methods

#### get(): Promise<ActorState>

Get the full state of the actor.

- Returns the actor's state as a JSON object
- Returns empty object \`{}\` if actor not found (404)
- Throws \`NetworkError\` if the network request fails
- Throws \`APIError\` if the API returns an error status code (other than 404)

#### set(partial: ActorState): Promise<void>

Set or merge state in the actor.

- \`partial\`: Partial state object to merge with existing state
- Throws \`NetworkError\` if the network request fails
- Throws \`APIError\` if the API returns an error status code

#### clear(): Promise<APIResponse>

Delete the actor's state completely.

- Returns the API response: \`{ success: boolean, message?: string }\`
- Throws \`NetworkError\` if the network request fails
- Throws \`APIError\` if the API returns an error status code

#### invoke(body?: unknown, options?: InvokeOptions): Promise<unknown>

Invoke the app handler with a request body.

- \`body\`: Optional request body to send to the handler
- \`options\`: Optional invocation options (method, version, headers)
- Returns the handler's response
- Throws \`NetworkError\` if the network request fails
- Throws \`APIError\` if the API returns an error status code

## Error Handling

The SDK provides specific error types for different scenarios:

\`\`\`typescript
import { SLC, NetworkError, APIError } from '@slcrun/sdk';

const client = new SLC({
  projectId: 'my-project',
  apiKey: process.env.SLC_API_KEY!,
});
const actor = client.actor('my-app', 'actor-id');

try {
  await actor.set({ key: 'value' });
} catch (error) {
  if (error instanceof NetworkError) {
    console.error('Network issue:', error.message);
  } else if (error instanceof APIError) {
    console.error('API error:', error.statusCode, error.message);
  } else {
    console.error('Unknown error:', error);
  }
}
\`\`\`

**Error Types:**
- \`SLCSDKError\` - Base error class for all SDK errors
- \`NetworkError\` - Thrown when a network request fails
- \`APIError\` - Thrown when the API returns an unexpected status code
- \`ActorNotFoundError\` - Thrown when an actor is not found (though \`getState\` returns \`{}\` instead)

## Usage Examples

### Node.js

\`\`\`typescript
import { SLC } from '@slcrun/sdk';

const client = new SLC({
  projectId: 'my-project',
  apiKey: process.env.SLC_API_KEY!,
  endpoint: 'https://api.slc.run',
});

async function example() {
  const actor = client.actor('session-app', 'session-abc');
  
  // Create or update actor state
  await actor.set({ userId: 'user-123', lastActivity: Date.now() });
  
  // Retrieve state
  const session = await actor.get();
  console.log('Session:', session);
  
  // Update specific fields
  await actor.set({ lastActivity: Date.now() });

  // Clean up session (delete entire actor)
  await actor.clear();
}
\`\`\`

### Browser

\`\`\`typescript
import { SLC } from '@slcrun/sdk';

const client = new SLC({
  projectId: 'my-project',
  apiKey: process.env.SLC_API_KEY!,
});

// Use in your React/Vue/etc component
async function saveUserPreference(userId: string, preference: string, value: unknown) {
  const actor = client.actor('preferences-app', \`user-\${userId}\`);
  await actor.set({ [preference]: value });
}

async function getUserPreferences(userId: string) {
  const actor = client.actor('preferences-app', \`user-\${userId}\`);
  return await actor.get();
}
\`\`\`

---

*Last updated: ${new Date().toISOString().split('T')[0]}*
`;

  return new NextResponse(markdown, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600"
    }
  });
}

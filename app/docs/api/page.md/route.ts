import { NextResponse } from "next/server";

export const dynamic = "force-static";

export async function GET() {
  const markdown = `# API Reference

Complete API documentation for all SLC endpoints.

## API Versioning

SLC uses versioned API endpoints to ensure backward compatibility and smooth migrations. All public API endpoints support versioning through the \`/v1/\` namespace.

**Default:** If not specified, the CLI defaults to \`v1\`.

All versioned endpoints follow the pattern: \`/{version}/{endpoint}\`

## App Invocation (Versioned)

### POST /v1/invoke/:projectId/:appName/:actorId

Invoke an app handler for a specific actor.

**Headers:**
- \`Content-Type: application/json\`
- \`x-slc-api-key: sk_your_api_key\` (required)

**Example:**
\`\`\`bash
curl -X POST https://api.slc.run/v1/invoke/my-project/hello-world-app/user-123 \\
  -H "Content-Type: application/json" \\
  -H "x-slc-api-key: sk_your_api_key" \\
  -d '{"message":"hi there"}'
\`\`\`

### GET /v1/invoke/:projectId/:appName/:actorId

Invoke an app handler with GET method.

**Example:**
\`\`\`bash
curl https://api.slc.run/v1/invoke/my-project/hello-world-app/user-123 \\
  -H "x-slc-api-key: sk_your_api_key"
\`\`\`

### DELETE /v1/invoke/:projectId/:appName/:actorId

Delete actor state completely.

**Example:**
\`\`\`bash
curl -X DELETE https://api.slc.run/v1/invoke/my-project/hello-world-app/user-123 \\
  -H "x-slc-api-key: sk_your_api_key"
\`\`\`

## App Deployment

### POST /v1/_control/deploy-app

Deploy an app bundle (used by \`slc deploy\`).

**Headers:**
- \`Content-Type: application/json\`
- \`x-slc-api-key: sk_your_api_key\` (required)

**Body:**
\`\`\`json
{
  "name": "my-app",
  "bundle": "<bundled-code>",
  "version": 1
}
\`\`\`

**Response:**
\`\`\`json
{
  "success": true,
  "name": "my-app",
  "version": 1,
  "apiVersion": "v1"
}
\`\`\`

## Project Management

### POST /v1/_control/create-project

Create a new project. Requires admin secret.

**Headers:**
- \`x-slc-admin-secret: your-admin-secret\` (required)

### GET /v1/_control/list-projects

List all projects. Requires admin secret.

**Headers:**
- \`x-slc-admin-secret: your-admin-secret\` (required)

### POST /v1/_control/rotate-apikey

Rotate API key for a project. Requires admin secret.

**Headers:**
- \`x-slc-admin-secret: your-admin-secret\` (required)

## System Endpoints

### GET /v1/_health

Health check endpoint that returns server status, database file size, and actor count.

**Example:**
\`\`\`bash
curl https://api.slc.run/v1/_health
\`\`\`

**Response:**
\`\`\`json
{
  "status": "ok",
  "dbFileSizeBytes": 8192,
  "actorCountInDb": 5
}
\`\`\`

### GET /v1/_system/info

Returns system information and version details.

### GET /_debug/metrics

Debug metrics endpoint that returns runtime statistics.

**Example:**
\`\`\`bash
curl https://api.slc.run/_debug/metrics
\`\`\`

**Response:**
\`\`\`json
{
  "activeActors": 3,
  "dbFileSizeBytes": 8192,
  "requestsLastMinute": 42,
  "uptimeSeconds": 3600
}
\`\`\`

## Response Format

Versioned API responses include version metadata:

\`\`\`json
{
  "success": true,
  "count": 2,
  "actorId": "user1",
  "apiVersion": "v1",
  "gatewayVersion": "1.0",
  "gatewayRegion": "global",
  "runtimeRegion": "mumbai"
}
\`\`\`

## API Versioning

**Note:** Only v1 routes are currently supported. Always use the \`/v1/\` prefix for all API endpoints.

Legacy routes (without the \`/v1/\` prefix) are not implemented in the region-node and will not work. All endpoints must use the v1 API version.

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

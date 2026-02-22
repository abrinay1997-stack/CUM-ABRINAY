import type { Handler } from "@netlify/functions";
import { getStore } from "@netlify/blobs";

interface Registration {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

const handler: Handler = async (event) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  };

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers };
  }

  if (event.httpMethod !== "GET") {
    return { statusCode: 405, headers, body: JSON.stringify({ error: "Method not allowed" }) };
  }

  const store = getStore({
    name: "registrations",
    consistency: "strong",
    siteID: process.env.NETLIFY_SITE_ID!,
    token: process.env.NETLIFY_TOKEN!,
  });
  const all: Registration[] = (await store.get("all", { type: "json" })) ?? [];

  // Return only id + name (never expose emails)
  const signatures = all.map(({ id, name, createdAt }) => ({ id, name, createdAt }));

  return {
    statusCode: 200,
    headers,
    body: JSON.stringify(signatures),
  };
};

export { handler };

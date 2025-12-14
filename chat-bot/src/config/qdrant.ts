import { QdrantClient } from "@qdrant/js-client-rest";

// Qdrant Client
export const qdrantClient = new QdrantClient({
  url: process.env.QDRANT_URL || "http://localhost:6333",
});

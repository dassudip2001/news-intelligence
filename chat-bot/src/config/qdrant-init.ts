import { qdrantClient } from "./qdrant";

const COLLECTION = process.env.QDRANT_COLLECTION || "news_vectors";

export async function initQdrant() {
  const collections = await qdrantClient.getCollections();

  const exists = collections.collections.some((c) => c.name === COLLECTION);

  if (!exists) {
    console.log(`🧠 Creating Qdrant collection: ${COLLECTION}`);

    await qdrantClient.createCollection(COLLECTION, {
      vectors: {
        size: 768, // Jina embeddings v2
        distance: "Cosine",
      },
    });
  } else {
    console.log(`✅ Qdrant collection exists: ${COLLECTION}`);
  }
}

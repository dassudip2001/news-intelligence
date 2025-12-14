import { qdrantClient } from "../config/qdrant";

const COLLECTION = process.env.QDRANT_COLLECTION || "news_vectors";
export async function retrieveArticles(
  embedding: number[],
  limit = 5
): Promise<string> {
  if (!embedding || embedding.length === 0) {
    throw new Error("Query embedding is empty");
  }

  try {
    const results = await qdrantClient.search(COLLECTION, {
      vector: embedding,
      limit,
      with_payload: true,
    });

    if (!results || results.length === 0) {
      return "I don't have enough information to answer this question.";
    }

    return results
      .map((r, i) => {
        const payload = r.payload as any;

        return `
[${i + 1}]
Title: ${payload?.title}
Source: ${payload?.source}
Content: ${payload?.content}
`;
      })
      .join("\n");
  } catch (error) {
    console.error("❌ Qdrant search failed:", error);
    throw error; // Let controller return 500
  }
}

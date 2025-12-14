import { qdrantClient } from "../config/qdrant";
import type { NewsArticle } from "../types/news";
import { chunkText } from "../utils/chunkText";
import { createEmbedding } from "./embedding.service";
import { v4 as uuid } from "uuid";

const COLLECTION = process.env.QDRANT_COLLECTION || "news_vectors";

export async function ingestArticlesToVectorDB(articles: NewsArticle[]) {
  let totalChunks = 0;
  for (const article of articles) {
    if (!article.content) continue;

    const chunks = chunkText(article.content);

    for (const chunk of chunks) {
      const vector = await createEmbedding(chunk);
      await qdrantClient.upsert(COLLECTION, {
        points: [
          {
            id: uuid(),
            vector,
            payload: {
              title: article.title,
              url: article.url,
              source: article.source,
              publishedAt: article.publishedAt,
              content: chunk,
            },
          },
        ],
      });
      totalChunks++;
    }
  }
  return {
    articles: articles.length,
    chunks: totalChunks,
  };
}

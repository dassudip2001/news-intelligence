import type { Request, Response } from "express";
import { createEmbedding } from "../services/embedding.service";
import { generateAnswer } from "../services/gemini.service";
import { retrieveArticles } from "../services/retrieval.service";

export async function chat(req: Request, res: Response) {
  const { query } = req.body;

  if (!query) {
    return res.status(400).json({ error: "Query is required" });
  }

  const startTime = Date.now();

  try {
    // 1️ Embed query
    const queryEmbedding = await createEmbedding(query);

    console.log("queryEmbedding", queryEmbedding);

    // 2️ Retrieve context from Qdrant
    const context = await retrieveArticles(queryEmbedding);

    if (!context) {
      return res.json({
        answer: "I don't have enough information to answer this question.",
      });
    }

    // 3️ Gemini response
    const answer = await generateAnswer(context, query);

    return res.json({
      answer,
      responseTimeMs: Date.now() - startTime,
    });
  } catch (error: any) {
    console.error("❌ Chat error:", error);

    // Handle rate limit errors with user-friendly message
    if (
      error?.message?.includes("Rate limit") ||
      error?.message?.includes("quota") ||
      error?.message?.includes("429")
    ) {
      return res.status(429).json({
        error: "API rate limit exceeded",
        message:
          "You've exceeded the Gemini API quota. Please wait a moment and try again, or check your API billing/plan.",
        details: error.message,
      });
    }

    // Handle other errors
    return res.status(500).json({
      error: "Internal server error",
      message: error?.message || "An unexpected error occurred",
    });
  }
}

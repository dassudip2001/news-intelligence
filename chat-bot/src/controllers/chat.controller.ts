import type { Request, Response } from "express";
import { createEmbedding } from "../services/embedding.service";
import { generateAnswer } from "../services/gemini.service";
import { retrieveArticles } from "../services/retrieval.service";
import { prisma } from "../config/prismaClient";
import { v4 as uuidv4 } from "uuid";

export async function chat(req: Request, res: Response) {
  const { query } = req.body;

  if (!query) {
    return res.status(400).json({ error: "Query is required" });
  }

  const startTime = Date.now();

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

  // 4️ Save interaction to database
  await prisma.interaction.create({
    data: {
      sessionId: uuidv4(),
      userQuery: query,
      llmResponse: answer,
      responseTimeMs: Date.now() - startTime,
    },
  });

  return res.json({
    answer,
    responseTimeMs: Date.now() - startTime,
  });
}

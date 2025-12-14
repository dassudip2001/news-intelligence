import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function generateAnswer(
  context: string,
  query: string
): Promise<string> {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
  });

  const prompt = `
You are a news intelligence assistant.

Use ONLY the context below to answer.
If the answer is not in the context, say "I don't have enough information."

Context:
${context}

Question:
${query}
  `;

  const result = await model.generateContent(prompt);
  return result.response.text();
}

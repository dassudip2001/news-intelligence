import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function generateAnswer(
  context: string,
  query: string
): Promise<string> {
  const prompt = `
You are a news intelligence assistant.

Use ONLY the context below to answer.
If the answer is not in the context, say "I don't have enough information."

Context:
${context}

Question:
${query}
`;

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini", // cheap + fast + good for RAG
    temperature: 0.2,
    messages: [
      { role: "system", content: "You are a helpful news assistant." },
      { role: "user", content: prompt },
    ],
  });

  return response.choices[0]?.message.content ?? "";
}

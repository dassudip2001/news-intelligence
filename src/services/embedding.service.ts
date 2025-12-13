import axios from "axios";

export async function createEmbedding(text: string): Promise<number[]> {
  const res = await axios.post(
    "https://api.jina.ai/v1/embeddings",
    {
      model: "jina-embeddings-v2-base-en",
      input: [text],
    },
    {
      headers: {
        Authorization: `Bearer jina_33b1093f89f443eebd65fafde2c3620aVk1e1o_73pr9ysSJQBvZkb-8s6A7`,
      },
    }
  );

  return res.data.data[0].embedding;
}

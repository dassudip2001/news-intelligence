import { Inngest } from "inngest";
import { fetchNewsFromRSS } from "../services/rss-parser.service";
import { ingestArticlesToVectorDB } from "../services/vector-ingestion.service";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "my-app" });
// fetch news form rss feed
const news = inngest.createFunction(
  { id: "news" },
  { event: "rss/fetch" },
  async ({ step }) => {
    const articles = await step.run("fetch-news", async () =>
      fetchNewsFromRSS(50)
    );

    const ingestRespose = await step.run(
      "store-in-qdrant",
      async () => await ingestArticlesToVectorDB(articles)
    );

    return {
      ...ingestRespose,
    };
  }
);

// used rss data and store in vector database

// Create an empty array where we'll export future Inngest functions
export const functions = [ news];

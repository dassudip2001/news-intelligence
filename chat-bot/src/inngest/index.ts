import { Inngest } from "inngest";
import { fetchNewsFromRSS } from "../services/rss-parser.service";
import { ingestArticlesToVectorDB } from "../services/vector-ingestion.service";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "my-app" });

//
const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    await step.sleep("wait-a-moment", "1s");
    return { message: `Hello ${event.data.email}!` };
  }
);

// fetch news form rss feed
const news = inngest.createFunction(
  { id: "news" },
  { cron: "*/55 * * * *" },
  async ({ event, step }) => {
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
export const functions = [helloWorld, news];

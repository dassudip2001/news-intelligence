import Parser from "rss-parser";
import { RSS_FEEDS } from "../config/news-url";
import type { NewsArticle } from "../types/news";

const parser = new Parser();

export async function fetchNewsFromRSS(limit = 50): Promise<NewsArticle[]> {
  const articles: NewsArticle[] = [];

  for (const feedUrl of RSS_FEEDS) {
    const feed = await parser.parseURL(feedUrl);

    for (const item of feed.items) {
      if (articles.length >= limit) break;

      articles.push({
        title: item.title ?? "No title",
        content: item.contentSnippet || item.content || item.summary || "",
        url: item.link ?? "",
        publishedAt: item.pubDate,
        source: feed.title ?? "Unknown",
      });
    }
  }
  return articles;
}

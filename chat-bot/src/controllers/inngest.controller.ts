import type { Request, Response } from "express";
import { inngest } from "../inngest";
export async function tranning(req: Request, res: Response) {
  try {
    await inngest.send({
      name: "rss/fetch",
      data: {
        triggeredAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error("❌ Failed to trigger ingestion:", error);
    return res.json({ error: "Failed to trigger ingestion" });
  }
}

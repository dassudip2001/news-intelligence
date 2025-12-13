import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { serve } from "inngest/express";
import { inngest, functions } from "./inngest";

const app = express();

app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(morgan("dev"));

// inngest router
app.use("/api/inngest", serve({ client: inngest, functions }));
export default app;

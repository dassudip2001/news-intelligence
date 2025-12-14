import { Router } from "express";
import { tranning } from "../controllers/inngest.controller";

const router = Router();

router.post("/", tranning);
export default router;
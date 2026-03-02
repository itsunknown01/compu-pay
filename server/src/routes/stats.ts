import { Router } from "express";
import { getAiSummary } from "../controllers/stats.controller";

const router = Router();

router.get("/ai-summary", getAiSummary);

export default router;

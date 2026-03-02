import { Router } from "express";
import {
  getPayRuns,
  getPayRunById,
  getPayRunRisks,
  createDraft,
  queuePreview,
  approvePayRun,
} from "../controllers/payroll.controller";

const router = Router();

router.get("/", getPayRuns);
router.post("/draft", createDraft);
router.get("/:id", getPayRunById);
router.get("/:id/risks", getPayRunRisks);
router.post("/:id/preview", queuePreview);
router.post("/:id/approve", approvePayRun);

export default router;

import { Router } from "express";
import {
  createRule,
  simulateRule,
  activateRule,
  getRuleById,
  getRules,
} from "../controllers/compliance.controller";

const router = Router();

router.post("/rules", createRule);
router.post("/rules/:id/simulate", simulateRule);
router.put("/rules/:id/activate", activateRule);
router.get("/rules/:id", getRuleById);
router.get("/rules", getRules);

export default router;

import { Router } from "express";
import { getAuditLogs, getAuditLogById } from "../controllers/audit.controller";

const router = Router();

router.get("/logs", getAuditLogs);
router.get("/logs/:id", getAuditLogById);

export default router;

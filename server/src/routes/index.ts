import { Router } from "express";
import authRoutes from "./auth";
import payrollRoutes from "./payroll";
import complianceRoutes from "./compliance";
import auditRoutes from "./audit";
import employeeRoutes from "./employees";
import statsRoutes from "./stats";
import { authMiddleware } from "../middleware/auth";

const router = Router();

router.use("/auth", authRoutes);
router.use("/payruns", authMiddleware, payrollRoutes);
router.use("/employees", authMiddleware, employeeRoutes);
router.use("/compliance", authMiddleware, complianceRoutes);
router.use("/audit", authMiddleware, auditRoutes);
router.use("/dashboard", authMiddleware, statsRoutes);

export default router;

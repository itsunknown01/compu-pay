import { Router } from "express";
import {
  getEmployees,
  getEmployeeById,
} from "../controllers/employees.controller";

const router = Router();

router.get("/", getEmployees);
router.get("/:id", getEmployeeById);

export default router;

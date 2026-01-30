import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;
  const tenantId = req.headers["x-tenant-id"];

  if (!authHeader?.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ error: "Missing or invalid Authorization header" });
  }

  if (!tenantId) {
    return res.status(400).json({ error: "Missing X-Tenant-ID header" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret");
    req.user = decoded;

    // Ensure tenantId is string
    if (typeof tenantId === "string") {
      req.tenantId = tenantId;
    } else {
      // Handle array case if needed (shouldn't happen for single header usually)
      req.tenantId = tenantId[0];
    }

    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid token" });
  }
};

import express from "express";
import helmet from "helmet";
import cors from "cors";
import { rateLimit } from "express-rate-limit";

const app = express();

// Global Middleware
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: "100kb" })); // Limit payload size (Phase 1 req)

// Rate Limiting (Phase 1 req)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: "draft-7",
  legacyHeaders: false,
});
app.use(limiter);

// Health Check
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
});

// Routes
import routes from "./routes";
app.use("/api", routes);

export default app;

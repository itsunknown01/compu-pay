import { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user?: string | JwtPayload; // or strict { sub: string }
      tenantId?: string;
    }
  }
}

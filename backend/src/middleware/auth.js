import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { db } from "../db/index.js";
import { AppError } from "../utils/errors.js";

export async function requireAuth(req, _res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;

  if (!token) {
    return next(new AppError("Authentication required", 401));
  }

  try {
    const payload = jwt.verify(token, env.jwtSecret);
    const user = (await db.get("users")).find((item) => item.id === payload.sub);
    if (!user) return next(new AppError("Invalid session", 401));
    req.user = { id: user.id, name: user.name, email: user.email, role: user.role };
    return next();
  } catch (_error) {
    return next(new AppError("Invalid or expired token", 401));
  }
}

export function requireAdmin(req, _res, next) {
  if (req.user?.role !== "admin") {
    return next(new AppError("Admin access required", 403));
  }
  return next();
}

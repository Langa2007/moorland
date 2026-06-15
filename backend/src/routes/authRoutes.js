import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { db } from "../db/index.js";
import { env, isProduction } from "../config/env.js";
import { requireAuth } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";
import { loginSchema } from "../validators/schemas.js";
import { AppError } from "../utils/errors.js";

const router = express.Router();

const COOKIE_NAME = "moorland_admin_token";
const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: isProduction,
  sameSite: isProduction ? "none" : "lax",
  maxAge: 8 * 60 * 60 * 1000,
  path: "/"
};

function publicUser(user) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role
  };
}

router.post("/login", validate(loginSchema), async (req, res, next) => {
  const user = (await db.get("users")).find((item) => item.email === req.body.email.toLowerCase());
  if (!user) return next(new AppError("Invalid email or password", 401));

  const matches = await bcrypt.compare(req.body.password, user.passwordHash);
  if (!matches) return next(new AppError("Invalid email or password", 401));

  const token = jwt.sign({ sub: user.id, role: user.role }, env.jwtSecret, { expiresIn: "8h" });

  res.cookie(COOKIE_NAME, token, COOKIE_OPTIONS);

  return res.json({ success: true, data: { user: publicUser(user) } });
});

router.post("/logout", (_req, res) => {
  res.clearCookie(COOKIE_NAME, {
    httpOnly: true,
    secure: COOKIE_OPTIONS.secure,
    sameSite: COOKIE_OPTIONS.sameSite,
    path: "/"
  });
  res.json({ success: true });
});

router.get("/me", requireAuth, (req, res) => {
  res.json({ success: true, data: req.user });
});

export default router;

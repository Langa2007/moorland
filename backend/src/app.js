import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import path from "path";
import { fileURLToPath } from "url";
import { env, isProduction } from "./config/env.js";
import publicRoutes from "./routes/publicRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.set("trust proxy", 1);

app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

app.use(cors({
  origin(origin, callback) {
    const normalizedOrigin = origin?.replace(/\/+$/, "");
    const allowedOrigins = new Set([env.frontendUrl, env.adminUrl, ...env.corsOrigins].filter(Boolean));
    if (!normalizedOrigin || allowedOrigins.has(normalizedOrigin) || !isProduction) return callback(null, true);
    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true
}));

app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 300,
  standardHeaders: true,
  legacyHeaders: false
}));

app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan(isProduction ? "combined" : "dev"));

app.use("/uploads", express.static(path.resolve(__dirname, "../uploads")));

app.get("/", (_req, res) => {
  res.json({
    success: true,
    service: "Moorland House & SPA API",
    version: "1.0.0",
    docs: "/api/health",
    publicApiBase: "/api",
    adminApiBase: "/api/admin"
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/admin/uploads", uploadRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api", publicRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;

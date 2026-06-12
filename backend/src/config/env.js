import dotenv from "dotenv";

dotenv.config();

export const env = {
  port: Number(process.env.PORT || 5000),
  nodeEnv: process.env.NODE_ENV || "development",
  frontendUrl: process.env.FRONTEND_URL || "http://127.0.0.1:3000",
  adminUrl: process.env.ADMIN_URL || "http://127.0.0.1:3001",
  corsOrigins: (process.env.CORS_ORIGINS || "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean),
  databaseUrl: process.env.DATABASE_URL || "",
  databaseSsl: process.env.DATABASE_SSL === "true",
  jwtSecret: process.env.JWT_SECRET || "change-this-long-secret-before-production",
  adminEmail: process.env.ADMIN_EMAIL || "admin@moorlandhouse-spa.com",
  adminPassword: process.env.ADMIN_PASSWORD || "ChangeMe123!",
  publicBaseUrl: process.env.PUBLIC_BASE_URL || "http://127.0.0.1:5000",
  cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME || "",
  cloudinaryApiKey: process.env.CLOUDINARY_API_KEY || "",
  cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET || "",
  cloudinaryFolder: process.env.CLOUDINARY_FOLDER || "moorland",
  resendApiKey: process.env.RESEND_API_KEY || "",
  resendFromEmail: process.env.RESEND_FROM_EMAIL || "Moorland House & SPA <onboarding@resend.dev>",
  adminNotifyEmail: process.env.ADMIN_NOTIFY_EMAIL || process.env.ADMIN_EMAIL || "admin@moorlandhouse-spa.com"
};

export const isProduction = env.nodeEnv === "production";

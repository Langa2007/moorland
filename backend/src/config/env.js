import dotenv from "dotenv";

dotenv.config();

const databaseUrl =
  process.env.DATABASE_URL ||
  process.env.DATABASE_URL_NEON ||
  process.env.NEON_DATABASE_URL ||
  process.env.NEON_DB_URL ||
  process.env.NEON_URL ||
  process.env.POSTGRES_URL ||
  process.env.POSTGRES_PRISMA_URL ||
  process.env.POSTGRES_URL_NON_POOLING ||
  "";

function cleanUrl(value = "") {
  return value.replace(/\/+$/, "");
}

export const env = {
  port: Number(process.env.PORT || 5000),
  nodeEnv: process.env.NODE_ENV || "development",
  backendUrl: cleanUrl(process.env.BACKEND_URL || process.env.PUBLIC_BASE_URL || ""),
  frontendUrl: cleanUrl(process.env.FRONTEND_URL || ""),
  adminUrl: cleanUrl(process.env.ADMIN_URL || process.env.ADMIN_FRONTEND_URL || ""),
  corsOrigins: (process.env.CORS_ORIGINS || "")
    .split(",")
    .map((origin) => cleanUrl(origin.trim()))
    .filter(Boolean),
  databaseUrl,
  databaseSsl:
    process.env.DATABASE_SSL === "true" ||
    process.env.TARGET_DATABASE_SSL === "true" ||
    /neon\.tech|neon\.database/i.test(databaseUrl),
  jwtSecret: process.env.JWT_SECRET || "change-this-long-secret-before-production",
  adminEmail: process.env.ADMIN_EMAIL || "admin@moorlandhouse-spa.com",
  adminPassword: process.env.ADMIN_PASSWORD || "ChangeMe123!",
  publicBaseUrl: cleanUrl(process.env.PUBLIC_BASE_URL || process.env.BACKEND_URL || ""),
  cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME || "",
  cloudinaryApiKey: process.env.CLOUDINARY_API_KEY || "",
  cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET || "",
  cloudinaryFolder: process.env.CLOUDINARY_FOLDER || "moorland",
  resendApiKey: process.env.RESEND_API_KEY || "",
  resendFromEmail: process.env.RESEND_FROM_EMAIL || "Moorland House & SPA <onboarding@resend.dev>",
  adminNotifyEmail: process.env.ADMIN_NOTIFY_EMAIL || process.env.ADMIN_EMAIL || "admin@moorlandhouse-spa.com",
  mpesaEnv: (process.env.MPESA_ENV || process.env.MPESA_ENVIRONMENT || "sandbox").toLowerCase(),
  mpesaConsumerKey: process.env.MPESA_CONSUMER_KEY || "",
  mpesaConsumerSecret: process.env.MPESA_CONSUMER_SECRET || "",
  mpesaShortcode: process.env.MPESA_SHORTCODE || process.env.MPESA_BUSINESS_SHORT_CODE || "",
  mpesaPasskey: process.env.MPESA_PASSKEY || "",
  mpesaCallbackUrl: cleanUrl(process.env.MPESA_CALLBACK_URL || ""),
  mpesaAccountReference: process.env.MPESA_ACCOUNT_REFERENCE || "Moorland",
  mpesaTransactionDesc: process.env.MPESA_TRANSACTION_DESC || "Moorland booking payment"
};

export const isProduction = env.nodeEnv === "production";

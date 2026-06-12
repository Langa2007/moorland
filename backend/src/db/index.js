import { env } from "../config/env.js";
import { db as jsonDb } from "./jsonStore.js";
import { postgresDb } from "./postgresStore.js";

const hasLocalDbParts = Boolean(
  process.env.DB_HOST &&
  process.env.DB_USER &&
  process.env.DB_NAME &&
  process.env.DB_HOST !== "localhost" &&
  process.env.DB_HOST !== "127.0.0.1"
);

const hasPostgresConfig = Boolean(
  env.databaseUrl || (env.nodeEnv !== "production" && process.env.DB_HOST && process.env.DB_USER && process.env.DB_NAME) || hasLocalDbParts
);

export const db = hasPostgresConfig ? postgresDb : jsonDb;
export const usingPostgres = hasPostgresConfig;

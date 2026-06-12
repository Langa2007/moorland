import { env } from "../config/env.js";
import { db as jsonDb } from "./jsonStore.js";
import { postgresDb } from "./postgresStore.js";

const hasPostgresConfig = Boolean(
  env.databaseUrl || (process.env.DB_HOST && process.env.DB_USER && process.env.DB_NAME)
);

export const db = hasPostgresConfig ? postgresDb : jsonDb;
export const usingPostgres = hasPostgresConfig;

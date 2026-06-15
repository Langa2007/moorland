import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const tables = [
  "site_meta",
  "users",
  "rooms",
  "spa_services",
  "menu_items",
  "gallery_items",
  "testimonials",
  "blog_posts",
  "availability_blocks",
  "accommodation_bookings",
  "spa_bookings",
  "lounge_reservations",
  "event_bookings",
  "food_orders",
  "contacts",
  "newsletter_subscribers",
  "reviews",
  "payments",
  "uploads"
];

function fromParts(prefix = "") {
  const host = process.env[`${prefix}DB_HOST`];
  const port = process.env[`${prefix}DB_PORT`] || 5432;
  const user = process.env[`${prefix}DB_USER`];
  const password = process.env[`${prefix}DB_PASSWORD`] || "";
  const database = process.env[`${prefix}DB_NAME`];

  if (!host || !user || !database) return "";
  const auth = `${encodeURIComponent(user)}${password ? `:${encodeURIComponent(password)}` : ""}`;
  return `postgres://${auth}@${host}:${port}/${database}`;
}

function looksLikeNeon(url = "") {
  return /neon\.tech|neon\.database/i.test(url);
}

function sourceUrl() {
  return (
    process.env.SOURCE_DATABASE_URL ||
    process.env.LOCAL_DATABASE_URL ||
    fromParts("SOURCE_") ||
    fromParts("LOCAL_") ||
    fromParts("") ||
    ""
  );
}

function firstEnvValue(names) {
  for (const name of names) {
    const value = process.env[name];
    if (value) return { name, value };
  }
  return { name: "", value: "" };
}

function targetUrl() {
  const exact = firstEnvValue([
    "NEON_DATABASE_URL",
    "NEON_DB_URL",
    "NEON_URL",
    "NEON_POSTGRES_URL",
    "NEON_POSTGRES_PRISMA_URL",
    "TARGET_DATABASE_URL",
    "TARGET_DB_URL",
    "PROD_DATABASE_URL",
    "POSTGRES_URL",
    "POSTGRES_PRISMA_URL",
    "POSTGRES_URL_NON_POOLING"
  ]);

  if (exact.value) return exact;

  if (looksLikeNeon(process.env.DATABASE_URL)) {
    return { name: "DATABASE_URL", value: process.env.DATABASE_URL };
  }

  const discovered = Object.entries(process.env).find(([name, value]) => (
    /NEON|TARGET/i.test(name) && /^postgres(ql)?:\/\//i.test(value || "")
  ));

  return discovered ? { name: discovered[0], value: discovered[1] } : { name: "", value: "" };
}

function sslFor(url, explicitValue, fallback = false) {
  if (explicitValue === "true") return { rejectUnauthorized: false };
  if (explicitValue === "false") return undefined;
  if (looksLikeNeon(url)) return { rejectUnauthorized: false };
  return fallback ? { rejectUnauthorized: false } : undefined;
}

function poolFor(label, url, ssl) {
  if (!url) {
    throw new Error(`${label} database URL is missing.`);
  }
  return new Pool({ connectionString: url, ssl });
}

async function countRows(client, table) {
  const result = await client.query(`SELECT COUNT(*)::int AS count FROM ${table}`);
  return result.rows[0].count;
}

async function copyTable(source, target, table) {
  const result = await source.query(`SELECT * FROM ${table} ORDER BY created_at ASC`);
  for (const row of result.rows) {
    if (table === "users") {
      await target.query(
        `INSERT INTO users (id, email, record, created_at, updated_at)
         VALUES ($1, $2, $3::jsonb, $4, $5)
         ON CONFLICT (id) DO UPDATE
         SET email = EXCLUDED.email, record = EXCLUDED.record, updated_at = EXCLUDED.updated_at`,
        [row.id, row.email, JSON.stringify(row.record), row.created_at, row.updated_at]
      );
    } else {
      await target.query(
        `INSERT INTO ${table} (id, record, created_at, updated_at)
         VALUES ($1, $2::jsonb, $3, $4)
         ON CONFLICT (id) DO UPDATE
         SET record = EXCLUDED.record, updated_at = EXCLUDED.updated_at`,
        [row.id, JSON.stringify(row.record), row.created_at, row.updated_at]
      );
    }
  }
  return result.rowCount;
}

async function main() {
  const sourceConnection = sourceUrl();
  const target = targetUrl();
  const targetConnection = target.value;

  if (!sourceConnection) {
    throw new Error("Set local source DB env vars: DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT or SOURCE_DATABASE_URL.");
  }

  if (!targetConnection) {
    throw new Error("Set NEON_DATABASE_URL in backend/.env, or set DATABASE_URL to your Neon connection string.");
  }

  if (sourceConnection === targetConnection) {
    throw new Error("Source and target database URLs are the same. Refusing to sync a database into itself.");
  }

  const source = poolFor("Source", sourceConnection, sslFor(sourceConnection, process.env.SOURCE_DATABASE_SSL));
  const targetPool = poolFor("Neon target", targetConnection, sslFor(targetConnection, process.env.TARGET_DATABASE_SSL, true));
  const schema = await fs.readFile(path.join(__dirname, "src/db/schema.sql"), "utf8");

  try {
    await source.query("SELECT 1");
    await targetPool.query("SELECT 1");
    await targetPool.query(schema);

    await targetPool.query("BEGIN");
    await targetPool.query(`TRUNCATE TABLE ${tables.join(", ")} RESTART IDENTITY`);

    const copied = {};
    for (const table of tables) {
      copied[table] = await copyTable(source, targetPool, table);
    }

    await targetPool.query("COMMIT");

    console.log(`Synced local Postgres data to Neon using ${target.name}.`);
    for (const table of tables) {
      const targetCount = await countRows(targetPool, table);
      console.log(`${table}: ${copied[table]} copied, ${targetCount} now on Neon`);
    }
  } catch (error) {
    await targetPool.query("ROLLBACK").catch(() => {});
    throw error;
  } finally {
    await source.end();
    await targetPool.end();
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});

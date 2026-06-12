import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { Pool } from "pg";
import { env } from "../config/env.js";
import { createDefaultData } from "./defaultData.js";
import { now } from "../utils/ids.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const collectionTables = {
  users: "users",
  rooms: "rooms",
  spaServices: "spa_services",
  menuItems: "menu_items",
  gallery: "gallery_items",
  testimonials: "testimonials",
  blogPosts: "blog_posts",
  availabilityBlocks: "availability_blocks",
  accommodationBookings: "accommodation_bookings",
  spaBookings: "spa_bookings",
  loungeReservations: "lounge_reservations",
  foodOrders: "food_orders",
  contacts: "contacts",
  newsletterSubscribers: "newsletter_subscribers",
  payments: "payments",
  uploads: "uploads"
};

const collectionNames = Object.keys(collectionTables);
let pool;
let schemaReady;

function getDatabaseUrl() {
  if (env.databaseUrl) return env.databaseUrl;
  const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;
  if (!DB_HOST || !DB_USER || !DB_NAME) return "";
  const password = DB_PASSWORD ? `:${encodeURIComponent(DB_PASSWORD)}` : "";
  return `postgres://${encodeURIComponent(DB_USER)}${password}@${DB_HOST}:${DB_PORT || 5432}/${DB_NAME}`;
}

function getPool() {
  if (pool) return pool;
  const connectionString = getDatabaseUrl();
  if (!connectionString) {
    throw new Error("DATABASE_URL or DB_HOST/DB_USER/DB_NAME must be set to use Postgres.");
  }
  pool = new Pool({
    connectionString,
    ssl: env.databaseSsl ? { rejectUnauthorized: false } : undefined
  });
  return pool;
}

function tableFor(collection) {
  const table = collectionTables[collection];
  if (!table) throw new Error(`Unknown collection: ${collection}`);
  return table;
}

function rowToRecord(row) {
  if (!row) return null;
  return {
    ...row.record,
    createdAt: row.record?.createdAt || row.created_at?.toISOString?.() || row.created_at,
    updatedAt: row.record?.updatedAt || row.updated_at?.toISOString?.() || row.updated_at
  };
}

async function ensureSchema() {
  if (!schemaReady) {
    schemaReady = (async () => {
      const schema = await fs.readFile(path.join(__dirname, "schema.sql"), "utf8");
      await getPool().query(schema);
    })();
  }
  return schemaReady;
}

async function upsertRecord(client, table, record) {
  const timestamp = now();
  const payload = {
    ...record,
    createdAt: record.createdAt || timestamp,
    updatedAt: record.updatedAt || timestamp
  };

  if (table === "users") {
    await client.query(
      `INSERT INTO users (id, email, record, created_at, updated_at)
       VALUES ($1, $2, $3::jsonb, $4, $5)
       ON CONFLICT (id) DO UPDATE
       SET email = EXCLUDED.email, record = EXCLUDED.record, updated_at = EXCLUDED.updated_at`,
      [payload.id, payload.email.toLowerCase(), JSON.stringify(payload), payload.createdAt, payload.updatedAt]
    );
    return payload;
  }

  await client.query(
    `INSERT INTO ${table} (id, record, created_at, updated_at)
     VALUES ($1, $2::jsonb, $3, $4)
     ON CONFLICT (id) DO UPDATE
     SET record = EXCLUDED.record, updated_at = EXCLUDED.updated_at`,
    [payload.id, JSON.stringify(payload), payload.createdAt, payload.updatedAt]
  );
  return payload;
}

export const postgresDb = {
  path: "postgres",
  tables: collectionTables,
  async ready() {
    await ensureSchema();
  },
  async reset(seedData = createDefaultData()) {
    await ensureSchema();
    const client = await getPool().connect();
    try {
      await client.query("BEGIN");
      await client.query(
        `TRUNCATE TABLE site_meta, ${Object.values(collectionTables).join(", ")} RESTART IDENTITY`
      );
      const meta = { ...seedData.meta, updatedAt: seedData.meta.updatedAt || now() };
      await client.query(
        `INSERT INTO site_meta (id, record, created_at, updated_at)
         VALUES ('site', $1::jsonb, $2, $3)
         ON CONFLICT (id) DO UPDATE SET record = EXCLUDED.record, updated_at = EXCLUDED.updated_at`,
        [JSON.stringify(meta), meta.createdAt || now(), meta.updatedAt || now()]
      );

      for (const collection of collectionNames) {
        const table = tableFor(collection);
        for (const record of seedData[collection] || []) {
          await upsertRecord(client, table, record);
        }
      }

      await client.query("COMMIT");
      return this.all();
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  },
  async all() {
    await ensureSchema();
    const data = { meta: await this.get("meta") };
    for (const collection of collectionNames) {
      data[collection] = await this.get(collection);
    }
    return data;
  },
  async save(data) {
    return this.reset(data);
  },
  async get(collection) {
    await ensureSchema();
    if (collection === "meta") {
      const result = await getPool().query("SELECT * FROM site_meta WHERE id = 'site' LIMIT 1");
      return rowToRecord(result.rows[0]) || {};
    }
    const table = tableFor(collection);
    const result = await getPool().query(`SELECT * FROM ${table} ORDER BY created_at ASC`);
    return result.rows.map(rowToRecord);
  },
  async set(collection, value) {
    await ensureSchema();
    if (collection !== "meta") throw new Error("Only meta can be set directly.");
    const meta = { ...value, updatedAt: now() };
    await getPool().query(
      `INSERT INTO site_meta (id, record, updated_at)
       VALUES ('site', $1::jsonb, $2)
       ON CONFLICT (id) DO UPDATE SET record = EXCLUDED.record, updated_at = EXCLUDED.updated_at`,
      [JSON.stringify(meta), meta.updatedAt]
    );
    return meta;
  },
  async insert(collection, item) {
    await ensureSchema();
    const table = tableFor(collection);
    const client = await getPool().connect();
    try {
      return upsertRecord(client, table, {
        ...item,
        createdAt: item.createdAt || now(),
        updatedAt: item.updatedAt || now()
      });
    } finally {
      client.release();
    }
  },
  async update(collection, id, patch) {
    await ensureSchema();
    const table = tableFor(collection);
    const result = await getPool().query(`SELECT * FROM ${table} WHERE id = $1 LIMIT 1`, [id]);
    const current = rowToRecord(result.rows[0]);
    if (!current) return null;
    const next = { ...current, ...patch, id, updatedAt: now() };
    if (table === "users") {
      await getPool().query(
        "UPDATE users SET email = $2, record = $3::jsonb, updated_at = $4 WHERE id = $1",
        [id, next.email.toLowerCase(), JSON.stringify(next), next.updatedAt]
      );
    } else {
      await getPool().query(
        `UPDATE ${table} SET record = $2::jsonb, updated_at = $3 WHERE id = $1`,
        [id, JSON.stringify(next), next.updatedAt]
      );
    }
    return next;
  },
  async remove(collection, id) {
    await ensureSchema();
    const table = tableFor(collection);
    const result = await getPool().query(`DELETE FROM ${table} WHERE id = $1 RETURNING *`, [id]);
    return rowToRecord(result.rows[0]);
  }
};

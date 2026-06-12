import bcrypt from "bcryptjs";
import { db, usingPostgres } from "./src/db/index.js";
import { env } from "./src/config/env.js";
import { now } from "./src/utils/ids.js";

const email = (process.env.ADMIN_EMAIL || env.adminEmail).toLowerCase();
const password = process.env.ADMIN_PASSWORD || env.adminPassword;
const name = process.env.ADMIN_NAME || "Moorland Admin";

if (!email || !password) {
  throw new Error("ADMIN_EMAIL and ADMIN_PASSWORD are required.");
}

await db.ready?.();

const users = await db.get("users");
const existing = users.find((user) => user.email?.toLowerCase() === email || user.id === "user_admin");
const passwordHash = await bcrypt.hash(password, 10);

const admin = {
  id: existing?.id || "user_admin",
  name,
  email,
  passwordHash,
  role: "admin",
  createdAt: existing?.createdAt || now(),
  updatedAt: now()
};

if (existing) {
  await db.update("users", existing.id, admin);
  console.log(`Updated admin user ${email} in ${usingPostgres ? "Postgres" : "JSON storage"}.`);
} else {
  await db.insert("users", admin);
  console.log(`Created admin user ${email} in ${usingPostgres ? "Postgres" : "JSON storage"}.`);
}

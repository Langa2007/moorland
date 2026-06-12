import { db, usingPostgres } from "../db/index.js";

await db.reset();
console.log(`Seeded Moorland backend data into ${usingPostgres ? "Postgres" : db.path}`);

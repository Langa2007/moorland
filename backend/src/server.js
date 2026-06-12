import app from "./app.js";
import { env } from "./config/env.js";
import { db, usingPostgres } from "./db/index.js";

await db.ready?.();

const server = app.listen(env.port, () => {
  console.log(`Moorland House & SPA API running on http://127.0.0.1:${env.port}`);
  console.log(`Storage: ${usingPostgres ? "Postgres" : "JSON file preview"}`);
});

function shutdown(signal) {
  console.log(`${signal} received. Closing API server.`);
  server.close(() => process.exit(0));
}

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));

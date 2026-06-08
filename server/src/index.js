import { app } from "./app.js";
import { env } from "./config/env.js";
import { pool } from "./db/pool.js";

const server = app.listen(env.port, () => {
  console.log(`Lumé API pronta su http://localhost:${env.port}`);
});

const shutdown = async () => {
  console.log("Chiusura API Lumé...");
  server.close(async () => {
    await pool.end();
    process.exit(0);
  });
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

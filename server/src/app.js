import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { env } from "./config/env.js";
import { healthRouter } from "./routes/health.js";
import { catalogRouter } from "./routes/catalog.js";
import { engagementRouter } from "./routes/engagement.js";
import { ordersRouter } from "./routes/orders.js";
import { productAssetsRouter } from "./routes/productAssets.js";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", env.frontendOrigin);
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  return next();
});

app.use(express.json({ limit: "1mb" }));
app.use("/uploads", express.static(path.resolve(__dirname, "../uploads")));

app.use("/api/health", healthRouter);
app.use("/api", productAssetsRouter);
app.use("/api", catalogRouter);
app.use("/api", engagementRouter);
app.use("/api", ordersRouter);

app.use(notFoundHandler);
app.use(errorHandler);

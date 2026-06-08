import { Router } from "express";
import { query } from "../db/pool.js";
import { asyncHandler } from "../middleware/asyncHandler.js";

export const healthRouter = Router();

healthRouter.get(
  "/",
  asyncHandler(async (_req, res) => {
    await query("SELECT 1");

    res.json({
      status: "ok",
      service: "lume-api",
      database: "connected",
      checkedAt: new Date().toISOString(),
    });
  }),
);

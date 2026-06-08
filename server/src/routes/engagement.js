import { Router } from "express";
import { query } from "../db/pool.js";
import { asyncHandler } from "../middleware/asyncHandler.js";
import { badRequest } from "../utils/httpError.js";

export const engagementRouter = Router();

const isValidEmail = (email) => /\S+@\S+\.\S+/.test(String(email ?? ""));

engagementRouter.post(
  "/newsletter",
  asyncHandler(async (req, res) => {
    const { email, source = "website" } = req.body;

    if (!isValidEmail(email)) {
      throw badRequest("Inserisci un indirizzo email valido");
    }

    const { rows } = await query(
      `
        INSERT INTO newsletter_subscribers (email, source)
        VALUES ($1, $2)
        ON CONFLICT (email) DO UPDATE SET source = EXCLUDED.source
        RETURNING id, email, source, created_at;
      `,
      [email.toLowerCase(), source],
    );

    res.status(201).json({
      data: rows[0],
      message: "Iscrizione alla newsletter salvata",
    });
  }),
);

engagementRouter.post(
  "/contact",
  asyncHandler(async (req, res) => {
    const { name, email, topic, message } = req.body;

    if (!name || !isValidEmail(email) || !topic || !message) {
      throw badRequest("Nome, email, argomento e messaggio sono obbligatori");
    }

    const { rows } = await query(
      `
        INSERT INTO contact_messages (name, email, topic, message)
        VALUES ($1, $2, $3, $4)
        RETURNING id, name, email, topic, status, created_at;
      `,
      [name, email.toLowerCase(), topic, message],
    );

    res.status(201).json({
      data: rows[0],
      message: "Messaggio ricevuto",
    });
  }),
);

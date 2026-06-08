import { env } from "../config/env.js";

export const notFoundHandler = (req, res) => {
  res.status(404).json({
    error: {
      message: `Endpoint non trovato: ${req.method} ${req.originalUrl}`,
    },
  });
};

export const errorHandler = (error, req, res, _next) => {
  const statusCode = error.statusCode ?? 500;

  if (statusCode >= 500) {
    console.error(error);
  }

  res.status(statusCode).json({
    error: {
      message: error.message ?? "Errore interno del server",
      details: error.details,
      stack: env.nodeEnv === "development" ? error.stack : undefined,
    },
  });
};

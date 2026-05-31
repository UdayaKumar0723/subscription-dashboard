import { ErrorRequestHandler, RequestHandler } from "express";
import { env } from "../config/env";

export const notFoundHandler: RequestHandler = (req, _res, next) => {
  next({ statusCode: 404, message: `Route not found: ${req.method} ${req.originalUrl}` });
};

export const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  const statusCode = error.statusCode || 500;
  const message = error.message || "Internal server error";

  return res.status(statusCode).json({
    success: false,
    message,
    ...(env.nodeEnv === "development" && error.stack ? { stack: error.stack } : {})
  });
};

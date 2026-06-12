import { AppError } from "../utils/errors.js";
import { isProduction } from "../config/env.js";

export function notFoundHandler(req, _res, next) {
  next(new AppError(`Route not found: ${req.method} ${req.originalUrl}`, 404));
}

export function errorHandler(error, _req, res, _next) {
  const status = error.status || 500;
  const payload = {
    success: false,
    message: status === 500 && isProduction ? "Internal server error" : error.message,
    details: error.details || null
  };

  if (status === 500 && !isProduction) {
    payload.stack = error.stack;
  }

  res.status(status).json(payload);
}

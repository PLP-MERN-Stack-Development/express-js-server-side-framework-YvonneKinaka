// middleware/logger.js

export const logger = (req, res, next) => {
  const now = new Date().toISOString();
  console.log(`[${now}] ${req.method} ${req.originalUrl}`);
  next(); // Continue to next middleware or route
};

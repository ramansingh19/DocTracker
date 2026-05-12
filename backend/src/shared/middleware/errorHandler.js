function errorHandler(error, _req, res, _next) {
  const status = error.status || 500;
  const message = error.message || "Internal server error";

  if (status >= 500) {
    // Keep stack logging only for server-side diagnostics.
    // eslint-disable-next-line no-console
    console.error(error);
  }

  res.status(status).json({
    message,
    details: error.details || undefined,
  });
}

module.exports = errorHandler;

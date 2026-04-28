/**
 * logger middleware
 * Ghi log request method, url, thời gian xử lý
 */
const logger = (req, res, next) => {
  const start = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - start;
    const timestamp = new Date().toISOString();
    console.log(
      `[LOG] ${timestamp} | ${req.method} ${req.originalUrl} | Status: ${res.statusCode} | ${duration}ms`
    );
  });

  next();
};

module.exports = logger;

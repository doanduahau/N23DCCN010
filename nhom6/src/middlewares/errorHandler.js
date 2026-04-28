/**
 * errorHandler middleware
 * Xử lý lỗi tập trung toàn bộ hệ thống (global error handler)
 */
const errorHandler = (err, req, res, next) => {
  console.error(`[ERROR] ${new Date().toISOString()} - ${err.message}`);

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({ success: false, message: messages.join(', ') });
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return res.status(409).json({
      success: false,
      message: `Giá trị của trường "${field}" đã tồn tại trong hệ thống`,
    });
  }

  // Mongoose CastError (wrong type)
  if (err.name === 'CastError') {
    return res.status(400).json({ success: false, message: `Dữ liệu không hợp lệ: ${err.message}` });
  }

  // Default server error
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Đã xảy ra lỗi máy chủ nội bộ',
  });
};

module.exports = errorHandler;

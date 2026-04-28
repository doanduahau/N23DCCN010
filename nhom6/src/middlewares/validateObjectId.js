const mongoose = require('mongoose');

/**
 * validateObjectId middleware
 * Kiểm tra id hợp lệ MongoDB ObjectId trước khi xử lý request
 */
const validateObjectId = (req, res, next) => {
  const { id } = req.params;
  if (id && !mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      message: `ID "${id}" không phải là MongoDB ObjectId hợp lệ`,
    });
  }
  next();
};

module.exports = validateObjectId;

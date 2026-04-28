const express = require('express');
const mongoose = require('mongoose');
const logger = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');
const studentRoutes = require('./routes/student.routes');

const app = express();

// Parse JSON body
app.use(express.json());

// Logger middleware
app.use(logger);

// Health check
app.get('/', (req, res) => {
  res.json({ success: true, message: 'Student Management API is running 🚀' });
});

// Routes
app.use('/api/students', studentRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Không tìm thấy route: ${req.method} ${req.originalUrl}` });
});

// Global error handler (must be last)
app.use(errorHandler);

module.exports = app;

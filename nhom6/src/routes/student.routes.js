const express = require('express');
const router = express.Router();
const studentController = require('../controllers/student.controller');
const validateObjectId = require('../middlewares/validateObjectId');

// Advanced / static routes MUST come before dynamic /:id routes

// GET /api/students/top?limit=5
router.get('/top', studentController.getTopStudents.bind(studentController));

// GET /api/students/stats/avg
router.get('/stats/avg', studentController.getAverageScore.bind(studentController));

// GET /api/students/search?q=keyword
router.get('/search', studentController.searchStudents.bind(studentController));

// --- CRUD ---

// GET /api/students  (with pagination & filter by major)
router.get('/', studentController.getStudents.bind(studentController));

// POST /api/students
router.post('/', studentController.createStudent.bind(studentController));

// GET /api/students/:id
router.get('/:id', validateObjectId, studentController.getStudentById.bind(studentController));

// PUT /api/students/:id
router.put('/:id', validateObjectId, studentController.updateStudent.bind(studentController));

// DELETE /api/students/:id  (soft delete)
router.delete('/:id', validateObjectId, studentController.deleteStudent.bind(studentController));

// PATCH /api/students/:id/score
router.patch('/:id/score', validateObjectId, studentController.updateScore.bind(studentController));

module.exports = router;

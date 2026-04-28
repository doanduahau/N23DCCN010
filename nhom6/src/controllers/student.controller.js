const studentService = require('../services/student.service');

class StudentController {
  // GET /api/students
  async getStudents(req, res, next) {
    try {
      const { page, limit, major } = req.query;
      const result = await studentService.getStudents({ page, limit, major });
      res.json({ success: true, ...result });
    } catch (err) {
      next(err);
    }
  }

  // GET /api/students/:id
  async getStudentById(req, res, next) {
    try {
      const student = await studentService.getStudentById(req.params.id);
      if (!student) {
        return res.status(404).json({ success: false, message: 'Không tìm thấy sinh viên' });
      }
      res.json({ success: true, data: student });
    } catch (err) {
      next(err);
    }
  }

  // POST /api/students
  async createStudent(req, res, next) {
    try {
      const student = await studentService.createStudent(req.body);
      res.status(201).json({ success: true, data: student });
    } catch (err) {
      next(err);
    }
  }

  // PUT /api/students/:id
  async updateStudent(req, res, next) {
    try {
      const student = await studentService.updateStudent(req.params.id, req.body);
      if (!student) {
        return res.status(404).json({ success: false, message: 'Không tìm thấy sinh viên' });
      }
      res.json({ success: true, data: student });
    } catch (err) {
      next(err);
    }
  }

  // DELETE /api/students/:id  (soft delete)
  async deleteStudent(req, res, next) {
    try {
      const student = await studentService.deleteStudent(req.params.id);
      if (!student) {
        return res.status(404).json({ success: false, message: 'Không tìm thấy sinh viên' });
      }
      res.json({ success: true, message: 'Đã xóa sinh viên (soft delete)', data: student });
    } catch (err) {
      next(err);
    }
  }

  // PATCH /api/students/:id/score
  async updateScore(req, res, next) {
    try {
      const { score } = req.body;
      if (score === undefined || score === null) {
        return res.status(400).json({ success: false, message: 'Trường score là bắt buộc' });
      }
      const numScore = Number(score);
      if (isNaN(numScore) || numScore < 0 || numScore > 100) {
        return res.status(400).json({ success: false, message: 'Điểm phải nằm trong khoảng 0 - 100' });
      }
      const student = await studentService.updateScore(req.params.id, numScore);
      if (!student) {
        return res.status(404).json({ success: false, message: 'Không tìm thấy sinh viên' });
      }
      res.json({ success: true, data: student });
    } catch (err) {
      next(err);
    }
  }

  // GET /api/students/top?limit=5
  async getTopStudents(req, res, next) {
    try {
      const { limit } = req.query;
      const students = await studentService.getTopStudents(limit || 5);
      res.json({ success: true, data: students });
    } catch (err) {
      next(err);
    }
  }

  // GET /api/students/stats/avg
  async getAverageScore(req, res, next) {
    try {
      const stats = await studentService.getAverageScore();
      res.json({ success: true, data: stats });
    } catch (err) {
      next(err);
    }
  }

  // GET /api/students/search?q=keyword
  async searchStudents(req, res, next) {
    try {
      const { q } = req.query;
      if (!q) {
        return res.status(400).json({ success: false, message: 'Vui lòng cung cấp từ khóa tìm kiếm (q)' });
      }
      const students = await studentService.searchStudents(q);
      res.json({ success: true, data: students });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new StudentController();

const Student = require('../models/student.model');

class StudentService {
  // Lấy danh sách sinh viên với pagination và filter
  async getStudents({ page = 1, limit = 10, major } = {}) {
    const filter = { isActive: true };
    if (major) filter.major = major;

    const skip = (page - 1) * limit;
    const total = await Student.countDocuments(filter);
    const students = await Student.find(filter).skip(skip).limit(Number(limit)).sort({ createdAt: -1 });

    return {
      data: students,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  // Lấy chi tiết sinh viên theo _id (MongoDB ObjectId)
  async getStudentById(id) {
    const student = await Student.findById(id);
    return student;
  }

  // Tạo sinh viên mới
  async createStudent(data) {
    const student = new Student(data);
    await student.save();
    return student;
  }

  // Cập nhật sinh viên
  async updateStudent(id, data) {
    const student = await Student.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true, runValidators: true }
    );
    return student;
  }

  // Xóa mềm sinh viên (soft delete)
  async deleteStudent(id) {
    const student = await Student.findByIdAndUpdate(
      id,
      { $set: { isActive: false } },
      { new: true }
    );
    return student;
  }

  // Cập nhật điểm sinh viên
  async updateScore(id, score) {
    const student = await Student.findByIdAndUpdate(
      id,
      { $set: { score } },
      { new: true, runValidators: true }
    );
    return student;
  }

  // Lấy top sinh viên theo điểm
  async getTopStudents(limit = 5) {
    const students = await Student.find({ isActive: true })
      .sort({ score: -1 })
      .limit(Number(limit));
    return students;
  }

  // Tính điểm trung bình
  async getAverageScore() {
    const result = await Student.aggregate([
      { $match: { isActive: true } },
      { $group: { _id: null, avgScore: { $avg: '$score' }, total: { $sum: 1 } } },
    ]);
    if (result.length === 0) return { avgScore: 0, total: 0 };
    return { avgScore: Number(result[0].avgScore.toFixed(2)), total: result[0].total };
  }

  // Tìm kiếm sinh viên theo tên
  async searchStudents(q) {
    const students = await Student.find({
      isActive: true,
      name: { $regex: q, $options: 'i' },
    }).sort({ name: 1 });
    return students;
  }
}

module.exports = new StudentService();

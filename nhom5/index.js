const express = require('express');
const app = express();
const PORT = 3000;

// ─── MIDDLEWARE ───────────────────────────────────────────────────────────────

// Parse JSON body
app.use(express.json());

// MW1: Logger — ghi [time] METHOD /path ra console cho mỗi request
app.use((req, res, next) => {
  const now = new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });
  console.log(`[${now}] ${req.method} ${req.path}`);
  next();
});

// MW2: checkAge — áp dụng cho GET /api/info
// Nếu age < 18 hoặc không có → trả 400 + message lỗi
const checkAge = (req, res, next) => {
  const age = parseInt(req.query.age);
  if (!age || age < 18) {
    return res.status(400).json({ error: 'Bạn chưa đủ 18 tuổi hoặc chưa nhập tuổi. Không thể truy cập!' });
  }
  next();
};

// ─── ROUTES ───────────────────────────────────────────────────────────────────

// GET /api/info?name=&age=  — gắn middleware checkAge
app.get('/api/info', checkAge, (req, res) => {
  const { name, age } = req.query;
  res.json({
    message: `Xin chào, ${name || 'bạn'}! Chào mừng bạn.`,
    name: name || '',
    age: parseInt(age),
  });
});

// POST /api/register — body: name, age, email
// Validate không bỏ trống, trả lại thông tin + id tự tăng
let userIdCounter = 1;
const users = [];

app.post('/api/register', (req, res) => {
  const { name, age, email } = req.body;

  // Validate
  if (!name || !age || !email) {
    return res.status(400).json({ error: 'Vui lòng điền đầy đủ thông tin: name, age, email.' });
  }
  if (parseInt(age) < 1 || isNaN(parseInt(age))) {
    return res.status(400).json({ error: 'Tuổi không hợp lệ.' });
  }

  const newUser = {
    id: userIdCounter++,
    name,
    age: parseInt(age),
    email,
    registeredAt: new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' }),
  };

  users.push(newUser);
  console.log('Đăng ký mới:', newUser);

  res.status(201).json({
    message: `Đăng ký thành công! Chào mừng ${name}!`,
    user: newUser,
  });
});

// Serve static files từ thư mục public/
app.use(express.static('public'));

// ─── START SERVER ─────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`✅ Server đang chạy tại: http://localhost:${PORT}`);
});

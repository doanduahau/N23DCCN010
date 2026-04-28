# Nhóm 6 — Student Management REST API

API quản lý sinh viên xây dựng bằng **Node.js + Express + MongoDB (Mongoose)**, theo kiến trúc phân lớp `routes → controller → service → model`.

---

## 🏗️ Kiến trúc project

```
nhom6/
├── index.js                          # Entry point
├── .env                              # Biến môi trường (tạo từ .env.example)
├── .env.example                      # Mẫu biến môi trường
└── src/
    ├── app.js                        # Khởi tạo Express app + middleware
    ├── models/
    │   └── student.model.js          # Mongoose Schema
    ├── services/
    │   └── student.service.js        # Business logic
    ├── controllers/
    │   └── student.controller.js     # Xử lý request/response
    ├── routes/
    │   └── student.routes.js         # Định nghĩa routes
    └── middlewares/
        ├── validateObjectId.js       # Kiểm tra MongoDB ObjectId hợp lệ
        ├── errorHandler.js           # Global error handler
        └── logger.js                 # Ghi log request
```

---

## ⚙️ Cài đặt & Chạy

### Yêu cầu
- Node.js >= 18
- MongoDB (local hoặc MongoDB Atlas)

### Các bước

```bash
# 1. Clone repo
git clone https://github.com/doanduahau/N23DCCN010.git
cd N23DCCN010/nhom6

# 2. Cài dependencies
npm install

# 3. Tạo file .env từ mẫu
copy .env.example .env
# Mở .env và điền MONGODB_URI của bạn

# 4. Chạy server (development)
npm run dev

# Hoặc chạy production
npm start
```

Server mặc định chạy tại: `http://localhost:3000`

---

## 📋 Model Student

| Trường | Kiểu | Ràng buộc |
|--------|------|-----------|
| `studentId` | String | required, unique — Mã sinh viên |
| `name` | String | required — Họ tên |
| `email` | String | required, unique — Email |
| `score` | Number | min 0, max 100, default 0 — Điểm số |
| `major` | String | enum: IT, Business, Design, Marketing |
| `enrollmentDate` | Date | default: Date.now — Ngày nhập học |
| `isActive` | Boolean | default: true — Trạng thái (soft delete) |

---

## 🔌 Danh sách API

### CRUD cơ bản

| Method | URL | Mô tả |
|--------|-----|-------|
| `POST` | `/api/students` | Tạo sinh viên mới |
| `GET` | `/api/students` | Lấy danh sách (có phân trang + filter) |
| `GET` | `/api/students/:id` | Lấy chi tiết sinh viên |
| `PUT` | `/api/students/:id` | Cập nhật sinh viên |
| `DELETE` | `/api/students/:id` | Xóa mềm sinh viên |

### API nâng cao

| Method | URL | Mô tả |
|--------|-----|-------|
| `PATCH` | `/api/students/:id/score` | Cập nhật điểm sinh viên |
| `GET` | `/api/students/top?limit=5` | Top sinh viên theo điểm |
| `GET` | `/api/students/stats/avg` | Tính điểm trung bình |
| `GET` | `/api/students/search?q=keyword` | Tìm kiếm theo tên |

---

## 📖 Ví dụ sử dụng API

### POST /api/students — Tạo sinh viên
```json
// Request body
{
  "studentId": "SV001",
  "name": "Nguyễn Văn A",
  "email": "vana@example.com",
  "score": 85,
  "major": "IT",
  "enrollmentDate": "2023-09-01"
}

// Response 201
{
  "success": true,
  "data": {
    "_id": "664f...",
    "studentId": "SV001",
    "name": "Nguyễn Văn A",
    "email": "vana@example.com",
    "score": 85,
    "major": "IT",
    "enrollmentDate": "2023-09-01T00:00:00.000Z",
    "isActive": true
  }
}
```

### GET /api/students — Danh sách có phân trang & filter
```
GET /api/students?page=1&limit=5&major=IT
```
```json
{
  "success": true,
  "data": [...],
  "pagination": {
    "total": 20,
    "page": 1,
    "limit": 5,
    "totalPages": 4
  }
}
```

### PATCH /api/students/:id/score — Cập nhật điểm
```json
// Request body
{ "score": 92 }

// Response 200
{ "success": true, "data": { ... } }

// Lỗi: score ngoài khoảng 0-100
// Response 400
{ "success": false, "message": "Điểm phải nằm trong khoảng 0 - 100" }

// Lỗi: không tìm thấy sinh viên
// Response 404
{ "success": false, "message": "Không tìm thấy sinh viên" }
```

### DELETE /api/students/:id — Xóa mềm
```json
// Response 200 — chỉ set isActive = false, không xóa record khỏi DB
{
  "success": true,
  "message": "Đã xóa sinh viên (soft delete)",
  "data": { "isActive": false, ... }
}
```

### GET /api/students/top?limit=5 — Top sinh viên
```
GET /api/students/top?limit=3
```
```json
{
  "success": true,
  "data": [
    { "name": "Trần Thị B", "score": 98, ... },
    { "name": "Lê Văn C",   "score": 95, ... },
    { "name": "Nguyễn D",   "score": 92, ... }
  ]
}
```

### GET /api/students/stats/avg — Điểm trung bình
```json
{
  "success": true,
  "data": { "avgScore": 78.5, "total": 20 }
}
```

### GET /api/students/search?q=keyword — Tìm kiếm
```
GET /api/students/search?q=nguyễn
```
```json
{
  "success": true,
  "data": [
    { "name": "Nguyễn Văn A", ... },
    { "name": "Nguyễn Thị B", ... }
  ]
}
```

---

## 🛡️ Middleware

| Middleware | Mô tả |
|-----------|-------|
| `logger` | Ghi log method, URL, status code, thời gian xử lý |
| `validateObjectId` | Kiểm tra `:id` là MongoDB ObjectId hợp lệ trước khi vào controller |
| `errorHandler` | Xử lý tập trung tất cả lỗi: validation, duplicate key, cast error, server error |

---

## 🛠️ Công nghệ sử dụng

- **Node.js** + **Express** — HTTP server & routing
- **Mongoose** — ODM cho MongoDB
- **dotenv** — Quản lý biến môi trường

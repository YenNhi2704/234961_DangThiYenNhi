// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors()); // Cho phép Frontend gọi API

// Kết nối MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Đã kết nối MongoDB Atlas thành công'))
  .catch((err) => console.error('❌ Lỗi kết nối MongoDB:', err));

// Endpoint kiểm tra sức khỏe hệ thống (Yêu cầu của đề bài)
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Backend API quản lý món ăn đang hoạt động!' });
});

// Chèn Router ở bước sau vào đây
app.use('/api/foods', require('./routes/foodRoutes'));

// Khởi chạy server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`);
});
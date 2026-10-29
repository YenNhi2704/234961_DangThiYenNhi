# Hệ thống quản lý món ăn trên nền tảng đám mây

## Mô tả đề tài
Dự án xây dựng ứng dụng quản lý danh mục món ăn, bao gồm frontend, backend API và cơ sở dữ liệu trên đám mây. Hệ thống hỗ trợ các thao tác CRUD và tìm kiếm món ăn.

## Công nghệ sử dụng
- **Frontend:** React, Vite
- **Backend:** Node.js, Express
- **Cơ sở dữ liệu:** MongoDB Atlas
- **Đóng gói & Triển khai:** Docker, Docker Hub, Render

## Cấu trúc dự án
- `/frontend`: Giao diện người dùng (React).
- `/backend`: Mã nguồn xử lý API (Node.js).

## Hướng dẫn cài đặt và chạy (Local)
1. Cài đặt các thư viện cho backend: `cd backend && npm install`
2. Cài đặt các thư viện cho frontend: `cd frontend && npm install`
3. Cấu hình file `.env` tại backend với biến `MONGODB_URI` và `PORT`.
4. Khởi chạy backend: `npm start`
5. Khởi chạy frontend: `npm run dev`
## Hướng dẫn chạy bằng Docker
### Backend
1. Kéo image từ Docker Hub: `docker pull <tên-tài-khoản-của-bạn>/backend`
2. Chạy container: `docker run -d -p 5000:5000 --env-file ./backend/.env yennhi2706/backend`
### Frontend
1. Kéo image từ Docker Hub: `docker pull <tên-tài-khoản-của-bạn>/frontend`
2. Chạy container: `docker run -d -p 3000:3000 yennhi2706/frontend`
3. Truy cập giao diện tại: `http://localhost:3000`
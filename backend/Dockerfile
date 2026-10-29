# Sử dụng môi trường Node.js bản nhẹ
FROM node:18-alpine

# Khai báo thư mục làm việc trong container
WORKDIR /app

# Copy các file quản lý thư viện vào trước
COPY package*.json ./

# Cài đặt thư viện
RUN npm install

# Copy toàn bộ mã nguồn backend vào container (sẽ bỏ qua file .env nhờ .dockerignore)
COPY . .

# Mở port 5000 
EXPOSE 5000

# Lệnh khởi chạy server
CMD ["npm", "start"]
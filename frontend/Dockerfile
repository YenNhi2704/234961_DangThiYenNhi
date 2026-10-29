# Sử dụng môi trường Node.js bản nhẹ
FROM node:20-alpine

# Cài đặt thư mục làm việc
WORKDIR /app

# Copy các file quản lý thư viện vào trước và cài đặt
COPY package*.json ./
RUN npm install

# Copy toàn bộ mã nguồn vào container
COPY . .

# Build ứng dụng Vite ra thư mục dist
RUN npm run build

# Cài đặt server tĩnh để chạy frontend
RUN npm install -g serve

# Mở port 3000
EXPOSE 3000

# Lệnh khởi chạy ứng dụng
CMD ["serve", "-s", "dist", "-l", "3000"]
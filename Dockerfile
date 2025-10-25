# Base image Node.js nhẹ
FROM node:18-alpine

# Thư mục làm việc trong container
WORKDIR /app

# Sao chép package.json và package-lock.json
COPY package*.json ./

# Cài đặt các phụ thuộc
RUN npm install

# Sao chép toàn bộ mã nguồn
COPY . .

# Mở port 
EXPOSE 5000

# Lệnh để chạy ứng dụng
CMD ["node", "index.js"]

# Sử dụng image Nginx chính thức
FROM nginx:latest

# Sao chép file cấu hình nginx.conf của bạn vào thư mục cấu hình của Nginx
COPY nginx.conf /etc/nginx/conf.d/restaurant.conf

RUN rm /etc/nginx/conf.d/default.conf
# Sao chép tất cả nội dung thư mục gốc của dự án vào thư mục /usr/share/nginx/html
COPY . /usr/share/nginx/html

# Chỉ định thư mục làm việc
WORKDIR /usr/share/nginx/html

# Mở cổng 80 cho Nginx
EXPOSE 80

# Khởi động Nginx
CMD ["nginx", "-g", "daemon off;"]


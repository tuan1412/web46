Express là framework để xây dựng backend (ngoài ExpressJS ra thì còn rất nhiều các nodejs framework khác như NestJS, SailJS, ...)
Bản chất xây dựng web app server là gì? (một số ngôn ngữ khác thì cần một ứng web server bao vào như Nginx, Apache)

=> Chạy một ứng dụng máy tính (thiết bị điện tử có hệ điều hành)
=> Tạo một service run ở port nào đó (8080)
=> Lắng nghe những thông tin client gọi lên

Express define các router
+ method: GET, POST, PUT, DELETE, ...
+ url: '/abc', '/xyz'
+ callback để trả dữ liệu => string, object, json, file html, css, ...

Express define static folder
=> cung cấp một cơ chế để xác định file tĩnh (html, css, image, js, ..) một cách dễ dàng

Express define một cơ chế để đọc data client gửi lên
+ app.use(express.urlencoded({ extended: true }));
+ app.use(express.json());

Chức năng web
+ Chức năng tĩnh: hiệu ứng, chạy animation, ... ko cần lưu kết quả, khi load lại trang ở bất kì trình duyệt thì kết quả cũ ko còn => javascript như bình thường, thao tác với dom

+ Chức năng động: có thao tác với server
1. Xác định khi nào gọi lên server 2 trường hợp
+++ Load trang
+++ Trong event với dom, mouse, keyboard

2. Gọi lên server một HTTP request (fetch, ajax của jquery, axios)

3. Code chức năng trên server => đọc thông tin client => trả về thông tin client

4. Client đọc được và thao tác với dom để kết quả.

NPM script
=> define câu lệnh trong value của script trong package.json






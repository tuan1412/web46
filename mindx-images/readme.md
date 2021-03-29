# Bước 1: Phân tích project có những chức năng gì?
https://mindx-images-ui.herokuapp.com/

1. Trang chủ
- Hiện thị các bài viết và có phân trang
+ Bài viết có ảnh, title, description, người tạo
2. Login
- Đăng nhập bằng email và password
3. Signup
- Đăng ký bằng email và password, (confirm password)
4. Upload bài viết
- Form ảnh, title, description
5. Logout
6. Comment vào một bài post cố định
- Người tạo và nội dung

# Bước 2: Phân tích Model
1. Model Post
Ảnh (imageUrl), title, description, createdBy

2. Model User
email, password

3. Comment
content, createdBy, post

1 User n post
1 User n comment
1 Post n comment
Cơ bản chúng ta chỉ lưu các trường không tính toán được, không lưu thừa dữ liệu


Ví dụ: một lớp học được dạy nhiều giáo viên, một giáo viên thì có dạy nhiều lớp học
Teacher
Class
=> teacher_class: (teacherId, classId)

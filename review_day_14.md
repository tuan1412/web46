Phân tích project
- Gồm các chức năng gì
- Gồm các model gì, cần các module gì
- Thiết kế schema: 
giao diện đó cần hiện thị trường gì => liệt kê hết ra
sự liên quan giữa các đối tượng => define các id liên kết, 1 - 1, 1 - n, n - n
xem những trường nào tính toán được => không lưu

Backend
.env => tránh hardcode (PORT, MONGODB) => deploy các môi trường khác nhau (local, server heroku) (lib dotenv)

3 model => 3 modules
request từ client đến server được xử lý như sau
req 
=> router (một nhóm các đường dẫn api có liên quan tới nhau) 
=> controller (chỉ xử lý logic)
=> model (CRUD)

API auth => bcript => mã hoá (hash) password


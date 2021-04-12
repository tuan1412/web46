Backend:
Cors => client gọi server khác origin
Origin: http://localhost:3000 => http://localhost:8080 => lỗi cors
=> Sửa trên backend
=> cors npm => app.use(cors()) => Mở cho tất cả origin
=> dựa vào doc để define nếu cần

Frontend
1. Custom axios
tái sử dụng
baseUrl => theo biến môi trường (ko hard code)
create-react-app tạo sẵn cho ta cơ chế file .env => ko phải cài bất kì cái gì
=> .env tất cả các biến phải bắt đầu bằng REACT_APP_ => process.env.[name]

2. quản lý giao diện theo state và props

3. useEffect
- sau khi render chạy xong
- phụ thuộc vào cái dep của tham số thứ hai
=> khác biệt với life cycle: 
class: didmount, didupdate (quản lý theo component => nghĩ là component chúng ta đang ở giai đoạn nào)
hook: quản lý theo biến (nghĩ là biến ta muốn quản lý đang ở giá trị nào)


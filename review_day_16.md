Backend
1. Khái niệm về cơ chế populate
- Cơ chế này chỉ có trong mongoose
- Bản chất cơ chế này là $lookup trong mongodb
- Nhu cầu của nó là liên kết giữa các collection với nhau => 1 câu query => ra được thông tin nhiều collection

2. Các bước populate
- Tạo ref trong schema (ref từ field có sẵn hoặc từ field ảo (vitrual))
- Find, findOne, ... của model => populate được

3. Các dạng
- Xuôi
vd: lấy người tạo từ bài post, bt chúng ta chỉ có createdBy dạng id, muốn lấy email
tạo ref từ trường có sẵn trong schema => Post model => find => populate

- Ngược
vd: lấy comments từ bài post, post model ko có trường có nào lq tới comment cả (chỉ có comment lq tới bài post)
tạo ref từ trường ảo, tạo thêm một trường comments => post model => find => populate từ trường ảo

- Nhiều level

- Nhiều trường

Frontend
- Routing trong React (create-react-app)
+ Cơ chế hoàn toàn bên client (sử dụng javascript để thay đổi url trên trình duyêt => history)
Hoàn toàn ko gọi lên server để lấy file html mới => render lại component khác thôi
+ Dùng thư viện react-router-dom
+ Cài đặt bằng Switch, Router, Route,...
+ Bản chất là so sánh đường dẫn if else render component khác nhau trong component Switch

- Props children
+ Tất cả các component nằm trong thẻ đóng mở của một component khác

- Sử dụng bộ UI component React Bootstrap

- Hook
useState
+ Viết hoàn toàn component bằng function component
+ class >< function
  
  constructors | Không có
  this.state | useState
  state cũ quản lý object | quản lý bằng từng useState một
  this.setState | setState (đổi tên được phụ thuộc khai báo tên là gì) => note: cả 2 đều là bất đồng bộ
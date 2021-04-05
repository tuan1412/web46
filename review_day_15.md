Luồng xác thực json web token
Tại sao lại dùng token?
- Đăng nhập bằng username, password
- Tạo comment, tạo bài post cần thông tin đăng nhập, cần là user mới thực hiện dc
=> Cách xử lý thô sơ: tạo cmt, post => gửi username, password lên
=> Không hợp lý

- Xử lý: thay vì gửi username, pass => Gửi token được mã hoá dựa trên thông tin user

1. Mã hoá này là 2 chiều (thư viện jsonwebtoken)
+ Sign
+ Verify
+ Dùng chung một key (private key) (chỉ server biết thôi)

2. Thông tin user => thường mã hoá cái user._id

3. Luồng hoạt động

3.1 login => token = sign(data, key, expire) => gửi về client
client nhận được token này, lưu ở đâu đó (localstorage, session storage, cookie)
+ Chú ý là client ko thể giải mã được token do không biết key của server

3.2 tạo bài post
client gọi api tạo bài post, gửi kèm token vào header của http request

3.3 server nhận yêu cầu
request đi đến một cái middleware check xem là có token header hay không, token đó có hợp lệ hay không => không hợp lệ => send status 401, success 0

hợp lệ, gán thông tin user vào request, đi đến các hàm xử lý tiếp theo => req.user

4. Bản chất middleware
1 function gồm 3 tham số là req, res, next  => nếu một lấy dữ liệu từ client thì lấy qua req,
, muốn gửi dữ liệu về thì dùng thằng res => muốn đi tiếp chúng ta gọi next()


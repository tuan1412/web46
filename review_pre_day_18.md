Chữa BTVN
1. Tách component Pagination
- Tại sao tách: component này tính năng độc lập với các component khác, có khả năng sử dụng ở các trang khác nhau
- Tách như nào
+ Sử dụng sẵn component Pagination của react-bootstrap (đổi tên qua cú import as)
+ Tránh hard code bằng props truyền từ component cha xuống con (Home xuống Pagination)
+ Hạn chế tính toán bằng useMemo, hook này chỉ chạy khi dependency thay đổi (tham số thứ hai của hook), useMemo chạy trước render, return giá trị và gán vào biến maxPage (có thể bỏ useMemo đi tính toán như bình thường)
+ Truyền index của page khi onClick bằng arrow function
+ Từ component con Pagination thay đổi state của component cha Home bằng cách component Home truyền props có khả năng thay đổi state xuống dưới
+ Khi thay đổi page thì gọi hàm fetchPosts như bt

Bài mới
2. Config custom axios
- Tại sao cần config: khi đăng nhập thành công, token được lưu trong local storage, ta cần gửi kèm token này mỗi khi gọi api khác(phục vụ cho việc check đã đăng nhập hay chưa)
- Config như nào
+ Trong file api/client đã config, config thêm interceptors.request, config này có nghĩa là trước khi thực hiện request ta lấy token từ local storage ra và gán vào header của request

3. Phân quyền trên client
- Tại sao cần phân quyền: cũng như backend ta cần chặn một số thông tin mà chỉ người dùng có quyền nhất định mới được xem, vd ko thể để một user chưa dăng nhập xem được giao diện trang /create (khi người dùng cố tình gõ thanh đường dẫn /create cần chuyển sang trang login)

- Phân quyền như nào
+ Để phân quyền được, ta cần check user đã đăng nhập hay chưa. Các bước check như sau:
3.1 Mỗi lần đăng nhập cần set token vào local storage (set vào đây thì khi user load lại trang token vẫn còn)
3.2 Ở component App có một state để quản lý thông tin user (user === null đồng nghĩa chưa đăng nhập), user đăng nhập thì ta đổi state của nó
3.3 Mỗi lần mount component App, nếu không có token ở local storage thì hiển nhiên user chưa đăng nhập, nếu có token rồi ta cần check xem token đó có hợp lệ hay không (có đúng định dạng, còn hạn ko) cũng như lấy thông tin user. Do vậy gọi api /api/auth/user để lấy.
3.4. Chú ý rằng chưa fetch xong thông tin user thì ko render cái gì cả do vậy default loading là true
3.5 Sau khi lấy xong setUser !== null => user đã đăng nhập
3.6 Giống như các component Layout ta viết các component Route để tái sử dụng, ta chia làm 3 component chính là PublicRoute, GuessRoute và ProtectedRoute. Bản chất mỗi component này là wrap Route của react-router-dom, check có user hay không để render component tương ứng

4. Context
- Tại sao cần: thông tin user và hàm setUser tái sử dụng nhiều nơi, ở sâu các component chút chít, ko muốn props down lần lượt xuống dưới

- Các sử dụng:
+ Define AuthContext bằng createContext, export const ra để các file khác có thể import (chú ý đây là named export)
+ Wrap AuthContext.Provider ở phía ngoài cùng, điều này có nghĩa là bất kì component nào nằm trong Provider này đều có thể sử dụng context
+ Biến nào muốn tái sử dụng nhiều lần thì truyền trong value của Provider (ở đây ta có 2 biến là user và setUser) do vậy ta truyền value là một object có 2 key là user và setUser
+ Các component con muốn sử dụng thì import AuthContext từ App, sử dụng useContext, lấy ra user và setUser để sử dụng

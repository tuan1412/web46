Cách giao tiếp giữa các component
1. Comp cha giao tiếp với Comp con (cha xuống cháu)
Truyền lần lượt props (props down)

2. Comp con giao tiếp với comp cha (thay đổi state cha)
Cha sẽ truyền props là func, func có khả năng thay đổi của cha

3. Comp anh em giao tiếp với nhau
Lift state up (doc react) => cần tìm cha gần nhất của 2 thằng, sẽ có state giao tiếp cho cả 2 thằng con.
Comp 1 muốn thay đổi giao đổi giao diện Comp 2
Chọn thằng cha Comp 3 có state là a, b => truyền lần lượt comp 1 và comp2 là c và d
comp1 gọi func là c do comp 3 truyền xuống => thay đổi state a, b kéo theo thay đổi props truyền xuống cho Comp 2.

Axios: lib thay thế cho fetch, ajax => kết quả trả về nằm trong res.data
Set sự kiện window ở componentDidMount, remove sự kiện componentWillUnmount
Debounce => sử dụng khi mà handle các sự kiện diễn ra liên tục (onChange của ô input, scroll của window)

Throttle, Progressive image, Lazy load image
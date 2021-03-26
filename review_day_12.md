React Component: class component >< function component
Giảm thiệu độ phức tạp của code => ít dòng đi
Tái sử dụng được code => props => sử dụng bộ UI component (Reactstrap, Ant Design, Material UI,...)
props >< state
props do component cha truyền xuống và chính component đấy ko có khả năng update
state thì do component đó quản lý và nó có quyền sửa, setState
16.0 - 16.6
function component không có state, class thì có
=> class khi cần quản lý state (stateful), function khi không cần (stateless)

Sự khác biệt giữa lib cũ (jQuery) vs lib, framework mới (React, Vue, Angular)
Lib cũ: A => A': tìm đường đi từ A đến A' (dom nào cần sửa, dom cần cần xoá) => thao tác với dom thật luôn

Lib mới: A => A': A hiện thị cái gì (state, props), A' hiện thị cái gì (state', props'), sử dụng javascript để biến state => state', props => props', đường đi như nào thì lib lo
=> Thay đổi state, props => Lib nó thay đổi DOM ảo (Dom bằng javascript) => check xem DOM thật cần update cái gì => update

Giới thiệu qua về life cycle => constructor, componentDidMount, componentDidUpdate, componentWillUnmount

Khái niệm mount => DOM ảo biến thành DOM thật

Conditional rendering => if else điều kiện { && } { ? :}, tách ra function if else như bt
List rendering => map
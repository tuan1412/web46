MongoDB: syntax riêng => doc
Mongooes: Thư viện để đơn giản hoá syntax, JDBC, SpringData(java)

80% là thao tác với DB. CRUD, map reduce
C: create
create, insertOne, insertMany
R: read
find, findOne, findById => truyền vào options để lọc
U: update
findByIdAndUpdate, findOneAndUpdate, updateOne, updateMany => option để lọc xem doc nào cần update
D: delete
findByIdAndDelete, findOneAndRemove, deleteOne, deleteMany
Map reduce: chức năng báo cáo, tính toán
aggregate

/search => html
  form gồm ô input
  form submit => call http req server
  lấy kết quả => add thêm dom list câu hỏi

/search-question
  lấy keyword từ client
  query trong db
  trả về người dùng
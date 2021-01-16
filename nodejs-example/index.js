console.log('Hello world');

/* 1. Phân biệt môi trường chạy
  document chỉ chạy được trên trình duyệt, không tồn tại trên nodejs
  console.log(document);
*/

/* 2. Module trong nodejs
  Tái sử dụng code bằng sử dụng require

  require code tự viết (3)
  const myIsOdd = require('./isOdd');

  require thư viện => tìm trong node_module (2)
  const isOdd = require('is-odd');

  const number = 5;
  console.log(`${number} la so le: `, isOdd(number));
  console.log(`${number} la so le: `, myIsOdd(number));

  require code có sẵn nodejs (1)
  const fs = require('fs');
*/

/* 3. Ví dụ về sử dụng package fs của nodejs để đọc ghi file
fs.writeFile('text.txt', 'Hello web 46', (err) => {
  if (err) return console.log('Lỗi rồi', err);
  console.log('Ghi file thành công');

  fs.readFile(
    'text.txt', 
    { encoding: 'utf-8'},  
    (err, data) => {
      if (err) return console.log('Lỗi rồi', err);
      console.log('Nội dung file', data);
  })
});
*/

/* 4. Vẫn là fs nhưng xử lý đồng bộ
fs.writeFileSync('./doc/readme.txt', 'Hi');
const data = fs.readFileSync('./doc/readme.txt').toString();
console.log(data);
console.log('done');
*/

/* 5. Mô tả trường hợp bất đồng bộ trong nodejs. Mặc dù setTimeout không cần delay để chạy nhưng vẫn chạy sau
  setTimeout(() => {
    console.log('done set time out');
  }, 0)

  console.log('Hi hi');
*/

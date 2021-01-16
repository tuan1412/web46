// input: đọc file
// output: số các số lẻ
const { count } = require('console');
const fs = require('fs');
const isOdd = require('./isOdd');
// B1: đọc file
let data = '';
try {
  data = fs.readFileSync('number.txt').toString();
} catch (err) {
  console.log('Lỗi', err);
}

if (!data) return;
console.log(data);
// B2: xử lý data nhận về
const result = 
  data.split(' ')
    .map(number => parseInt(number))
    .reduce((count, cur) => {
      if (isOdd(cur)) count++;
      return count;
    }, 0);

console.log(result);
fs.writeFileSync('output.txt', `${count}`);

// B3: đếm các số lẻ
// let count = 0;
// for  (let number of numbers) {
//   ;
// }

// B4: ghi file
// fs.writeFileSync('output.txt', count + '');




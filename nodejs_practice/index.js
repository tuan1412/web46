// Sử dụng các hàm đọc, ghi file đồng bộ để hoàn thiện các yêu cầu sau
// lấy thông tin học sinh có _id là jubuq3lfmjjmp0wrdeupt
const fs = require('fs');
// const data = JSON.parse(
//   fs.readFileSync('./data.json')
// );

const data = require('./data.json');

function getDetailStudent() {
  return data.find(student => student._id === 'jubuq3lfmjjmp0wrdeupt');
}

// Lấy số lượng học sinh có từ Nguyễn
function getCountStudentWithLastName() {
  return data.filter(student => student.name.includes('Nguyễn')).length;
}

// Tính điểm trung bình của toàn bộ sinh viên (làm tròn đến một chữ số sau dấu phẩy)
function calAverageMark() {
  const sum = data.reduce((acc, cur) => acc + cur.mark, 0);
  return parseFloat((sum / data.length).toFixed(1));
}

// Ghi ra số lượng học sinh đạt điểm 10 ra file output.txt (sử dụng hàm ghi đồng bộ);
function writeCountStudentGet10MarkToFile() {
  const count = data.filter(student => student.mark === 10).length;
  fs.writeFileSync('output.txt', `${count}`);
}

module.exports = {
  getDetailStudent,
  getCountStudentWithLastName,
  calAverageMark,
  writeCountStudentGet10MarkToFile
}
const firstNames = ['Nhân', 'Nghĩa', 'Trí', 'Tín', 'Đức', 'Thành', 'Hiếu', 'Trung', 'Khiêm', 'Văn', 'Phú'];
const lastNames = ['Nguyễn', 'Phạm', 'Lê', 'Ngô', 'Phùng', 'Mạc', 'Phan'];
const marks= [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

function getRandomInArr(arr) {
  const randomIdx = getRandomInt(0, arr.length);
  return arr[randomIdx];
}

function genId() {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

const studentCount = 500;
let students = [];

for (let i = 0; i < studentCount; i++) {
  const student = {
    _id: genId(),
    name: getRandomInArr(lastNames) + ' ' + getRandomInArr(firstNames),
    mark: getRandomInArr(marks)
  }
  students.push(student);
}

require('fs').writeFileSync('data.json', JSON.stringify(students));


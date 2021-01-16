const assert = require('chai').assert;

describe('Test node practice', function() {
  it('getDetailStudent', function () {
    const { getDetailStudent } = require('./index');
    const foundStudent = getDetailStudent();
    assert.equal(foundStudent._id, 'jubuq3lfmjjmp0wrdeupt');
    assert.equal(foundStudent.name, 'Phùng Nghĩa');
    assert.equal(foundStudent.mark, 0);
  })

  it('getCountStudentWithLastName', function () {
    const { getCountStudentWithLastName } = require('./index');
    const countStudents = getCountStudentWithLastName();
    assert.equal(countStudents, 69);
  })

  it('calAverageMark', function () {
    const { calAverageMark } = require('./index');
    const mark = calAverageMark();
    assert.typeOf(mark, 'number');
    assert.equal(mark, 4.8);
  })

  it('writeCountStudentGet10MarkToFile', function () {
    const { writeCountStudentGet10MarkToFile } = require('./index');
    writeCountStudentGet10MarkToFile();

    const data = require('fs').readFileSync('./output.txt').toString();
    const count = Number(data);
    assert.equal(count, 42);
  })
});

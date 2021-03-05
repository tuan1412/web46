// onload
let idQuestion = '';

console.log(jQuery);
console.log($);

const contentDOM = document.getElementById('contentQuestion');
const $contentDOM = $('#contentQuestion');

console.log(contentDOM === $contentDOM[0])
console.log('dom thuong', contentDOM);
console.log('dom jquery', $contentDOM);


const getRandomQuestion = async () => {
  // fetch('http://localhost:8080/random-question')
  // .then(res => res.json())
  // .then(res => {
  //   if (res.success) {
  //   contentDOM.innerHTML = res.data.content;
  // }})
  // const res = await fetch('http://localhost:8080/random-question');
  // const jsonRes = await res.json();
  // if (jsonRes.success) {
  //   const { content, _id } = jsonRes.data
  //   contentDOM.innerHTML = content;
  //   idQuestion = _id
  // }
  const res = await $.ajax({
    type: 'GET',
    url: 'http://localhost:8080/random-question',
  });

  if (res.success) {
    const { content, _id } = res.data
    contentDOM.innerHTML = content;
    idQuestion = _id
  }
}

getRandomQuestion();

const $otherBtn = $('#otherBtn');

$otherBtn.on('click', () => {
  // window.location.reload();
  getRandomQuestion()
})

const handleVote = async (type) => {
  try {
    const res = await $.ajax({
      url: `http://localhost:8080/add-vote/${idQuestion}`,
      method: 'PUT',
      data: { type }
    })
    if (res.success) {
      console.log(res);
      // window.location.href = `/question/${res.data._id}`
    }
  } catch (err) {
    console.log(err);
  }
}

const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');

const voteBtn = document.querySelectorAll('.voteBtn');
const $voteBtn = $('.voteBtn');
console.log(voteBtn);
// console.log(typeof [...$voteBtn].forEach);

// $voteBtn.on('click', () => {
//   console.log('th1', this);
// });

$voteBtn.on('click', function() {
  console.log('th2', this);
  const $this = $(this);
  const type = $this.attr('data-type');
  handleVote(type)
  // const className = $this.attr('class');
  // console.log(type, className);
  // const type = $this.data(type);

});

// example custom javascript
const dollar = function(selector) {
  return document.querySelectorAll(selector);
}

const voteBtns = dollar('.voteBtn');

const $resultBtn = $('#resultBtn');
$resultBtn.on('click', () => {
  window.location.href = `/question/${idQuestion}`;
});

$('#delBtn').on('click', async () => {
  const res = await $.ajax({
    url: `http://localhost:8080/question/${idQuestion}`,
    method: 'DELETE',
  });
  if (res.success) {
    alert('Xóa thành công');
  }
})

// voteBtn.addEventListener('click', () => handleVote('yes'));

// yesBtn.addEventListener('click', () => handleVote('yes'));
// noBtn.addEventListener('click', () => handleVote('no'))
// onload
let idQuestion = '';

const contentDOM = document.getElementById('contentQuestion');

const getRandomQuestion = async () => {
  // fetch('http://localhost:8080/random-question')
  // .then(res => res.json())
  // .then(res => {
  //   if (res.success) {
  //   contentDOM.innerHTML = res.data.content;
  // }})
  const res = await fetch('http://localhost:8080/random-question');
  const jsonRes = await res.json();
  if (jsonRes.success) {
    const { content, _id } = jsonRes.data
    contentDOM.innerHTML = content;
    idQuestion = _id
  }
}

getRandomQuestion();

const otherBtn = document.getElementById('otherBtn');

otherBtn.addEventListener('click', () => {
  // window.location.reload();
  getRandomQuestion()
})

const handleVote = async (type) => {
  try {
    const res = await fetch(
      `http://localhost:8080/add-vote/${idQuestion}`, 
      {
        method: 'PUT',
        body: new URLSearchParams({ type })
      }
    );
    const jsonRes = await res.json();
    if (jsonRes.success) {
      window.location.href = `/question/${jsonRes.data._id}`
    }
  } catch (err) {
    console.log(err);
  }
}

const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');

yesBtn.addEventListener('click', () => handleVote('yes'));
noBtn.addEventListener('click', () => handleVote('no'))
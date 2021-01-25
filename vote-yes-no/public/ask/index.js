const createForm = document.getElementById('form-question');
const textAreaQuestion = document.getElementById('create-textarea');


createForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const content = textAreaQuestion.value;

  const question = { content }

  fetch('http://localhost:8080/create-question', {
    method: 'POST',
    body: new URLSearchParams(question)
  })
  .then(res => res.json())
  .then(res => {
    if (res.success) {
      window.location.href = '/';
      // window.open('/', '_self');
    }
  });
})

const restLengthDom = document.getElementById('restLength');

textAreaQuestion.addEventListener('input', () => {
  const content = textAreaQuestion.value;
  const currentLength = content.length;

  restLengthDom.innerHTML = 200 - currentLength;
})
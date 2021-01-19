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
  .then(res => console.log(res));
})
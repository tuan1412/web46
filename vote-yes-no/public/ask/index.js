const $createForm = $('#form-question');
const $textAreaQuestion = $('#create-textarea');

$createForm.on('submit', (event) => {
  event.preventDefault();

  const content = $textAreaQuestion.val();

  const question = { content }

  $.ajax({
    url: 'http://localhost:8080/create-question',
    method: 'POST',
    data: question
  }).then(res => {
    if (res.success) {
      // window.location.href = '/';
    }
  });
})

const $restLengthDom = $('#restLength');

$textAreaQuestion.on('input', () => {
  const content = $textAreaQuestion.val();
  const currentLength = content.length;

  $restLengthDom.html(200 - currentLength);
})
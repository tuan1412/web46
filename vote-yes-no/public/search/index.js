$('#search').on('submit', async e => {
  e.preventDefault();

  const res = await $.ajax({
    url: 'http://localhost:8080/search-question',
    method: 'GET',
    data: {
      keyword: $('#keyword').val()
    }
  })

  if (res.success) {
    const questions = res.data;
    $('#result').html('');

    const questionDOM = questions.map(q => {
      return `<div>${q.content}</div>`
    }).join('');

    console.log(questionDOM);

    $('#result').append(questionDOM);
    $('#keyword').val('');
  }
})
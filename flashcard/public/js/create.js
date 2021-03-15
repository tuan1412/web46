$('#flashcardForm').on('submit', async e => {
  e.preventDefault();

  const newFlashcard = {
    frontSide: $('#front').val(),
    backSide: $('#back').val(),
    category: $('#cate').val()
  }

  console.log(newFlashcard);

  try {
    const res = await $.ajax({
      url: '/api/flashcards',
      method: 'POST',
      data: newFlashcard
    });
    if (res.success) {
      alert('Create successfully');
      $('#front').val('');
      $('#back').val('');
      $('#cate').val('other');
    }
  } catch (err) {
    console.log('err', err);
  }
})
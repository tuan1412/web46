const idFlashcard = window.location.pathname.split("/").pop();

const getDetailCard = async () => {
  const res = await $.ajax({
    url: `/api/flashcards/${idFlashcard}`,
    method: 'GET',
  });

  if (res.success) {
    const { backSide, frontSide, category } = res.data;

    $('#back').val(backSide);
    $('#front').val(frontSide);
    $('#cate').val(category);
  }
}

getDetailCard();

$('#flashcardForm').on('submit', async e => {
  e.preventDefault();

  const updateCard = {
    frontSide: $('#front').val(),
    backSide: $('#back').val(),
    category: $('#cate').val()
  }

  try {
    const res = await $.ajax({
      url: `/api/flashcards/${idFlashcard}`,
      method: 'PUT',
      data: updateCard
    });
    if (res.success) {
      window.location.href = '/'
    }
  } catch (err) {
    console.log('err', err);
  }
})

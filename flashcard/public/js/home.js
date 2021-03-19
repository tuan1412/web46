$('#flipBtn').on('click', () => {
  $('.flip-card').toggleClass('flipping')  
})

let idFlashcard = '';

const getRandomCard = async () => {
  try {
    const category = $('input[name="category"]:checked').val();
    console.log(category);
    const res = await $.ajax({
      url: '/api/flashcards/random',
      method: 'GET',
      data: { category }
    });
    
    if (res.success) {
      const { backSide, frontSide, category, isRemember, _id } = res.data;

      idFlashcard = _id;
      $("#category").html(category);
      $("#frontSide").html(frontSide);
      $('#backSide').html(backSide);
      if (isRemember) {
        $('#rememberBtn').hide();
        $('#forgetBtn').show();
      } else {
        $('#rememberBtn').show();
        $('#forgetBtn').hide();
      }  
    }
  } catch (err) {
    console.log('err', err);
  }
}

getRandomCard();

$('#nextBtn').on('click', () => {
  getRandomCard();
})

$('input[name="category"]').on('input', () => {
  getRandomCard();
})

$('#rememberBtn').on('click', async () => {
  if (idFlashcard) {
    const res = await $.ajax({
      url: `/api/flashcards/${idFlashcard}`,
      method: 'PUT',
      data: {
        isRemember: true
      }
    });
    if (res.success) {
      $('#rememberBtn').hide();
      $('#forgetBtn').show();
    }
  }
})

$('#forgetBtn').on('click', async () => {
  if (idFlashcard) {
    const res = await $.ajax({
      url: `/api/flashcards/${idFlashcard}`,
      method: 'PUT',
      data: {
        isRemember: false
      }
    });
    if (res.success) {
      $('#rememberBtn').show();
      $('#forgetBtn').hide();
    }
  }
})

$('#editBtn').on('click', () => {
  if (idFlashcard) {
    window.location.href = `/edit/flashcards/${idFlashcard}`
  }
})
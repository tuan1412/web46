$('#flipBtn').on('click', () => {
  $('.flip-card').toggleClass('flipping')  
})

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
      console.log(res.data);
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
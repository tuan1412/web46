const $contentDOM = $('#contentQuestion');
const $totalVoteDOM = $('#totalVote');
const $percentYesVoteDOM = $('#percentYesVote');
const $percentNoVoteDOM = $('#percentNoVote')
const $otherBtn = $('#otherBtn');

const getDetailQuestion = async (id) => {
  try {
    const res = await $.ajax({
      url: `http://localhost:8080/detail/${id}`,
    });

    if (res.success) {
      const { data:question } = res;
      const { content, yes, no } = question;

      $contentDOM.html(content);
      $totalVoteDOM.html(yes + no);

      const yesNumber = parseInt(yes);
      const noNumber = parseInt(no);
      const total = yesNumber + noNumber;
      
      const percentYes = total === 0 ? parseFloat(50).toFixed(2) : (yes * 100  / total).toFixed(2)
      const percentNo = (100 - parseFloat(percentYes)).toFixed(2);

      $percentYesVoteDOM.html(percentYes);
      $percentNoVoteDOM.html(percentNo);

    }
  } catch (err) {
    console.log(err);
  }
}

const idQuestion = window.location.pathname.split('/').pop();
getDetailQuestion(idQuestion);
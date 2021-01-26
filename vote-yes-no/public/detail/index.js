const contentDOM = document.getElementById('contentQuestion');
const totalVoteDOM = document.getElementById('totalVote');
const percentYesVoteDOM = document.getElementById('percentYesVote');
const percentNoVoteDOM = document.getElementById('percentNoVote')
const otherBtn = document.getElementById('otherBtn');

const getDetailQuestion = async (id) => {
  try {
    const res = await fetch(`http://localhost:8080/detail/${id}`);
    const jsonRes = await res.json();

    if (jsonRes.success) {
      const { data:question } = jsonRes;
      const { content, yes, no } = question;

      contentDOM.innerHTML = content;
      totalVoteDOM.innerHTML = yes + no;

      const yesNumber = parseInt(yes);
      const noNumber = parseInt(no);
      const total = yesNumber + noNumber;
      
      const percentYes = total === 0 ? parseFloat(50).toFixed(2) : (yes * 100  / total).toFixed(2)
      const percentNo = (100 - parseFloat(percentYes)).toFixed(2);

      percentYesVoteDOM.innerHTML = percentYes;
      percentNoVoteDOM.innerHTML = percentNo;

    }
  } catch (err) {
    console.log(err);
  }
}

const idQuestion = window.location.pathname.split('/').pop();
getDetailQuestion(idQuestion);
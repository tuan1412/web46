const createQuestion = () => {
  let data;
  try {
    data = JSON.parse(fs.readFileSync('data.json'));
  } catch (err) {
    data= [];
  }
  
  const newQuestion = {
    _id: data.length + 1,
    content: req.body.content,
    yes: 0,
    no: 0
  };
  const newData = [...data, newQuestion];
  fs.writeFileSync('data.json', JSON.stringify(newData));
  res.send({
    success: 1,
    data: newQuestion
  })
}

module.exports = createQuestion;
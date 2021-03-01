const express = require('express');
const fs = require('fs');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const QuestionModel = require('./models/question');

mongoose.connect(
  'mongodb://localhost:27017/vote',
  { useNewUrlParser: true },
  (err) => {
    if (err) return console.log(err);
    console.log('MongoDB Server connected');
  }
);

// client gửi lên với header application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// client gửi lên với header application/json
app.use(express.json());

app.use(express.static('public'));
// => sinh ra các đường dẫn như sau
// app.get('/ask/index.html', (req, res) => {
//   res.sendFile(path.resolve(__dirname, './public/ask/index.html'));
// })
// app.get('/ask/style.css', (req, res) => {
//   res.sendFile(path.resolve(__dirname, './public/ask/style.html'));
// })
// app.get('/home/index.html', (req, res) => {
//   res.sendFile(path.resolve(__dirname, './public/home/style.html'));
// })

app.get('/ask', (req, res) => {
  res.sendFile(path.resolve(__dirname, './public/ask/index.html'));
});

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, './public/home/index.html'));
});

app.get('/question/:idQuestion', (req, res) => {
  res.sendFile(path.resolve(__dirname, './public/detail/index.html'));
});

app.get('/detail/:idQuestion', (req, res) => {
  const { idQuestion } = req.params;

  let data;
  try {
    data = JSON.parse(fs.readFileSync('data.json'));
  } catch (err) {
    data = [];
  }

  const foundQuestion = data.find((question) => {
    const sameId = parseInt(question._id) === parseInt(idQuestion);
    return sameId;
  });

  if (!foundQuestion) {
    return res.send({ success: 0, data: null });
  }

  return res.send({ success: 1, data: foundQuestion });
});

app.post('/create-question', async (req, res) => {
  console.log(req.body);
  const newQuestion = {
    content: req.body.content,
    yes: 0,
    no: 0
  };
  
  console.log(newQuestion);
  const saveQuestion = await QuestionModel.create(newQuestion);

  res.send({
    success: 1,
    data: saveQuestion
  });
});

app.get('/random-question', (req, res) => {
  let data;
  try {
    data = JSON.parse(fs.readFileSync('data.json'));
  } catch (err) {
    data = [];
  }

  const randomIdx = Math.floor(Math.random() * data.length);
  const foundQuestion = data[randomIdx];

  if (foundQuestion) {
    return res.send({
      success: 1,
      data: foundQuestion
    });
  }

  return res.send({
    success: 0,
    data: null
  });
});

app.put('/add-vote/:idQuestion', (req, res) => {
  const { idQuestion } = req.params;
  const { type } = req.body;

  let data;
  try {
    data = JSON.parse(fs.readFileSync('data.json'));
  } catch (err) {
    data = [];
  }

  const foundQuestion = data.find((question) => {
    const sameId = parseInt(question._id) === parseInt(idQuestion);
    return sameId;
  });

  if (!foundQuestion) {
    return res.send({
      success: 0,
      data: null
    });
  }

  if (type === 'yes' || type === 'no') {
    foundQuestion[type]++;
  } else {
    return res.send({
      success: 0,
      data: null
    });
  }

  fs.writeFileSync('./data.json', JSON.stringify(data));

  return res.send({
    success: 1,
    data: foundQuestion
  });
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './public/404/index.html'));
});

app.listen(8080, (err) => {
  if (err) throw err;
  console.log('Server started');
});

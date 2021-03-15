const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const FlashcardModel = require('./models/flashcard');

mongoose.connect('mongodb://localhost:27017/flashcard', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, (err) => {
  if (err) return console.log('MongoDB connect error');
  return console.log('MongoDB connected');
})

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/api/flashcards/random', async (req, res) => {
  try {
    const { category } = req.query;
    let randomCards = [];
    if (category === 'all') {
      randomCards = await FlashcardModel.aggregate().sample(1);
    } else {
      randomCards = await FlashcardModel
        .aggregate()
        .match({ category })
        .sample(1);
    }
    
    if (!randomCards.length) return res.send({ success: 0 })

    res.send({ success: 1, data: randomCards[0] })
  } catch (err) {
    console.log(err);
    res.status(500).send({ success: 0 })
  }
})

app.post('/api/flashcards', async (req, res) => {
  const { frontSide, backSide, category } = req.body;

  try {
    const newCard = await FlashcardModel.create({
      frontSide,
      backSide,
      category
    });

    res.send({ success: 1, data: newCard })
  } catch (err) {
    res.status(500).send({ success: 0 })
  }
})

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, './public/html/home.html'));
})

app.get('/create', (req, res) => {
  res.sendFile(path.resolve(__dirname, './public/html/create.html'));
})

app.listen(8080, (err) => {
  if (err) return console.log('err', err);
  console.log(`Server started at ${8080}`);
})


const express = require('express');
const fs = require('fs');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const _ = require('lodash');
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

app.get('/question/max-vote', async (req, res) => {
  // const maxYesQuestion = await QuestionModel.find().sort({ yes: -1 }).skip(0).limit(1);
  // res.send({
  //   success: 1,
  //   data: maxYesQuestion[0]
  // })
  const maxYesQuestion = await QuestionModel.aggregate()
    .group({
      _id: null,
      doc: {
        $max: {
          yes: '$yes',
          _id: '$_id',
          content: '$content'
        }
      } 
    });
  
  return res.send({ success: 1, data: maxYesQuestion[0] })
})

app.get('/question/:idQuestion', (req, res) => {
  res.sendFile(path.resolve(__dirname, './public/detail/index.html'));
});

app.get('/search', (req, res) => {
  res.sendFile(path.resolve(__dirname, './public/search/index.html'));
});



// 80% tác vụ làm backend CRUD
// C: create
// create
// insertMany
// R: read
// R one element: findOne(filter), findById
// R many elements: find(filter)
// U: update
// update one
// save()
// findByIdAndUpdate(filter, objectUpdate, opts)
// findOneAndUpdate(filter, objectUpdate, opts)
// updateOne
// update many
// updateMany
// D: delete
// findByIdAndDelete(filter, objectUpdate, opts)
// findOneAndDelete(filter, objectUpdate, opts)
// aggregation (tổng hợp báo cáo tìm max tìm min => từ dữ liệu có sẵn => biến đổi ra dữ liệu mình cần)


app.get('/detail/:idQuestion', async (req, res) => {
  try {
    const { idQuestion } = req.params;

    const foundQuestion = await QuestionModel.findById(idQuestion).lean();
    // const foundQuestion = await QuestionModel.findOne({ _id: idQuestion });
    if (!foundQuestion) {
      return res.status(404).send({ success: 0, data: null })
    }

    res.send({
      success: 1,
      data: {
        ...foundQuestion,
        isQueryIns: false
      }
    })
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: 0,
      data: null
    })
  }
});

app.post('/create-question', async (req, res) => {
  try {
    console.log(req.body);
    const newQuestion = {
      content: req.body.content,
    };
    
    console.log(newQuestion);
    const saveQuestion = await QuestionModel.create(newQuestion);

    res.send({
      success: 1,
      data: saveQuestion
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: 0,
      data: null
    });
  }
});

// app.get('/random-question', async (req, res) => {
//   try {
//     const questions = await QuestionModel.find();
//     const randomQuestion = _.sample(questions);

//     if (!randomQuestion) {
//       return res.status(404).send({ success: 0, data: null })
//     }
  
//     res.send({
//       success: 1,
//       data: randomQuestion
//     })
//   } catch (err) {
//     console.log(err);
//     res.status(500).send({
//       success: 0,
//       data: null
//     })
//   }
// });

app.get('/random-question', async (req, res) => {
  try {
    const questions = await QuestionModel.aggregate().sample(1);
    
    if (!questions[0]) {
      return res.status(404).send({ success: 0, data: null })
    }
  
    res.send({
      success: 1,
      data: questions[0]
    })
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: 0,
      data: null
    })
  }
});

// app.put('/add-vote/:idQuestion', async (req, res) => {
//   try {
//     const { idQuestion } = req.params;
//     const { type } = req.body;

//     const foundQuestion = await QuestionModel.findById(idQuestion);
//     // const a = {
//     //   x: 1, y: 2
//     // }
//     if (!foundQuestion) {
//       return res.status(404).send({ success: 0, data: null })
//     }

//     foundQuestion[type]++;
//     await foundQuestion.save();

//     // toString object { success: 1, data: foundQuestion } => send client
//     res.send({
//       success: 1,
//       data: foundQuestion
//     })
//   } catch (err) {
//     res.status(500).send({
//       success: 0,
//       data: null
//     })
//   }
// });

app.get('/search-question', async (req, res) => {
  const { keyword } = req.query;

  const keywordRegex = new RegExp(keyword, 'i');
  const foundQuestions = await QuestionModel.find({ content: { $regex: keywordRegex }});

  return res.send({
    success: 1,
    data: foundQuestions
  })
})

// cách truyền dữ liệu qua pathname thì thường dùng khi truyền id
app.put('/add-vote/:idQuestion', async (req, res) => {
  try {
    const { idQuestion } = req.params;
    const { type } = req.body;

    const foundQuestion = await QuestionModel
      .findOneAndUpdate(
        { _id: idQuestion },
        {
          $inc: {
            [type]: 1
          }
        },
        {
          new: true
        }
      );

    if (!foundQuestion) {
      return res.status(404).send({ success: 0, data: null })
    }

    // toString object { success: 1, data: foundQuestion } => send client
    res.send({
      success: 1,
      data: foundQuestion
    })
  } catch (err) {
    res.status(500).send({
      success: 0,
      data: null
    })
  }
});


app.delete('/question/:idQuestion', async (req, res) => {
  try {
    const { idQuestion } = req.params;

    const deleteQuestion = await QuestionModel.findByIdAndDelete(idQuestion)

    if (!deleteQuestion) {
      return res.status(404).send({ success: 0 })
    }

    res.send({
      success: 1,
      data: deleteQuestion
    })
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: 0,
      data: null
    })
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './public/404/index.html'));
});

app.listen(8080, (err) => {
  if (err) throw err;
  console.log('Server started');
});

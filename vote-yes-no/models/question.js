const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  content: String,
  yes: Number,
  no: Number
});

const questionModel = mongoose.model('question', QuestionSchema);

module.exports = questionModel;

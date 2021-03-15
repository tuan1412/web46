const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  frontSide: {
    type: String,
    required: true
  },
  backSide: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['code', 'vocal', 'other'],
    default: 'other'
  },
  isRemember: {
    type: Boolean,
    default: false
  }
})

const model = mongoose.model('card', schema);

module.exports = model;
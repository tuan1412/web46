const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  username: String,
  password: String,
  birthday: Date
});

const userModel = mongoose.model('user', UserSchema);

module.exports = userModel;

const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const AuthRouter = require('./modules/auth/auth.router');
const PostRouter = require('./modules/post/post.router');
const CommentRouter = require('./modules/comment/comment.router');

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, (err) => {
  if (err) return console.log('Mongo err', err);

  console.log('MongoDB connected');
});

const app = express();

app.use(express.json());
// req.body mới có data

app.use('/api/auth', AuthRouter);
app.use('/api/posts', PostRouter);
app.use('/api/comments', CommentRouter);

app.use('*', (req, res) => res.status(404).send({ success: 0, message: '404 not found' }))

app.listen(process.env.PORT, (err) => {
  if (err) return console.log('Start error', err);

  console.log('Server started');
})
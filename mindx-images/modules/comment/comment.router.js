const express = require('express');
const Router = express.Router();
const commentController = require('./comment.controller');
const isAuth = require('../../middlewares/isAuth');

// api/comments/
Router.get('/', (req, res) => {});
// api/comments
Router.post('/', isAuth, async (req, res) => {
  try {
    const { content, postId } = req.body;
    const createdBy = req.user._id;

    const newComment = await commentController.createComment({
      content,
      postId,
      createdBy
    });

    res.send({ success: 1, data: newComment });
  } catch (err) {
    res.status(500).send({ success: 1, message: err.message})
  }
});

module.exports = Router;

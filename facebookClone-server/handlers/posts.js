const { Post, User } = require("../models");
const { validationResult } = require("express-validator/check");

// news feed
module.exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: "desc" });
    if (!posts) return res.status(200).json({ msg: "Please try again later." });
    return res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Server error" });
  }
};

// create a post
module.exports.createPost = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
  }
  try {
    const user = await User.findById(req.user.id);
    const { name, avatar } = user;
    const { text } = req.body;
    const newPost = await Post.create({ name, avatar, text });
    return res.status(200).json(newPost);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Server error" });
  }
};

// get a post by id
module.exports.getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);
    if (!post) return res.status(404).json({ msg: "Post not found" });
    return res.status(200).json(post);
  } catch (error) {
    console.error(error);
    return res.status(404).json({ msg: "Post not found" });
  }
};

// edit post
module.exports.editPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);
    if (!post) return res.status(404).json({ msg: "Post not found" });
    await post.updateOne({ text: req.body.text });
    const newPost = await Post.findById(req.params.post_id);
    return res.status(200).json(newPost);
  } catch (error) {
    console.error(error);
    return res.status(404).json({ msg: "Post not found" });
  }
};

// delete post by id
module.exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);
    if (!post) return res.status(404).json({ msg: "Post not found" });
    await post.remove();
    return res.status(200).json({ msg: "Post deleted" });
  } catch (error) {
    return res.status(404).json({ msg: "Post not found" });
  }
};

// add/remove like
module.exports.handleLike = async (req, res) => {
  try {
    const foundPost = await Post.findById(req.params.post_id);
    const removeIndex = foundPost.likes.map(like => like.user.toString()).indexOf(req.user.id);
    const hasLiked = foundPost.likes.filter(like => like.user.toString() === req.user.id).length > 0;
    hasLiked ? foundPost.likes.splice(removeIndex, 1) : foundPost.likes.unshift({ user: req.user.id });
    await foundPost.save();
    // const updatedPost = await Post.findById(req.params.post_id);
    return res.status(200).json(foundPost);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Server error" });
  }
};

// add a comment
module.exports.addComment = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
  }
  try {
    const user = await User.findById(req.user.id);
    const post = await Post.findById(req.params.post_id);
    if (!post) return res.status(404).json({ msg: "Post not found" });

    const { name, avatar } = user;
    const { text } = req.body;
    post.comments.unshift({ text, name, avatar });
    await post.save();
    return res.status(200).json(post.comments);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Server error" });
  }
};

// delete a comment
module.exports.deleteComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);
    if (!post) return res.status(404).json({ msg: "Post not found" });
    const comment = post.comments.find(comment => comment.id === req.params.comment_id);
    if (!comment) return res.status(404).json({ msg: "Comment not found" });
    const removeIndex = post.comments.indexOf(comment.id);
    post.comments.splice(removeIndex, 1);
    await post.save();
    return res.status(200).json(post.comments);
  } catch (error) {
    return res.status(404).json({ msg: "Comment not found" });
  }
};

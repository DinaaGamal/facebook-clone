const express = require("express");
const router = express.Router({ mergeParams: true });
const { loginRequired, ensureCorrectUser } = require("../../middleware/auth");
const { validateCreatePost, validateCreateComment } = require("../../validation/posts");
const { getAllPosts, createPost, getPost, editPost, deletePost, handleLike, addComment, deleteComment } = require("../../handlers/posts");

// @ route   GET /api/posts
// @ desc    get all posts
// @ access  public
router.get("/", getAllPosts);
// =====================================================

// @ route   GET /api/posts/:post_id
// @ desc    get a post
// @ access  public
router.get("/:post_id", getPost);
// =====================================================

// @ route   Patch /api/posts/:post_id/user/:user_id
// @ desc    edit a post
// @ access  private
router.patch("/:post_id/user/:user_id", validateCreatePost, loginRequired, ensureCorrectUser, editPost);
// =====================================================

// @ route  POST /api/posts/user/:user_id
// @ desc   create a new post
// @ access private
router.post("/user/:user_id", validateCreatePost, loginRequired, ensureCorrectUser, createPost);

// @ route   DELETE /api/posts/:post_id/user/:user_id
// @ desc    delete a post
// @ access  private
router.delete("/:post_id/user/:user_id", loginRequired, ensureCorrectUser, deletePost);
// =====================================================

// @ route   PUT /api/posts/:post_id/like
// @ desc    like/unlike
// @ access  private
router.put("/:post_id/like", loginRequired, handleLike);
// =====================================================

// @ route   POST /api/posts/:post_id/comment
// @ desc    add a comment to a post
// @ access  private
router.post("/:post_id/comment", validateCreateComment, loginRequired, addComment);
// =====================================================

// @ route   DELETE /api/posts/:post_id/comment/:comment_id
// @ desc    delete a comment to a post
// @ access  private
router.delete("/:post_id/comment/:comment_id/user/:user_id", loginRequired, ensureCorrectUser, deleteComment);
// =====================================================

module.exports = router;

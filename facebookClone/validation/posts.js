const { check } = require("express-validator/check");

module.exports.validateCreatePost = [
  check("text", "Text is required")
    .not()
    .isEmpty()
    .trim()
];

module.exports.validateCreateComment = [
  check("text", "Text is required")
    .not()
    .isEmpty()
    .trim()
];

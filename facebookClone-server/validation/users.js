const { check } = require("express-validator/check");

module.exports.userSignupValidation = [
  // check if username is empty
  check("name", "Name is required.")
    .not()
    .isEmpty()
    .trim()
    .escape(),
  check("email", "Please enter a valid email.")
    .isEmail()
    .normalizeEmail()
    .trim(),
  check("password", "Password must be atleast 8 characters.").isLength({ min: 8 })
];

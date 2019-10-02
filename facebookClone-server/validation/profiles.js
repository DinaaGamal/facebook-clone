const { check } = require("express-validator/check");

module.exports.validateProfile = [
  check("status", "Status is required")
    .not()
    .isEmpty(),
  check("skills", "Skills are required")
    .not()
    .isEmpty()
];

module.exports.validateExperience = [
  check("title", "Title is required")
    .not()
    .isEmpty()
    .trim(),
  check("company", "Company is required")
    .not()
    .isEmpty()
    .trim(),
  check("from", "Starting Date is required")
    .not()
    .isEmpty()
    .trim()
];

module.exports.validateEducation = [
  check("school", "School is required")
    .not()
    .isEmpty()
    .trim(),
  check("degree", "Degree is required")
    .not()
    .isEmpty()
    .trim(),
  check("fieldofstudy", "Field of study is required")
    .not()
    .isEmpty()
    .trim(),
  check("from", "Starting Date is required")
    .not()
    .isEmpty()
    .trim()
];

const { check } = require("express-validator/check");

module.exports.userLoginValidation = [check("email", "Invalid Email").isEmail(), check("password", "Password required").exists()];

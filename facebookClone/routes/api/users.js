const express = require("express");
const router = express.Router();
const { signup } = require("../../handlers/auth");
const { userSignupValidation } = require("../../validation/users");

router.post("/", userSignupValidation, signup);

module.exports = router;

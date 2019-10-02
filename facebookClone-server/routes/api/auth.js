const express = require("express");
const router = express.Router();
const { loginRequired } = require("../../middleware/auth");
const { login } = require("../../handlers/auth");
const { getCurrentUser } = require("../../handlers/auth");
const { userLoginValidation } = require("../../validation/auth");

// @route   GET api/auth
// @desc    get current user at any given time
// @access  public

router.get("/", loginRequired, getCurrentUser);
// =====================================================

// @route   POST api/auth
// @desc    Test route
// @access  public

router.post("/", userLoginValidation, login);

module.exports = router;

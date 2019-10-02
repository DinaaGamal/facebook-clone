const { User } = require("../models");
const jwt = require("jsonwebtoken");
const config = require("config");
const secretKey = config.get("secretKey");
const { validationResult } = require("express-validator/check");
const gravatar = require("gravatar");

module.exports.getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    return res.status(200).json(user);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ msg: "Server error" });
  }
};

module.exports.signup = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { name, email, password } = req.body;
    const avatar = gravatar.url(email, {
      s: "200",
      r: "pg",
      d: "mm"
    });
    const user = await User.create({ name, email, password, avatar });
    const { id } = user;
    const token = jwt.sign({ name, avatar, email, id }, secretKey);
    return res.status(200).json({ id, name, email, avatar, token });
    // return res.send("user route");
  } catch (error) {
    console.error(error);
    return res.status(400).json({ errors: [{ msg: "Sorry , that Username and/or Email is already taken" }] });
  }
};

module.exports.login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const user = await User.findOne({ email: req.body.email });
    const isMatch = await user.comparePassword(req.body.password);
    if (isMatch) {
      const { name, email, avatar, id } = user;
      const token = jwt.sign({ name, id, email, avatar }, secretKey);
      return res.status(200).json({ name, email, avatar, id, token });
    }
  } catch (error) {
    return res.status(400).json({ errors: [{ msg: "Invalid email/password" }] });
  }
};

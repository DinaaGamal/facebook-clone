const jwt = require("jsonwebtoken");
const config = require("config");
const secretKey = config.get("secretKey");

module.exports.loginRequired = function(req, res, next) {
  try {
    // let token = req.header("x-auth-token");
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({ msg: "Please login first" });
    }
    let decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ msg: "Please login first" });
  }
};

module.exports.ensureCorrectUser = function(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({ msg: "Please login first" });
    }
    const decoded = jwt.verify(token, secretKey);
    if (decoded && decoded.id === req.params.user_id) {
      return next();
    } else {
      return res.status(401).json({ msg: "Unauthorized" });
    }
  } catch (error) {
    console.error(error);
    return res.status(401).json({ msg: "Unauthorized" });
  }
};

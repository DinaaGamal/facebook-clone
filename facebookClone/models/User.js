const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

userSchema.pre("save", async function(next) {
  try {
    if (!this.isModified("password")) {
      return next();
    }
    let hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ errors: [{ msg: error.message }] });
  }
});

userSchema.methods.comparePassword = async function(plainPassword) {
  try {
    let isMatch = await bcrypt.compare(plainPassword, this.password);
    return isMatch;
  } catch (error) {
    return res.status(500).json({ errors: [{ msg: error.message }] });
  }
};

module.exports = User = mongoose.model("User", userSchema);

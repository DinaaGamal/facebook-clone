const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");

// import schemas
const User = require("./User");
const Profile = require("./Profile");
const Post = require("./Post");
// const

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      autoReconnect: true,
      useCreateIndex: true,
      useNewUrlParser: true,
      useFindAndModify: false
    });
    console.log("DB connected successfully");
  } catch (error) {
    console.error(error);
    connectDB();
  }
};

connectDB();

module.exports.User = User;
module.exports.Post = Post;
module.exports.Profile = Profile;

const { Profile } = require("../models");
const { validationResult } = require("express-validator/check");
const config = require("config");
const githubClientID = config.get("githubClientID");
const githubClientSecret = config.get("githubClientSecret");
const axios = require("axios");
// get current user route
module.exports.getCurrentUserProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate("user", ["name", "avatar"]);
    if (!profile) {
      return res.status(400).json({ msg: "There is no profile for this user" });
    }
    return res.status(200).json(profile);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ msg: "Server error" });
  }
};

// create or update route
module.exports.createOrUpdateProfile = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { company, website, location, bio, status, githubusername, skills, youtube, facebook, twitter, instagram, linkedin } = req.body;
  const user = req.user.id;
  const profileFields = {};
  user && (profileFields.user = user);
  company && (profileFields.company = company);
  website && (profileFields.website = website);
  location && (profileFields.location = location);
  bio && (profileFields.bio = bio);
  status && (profileFields.status = status);
  githubusername && (profileFields.githubusername = githubusername);
  skills && (profileFields.skills = skills.split(",").map(skill => skill.trim()));

  profileFields.social = {};

  youtube && (profileFields.social.youtube = youtube);
  facebook && (profileFields.social.facebook = facebook);
  twitter && (profileFields.social.twitter = twitter);
  instagram && (profileFields.social.instagram = instagram);
  linkedin && (profileFields.social.linkedin = linkedin);

  try {
    let profile = await Profile.findOne({ user: req.user.id });
    if (profile) {
      profile = await Profile.findOneAndUpdate({ user: req.user.id }, { $set: profileFields }, { new: true });
      return res.status(200).json(profile);
    } else {
      profile = new Profile(profileFields);
      await profile.save();
      return res.status(200).json(profile);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "server error" });
  }
};

// get all profiles
module.exports.getAllProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", ["name", "avatar"]);
    return res.status(200).json(profiles);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Server error" });
  }
};

// get a user's profile by id
module.exports.getUserProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.params.user_id }).populate("user", ["name", "avatar"]);
    if (!profile) {
      return res.status(400).json({ msg: "Profile not found" });
    }
    return res.status(200).json(profile);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ msg: "Profile not found" });
  }
};

// delete account
module.exports.deleteAccount = async (req, res) => {
  try {
    const deletedProfile = await Profile.findOneAndRemove({ user: req.user.id });
    const deletedUser = await User.findOneAndRemove({ _id: req.user.id });
    return res.status(200).json({ msg: "Profile deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Server error" });
  }
};

// add profile experience
module.exports.addExperience = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { title, company, location, from, to, current, description } = req.body;
  const newExp = { title, company, location, from, to, current, description };

  try {
    const foundProfile = await Profile.findOne({ user: req.user.id });
    foundProfile.experience.unshift(newExp);
    await foundProfile.save();
    return res.status(200).json(foundProfile);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Server error" });
  }
};

// delete profile experience
module.exports.deleteExperience = async (req, res) => {
  try {
    const foundProfile = await Profile.findOne({ user: req.user.id });
    const expIds = foundProfile.experience.map(exp => exp._id.toString());
    const removeIndex = expIds.indexOf(req.params.exp_id);
    if (removeIndex === -1) {
      return res.status(500).json({ msg: "Server error" });
    } else {
      console.log("expIds", expIds);
      console.log("req.params", req.params);
      console.log("removed", expIds.indexOf(req.params.exp_id));
      foundProfile.experience.splice(removeIndex, 1);
      await foundProfile.save();
      return res.status(200).json(foundProfile);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Server error" });
  }
};

// add profile education
module.exports.addEducation = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { school, degree, fieldofstudy, from, to, current, description } = req.body;
  const newEdu = { school, degree, fieldofstudy, from, to, current, description };

  try {
    const foundProfile = await Profile.findOne({ user: req.user.id });
    foundProfile.education.unshift(newEdu);
    await foundProfile.save();
    return res.status(200).json(foundProfile);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Server error" });
  }
};

// delete profile education
module.exports.deleteEducation = async (req, res) => {
  try {
    const foundProfile = await Profile.findOne({ user: req.user.id });
    const eduIds = foundProfile.education.map(edu => edu._id.toString());
    const removeIndex = eduIds.indexOf(req.params.edu_id);
    if (removeIndex === -1) {
      return res.status(500).json({ msg: "Server error" });
    } else {
      console.log("eduIds", eduIds);
      console.log("req.params", req.params);
      console.log("removed", eduIds.indexOf(req.params.edu_id));
      foundProfile.education.splice(removeIndex, 1);
      await foundProfile.save();
      return res.status(200).json(foundProfile);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Server error" });
  }
};

module.exports.getGithub = async (req, res) => {
  const URL = `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${githubClientID}&client_secret=${githubClientSecret}`;
  try {
    const response = await axios.get(URL, { headers: { "user-agent": "node.js" } });
    if (response.status !== 200) return res.status(404).json({ msg: "User not found" });
    if (response.status === 200) return res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Server error" });
  }
};

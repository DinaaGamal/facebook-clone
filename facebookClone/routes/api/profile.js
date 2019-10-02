const express = require("express");
const router = express.Router({ mergeParams: true });

const { loginRequired, ensureCorrectUser } = require("../../middleware/auth");
const {
  getCurrentUserProfile,
  createOrUpdateProfile,
  getAllProfiles,
  getUserProfile,
  deleteAccount,
  addExperience,
  deleteExperience,
  addEducation,
  deleteEducation,
  getGithub
} = require("../../handlers/profile");

// validation
const { validateProfile, validateExperience, validateEducation } = require("../../validation/profiles");

// @ route   GET /api/profile/me
// @ desc    get current user profile
// @ access  private
router.get("/me", loginRequired, getCurrentUserProfile);
// =====================================================

// @ route   POST /api/profile/
// @ desc    create or update a user profile
// @ access  private
router.post("/", validateProfile, loginRequired, createOrUpdateProfile);
// =====================================================

// @ route   GET /api/profile/user/:user_id
// @ desc    get all profiles
// @ access  public
router.get("/", getAllProfiles);
// =====================================================

// @ route   GET /api/profile/user/:user_id
// @ desc    get user's profile
// @ access  private
router.get("/user/:user_id", loginRequired, getUserProfile);
// =====================================================

// @ route   PUT /api/profile/user/:user_id/experience
// @ desc    create user's profile experience
// @ access  private
router.put("/user/:user_id/experience", validateExperience, loginRequired, ensureCorrectUser, addExperience);
// =====================================================

// @ route   PUT /api/profile/user/:user_id/education
// @ desc    create user's profile education
// @ access  private
router.put("/user/:user_id/education", validateEducation, loginRequired, ensureCorrectUser, addEducation);
// =====================================================

// @ route   DELETE /api/profile/user/:user_id/experience/:exp_id
// @ desc    delete experience
// @ access  private
router.delete("/user/:user_id/experience/:exp_id", loginRequired, ensureCorrectUser, deleteExperience);
// =====================================================

// @ route   DELETE /api/profile/user/:user_id/education/:edu_id
// @ desc    delete education
// @ access  private
router.delete("/user/:user_id/education/:edu_id", loginRequired, ensureCorrectUser, deleteEducation);
// =====================================================

// @ route   DELETE /api/profile/user/:user_id
// @ desc    delete account
// @ access  private
router.delete("/user/:user_id", loginRequired, ensureCorrectUser, deleteAccount);

// @ route   GET /api/profile/github/:username
// @ desc    get user github progile
// @ access  public
router.get("/github/:username", getGithub);

module.exports = router;

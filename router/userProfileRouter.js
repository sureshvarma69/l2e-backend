// routes/userRoutes.js
const express = require("express");
const {
  createOrUpdateUserProfile,
  getUserProfile,
} = require("../controllers/userProfileController");

const router = express.Router();
const { verifyToken } = require("../middlewares/auth");

router.post("/add/profile", verifyToken, createOrUpdateUserProfile);
router.get("/get/profile/:id", verifyToken, getUserProfile);
module.exports = router;

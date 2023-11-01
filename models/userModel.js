const mongoose = require("mongoose");
const moment = require("moment");
const Schema = mongoose.Schema;

// Define the User schema
const userSchema = new Schema({
  // username: { type: String },
  appUserId: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Number, default: moment().unix() },
  firstName: { type: String },
  lastName: { type: String },
  role: {
    type: String,
    enum: ["JOB_SEEKER", "RECRUITER", "SUPER_ADMIN"],
  },
});

// Create the User model
const User = mongoose.model("User", userSchema);

module.exports = User;

const UserProfile = require("../models/userProfileModel");

// Create or update a user profile
const createOrUpdateUserProfile = async (req, res) => {
  try {
    const {
      appUserId,
      bio, // Professional headline
      summary, // LinkedIn user's summary
      profilePicture, // URL to the profile picture
      experiences, // Update the experiences field
      skills,
      language,
      designation,
      mobileNumber,
      email,
      country,
      streetAddress,
      city,
      state,
      pincode,
      firstName,
      lastName,
        certification,
        education
    } = req.body;

    // Check if a user profile with the provided appUserId already exists
    let userProfile = await UserProfile.findOne({ appUserId });

    if (userProfile) {
      // If the user profile exists, update its properties
      userProfile.bio = bio;
      userProfile.firstName = firstName;
      userProfile.lastName = lastName;
      userProfile.summary = summary;
      userProfile.profilePicture = profilePicture;
      userProfile.experiences = experiences; // Update the experiences field
      userProfile.skills = skills;
      userProfile.language = language;
      userProfile.designation = designation;
      userProfile.mobileNumber = mobileNumber;
      userProfile.email = email;
      userProfile.country = country;
      userProfile.streetAddress = streetAddress;
      userProfile.city = city;
      userProfile.state = state;
      userProfile.pincode = pincode;
      userProfile.certification= certification;
      userProfile.education = education;
    } else {
      // If the user profile doesn't exist, create a new one
      userProfile = new UserProfile({
        appUserId,
        bio,
        summary,
        profilePicture,
        experiences, // Set the experiences field
        skills,
        language,
        designation,
        mobileNumber,
        email,
        country,
        streetAddress,
        city,
        state,
        pincode,
        firstName,
        lastName,
      });
    }

    // Save the updated or new user profile
    const updatedUserProfile = await userProfile.save();

    res.status(200).json({
      message: "User profile created/updated successfully",
      // userProfile: updatedUserProfile,
    });
  } catch (error) {
    console.error("Error creating/updating user profile:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


const getUserProfile = async (req, res) => {
  try {
    console.log("userProfile1")
    const userProfile = await UserProfile.findOne({ appUserId:req.params.id });
    console.log("userProfile",userProfile)
    if (userProfile) {
      res.status(200).json({ userProfile });
    } else {
      res.status(201).json({ message: "User profile not found" });
    }
  } catch (error) {
    console.error("Error getting user profile:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { createOrUpdateUserProfile, getUserProfile };

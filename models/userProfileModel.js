const mongoose = require("mongoose");
const crypto = require('crypto');

const uuid = crypto.randomUUID();
const Schema = mongoose.Schema;

const companySchemaExperience = new mongoose.Schema({
  label: { type: String },
  value: { type: String },
});

const CertificationSchema = new mongoose.Schema({
  certifactionId :{ type: String ,value:"certificate_id_"+uuid},
  name:{type:String},
  description:{type:String},
  fromEpoch: { type: Number,default:null },
  toEpoch: { type: Number ,default:null },
});

const EduSchema = new mongoose.Schema({
  eduId :{ type: String ,value:"certificate_id_"+uuid},
  eduTitle:{type:String},
  speciality:{type:String},
  fromEpoch: { type: Number,default:null },
  toEpoch: { type: Number ,default:null },
});

const experienceSchema = new mongoose.Schema({
  company: companySchemaExperience,
  fromEpoch: { type: Number },
  toEpoch: { type: Number ,default:null },
  isPresent: { type: Boolean },
  role: { type: String },
  experienceId: { type: String ,value:"experience_id_"+uuid},
});
const userProfileSchema = new Schema({
  appUserId: { type: String }, // LinkedIn user ID
  bio: String, // Professional headline
  location: String, // Location
  summary: String, // LinkedIn user's summary
  profilePicture: String, // URL to the profile picture
  experiences: [experienceSchema],
  skills: [String],
  certification:[CertificationSchema],
  education:[EduSchema],
  language: [String],
  designation:String,
  mobileNumber:String,
  email:String,
  country: String,
  streetAddress: String,
  city: String,
  state: String,
  pincode: String,
  firstName:String,
  lastName:String
  // Add more fields as needed
});

const UserProfile = mongoose.model("UserProfile", userProfileSchema);

module.exports = UserProfile;

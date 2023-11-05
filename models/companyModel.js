const mongoose = require("mongoose");
const moment = require("moment");
const crypto = require('crypto');

const uuid = crypto.randomUUID();
const Schema = mongoose.Schema;


// Define the User schema
const companySchema = new Schema({
  companyId: { type: String,unique:true,value:uuid },
  companyName: String,
  companyLogo: String,
  companySize: String,
  companyDescription: String,
  companyType: String,
  companyEmail: String,
  companyContactNumber: String,
  isCompanyVerified: Boolean,
  companyDomain: String,
  metaInfo: {
    createdAt: { type: Number, default: moment().unix() },
    updatedAt: { type: Number, default: moment().unix() },
  },
});

// Create the User model
const Company = mongoose.model("Company", companySchema);

module.exports = Company;

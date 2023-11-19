const mongoose = require("mongoose");
const moment = require("moment");
const crypto = require('crypto');

const uuid = crypto.randomUUID();
const Schema = mongoose.Schema;

const companySchemaForJob = new Schema({
    label: String ,
    value: String,
})

// Define the User schema
const jobSchema = new Schema({
    jobId: { type: String },
    company:companySchemaForJob,
    jobTitle:String,
    location:String,
    jobType:String,
    jobDescription:String,
    applicants:[String],// pass user Ids who Applied for this Job
    applied:[String],
    screening:[String],
    offered:[String],
    hired:[String],
    rejected:[String],
    interview:[String],
    favourites:[String],
    appliedUsers:[String],
    status:{
        type:String,
        default:"ACTIVE"
    },
    metaInfo: {
        createdAt: { type: Number, default: moment().unix() },
        updatedAt: { type: Number, default: moment().unix() },
        createdBy:{type:String}
    },
});

// Create the User model
const Job = mongoose.model("Jobs", jobSchema);

module.exports = Job;

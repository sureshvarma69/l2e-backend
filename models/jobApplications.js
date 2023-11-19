const mongoose = require("mongoose");
const moment = require("moment");

const Schema = mongoose.Schema;

// Define the Application schema
const applicationSchema = new Schema({
    jobId: { type: String },
    applicationId: { type: String },
    userDetails: { type: Object },
    status: {
        type: String,
        default: "APPLIED"
    },
    metaInfo: {
        createdAt: { type: Number, default: () => moment().unix() },
        updatedAt: { type: Number, default: () => moment().unix() },
        createdBy: { type: String },
        updatedBy: { type: String }
    },
});

// Create the Application model
const ApplicationModel = mongoose.model("Application", applicationSchema);

module.exports = ApplicationModel;

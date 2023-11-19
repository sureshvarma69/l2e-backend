const Job = require("../models/jobModel");
const UserDetails = require("../models/userProfileModel")
const moment = require("moment");
const crypto = require('crypto');
const Application = require("../models/jobApplications")
const uuid = crypto.randomUUID();

const createOrUpdateJob = async (req, res) => {
    try{
        const {
            createdBy,
            jobId,
            jobTitle,
            location,
            jobType,
            jobDescription,
            applicants,
            company,
            status,
        } = req.body;

        if (!jobId) {
            const newJob = new Job({
                jobId:"job_id_"+uuid,
                jobTitle,
                location,
                jobType,
                jobDescription,
                applicants,
                company,
                "metaInfo.createdBy":createdBy,
            });
            await newJob.save();

            return res
                .status(201)
                .json({ message: "Job created successfully",job: newJob });
        } else {
            // If companyId is provided in the request, look for an existing company with that ID
            const existingJob = await Job.findOne({ jobId });

            if (existingJob) {
                // If the company exists, update its properties
                existingJob.jobTitle = jobTitle;
                existingJob.jobDescription = jobDescription;
                existingJob.location = location;
                existingJob.applicants = applicants;
                existingJob.company = company;
                existingJob.jobType = jobType;
                if(status) existingJob.status = status;
                // Save the updated company
                await existingJob.save();

                return res.status(200).json({
                    message: "Company updated successfully",
                    job: existingJob,
                });
            } else {
                return res
                    .status(404)
                    .json({ message: "Company with companyId not found" });
            }
        }
    }catch (e) {
        console.error("Error creating/updating job:", e);
        res.status(500).json({ error: "Internal server error" });
    }
};


const createJobApplication = async (req,res)=>{
    try{
        const {
            jobId,userId
        } = req.body
        const userDetails = await UserDetails.findOne({appUserId:userId});
        if(!userDetails) return res.status(204).json({"message":"Illegal Applicant"});

        const newJobApplication = new Application({
            jobId,
            applicationId:`application_id_`+uuid,
            userDetails
        });
        await newJobApplication.save();
        return res.status(200).json({
            message: "Job Applied successfully",
            job: newJobApplication,
        });
    }catch (e) {
        console.error("Error creating/updating Application:", e);
        res.status(500).json({ error: "Internal server error" });
    }
}

const getPostedJobs = async (req,res)=>{
    try{
        const id = req.params.id
        const activeJobs = await Job.find({status:"ACTIVE","metaInfo.createdBy":id})
        res.status(201).json(activeJobs)
    }catch (e) {
        console.error("Error while getting jobs list:", e);
        res.status(500).json({ error: "Internal server error" });
    }
}

const getAllActiveJobs = async (req,res)=>{
    try{
        const id = req.params.id
        const activeJobsWithAppUsers = await Job.aggregate([
            {
                $match: { status: "ACTIVE" },
            },
            {
                $lookup: {
                    from: "applications", // The name of the other collection (case-sensitive)
                    localField: "jobId", // Field from the current collection
                    foreignField: "jobId", // Field from the other collection
                    as: "appliedUsers",
                },
            },
        ]);

        console.log(activeJobsWithAppUsers);




        res.status(201).json(activeJobsWithAppUsers)
    }catch (e) {
        console.error("Error while getting jobs list:", e);
        res.status(500).json({ error: "Internal server error" });
    }
}

const getJobsByJobId = async (req,res)=>{
    try{
        const id = req.params.jobId
        const activeJobs = await Job.findOne({jobId:id})
        res.status(201).json(activeJobs)
    }catch (e) {
        console.error("Error while getting jobs list:", e);
        res.status(500).json({ error: "Internal server error" });
    }
}

const getApplicantsByJobId = async (req,res)=>{
    try{
        const id = req.params.jobId
        const activeJobs = await Application.find({jobId:id})
        res.status(201).json(activeJobs)
    }catch (e) {
        console.error("Error while getting jobs list:", e);
        res.status(500).json({ error: "Internal server error" });
    }
}

const applyJob = async (req,res)=>{
    try{
        const {
            jobId,
            userId
        } = req.body
        const apply = await Job.updateOne(
            {jobId: jobId},
            { $push: { applicants: userId } }
        );
        res.status(201).json({"message":"Job applied"})
    }catch (e) {
        console.error("Error updating job:", e);
        res.status(500).json({ error: "Internal server error" });
    }
}

const addToFav = async (req,res)=>{
    try{
        const {
            jobId,
            userId
        } = req.body
        const resp = await Job.updateOne(
            {jobId: jobId},
            { $push: { favourites: userId } }
        );
        res.status(201).json({"message":"Job applied"})
    }catch (e) {
        console.error("Error updating job:", e);
        res.status(500).json({ error: "Internal server error" });
    }
}

const removeFav = async (req,res)=>{
    try{
        const {
            jobId,
            userId
        } = req.body
        const resp = await Job.updateOne(
            {jobId: jobId},
            { $pull: { favourites: userId } }
        );
        res.status(201).json({"message":"Job applied"})
    }catch (e) {
        console.error("Error updating job:", e);
        res.status(500).json({ error: "Internal server error" });
    }
}

const removeJobApplication = async (req,res)=>{
    try{
        const {
            jobId,
            userId
        } = req.body
        const resp = await Job.updateOne(
            {jobId: jobId},
            { $pull: { applicants: userId } }
        );
        res.status(201).json({"message":"Job Application reverted"})
    }catch (e) {
        console.error("Error updating job:", e);
        res.status(500).json({ error: "Internal server error" });
    }
}
module.exports={
    createOrUpdateJob,
    getPostedJobs,
    getAllActiveJobs,
    getJobsByJobId,
    addToFav,
    removeFav,
    applyJob,removeJobApplication,
    createJobApplication,
    getApplicantsByJobId
}



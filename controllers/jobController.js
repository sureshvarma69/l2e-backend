const Job = require("../models/jobModel");
const moment = require("moment");
const crypto = require('crypto');

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

const getAllActiveJobs = async (req,res)=>{
    try{
        const id = req.params.id
        const activeJobs = await Job.find({status:"ACTIVE","metaInfo.createdBy":id})
        res.status(201).json(activeJobs)
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

module.exports={
    createOrUpdateJob,
    getAllActiveJobs,
    getJobsByJobId
}



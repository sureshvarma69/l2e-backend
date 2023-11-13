const express = require("express");
const { createOrUpdateJob,getAllActiveJobs,getJobsByJobId } = require("../controllers/jobController");
const router = express.Router();
const { verifyToken } = require("../middlewares/auth");

router.post("/create/job", verifyToken,createOrUpdateJob );
router.get("/get/jobsPostedBy/:id",verifyToken,getAllActiveJobs)
router.get("/get/jobById/:jobId",verifyToken,getJobsByJobId)
module.exports = router;
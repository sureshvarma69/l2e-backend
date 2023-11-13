const express = require("express");
const { createOrUpdateJob,getPostedJobs,getJobsByJobId, getAllActiveJobs, applyJob, addToFav, removeJobApplication,
    removeFav
} = require("../controllers/jobController");
const router = express.Router();
const { verifyToken } = require("../middlewares/auth");

router.post("/create/job", verifyToken,createOrUpdateJob );
router.get("/get/allJobs",verifyToken,getAllActiveJobs)
router.get("/get/jobsPostedBy/:id",verifyToken,getPostedJobs)
router.get("/get/jobById/:jobId",verifyToken,getJobsByJobId)

router.post("/job/apply",verifyToken,applyJob)
router.post("/job/fav",verifyToken,addToFav)
router.post("/job/revert",verifyToken,removeJobApplication)
router.post("/job/unfav",verifyToken,removeFav)
module.exports = router;
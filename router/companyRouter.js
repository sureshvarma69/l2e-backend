// routes/userRoutes.js
const express = require("express");
const { createOrUpdateCompany,getAllCompanies } = require("../controllers/companyController");
const router = express.Router();
const { verifyToken } = require("../middlewares/auth");

router.post("/create/company", verifyToken, createOrUpdateCompany);
router.get("/get/companies",verifyToken,getAllCompanies)
module.exports = router;

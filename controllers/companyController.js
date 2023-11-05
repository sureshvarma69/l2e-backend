const Company = require("../models/companyModel"); // Import your Company model
const moment = require("moment");
const crypto = require("crypto");

const createOrUpdateCompany = async (req, res) => {

  try{
    const {
      companyId,
      companyName,
      companyLogo,
      companySize,
      companyDescription,
      companyType,
      companyEmail,
      companyContactNumber,
      isCompanyVerified,
      companyDomain,
    } = req.body;

    if (!companyId) {
      const generatedCompanyId = crypto
          .createHash("sha256")
          .update(companyDomain, process.env.SHA_256_SECRET)
          .digest("hex");

      const newCompany = new Company({
        companyId: generatedCompanyId,
        companyName,
        companyLogo,
        companySize,
        companyDescription,
        companyType,
        companyEmail,
        companyContactNumber,
        isCompanyVerified,
        companyDomain,
      });

      await newCompany.save();

      return res
          .status(201)
          .json({ message: "Company created successfully", company: newCompany });
    } else {
      // If companyId is provided in the request, look for an existing company with that ID
      const existingCompany = await Company.findOne({ companyId });

      if (existingCompany) {
        // If the company exists, update its properties
        existingCompany.companyName = companyName;
        existingCompany.companyLogo = companyLogo;
        existingCompany.companySize = companySize;
        existingCompany.companyDescription = companyDescription;
        existingCompany.companyType = companyType;
        existingCompany.companyEmail = companyEmail;
        existingCompany.companyContactNumber = companyContactNumber;
        existingCompany.isCompanyVerified = isCompanyVerified;
        existingCompany.companyDomain = companyDomain;
        existingCompany.metaInfo.updatedAt = moment().unix(); // Update the updatedAt timestamp

        // Save the updated company
        await existingCompany.save();

        return res.status(200).json({
          message: "Company updated successfully",
          company: existingCompany,
        });
      } else {
        return res
            .status(404)
            .json({ message: "Company with companyId not found" });
      }
    }
  }catch (e) {
    console.error("Error creating/updating user profile:", e);
    res.status(500).json({ error: "Internal server error" });
  }

};

const getAllCompanies = async (req,res)=>{
  try{
    const companies = await Company.find();
    res.status(200).json({companies})
  }catch (e) {
    console.error("Error while gettng companies:", e);
    res.status(500).json({ error: "Internal server error" });
  }
}
module.exports = { createOrUpdateCompany,getAllCompanies };

const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const {verifyToken} = require("./middlewares/auth")
const bodyParser = require("body-parser");
const cors = require("cors");
// routes
const UserRoutes = require("./router/user-router");
const UserProfileRoutes = require("./router/userProfileRouter");
const CompanyRoutes = require("./router/companyRouter");
const UtilsRoutes = require("./router/utilsRouter");
const JobRoutes = require("./router/jobRouter");

const app = express();
const port = process.env.PORT || 1221;



dotenv.config({ path: "./.env" });
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
// Connect to MongoDB using Mongoose


mongoose
  .connect(process.env.MONGO_DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => {
    console.log("Db Connection Successfull");
    // Start the server
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  });

app.get("/", (req, res) => {
  res.send("L2E play Api");
});

app.use("/api/v1",UserRoutes);
app.use("/api/v1",UserProfileRoutes);
app.use("/api/v1", CompanyRoutes)
app.use("/api/v1",UtilsRoutes)
app.use("/api/v1",JobRoutes)
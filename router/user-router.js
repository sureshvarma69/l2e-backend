// routes/userRoutes.js
const express = require("express");
const {
  createUser,
  login,
  getUsers,
} = require("../controllers/user-controller");
const router = express.Router();
const { verifyToken, decodeToken } = require("../middlewares/auth");
// router.get("/users", getUsers);
// router.get("/users/:id", getUserById);

router.post("/signup", createUser);
router.post("/login", login);
router.get("/users", verifyToken, getUsers);
router.get("/auth", decodeToken);
module.exports = router;

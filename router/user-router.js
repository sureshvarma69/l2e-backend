// routes/userRoutes.js
const express = require("express");
const {
  createUser,
  login,
  getUsers,
  updateRole,
} = require("../controllers/user-controller");
const router = express.Router();
const { verifyToken, decodeToken } = require("../middlewares/auth");
// router.get("/users", getUsers);
// router.get("/users/:id", getUserById);

router.post("/signup", createUser);
router.post("/login", login);
router.get("/users/:id", verifyToken, getUsers);
router.post("/update/role/:id", verifyToken, updateRole);
router.get("/auth", decodeToken);
module.exports = router;

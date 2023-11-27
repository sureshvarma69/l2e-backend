// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const { verifyToken, decodeToken } = require("../middlewares/auth");
// router.get("/users", getUsers);
// router.get("/users/:id", getUserById);
const { getMyEvents,AddorUpdateEvent} = require("../controllers/eventController")

router.get('/events/:appuserId',verifyToken,getMyEvents);
router.post("/events/add",verifyToken,AddorUpdateEvent);
module.exports = router;

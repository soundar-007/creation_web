const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { authenticate } = require("../middleware/authMiddleware");

router.get("/getUserDetails", authenticate, userController.getUserDetails);
router.post("/uploadAvatar", authenticate, userController.uploadAvatar);
module.exports = router;

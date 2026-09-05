const express = require("express");
const { register, login, getMe, updateProfile, createAdmin } = require("../controllers/authController");
const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", protect, getMe);
router.put("/profile", protect, updateProfile);
router.post("/admin", protect, adminOnly, createAdmin);
module.exports = router;
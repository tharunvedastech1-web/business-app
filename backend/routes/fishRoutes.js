const express = require("express");
const { createFish, getFish, getFishById, updateFish, deleteFish } = require("../controllers/fishcontroller");
const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

const router = express.Router();

router.post("/", protect, adminOnly, createFish);
router.get("/", protect, getFish);
router.get("/:id", protect, getFishById);
router.patch("/:id", protect, adminOnly, updateFish);
router.delete("/:id", protect, adminOnly, deleteFish);
module.exports = router;
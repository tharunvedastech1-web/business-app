const express = require("express");

const { createOrder, getMyOrders, getAllOrders } = require("../controllers/orderController");

const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

const router = express.Router();

router.post("/", protect, createOrder);
router.get("/my-orders", protect, getMyOrders);
router.get("/all", protect, adminOnly, getAllOrders);
module.exports = router;
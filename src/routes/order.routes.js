const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth.middleware");

// ✅ IMPORT CONTROLLER FUNCTIONS
const { createOrder, getMyOrders } = require("../controllers/order.controller");

// ROUTES
router.post("/", auth, createOrder);
router.get("/my", auth, getMyOrders);

module.exports = router;

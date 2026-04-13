const express = require("express");
const { createOrder } = require("../controllers/order.controller");
const auth = require("../middlewares/auth.middleware");

const router = express.Router();

router.post("/", auth, createOrder);
router.get("/my", auth, getMyOrders);
module.exports = router;

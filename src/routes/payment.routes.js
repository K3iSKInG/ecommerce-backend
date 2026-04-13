const express = require("express");
const { payOrder } = require("../controllers/payment.controller");
const auth = require("../middlewares/auth.middleware");

const router = express.Router();

router.post("/", auth, payOrder);

module.exports = router;

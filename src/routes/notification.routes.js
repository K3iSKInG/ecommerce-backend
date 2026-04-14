const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth.middleware");

// ✅ IMPORT CONTROLLER FUNCTIONS
const {
  getMyNotifications,
  markAsRead,
  saveFcmToken,
} = require("../controllers/notification.controller");

// ROUTES
router.get("/", auth, getMyNotifications);
router.patch("/:id/read", auth, markAsRead);
router.post("/save-token", auth, saveFcmToken);

module.exports = router;

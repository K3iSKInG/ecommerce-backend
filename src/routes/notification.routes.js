const express = require("express");
const auth = require("../middlewares/auth.middleware");
const {
  getMyNotifications,
  markAsRead,
} = require("../controllers/notification.controller");

const router = express.Router();

router.get("/my", auth, getMyNotifications);
router.patch("/:id/read", auth, markAsRead);
router.post("/save-token", auth, saveFcmToken);

module.exports = router;

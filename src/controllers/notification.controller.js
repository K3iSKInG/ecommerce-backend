const Notification = require("../models/Notification");
const User = require("../models/User");

// Optional Firebase (safe for production)
let admin = null;
try {
  admin = require("../config/firebase");
} catch (err) {
  console.warn("⚠️ Firebase not configured. Push notifications disabled.");
}

// GET MY NOTIFICATIONS
exports.getMyNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({
      user: req.user.id,
    }).sort({ createdAt: -1 });

    res.json(notifications);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// MARK AS READ
exports.markAsRead = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);

    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    notification.isRead = true;
    await notification.save();

    res.json(notification);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ SAVE FCM TOKEN (THIS MUST EXIST)
exports.saveFcmToken = async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ message: "FCM token is required" });
    }

    await User.findByIdAndUpdate(req.user.id, {
      fcmToken: token,
    });

    res.json({ message: "FCM token saved" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

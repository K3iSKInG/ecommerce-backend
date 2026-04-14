const Notification = require("../models/Notification");
const User = require("../models/User");
//const admin = require("../config/firebase");
//const User = require("../models/User");
let admin = null;

try {
  admin = require("../config/firebase");
} catch (err) {
  console.warn("⚠️ Firebase not configured. Push notifications disabled.");
}

if (admin) {
  admin.messaging().send({
    token,
    notification: {
      title,
      body,
    },
  });
}

exports.getMyNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({
      user: req.userId,
    }).sort({ createdAt: -1 });

    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.sendPushNotification = async ({ userId, title, body }) => {
  const user = await User.findById(userId);
  if (!user || !user.fcmToken) return;

  await admin.messaging().send({
    token: user.fcmToken,
    notification: { title, body },
  });
};

exports.saveFcmToken = async (req, res) => {
  try {
    const { token } = req.body;

    await User.findByIdAndUpdate(req.userId, {
      fcmToken: token,
    });

    res.json({ message: "FCM token saved" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.markAsRead = async (req, res) => {
  try {
    const { id } = req.params;

    await Notification.findByIdAndUpdate(id, {
      isRead: true,
    });

    res.json({ message: "Notification marked as read" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Helper to create notifications internally
exports.createNotification = async ({ user, title, message, type }) => {
  await Notification.create({
    user,
    title,
    message,
    type,
  });
};

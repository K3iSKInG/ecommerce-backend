const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    address: String,
    region: String,
    language: { type: String, default: "en" },
    fcmToken: {
      type: String,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("User", UserSchema);

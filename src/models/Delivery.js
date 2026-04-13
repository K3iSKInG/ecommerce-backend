const mongoose = require("mongoose");

const DeliverySchema = new mongoose.Schema({
  orderId: mongoose.Schema.Types.ObjectId,
  status: String,
});

module.exports = mongoose.model("Delivery", DeliverySchema);

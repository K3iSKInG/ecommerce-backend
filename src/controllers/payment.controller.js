const Payment = require("../models/Payment");
const Order = require("../models/Order");
const { createNotification } = require("./notification.controller");
exports.payOrder = async (req, res) => {
  try {
    const { orderId, method } = req.body;

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Mark order paid
    order.status = "PAID";
    await order.save();

    // Create payment record
    const payment = await Payment.create({
      order: order._id,
      method,
      amount: order.totalAmount,
      status: "SUCCESS",
    });
    await sendPushNotification({
      userId: order.user,
      title: "Payment Successful",
      body: "Your payment was completed",
    });
    res.json({
      message: "Payment successful",
      payment,
    });
    await createNotification({
      user: order.user,
      title: "Payment Successful",
      message: "Your payment was completed successfully.",
      type: "PAYMENT",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

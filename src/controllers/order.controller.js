const Order = require("../models/Order");
const { createNotification } = require("./notification.controller");
exports.createOrder = async (req, res) => {
  try {
    const { items, totalAmount } = req.body;

    const order = await Order.create({
      user: req.userId,
      items,
      totalAmount,
      status: "PENDING",
    });
    await sendPushNotification({
      userId: req.userId,
      title: "Order Created",
      body: "Your order has been placed successfully",
    });
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  await createNotification({
    user: req.userId,
    title: "Order Created",
    message: "Your order has been created successfully.",
    type: "ORDER",
  });
};
const Order = require("../models/Order");

exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.userId }).sort({
      createdAt: -1,
    });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

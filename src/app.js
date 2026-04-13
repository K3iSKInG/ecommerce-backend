const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/orders", require("./routes/order.routes"));
app.use("/api/payments", require("./routes/payment.routes"));
app.get("/", (req, res) => {
  res.send("API is running");
});
app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/notifications", require("./routes/notification.routes"));
module.exports = app;

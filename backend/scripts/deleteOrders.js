require('dotenv').config();
const mongoose = require('mongoose');
const Order = require('../models/orderModel'); // adjust path if needed

const deleteDeliveredOrders = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    const result = await Order.deleteMany({ status: "Delivered" });
    console.log(`🧹 Deleted ${result.deletedCount} delivered orders.`);

    await mongoose.disconnect();
    console.log("🔌 Disconnected");
  } catch (err) {
    console.error("❌ Error:", err);
  }
};

deleteDeliveredOrders();

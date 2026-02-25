const mongoose = require("mongoose");

const PaymentScema = new mongoose.Schema({
  rozerpay_order_id: {
    type: String,
    require: true,
  },
  razorpay_payment_id: {
    type: String,
    require: true,
  },
  RozerPaySingnature: {
    type: String,
    require: true,
  },
  date: {
    type: String,
    default: Date.now,
  },
});

module.exports = mongoose.model("Payment", PaymentScema);

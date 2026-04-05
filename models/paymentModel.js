const mongoose = require("mongoose");


const PaymentSchema = new mongoose.Schema(
  {
    appointmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
      required: true,
    },
    patientName: {
      type: String,
      required: true,
    },
    patientEmail: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    Currency: {
      type: String,
      Default: "inr",
    },
    paymentIntentId :{
      type: String,
      required: true,
      unique: true,
    },
    clientSecret: {
      type: String,
      required: true,
      default: "pending",
    },
    status: {
      type: String,
      required: true,
    },
    paymentMethod: {
      type: String,
      default: "card",
      required: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Payment", PaymentSchema);
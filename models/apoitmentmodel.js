const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DoctorAdd",
      required: true,
    },

    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    firstName: {
      type: String,
      required: true,
      trim: true,
    },

    lastName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
    },

    address: {
      type: String,
      required: true,
      trim: true,
    },

    city: {
      type: String,
      required: true,
      trim: true,
    },

    mobileNumber: {
      type: String,
      required: true,
    },

    appointmentDate: {
      type: Date,
      required: true,
    },

    appointmentTime: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      require: true,
    },
    currency: {
      type: String,
      default: "inr",
    },
    paymentIntentId: {
      type: String,
      required: true,
      unique: true,
    },
    clientSecret: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    paymentMethod: {
      type: String,
      default: "card",
    },
    paymentStatus: {
      type: String,
      enum: ["unpaid", "paid"],
      default: "unpaid",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Appointment", appointmentSchema);

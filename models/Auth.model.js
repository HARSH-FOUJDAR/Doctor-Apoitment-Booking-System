const mongoose = require("mongoose");

const authSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["patient", "doctor", "Admin"],
    },
    profile: {
      bio: {
        type: String,
      },
      specialization: {
        type: String,
      },
      experience: {
        type: Number,
      },
      contactNumber: {
        type: String,
      },
      clinicAddress: {
        type: String,
      },
      profilePicture: {
        type: String,
      },
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Auth", authSchema);

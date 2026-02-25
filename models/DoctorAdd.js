const mongoose = require("mongoose");

const doctorAddSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Doctor name is required"],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
    },
    specialization: {
      type: String,
      required: true,
      default: "General Physician",
      enum: [
        "General Physician",
        "Internal Medicine Specialist",
        "Cardiologist",
        "Dermatologist",
        "Orthopedic",
        "Pediatrician",
        "Gynecologist",
        "Neurologist",
        "Neurosurgeon",
        "Psychiatrist",
        "Psychologist",
        "ENT Specialist",
        "Ophthalmologist",
        "Oncologist",
        "Gastroenterologist",
        "Urologist",
        "Nephrologist",
        "Pulmonologist",
        "Endocrinologist",
        "Rheumatologist",
        "Hematologist",
        "Radiologist",
        "Anesthesiologist",
        "Pathologist",
        "Dentist",
        "General Surgeon",
        "Plastic Surgeon",
        "Cardiothoracic Surgeon",
        "Pediatric Surgeon",
        "Obstetrician",
        "Sexologist",
        "Immunologist",
        "Allergy Specialist",
        "Sports Medicine Specialist",
        "Critical Care Specialist",
        "Emergency Medicine Specialist",
        "Geriatrician",
        "Hepatologist",
        "Infectious Disease Specialist",
      ],
    },
    experience: {
      type: Number,
      required: [true, "Experience is required"],
    },
    contactNumber: {
      type: String,
      required: true,
    },
    clinicAddress: {
      type: String,
      trim: true,
    },
    profile: {
      profilePicture: {
        type: String,
        default: "",
      },
    },
    payment: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("DoctorAdd", doctorAddSchema);

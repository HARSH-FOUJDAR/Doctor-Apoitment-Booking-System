const DoctorAdd = require("../models/DoctorAdd");
const cloudinary = require("../utils/cloudinary");
const getDataUri = require("../utils/dataUri");

exports.AddDoctor = async (req, res) => {
  try {
    const {
      name,
      description, // Corrected spelling
      specialization,
      experience,
      contactNumber,
      clinicAddress,
      payment, // lowerCase for consistency
    } = req.body;

    // 1. First Validation
    if (
      !name ||
      !description ||
      !specialization ||
      !experience ||
      !contactNumber ||
      !clinicAddress ||
      !payment
    ) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    // 2. Handle Image Upload
    let profilePicture = "";
    if (req.file) {
      const fileUri = getDataUri(req.file);
      const mycloud = await cloudinary.uploader.upload(fileUri.content);
      profilePicture = mycloud.secure_url;
    }

    // 3. Create Record
    const newDoctor = new DoctorAdd({
      name,
      description,
      specialization,
      experience,
      contactNumber,
      clinicAddress,
      payment,
      createdBy: req.id,
      profile: {
        profilePicture: profilePicture,
      },
    });

    await newDoctor.save();

    return res.status(201).json({
      message: "Doctor Added Successfully",
      success: true,
      doctor: newDoctor,
    });
  } catch (err) {
    console.error("AddDoctor Error:", err);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
      error: err.message,
    });
  }
};
exports.ViewallDoctor = async (req, res) => {
  try {
    const allDoctor = await DoctorAdd.find().populate({
      path: "createdBy",
      select: "name specialization",
    });

    return res.status(200).json({
      success: true,
      doctors: allDoctor,
    });
  } catch (error) {
    console.error("Fetch Error:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching doctors",
      error: error.message,
    });
  }
};


exports.GetDoctorById = async (req, res) => {
  try {
    const doctor = await DoctorAdd.findById(req.params.id);

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    return res.status(200).json({
      success: true,
      doctor,
    });
  } catch (error) {
    console.error("GetDoctorById Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};



exports.UpdateDoctor = async (req, res) => {};
exports.DeleteDoctor = async (req, res) => {};

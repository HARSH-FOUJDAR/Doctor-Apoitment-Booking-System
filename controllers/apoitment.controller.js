const apoitmentmodel = require("../models/apoitmentmodel");
const mongoose = require('mongoose')
exports.ApoitmentForm = async (req, res) => {
  console.log("clicked");

  try {
    const {
      doctor,
      patient,
      firstName,
      lastName,
      email,
      address,
      city,
      mobileNumber,
      appointmentDate,
      appointmentTime,
      paymentStatus,
    } = req.body;

    if (
      !doctor ||
      !patient ||
      !firstName ||
      !lastName ||
      !email ||
      !address ||
      !city ||
      !mobileNumber ||
      !appointmentDate ||
      !appointmentTime ||
      !paymentStatus
    ) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be filled",
      });
    }
    const existBooking = await apoitmentmodel.findOne({
      doctor,
      appointmentDate: new Date(appointmentDate),
      appointmentTime,
      status: { $ne: "rejected" },
    });

    if (existBooking) {
      return res.status(400).json({
        success: false,
        message: "This Time slot alredy book ",
      });
    }

    const newAppoitmentBook = await apoitmentmodel.create({
      doctor,
      patient,
      firstName,
      lastName,
      email,
      address,
      city,
      mobileNumber,
      appointmentDate: new Date(appointmentDate),
      appointmentTime,
      paymentStatus,
    });
    res.status(201).json({
      success: true,
      message: "Appointment booked successfully",
      appointment: newAppoitmentBook,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

exports.updateAppointmentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const appoitment = await apoitmentmodel.findOneAndUpdate(
      { _id: id },
      { status },
      { new: true },
    );
    if (!appoitment) {
      return res.status(404).json({
        success: false,
        message: "Apoitment Not Found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Apoiytment Status Updates",
      appoitment,
    });
  } catch (err) {
    console.log(err);
    res.status.json(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

exports.getMyApoitments = async (req, res) => {
  try {
    const { patientId } = req.params;

    const apoitments = await apoitmentmodel
      .find({ patient: patientId })
      .populate("doctor", "name specialization profile")
      .sort({ appointmentDate: 1 });

    res.status(200).json({
      success: true,
      appointments: apoitments, // spelling fixed
    });
  } catch (err) {
    console.error("Error fetching appointments:", err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

exports.getDoctorAppointments = async (req, res) => {
  try {
    let { doctorId } = req.params;

    doctorId = doctorId.trim(); 

    const appointments = await apoitmentmodel
      .find({ doctor: doctorId })
      .populate("patient", "name email mobileNumber")
      .sort({ appointmentDate: 1 });

    res.status(200).json({
      success: true,
      appointments,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Server Error",
      success: false,
    });
  }
};

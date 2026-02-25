const AuthModel = require("../models/Auth.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
exports.Registerpages = async (req, res) => {
  try {
    const {
      username,
      email,
      password,
      role,
      specialization,
      experience,
      contactNumber,
      clinicAddress,
      profilePicture,
    } = req.body;

    // 1. Pehle basic validation check karein
    if (!username || !email || !password || !role) {
      return res.status(400).json({
        message:
          "All fields are required (username, email, password, role, specialization, experience, contactNumber, clinicAddress)",
      });
    }
    // 3. User check karein taaki faltu mein cloudinary upload na ho
    const existinguser = await AuthModel.findOne({ email });
    if (existinguser) {
      return res.status(400).json({
        message: "Email already in use",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new AuthModel({
      username,
      email,
      role,
      password: hashedPassword,
      profile: {
        specialization,
        experience,
        contactNumber,
        clinicAddress,
      },
    });

    await newUser.save();

    return res.status(201).json({
      message: "User Register Successfully",
      success: true,
      user: newUser,
    });
  } catch (err) {
    console.log("Server Error:", err);
    return res.status(500).json({
      message: "Internal Server Error",
      error: err.message,
    });
  }
};
exports.Login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res.status(400).json({
        message: "Email and password are required",
        suceess: false,
      });
    }
    const user = await AuthModel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }
    if (user.role !== role) {
      return res.status(400).json({
        message: "Invalid role",
      });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        profile: user.profile?.profilePicture,
      },
    });
  } catch (err) {
    console.log("server error", err);
    res.status(500).json({
      message: "Server error",
    });
  }
};

exports.GetPatient = async (req, res) => {
  res.send("Patient Profile");
};

exports.Logout = async (req, res) => {
  res.send("Patient Profile");
};

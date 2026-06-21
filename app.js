const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");

const dbConnect = require("./config/db");
const cors = require("cors");
const Stripe = require("stripe");
const pool = require("./config/mysqlDb");

const AuthRoutes = require("./routes/Auth.routes");
const EmergencyRoutes = require("./routes/Emergency.routes");
const DoctorRoutes = require("./routes/Doctor.routes");
const PaymentRoutes = require("./routes/Payment.routes");
const AppoitmentRoutes = require("./routes/apoitment.routes");

app.use(express.json());

app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
app.use("/emergency", EmergencyRoutes);
app.use("/auth", AuthRoutes);
app.use("/doctor", DoctorRoutes);
app.use("/Payment", PaymentRoutes);
app.use("/appoitmet", AppoitmentRoutes);

app.use("/", (req, res) => {
  res.json("Server Start Doctor Apoitment System");
});
const PORT = process.env.PORT || 5000;
dbConnect();
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

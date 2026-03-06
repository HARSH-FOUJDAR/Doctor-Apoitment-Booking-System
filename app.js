const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const dbConnect = require("./config/db");
const cors = require("cors");
dotenv.config();
const AuthRoutes = require("./routes/Auth.routes");
const DoctorRoutes = require("./routes/Doctor.routes");
const PaymentRoutes = require("./routes/Patment.routes");
const AppoitmentRoutes = require('./routes/apoitment.routes')

app.use(express.json());

app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);


app.use("/auth", AuthRoutes);
app.use("/doctor", DoctorRoutes);
app.use("/Payment", PaymentRoutes);
app.use("/appoitmet", AppoitmentRoutes)

app.use("/", (req, res) => {
  res.json("Server Start Doctor Apoitment System");
});
const PORT = process.env.PORT || 5000;
dbConnect();
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

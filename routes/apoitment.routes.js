const express = require("express");
const router = express.Router();
const ApoitmentControllers = require("../controllers/apoitment.controller");
const authMiddleware = require("../middleware/auth.middleware");

router.post(
  "/apotmentform",
  authMiddleware,
  ApoitmentControllers.ApoitmentForm,
);
router.get(
  "/myappoitment/:patientId",
  authMiddleware,
  ApoitmentControllers.getMyApoitments,
);
router.put(
  "/update/:id",
  authMiddleware,
  ApoitmentControllers.updateAppointmentStatus,
);

router.get(
  "/doctor/:doctorId",
  authMiddleware,
  ApoitmentControllers.getDoctorAppointments ,
);

module.exports = router;

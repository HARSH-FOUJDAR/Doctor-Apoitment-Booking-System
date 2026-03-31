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
  "/allAppointments",
  authMiddleware,
  ApoitmentControllers.getAllapoitments,
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
  "/paytientdetails/:id",
  authMiddleware,
  ApoitmentControllers.getpatientDetails,
);

module.exports = router;

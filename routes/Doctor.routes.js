const express = require("express");
const router = express.Router();
const DoctorControllers = require("../controllers/AddDoctor.controller");
const autMiddleware = require("../middleware/auth.middleware");
const singleUpload = require("../middleware/multer");

router.post(
  "/addDoctor",
  autMiddleware,
  singleUpload,
  DoctorControllers.AddDoctor,
);

router.get("/getDoctor", DoctorControllers.ViewallDoctor);

router.get("/getDoctor/:id", autMiddleware, DoctorControllers.GetDoctorById);

// 4. UPDATE DOCTOR (PUT)
router.put(
  "/updateDoctor/:id",
  autMiddleware,
  singleUpload,
  DoctorControllers.UpdateDoctor,
);

// 5. DELETE DOCTOR (DELETE)
router.delete(
  "/deleteDoctor/:id",
  autMiddleware,
  DoctorControllers.DeleteDoctor,
);

module.exports = router;

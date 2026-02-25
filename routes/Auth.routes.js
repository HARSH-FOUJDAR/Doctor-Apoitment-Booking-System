const express = require("express");
const router = express.Router();
const authcontrollers = require("../controllers/auth.controller");
const authMiddleware = require("../middleware/auth.middleware");

// patient register and login routes
router.post("/register",  authcontrollers.Registerpages);
router.post("/login", authcontrollers.Login);

router.get("/update", authMiddleware, authcontrollers.GetPatient);
router.get("/logout", authMiddleware, authcontrollers.Logout);

module.exports = router;

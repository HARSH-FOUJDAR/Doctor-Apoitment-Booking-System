const express = require("express");
const router = express.Router();
const PaymentControllers = require("../controllers/Payment.controller");
const AuthMiddleware = require("../middleware/auth.middleware");

router.post("/createPayment", AuthMiddleware, PaymentControllers.CreatePayemnt);
router.get("/paymentstatus/:paymentIntentId", AuthMiddleware, PaymentControllers.GetPayemnt);

module.exports = router;

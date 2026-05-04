const express = require("express");
const router = express.Router();
const PaymentControllers = require("../controllers/Payment.controller");
const AuthMiddleware = require("../middleware/auth.middleware");

router.post("/createPayment", PaymentControllers.CreatePayemnt);
router.post("/paymentdetails", PaymentControllers.PaymentDetails);
router.get("/paymentstatus/:paymentIntentId", AuthMiddleware, PaymentControllers.GetPaymentStatus);

module.exports = router;

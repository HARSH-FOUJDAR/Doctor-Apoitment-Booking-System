const express = require("express");
const router = express.Router();
const PaymentControllers = require("../controllers/Payment.controller");
const AuthMiddleware = require("../middleware/auth.middleware");

router.get("/get-Payment", AuthMiddleware, PaymentControllers.getPayment);

module.exports = router;

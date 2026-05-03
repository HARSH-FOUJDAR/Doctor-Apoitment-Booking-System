const Stripe = require("stripe");
const mongoose = require("mongoose");
const paymentModel = require("../models/paymentModel");



const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
exports.CreatePayemnt = async (req, res) => {
  try {
    const { amount, appointmentId, patientName, patientEmail } = req.body;

    console.log(req.body);

    if (!amount || !appointmentId || !patientName || !patientEmail) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Number(amount) * 100,
      currency: "inr",
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        appointmentId,
        patientName,
        patientEmail,
      },
    });

    const newPayment = await paymentModel.create({
      appointmentId: new mongoose.Types.ObjectId(appointmentId),
      patientName,
      patientEmail,
      amount,
      currency: "inr",
      paymentIntentId: paymentIntent.id,
      clientSecret: paymentIntent.client_secret,
      status: paymentIntent.status,
    });

    return res.status(200).json({
      success: true,
      clientSecret: paymentIntent.client_secret,
    });

  } catch (err) {
    console.log("Create Payment Error:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


exports.GetPayemnt = async (req, res) => {
};
const Stripe = require("stripe");
const paymentModel = require("../models/paymentModel");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

exports.CreatePayemnt = async (req, res) => {
  try {
    const { amount, appointmentId, patientName, patientEmail } = req.body;

    if (!amount || !appointmentId || !patientName || !patientEmail) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (amount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Amount must be greater than zero",
      });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100,
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
      appointmentId,
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
      message: "Payment Intent created successfully",
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
      payment: newPayment,
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
  try {
    const { paymentIntentId } = req.params;
    if (!paymentIntentId) {
      return res.status(400).json({
        success: false,
        message: "Payment Intent ID is required",
      });
    }
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    if (!paymentIntent) {
      return res.status(404).json({
        success: false,
        message: "Payment Intent not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Payment Intent retrieved successfully",
      paymentIntent,
    });
  } catch (err) {
    console.log("Get Payment Status Error:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

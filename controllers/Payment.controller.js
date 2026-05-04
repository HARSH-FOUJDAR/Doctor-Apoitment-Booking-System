const Stripe = require("stripe");
const mongoose = require("mongoose");
const paymentModel = require("../models/paymentModel");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

exports.CreatePayemnt = async (req, res) => {
  try {
    const { amount } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency: "inr",
      automatic_payment_methods: {
        enabled: true,
      },
    });
     res.status(200).json({
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

exports.GetPayemnt = async (req, res) => {};

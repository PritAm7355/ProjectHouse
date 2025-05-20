import express from "express";
import crypto from "crypto";
import Razorpay from "razorpay";

const router = express.Router();

// Razorpay instance
const razorpay = new Razorpay({
  key_id: "rzp_test_6ayj8R3LzCrrQd",
  key_secret: "5tDytRiqiIXKLouazdALMdGb",
});

// Create Razorpay order
router.post("/orders", async (req, res) => {
  try {
    const amount = req.body.amount * 100;
    const options = {
      amount,
      currency: "INR",
      receipt: `receipt_order_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    res.status(200).json(order);
  } catch (err) {
    console.error("Order creation error:", err);
    res.status(500).json({ error: "Order creation failed" });
  }
});

// Verify payment
router.post("/verify", (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", razorpay.key_secret)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      return res.status(200).json({ success: true, message: "Payment verified" });
    } else {
      return res.status(400).json({ success: false, message: "Invalid signature" });
    }
  } catch (err) {
    console.error("Verification error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;

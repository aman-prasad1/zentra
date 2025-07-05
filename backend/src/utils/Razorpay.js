import Razorpay from "razorpay";
import crypto from 'crypto';

const instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
})

const createRazorpayOrder = async (amount, receiptId) => {
    try {
        const options = {
            amount: amount * 100, // ₹ -> paise
            currency: "INR",
            receipt: receiptId,
            payment_capture: 1, // auto-capture
        };

        const order = await instance.orders.create(options);

        return {
            success: true,
            orderId: order.id,
            amount: order.amount,
            currency: order.currency,
        };
    } catch (error) {
        return {
            success: false,
            message: error.message,
        };
    }
};

const verifyRazorpayPayment = async (razorpay_order_id, razorpay_payment_id, razorpay_signature) => {
    try {

        const body = `${razorpay_order_id}|${razorpay_payment_id}`;

        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(body)
            .digest("hex");

        if (expectedSignature !== razorpay_signature) {
            return {
                success: false,
                message: "Razorpay signature not matched"
            }
        }

        return {
            success: true,
            message: "Payment verified"
        }

    } catch (error) {
        return {
            success: false,
            message: "Error verifying payment"
        }
    }
}


export {
    createRazorpayOrder,
    verifyRazorpayPayment
}
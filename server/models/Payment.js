import mongoose from "mongoose";

const schema = new mongoose.Schema({
    razorpay_order_id: {
        type: String,
        required: true,
    },
    razorpay_payment_id: {
        type: String,
        required: true,
    },
    razorpay_signature: {
        type: String,
        required: true,
    },
    orderId: {
           type: mongoose.Schema.Types.ObjectId,
           ref: "Order",
         },
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
},{ timestamps: true });

export const Payment = mongoose.model("Payment", schema);
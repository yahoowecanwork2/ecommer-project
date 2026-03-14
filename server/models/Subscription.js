import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
{
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  plan: {
    type: String,
    enum: ["basic", "pro", "enterprise"],
    required: true
  },

  billingCycle: {
    type: String,
    enum: ["monthly", "yearly"],
    required: true
  },

  price: {
    type: Number,
    required: true
  },

  startDate: {
    type: Date,
    default: Date.now
  },

  endDate: {
    type: Date,
    required: true
  },

  trialUsed: {
    type: Boolean,
    default: false
  },

  status: {
    type: String,
    enum: ["active", "expired", "cancelled"],
    default: "active"
  }
},
{ timestamps: true }
);

export default mongoose.model("Subscription", subscriptionSchema);
import { Admin } from "../models/Admin.js";
import Subscription from "../models/Subscription.js";

export const renewSubscriptionService = async (userId, paymentId = null) => {
  console.log("🔁 Renew Subscription Service Called");

  const subscription = await Subscription.findOne({ userId });

  if (!subscription) {
    throw new Error("Subscription not found");
  }

  const admin = await Admin.findById(userId);

  if (!admin) {
    throw new Error("Admin not found");
  }

  console.log("OLD END DATE 👉", subscription.endDate);

  // ✅ FIXED DATE LOGIC (no setMonth bug)
  const current = new Date(subscription.endDate);

  let newEndDate;

  if (subscription.billingCycle === "monthly") {
    newEndDate = new Date(
      current.getFullYear(),
      current.getMonth() + 1,
      current.getDate(),
    );
  }

  if (subscription.billingCycle === "yearly") {
    newEndDate = new Date(
      current.getFullYear() + 1,
      current.getMonth(),
      current.getDate(),
    );
  }

  console.log("NEW END DATE 👉", newEndDate);

  // ✅ EXACT SAME UPDATE BEHAVIOR AS CONTROLLER
  subscription.endDate = newEndDate;
  subscription.status = "active";

  if (paymentId) {
    subscription.paymentId = paymentId;
  }

  await subscription.save();

  // ✅ EXACT SAME (push full document reference)
  admin.previousSubscriptions.push(subscription);

  // ✅ EXACT SAME (assign full object)
  admin.currentSubscription = subscription;

  await admin.save();

  return subscription;
};


export const createSubscriptionService = async()=>{
    
}
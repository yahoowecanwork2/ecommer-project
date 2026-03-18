import React from "react";
import { FaShieldAlt, FaRegCreditCard, FaLock } from "react-icons/fa";
import { adminApi } from "../../apis/auth";

const PaymentPage = ({ user, plan, billingCycle, setShowPayment }) => {
  // ✅ Normalize plan data
  const normalizedCycle = billingCycle.toLowerCase();

  const rawPrice = plan.prices?.[normalizedCycle];

  const selectedPlan = {
    name: plan.plan, // "basic"
    displayName: plan.name, // "Basic"
    price:
      typeof rawPrice === "string"
        ? Number(rawPrice.replace(/,/g, ""))
        : Number(rawPrice || 0),
    cycle: normalizedCycle, // "monthly" | "yearly"
  };

  // ✅ Check BOTH plan + billingCycle
  const isCurrentPlan =
    user?.currentSubscription?.plan === selectedPlan.name &&
    user?.currentSubscription?.billingCycle === selectedPlan.cycle;

  console.log(isCurrentPlan);

  const handleRenewPayment = async () => {
    try {
      // 1️⃣ Create order with FULL metadata
      const order = await adminApi.createOrder({
        amount: selectedPlan.price,
        plan: selectedPlan.name,
        billingCycle: selectedPlan.cycle,
        price: selectedPlan.price,
        userId: user._id,
        type: "renew", // or "renew"
      });
      console.log(order);

      if (!order.success) {
        alert("Failed to create payment order");
        return;
      }

      // 2️⃣ Razorpay Checkout
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY,
        amount: order.order.amount,
        currency: "INR",
        order_id: order.order.id,

        name: "Your Store Platform",
        description: `${selectedPlan.displayName} Plan Subscription`,

        handler: async function (response) {
          try {
            console.log("Payment response:", response);

            // 3️⃣ Verify payment (NO extra data needed)
            const verifyData = await adminApi.verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });
            console.log(verifyData);

            if (verifyData.success) {
              alert("✅ Payment successful! Subscription activated.");
            } else {
              alert("❌ Payment verification failed");
            }
          } catch (err) {
            console.error("VERIFY ERROR 👉", err);
            alert("Verification failed");
          }
        },

        prefill: {
          name: user?.name || "",
          email: user?.email || "",
        },

        theme: {
          color: "#111827",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("PAYMENT ERROR 👉", error);
      alert("Payment failed. Please try again.");
    }
  };

  // ✅ Payment handler (dynamic type)
  const handleCreatePayment = async (type = "create") => {
    try {
      const order = await adminApi.createOrder({
        amount: selectedPlan.price,
        userId: user._id,
        plan: selectedPlan.name,
        billingCycle: selectedPlan.cycle,
        price: selectedPlan.price,
        type, // 🔥 "create" | "renew"
      });

      if (!order.success) {
        alert("Failed to create payment order");
        return;
      }

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY,
        amount: order.order.amount,
        currency: "INR",
        order_id: order.order.id,

        name: "Your Store Platform",
        description: `${selectedPlan.displayName} Plan Subscription`,

        handler: async function (response) {
          try {
            const verifyData = await adminApi.verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            if (verifyData.success) {
              alert("✅ Payment successful!");
            } else {
              alert("❌ Payment verification failed");
            }
          } catch (err) {
            console.error(err);
            alert("Verification failed");
          }
        },

        prefill: {
          name: user?.name || "",
          email: user?.email || "",
        },

        theme: {
          color: "#111827",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error(error);
      alert("Payment failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-start p-6 font-sans">
      <button
        onClick={() => setShowPayment(false)}
        className="flex self-start mb-8 gap-2 text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-gray-900"
      >
        ← Back
      </button>

      {/* 🔥 HEADER */}
      {user?.currentSubscription && isCurrentPlan && (
        <div className="w-full max-w-5xl mb-6 bg-yellow-50 border border-yellow-200 p-4 text-sm text-yellow-800">
          <span className="font-semibold">
            You already have this {selectedPlan.displayName} (
            {selectedPlan.cycle}) plan.
          </span>{" "}
          You can renew it or switch to another plan.
        </div>
      )}

      <div className="max-w-5xl w-full bg-white border border-gray-200 flex flex-col md:flex-row overflow-hidden">
        {/* LEFT */}
        <div className="flex-[1.5] p-10 lg:p-16 border-r border-gray-200">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-8 h-8 bg-gray-900 text-white flex items-center justify-center">
              <FaRegCreditCard size={14} />
            </div>

            <h1 className="text-sm font-bold uppercase tracking-[0.3em] text-gray-900">
              Secure Checkout
            </h1>
          </div>

          <p className="text-sm text-gray-600 mb-8">
            Pay securely using Razorpay.
          </p>

          {/* 🔥 BUTTON */}
          <button
            onClick={
              isCurrentPlan === "renew"
                ? () => handleRenewPayment()
                : () =>{ console.log(isCurrentPlan);
                 handleCreatePayment()}
            }
            className={`w-full py-4 text-[11px] font-bold uppercase tracking-[0.2em] ${
              isCurrentPlan
                ? "bg-yellow-400 text-gray-900 hover:bg-yellow-300"
                : "bg-gray-900 text-white hover:bg-black"
            }`}
          >
            {isCurrentPlan
              ? `Renew ${selectedPlan.cycle} Plan ₹${selectedPlan.price}`
              : `Pay ₹${selectedPlan.price}`}
          </button>

          <div className="mt-10 flex items-center gap-3 text-gray-500 text-xs">
            <FaLock />
            <span>Secure payment</span>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex-1 bg-gray-50 p-10 lg:p-16">
          <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 mb-8">
            Order Summary
          </h2>

          <div className="space-y-6">
            <div className="flex justify-between items-end pb-6 border-b border-gray-200">
              <div>
                <p className="text-lg font-bold text-gray-900">
                  {selectedPlan.displayName} Plan
                </p>
                <p className="text-xs text-gray-500">{selectedPlan.cycle}</p>
              </div>

              <p className="text-lg font-medium text-gray-900">
                ₹{selectedPlan.price}
              </p>
            </div>

            <div className="flex justify-between pt-6 border-t border-gray-200">
              <span className="text-sm font-bold uppercase tracking-widest">
                Total
              </span>
              <span className="text-xl font-bold text-gray-900">
                ₹{selectedPlan.price}
              </span>
            </div>
          </div>

          <div className="mt-12 p-4 border border-gray-200 bg-white flex gap-4">
            <FaShieldAlt className="text-emerald-600 mt-1" size={18} />
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest">
                Secure Transaction
              </p>
              <p className="text-[10px] text-gray-500 mt-1">
                256-bit SSL encryption
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;

import React from "react";
import { FaShieldAlt, FaRegCreditCard, FaLock } from "react-icons/fa";
import { adminApi } from "../../apis/auth";

const PaymentPage = ({ user, billingCycle, setShowPayment }) => {
  const selectedPlan = {
    name: "Professional",
    price: billingCycle === "monthly" ? 1499 : 14990,
    cycle: billingCycle === "monthly" ? "Monthly" : "Yearly",
  };

  const handlePayment = async () => {
    try {
      // 1️⃣ Create order from backend
      const order = await adminApi.createOrder({
        amount: selectedPlan.price,
      });

      if (!order.success) {
        alert("Failed to create payment order");
        return;
      }

      console.log(order);

      // 2️⃣ Razorpay Checkout options
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY,
        amount: order.order.amount,
        currency: "INR",
        order_id: order.order.id,

        name: "Your Store Platform",
        description: `${selectedPlan.name} Plan Subscription`,

        handler: async function (response) {
          // 3️⃣ Verify payment using same API layer
          const verifyData = await adminApi.verifyPayment({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            userId: user._id,
            plan: selectedPlan.name,
            billingCycle: billingCycle,
          });

          if (verifyData.success) {
            console.log(verifyData);
            alert("Payment successful! Subscription activated.");
            // window.location.href = "/dashboard";
          } else {
            alert("Payment verification failed");
          }
        },

        prefill: {
          name: user?.name || "",
          email: user?.email || "",
        },

        notes: {
          plan: selectedPlan.name,
          billingCycle: billingCycle,
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
        className="flex self-start mb-8 gap-2 text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-gray-900 transition-colors"
      >
        ← Back
      </button>
      <div className="max-w-5xl w-full bg-white border border-gray-200 flex flex-col md:flex-row overflow-hidden">
        {/* LEFT SIDE - PAYMENT */}
        <div className="flex-[1.5] p-10 lg:p-16 border-r border-gray-200">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-8 h-8 bg-gray-900 text-white flex items-center justify-center">
              <FaRegCreditCard size={14} />
            </div>

            <h1 className="text-sm font-bold uppercase tracking-[0.3em] text-gray-900">
              Secure Checkout
            </h1>
          </div>

          <p className="text-sm text-gray-600 leading-relaxed mb-8">
            Pay securely using Razorpay. Supports UPI, credit cards, debit
            cards, netbanking and wallets.
          </p>

          <button
            onClick={handlePayment}
            className="w-full bg-gray-900 text-white py-4 text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-black transition-all"
          >
            Pay ₹{selectedPlan.price}
          </button>

          {/* Payment Methods */}
          <div className="mt-8 flex items-center justify-center gap-6 opacity-40 grayscale">
            <span className="text-[10px] font-bold tracking-widest">VISA</span>
            <span className="text-[10px] font-bold tracking-widest">
              MASTERCARD
            </span>
            <span className="text-[10px] font-bold tracking-widest">UPI</span>
            <span className="text-[10px] font-bold tracking-widest">RUPAY</span>
          </div>

          {/* Security Info */}
          <div className="mt-10 flex items-center gap-3 text-gray-500 text-xs">
            <FaLock />
            <span>Payments are encrypted and processed securely</span>
          </div>
        </div>

        {/* RIGHT SIDE - ORDER SUMMARY */}
        <div className="flex-1 bg-gray-50 p-10 lg:p-16">
          <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 mb-8">
            Order Summary
          </h2>

          <div className="space-y-6">
            <div className="flex justify-between items-end pb-6 border-b border-gray-200">
              <div>
                <p className="text-lg font-bold text-gray-900">
                  {selectedPlan.name} Plan
                </p>
                <p className="text-xs text-gray-500">
                  {selectedPlan.cycle} Billing
                </p>
              </div>

              <p className="text-lg font-medium text-gray-900">
                ₹{selectedPlan.price}
              </p>
            </div>

            <div className="space-y-3 pt-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Subtotal</span>
                <span className="text-gray-900">₹{selectedPlan.price}</span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Taxes</span>
                <span className="text-gray-900">₹0.00</span>
              </div>

              <div className="flex justify-between pt-6 border-t border-gray-200">
                <span className="text-sm font-bold uppercase tracking-widest">
                  Total Due
                </span>
                <span className="text-xl font-bold text-gray-900">
                  ₹{selectedPlan.price}
                </span>
              </div>
            </div>
          </div>

          {/* SECURITY BADGE */}
          <div className="mt-12 p-4 border border-gray-200 bg-white flex gap-4">
            <FaShieldAlt className="text-emerald-600 mt-1" size={18} />

            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-900">
                Secure Transaction
              </p>

              <p className="text-[10px] text-gray-500 leading-relaxed mt-1">
                Your payment is protected with industry-standard 256-bit SSL
                encryption.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;

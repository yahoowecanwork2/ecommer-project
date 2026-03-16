import React, { useEffect, useState } from "react";
import Layout from "../../componets/common/Layout";
import {
  MdFlashOn,
  MdStars,
  MdBusinessCenter,
  MdInventory,
  MdAllInbox,
  MdWarningAmber,
  MdShoppingCart,
  MdEmail,
  MdHeadsetMic,
  MdSupportAgent,
  MdHistory,
  MdInfo,
} from "react-icons/md";
import { FaRupeeSign, FaArrowRight, FaClock, FaCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { adminApi } from "../../apis/auth";
import { useSelector } from "react-redux";
import { BsCart } from "react-icons/bs";
import PaymentPage from "./PaymentPage";

const Plans = () => {
  const [billingCycle, setBillingCycle] = useState("monthly");
  const navigate = useNavigate();
  const [showPayments, setShowPayments] = useState(false);
  const [subscription, setSubscription] = useState({});

  const { user } = useSelector((state) => state.user);
  console.log(user);

  const verifySubscription = async () => {
    try {
      const res = await adminApi.verifySubsciption(user._id);
      console.log(res);
      setSubscription(res?.subscription);
    } catch (error) {
    } finally {
    }
  };

  useEffect(() => {
    verifySubscription();
  }, []);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // Hardcoded subscription data for the carousel
  const subscriptionStatus = {
    daysLeft: 12,
    planName: "Starter",
    expiryDate: "March 20, 2026",
  };

  const getDaysLeft = (endDate) => {
    const today = new Date();
    const expiry = new Date(endDate);

    const diffTime = expiry - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays > 0 ? diffDays : 0;
  };

  const planTiers = [
    {
      id: 1,
      name: "Basic",
      plan: "basic",
      icon: <MdFlashOn />,
      prices: { monthly: "1,499", yearly: "13,499" },
      originalPrices: { monthly: "1,999", yearly: "17,988" },
      savings: { monthly: "25%", yearly: "25%" },
      listings: "25",
      description: "Essential tools for small stores getting started.",
      features: [
        { text: "Up to 25 Product Listings", icon: <MdInventory /> },
        { text: "Low Stock Email Alerts", icon: <MdWarningAmber /> },
        { text: "Email Support", icon: <MdEmail /> },
      ],
      color: "border-gray-200",
    },
    {
      id: 2,
      name: "Pro",
      plan: "pro",
      icon: <MdStars />,
      prices: { monthly: "3,499", yearly: "29,999" },
      originalPrices: { monthly: "4,999", yearly: "44,988" },
      savings: { monthly: "30%", yearly: "33%" },
      listings: "100",
      description: "Perfect for growing stores with more products.",
      features: [
        { text: "Up to 100 Product Listings", icon: <MdInventory /> },
        { text: "Low Stock Email Alerts", icon: <MdWarningAmber /> },
        { text: "New Order Email Alerts", icon: <MdShoppingCart /> },
        { text: "Priority Support", icon: <MdHeadsetMic /> },
      ],
      color: "border-gray-900 ring-1 ring-gray-900",
      recommended: true,
    },
    {
      id: 3,
      name: "Enterprise",
      plan: "enterprise",
      icon: <MdBusinessCenter />,
      prices: { monthly: "8,999", yearly: "79,999" },
      originalPrices: { monthly: "12,999", yearly: "119,988" },
      savings: { monthly: "35%", yearly: "40%" },
      listings: "Unlimited",
      description: "Unlimited growth for large stores and businesses.",
      features: [
        { text: "Unlimited Product Listings", icon: <MdAllInbox /> },
        { text: "Low Stock Email Alerts", icon: <MdWarningAmber /> },
        { text: "New Order Email Alerts", icon: <MdShoppingCart /> },
        { text: "24/7 Dedicated Support", icon: <MdSupportAgent /> },
      ],
      color: "border-gray-200",
    },
  ];

  return (
    <Layout>
      <div className="space-y-8">
        {/* SUBSCRIPTION BANNER */}
        <div className="relative overflow-hidden bg-gray-900 rounded-sm p-4 text-white border border-gray-800 font-google">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <MdHistory size={120} />
          </div>

          <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="bg-white/10 p-3 rounded-sm border border-white/20 animate-pulse">
                <FaClock className="text-2xl text-yellow-400" />
              </div>

              <div>
                <h2 className="text-base font-normal">Subscription Expiring</h2>

                <p className="text-[11px] text-gray-400 font-medium uppercase mt-1">
                  Your{" "}
                  <span className="text-white font-bold">
                    {user?.currentSubscription?.plan}
                  </span>{" "}
                  plan ends in{" "}
                  <span className="text-yellow-400 font-bold mx-1">
                    {getDaysLeft(user?.currentSubscription?.endDate)} Days
                  </span>
                  ({formatDate(user?.currentSubscription?.endDate)})
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <button className="px-6 py-2 bg-yellow-400 text-gray-900 text-[12px] font-semibold rounded-xs hover:bg-yellow-300 transition-all shadow-sm">
                Renew Now
              </button>

              <button
                onClick={() => navigate("/history")}
                className="px-6 py-2 bg-white/5 border border-white/10 text-white text-[12px] font-medium rounded-xs hover:bg-white/10 transition-all"
              >
                View Billing History
              </button>
            </div>
          </div>
        </div>

        {/* HEADER */}
        <div className="text-center space-y-8 pt-6">
          <div className="space-y-3">
            <p className="text-[14px] font-semibold text-gray-400 uppercase">
              Simple Pricing
            </p>

            <h1 className="text-4xl text-gray-900 tracking-tight inline-flex gap-x-4">
              Pick a plan that fits your store <BsCart />
            </h1>

            <p className="text-base text-gray-500 max-w-md mx-auto">
              Start small and upgrade anytime as your business grows.
            </p>
          </div>

          {/* BILLING TOGGLE */}
          <div className="inline-flex bg-gray-50 p-1.5 rounded-sm">
            {["monthly", "yearly"].map((cycle) => (
              <button
                key={cycle}
                onClick={() => setBillingCycle(cycle)}
                className={`px-7 py-2 text-[11px] font-semibold uppercase tracking-wider rounded-sm transition-all duration-200 ${
                  billingCycle === cycle
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-00 hover:text-gray-700"
                }`}
              >
                {cycle}
              </button>
            ))}
          </div>
        </div>

        {/* PRICING CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 max-w-6xl mx-auto border-t border-l border-gray-200">
          {planTiers.map((plan) => (
            <div
              key={plan.id}
              className={`relative p-10 flex flex-col border-r border-b border-gray-200 bg-white ${
                plan.recommended ? "bg-gray-50/30" : ""
              }`}
            >
              {/* Subtle Identifier */}
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-sm font-bold uppercase tracking-widest text-gray-900">
                  {plan.name}
                </h3>
                {plan.recommended && (
                  <span className="text-[14px] bg-blue-600 text-white px-2 py-0.5">
                    Recommended
                  </span>
                )}
              </div>

              {/* Pricing: Direct and Bold */}
              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  {/* NEW PRICE */}
                  <span className="text-4xl font-medium tracking-tight text-gray-900">
                    ₹{plan.prices[billingCycle]}
                  </span>

                  {/* CUT THROUGH PRICE (Old Price) */}
                  {plan.originalPrices?.[billingCycle] && (
                    <span className="text-lg text-gray-400 line-through decoration-gray-300 font-light">
                      ₹{plan.originalPrices[billingCycle]}
                    </span>
                  )}

                  {/* BILLING LABEL */}
                  <span className="text-sm text-gray-500 font-medium ml-1">
                    /{billingCycle === "monthly" ? "mo" : "yr"}
                  </span>
                </div>

                {/* Savings Detail */}
                <div className="mt-2 h-4">
                  {plan.savings?.[billingCycle] && (
                    <p className="text-[11px] font-bold uppercase tracking-tight text-emerald-600">
                      You save {plan.savings[billingCycle]}
                    </p>
                  )}
                </div>
              </div>

              <p className="text-sm text-gray-600 mb-8 leading-relaxed">
                {plan.description}
              </p>

              {/* Features: Clean and Functional */}
              <div className="flex-1 space-y-4 mb-10">
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100 pb-2">
                  Includes:
                </p>
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <span className="text-green-600 mt-0.5">
                      <FaCheck size={12} />
                    </span>
                    <span className="text-sm text-gray-700">
                      {feature.text}
                    </span>
                  </div>
                ))}
              </div>

              {/* Action: High Contrast */}
              <button
                onClick={() =>
                  // handleSubscribe({ plan: plan.plan, billingCycle })
                  setShowPayments(true)
                }
                className={`w-full py-3.5 text-xs font-bold uppercase tracking-widest transition-colors ${
                  plan.recommended
                    ? "bg-gray-900 text-white hover:bg-black"
                    : "bg-white border border-gray-900 text-gray-900 hover:bg-gray-50"
                }`}
              >
                Select {plan.name} Plan
              </button>
            </div>
          ))}
        </div>

        {/* FOOTER NOTE */}
        {/* <div className="max-w-4xl mx-auto bg-gray-50 p-6 rounded-sm border border-gray-100 flex items-center gap-4">
          <MdInfo className="text-gray-400 text-xl flex-shrink-0" />

          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest leading-relaxed">
            Note: All plans are billed in advance. Listings exceeding your plan
            limit will be hidden until an upgrade is active.
          </p>
        </div> */}
      </div>
      {showPayments ? (
        <div className="fixed inset-0 w-full h-full bg-white z-50 overflow-y-auto">
          <PaymentPage user={user} setShowPayment={setShowPayments} />
        </div>
      ) : null}
    </Layout>
  );
};

export default Plans;

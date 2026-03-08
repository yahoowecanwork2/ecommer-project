import React, { useState } from "react";
import Layout from "../../componets/common/Layout";
import { 
  MdCheckCircle, 
  MdStars, 
  MdFlashOn, 
  MdBusinessCenter,
  MdBarChart,
  MdSupportAgent,
  MdCloudUpload,
  MdInfo,
  MdHistory
} from "react-icons/md";
import { FaRupeeSign, FaArrowRight, FaClock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Plans = () => {
  const [billingCycle, setBillingCycle] = useState("annually");
  const navigate = useNavigate();
  
  // Hardcoded subscription data for the carousel
  const subscriptionStatus = {
    daysLeft: 12,
    planName: "Starter",
    expiryDate: "March 20, 2026"
  };

  const planTiers = [
    {
      id: 1,
      name: "Starter",
      icon: <MdFlashOn />,
      prices: { monthly: "1,499", "half-yearly": "7,499", annually: "13,499" },
      savings: { "half-yearly": "15% Off", annually: "25% Off" },
      listings: "100",
      description: "Essential tools for stores managing a curated collection.",
      features: [
        { text: "100 Product Listings", icon: <MdCloudUpload /> },
        { text: "Basic Sales Reports", icon: <MdBarChart /> },
        { text: "Email Support", icon: <MdSupportAgent /> },
      ],
      color: "border-gray-200",
    },
    {
      id: 2,
      name: "Professional",
      icon: <MdStars />,
      prices: { monthly: "3,499", "half-yearly": "16,999", annually: "29,999" },
      savings: { "half-yearly": "20% Off", annually: "30% Off" },
      listings: "1,000",
      description: "Advanced automation for high-growth retail operations.",
      features: [
        { text: "1,000 Product Listings", icon: <MdCloudUpload /> },
        { text: "Advanced Analytics", icon: <MdBarChart /> },
        { text: "Priority Support", icon: <MdSupportAgent /> },
      ],
      color: "border-gray-900 ring-1 ring-gray-900",
      recommended: true
    },
    {
      id: 3,
      name: "Elite",
      icon: <MdBusinessCenter />,
      prices: { monthly: "8,999", "half-yearly": "44,999", annually: "79,999" },
      savings: { "half-yearly": "15% Off", annually: "25% Off" },
      listings: "Unlimited",
      description: "Scale without limits. Full enterprise feature suite.",
      features: [
        { text: "Unlimited Listings", icon: <MdCloudUpload /> },
        { text: "Custom BI Dashboard", icon: <MdBarChart /> },
        { text: "24/7 Dedicated Support", icon: <MdSupportAgent /> },
      ],
      color: "border-gray-200",
    }
  ];

  return (
    <Layout>
      <div className="space-y-8">
        
        {/* SUBSCRIPTION CAROUSEL / BANNER */}
        <div className="relative overflow-hidden bg-gray-900 rounded-sm p-6 text-white border border-gray-800">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <MdHistory size={120} />
          </div>
          
          <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="bg-white/10 p-3 rounded-sm border border-white/20 animate-pulse">
                <FaClock className="text-2xl text-yellow-400" />
              </div>
              <div>
                <h2 className="text-sm font-black uppercase tracking-widest">Urgent: Subscription Expiring</h2>
                <p className="text-[11px] text-gray-400 font-medium uppercase tracking-tight mt-1">
                  Your <span className="text-white font-bold">{subscriptionStatus.planName} Plan</span> ends in 
                  <span className="text-yellow-400 font-bold mx-1">{subscriptionStatus.daysLeft} Days</span> 
                  ({subscriptionStatus.expiryDate})
                </p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <button className="px-6 py-2 bg-yellow-400 text-gray-900 text-[10px] font-black uppercase tracking-widest rounded-sm hover:bg-yellow-300 transition-all shadow-sm">
                Renew Now
              </button>
              <button onClick={()=>navigate('/history')} className="px-6 py-2 bg-white/5 border border-white/10 text-white text-[10px] font-bold uppercase tracking-widest rounded-sm hover:bg-white/10 transition-all">
                View Billing History
              </button>
            </div>
          </div>
        </div>

        {/* HEADER & TOGGLE */}
        <div className="text-center space-y-6 pt-4">
          <div className="space-y-2">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em]">Billing Tier Selection</p>
            <h1 className="text-3xl font-black text-gray-900 tracking-tight uppercase">Upgrade Your Experience</h1>
          </div>

          <div className="inline-flex bg-gray-100 p-1 rounded-sm border border-gray-200">
            {["monthly", "half-yearly", "annually"].map((cycle) => (
              <button
                key={cycle}
                onClick={() => setBillingCycle(cycle)}
                className={`px-6 py-2 text-[10px] font-bold uppercase tracking-widest transition-all rounded-sm ${
                  billingCycle === cycle ? "bg-white text-gray-900 shadow-sm" : "text-gray-400 hover:text-gray-600"
                }`}
              >
                {cycle.replace("-", " ")}
              </button>
            ))}
          </div>
        </div>

        {/* PRICING CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
          {planTiers.map((plan) => (
            <div key={plan.id} className={`relative bg-white border ${plan.color} rounded-sm p-8 flex flex-col transition-all duration-500 hover:shadow-md`}>
              {plan.recommended && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[9px] font-bold uppercase tracking-widest px-3 py-1 rounded-sm">
                  Recommended Tier
                </div>
              )}

              <div className="flex items-center justify-between mb-8">
                <div className="text-2xl text-gray-900">{plan.icon}</div>
                <div className="text-right border-l border-gray-100 pl-4">
                  <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1">Stock Cap</p>
                  <p className="text-sm font-black text-gray-900 uppercase tracking-tighter">
                    {plan.listings} Listings
                  </p>
                </div>
              </div>

              <div className="mb-2 flex items-baseline gap-1">
                <span className="text-sm font-bold text-gray-400"><FaRupeeSign /></span>
                <span className="text-4xl font-black text-gray-900 transition-all duration-300">
                  {plan.prices[billingCycle]}
                </span>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">/ Cycle</span>
              </div>
              
              <div className="h-6 mb-6">
                {plan.savings && plan.savings[billingCycle] && (
                  <span className="text-[9px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-sm uppercase tracking-widest">
                    {plan.savings[billingCycle]} Bundle Saving
                  </span>
                )}
              </div>

              <div className="space-y-4 mb-10 flex-1 border-t border-gray-50 pt-6">
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3 group">
                    <span className="text-gray-300 group-hover:text-gray-900 transition-colors">{feature.icon}</span>
                    <span className="text-xs font-bold text-gray-700 tracking-tight">{feature.text}</span>
                  </div>
                ))}
              </div>

              <button className={`w-full py-3 rounded-sm text-[10px] font-bold uppercase tracking-[0.2em] border transition-all flex items-center justify-center gap-2 ${
                plan.recommended ? "bg-gray-900 text-white" : "bg-white text-gray-900 border-gray-200 hover:bg-gray-50"
              }`}>
                Activate Tier <FaArrowRight size={10} />
              </button>
            </div>
          ))}
        </div>

        {/* FOOTER CAPABILITY */}
        <div className="max-w-4xl mx-auto bg-gray-50 p-6 rounded-sm border border-gray-100 flex items-center gap-4">
          <MdInfo className="text-gray-400 text-xl flex-shrink-0" />
          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest leading-relaxed">
            Note: All plans are billed in advance. Listings exceeding your plan limit will be hidden until an upgrade is active.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Plans;
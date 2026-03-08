import React from "react";
import Layout from "../../componets/common/Layout";
import { 
  MdReceipt, 
  MdPayment, 
  MdDownload, 
  MdCreditCard, 
  MdOutlineAutoDelete,
  MdCheckCircle 
} from "react-icons/md";
import { FaRegFilePdf, FaCreditCard } from "react-icons/fa";

const Billing = () => {
  // Hardcoded Invoice History
  const invoices = [
    { id: "INV-2026-001", date: "01 Mar 2026", plan: "Professional (Annual)", amount: "29,999", status: "Paid" },
    { id: "INV-2025-012", date: "01 Feb 2026", plan: "Professional (Monthly)", amount: "3,499", status: "Paid" },
    { id: "INV-2025-011", date: "01 Jan 2026", plan: "Starter (Monthly)", amount: "1,499", status: "Paid" },
  ];

  return (
    <Layout>
      <div className="space-y-6">
        
        {/* HEADER */}
        <div className="flex justify-between items-end border-b border-gray-100 pb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900 tracking-tight">Billing & Invoices</h2>
            <p className="text-[11px] text-gray-500 font-medium uppercase tracking-widest mt-1">Manage your subscriptions and tax documents</p>
          </div>
          <div className="bg-green-50 text-green-700 px-3 py-1 rounded-sm border border-green-100 flex items-center gap-2">
            <MdCheckCircle size={14} />
            <span className="text-[10px] font-black uppercase tracking-widest">Account in Good Standing</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">


          {/* RIGHT: INVOICE TABLE */}
          <div className="lg:col-span-3 space-y-4">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Billing History</p>
            <div className="bg-white border border-gray-200 rounded-sm overflow-hidden shadow-sm">
              <table className="w-full text-left">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Invoice</th>
                    <th className="px-4 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Billing Date</th>
                    <th className="px-4 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Plan</th>
                    <th className="px-4 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-right">Amount</th>
                    <th className="px-4 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {invoices.map((inv) => (
                    <tr key={inv.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-4 text-[11px] font-black text-gray-900">{inv.id}</td>
                      <td className="px-4 py-4 text-[11px] text-gray-500 font-medium uppercase tracking-tighter">{inv.date}</td>
                      <td className="px-4 py-4">
                        <span className="text-[10px] font-bold text-gray-700 uppercase">{inv.plan}</span>
                      </td>
                      <td className="px-4 py-4 text-[11px] font-black text-gray-900 text-right">₹{inv.amount}</td>
                      <td className="px-4 py-4 text-center">
                        <button className="p-2 text-gray-400 hover:text-red-600 transition-colors group">
                          <FaRegFilePdf size={16} title="Download PDF" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="bg-gray-50 p-3 border-t border-gray-100 text-center">
                <button className="text-[10px] font-black text-gray-400 uppercase tracking-widest hover:text-gray-900 transition-colors">
                  Load Older Invoices
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* GST SECTION */}
        <div className="bg-white border border-gray-200 rounded-sm p-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="bg-gray-100 p-3 rounded-sm"><MdReceipt className="text-gray-900" /></div>
            <div>
              <p className="text-[11px] font-black uppercase text-gray-900">Tax Information (GST)</p>
              <p className="text-[10px] text-gray-400 font-bold uppercase mt-0.5 tracking-tight">GSTIN: 27AAAAA0000A1Z5 • Business Name: Your Store Pvt Ltd</p>
            </div>
          </div>
          <button className="px-4 py-2 border border-gray-200 text-[10px] font-black uppercase tracking-widest hover:bg-gray-50 transition-all rounded-sm">
            Update Tax Details
          </button>
        </div>

      </div>
    </Layout>
  );
};

export default Billing;
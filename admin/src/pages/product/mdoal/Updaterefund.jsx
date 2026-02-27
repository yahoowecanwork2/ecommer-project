import React, { useState } from "react";
import { productApi } from "../../../apis/product";
import { FaTimes, FaSave } from "react-icons/fa";

const Updaterefund = ({ product, setOpenRefund, refresh }) => {
  const [refund, setRefund] = useState(product.refund || 0);
  const [refundReason, setRefundReason] = useState(product.refundReason || "");
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    try {
      setLoading(true);
      await productApi.updateRefund(product._id, {
        refund,
        refundReason,
      });
      refresh();
      setOpenRefund(false);
    } catch (err) {
      console.log(err);
      alert("Failed to update refund");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-purple-600">Update Refund</h2>
          <button onClick={() => setOpenRefund(false)}>
            <FaTimes />
          </button>
        </div>

        {/* Fields */}
        <div className="space-y-4">
          <div>
            <label className="text-sm font-semibold">Refund %</label>
            <input
              type="number"
              value={refund}
              onChange={(e) => setRefund(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 outline-none"
            />
          </div>

          <div>
            <label className="text-sm font-semibold">Refund Reason</label>
            <textarea
              value={refundReason}
              onChange={(e) => setRefundReason(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 h-24 resize-none focus:ring-2 focus:ring-purple-500 outline-none"
              placeholder="Enter refund reason"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={() => setOpenRefund(false)}
            className="px-4 py-2 rounded-lg border"
          >
            Cancel
          </button>

          <button
            onClick={handleUpdate}
            disabled={loading}
            className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
          >
            <FaSave />
            {loading ? "Updating..." : "Update"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Updaterefund;

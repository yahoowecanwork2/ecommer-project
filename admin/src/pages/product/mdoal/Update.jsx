import React, { useState } from "react";
import { productApi } from "../../../apis/product";
import { FaTimes, FaSave } from "react-icons/fa";

const Update = ({ product, setOpenStock, refresh }) => {
  const [stock, setStock] = useState(product?.stock);
  const [available, setAvailable] = useState(product?.available);
  const [insale, setInsale] = useState(product?.insale);
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    try {
      setLoading(true);
      await productApi.updateStock(product._id, {
        stock,
        available,
        insale,
      });
      refresh();
      setOpenStock(false);
    } catch (err) {
      console.log(err);
      alert("Failed to update stock");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-blue-600">
            Update Product Stock
          </h2>
          <button onClick={() => setOpenStock(false)}>
            <FaTimes />
          </button>
        </div>

        {/* Fields */}
        <div className="space-y-4">
          <div>
            <label className="text-sm font-semibold">Stock</label>
            <input
              type="number"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="text-sm font-semibold">Available</label>
            <select
              value={available}
              onChange={(e) => setAvailable(e.target.value)}
              className="w-full border rounded-lg px-3 py-2"
            >
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-semibold">In Sale</label>
            <select
              value={insale}
              onChange={(e) => setInsale(e.target.value)}
              className="w-full border rounded-lg px-3 py-2"
            >
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={() => setOpenStock(false)}
            className="px-4 py-2 rounded-lg border"
          >
            Cancel
          </button>

          <button
            onClick={handleUpdate}
            disabled={loading}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            <FaSave />
            {loading ? "Updating..." : "Update"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Update;

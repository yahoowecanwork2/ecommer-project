import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { productApi } from "../../../apis/product";

const Updatefields = ({ product, setOpenEdit, refresh }) => {
  const [form, setForm] = useState({
    name: product.name,
    description: product.description,
    category: product.category.name,
    keywords: product.keywords,
    discount: product.discount,
    price: product.price,
    remark: product.remark || "",
    averageRating: product.averageRating || "",
  });
  console.log("product-detail", product);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      const res = await productApi.updateFields(product._id, form);
      if (res.success) {
        refresh();
        setOpenEdit(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-2xl border border-gray-200 rounded-sm shadow-2xl relative overflow-hidden animate-in fade-in zoom-in duration-200">
        {/* MODAL HEADER */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100 bg-gray-50/50">
          <div>
            <h3 className="text-sm font-black text-gray-900 uppercase tracking-[0.2em]">
              Modify Inventory
            </h3>
            <p className="text-[10px] text-blue-600 font-bold uppercase tracking-widest mt-0.5">
              Editing SKU: {form._id?.slice(-6).toUpperCase() || "N/A"}
            </p>
          </div>
          <button
            onClick={() => setOpenEdit(false)}
            className="text-gray-400 hover:text-red-600 transition-colors p-1"
          >
            <FaTimes size={16} />
          </button>
        </div>

        {/* FORM BODY */}
        <div className="p-6 space-y-5 max-h-[80vh] overflow-y-auto custom-scrollbar">
          {/* Name & Keywords */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                Product Name
              </label>
              <input
                className="w-full border border-gray-200 p-2.5 rounded-sm text-xs font-bold bg-gray-50/30 focus:border-gray-900 transition-all outline-none"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Name"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                Search Keywords
              </label>
              <input
                className="w-full border border-gray-200 p-2.5 rounded-sm text-xs font-medium bg-gray-50/30 focus:border-gray-900 transition-all outline-none"
                name="keywords"
                value={form.keywords}
                onChange={handleChange}
                placeholder="e.g. wireless, bluetooth"
              />
            </div>
          </div>

          {/* Price, Discount & Rating */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                Base Price (₹)
              </label>
              <input
                className="w-full border border-gray-200 p-2.5 rounded-sm text-xs font-black bg-gray-50/30 focus:border-gray-900 transition-all outline-none"
                name="price"
                value={form.price}
                onChange={handleChange}
                placeholder="Price"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                Discount %
              </label>
              <input
                className="w-full border border-gray-200 p-2.5 rounded-sm text-xs font-black bg-gray-50/30 focus:border-green-600 transition-all outline-none text-green-600"
                name="discount"
                value={form.discount}
                onChange={handleChange}
                placeholder="Discount"
              />
            </div>
            <div className="space-y-1 col-span-2 md:col-span-1">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                Global Rating
              </label>
              <input
                className="w-full border border-gray-200 p-2.5 rounded-sm text-xs font-black bg-gray-50/30 focus:border-yellow-500 transition-all outline-none"
                name="averageRating"
                value={form.averageRating}
                onChange={handleChange}
                placeholder="Rating (1-5)"
              />
            </div>
          </div>

          {/* Category */}
          <div className="space-y-1">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
              Classification ID
            </label>
            <input
              className="w-full border border-gray-200 p-2.5 rounded-sm text-xs font-mono bg-gray-50/30 focus:border-gray-900 transition-all outline-none"
              name="category"
              value={form.category}
              onChange={handleChange}
              placeholder="Category ID"
            />
          </div>

          {/* Description */}
          <div className="space-y-1">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
              Public Description
            </label>
            <textarea
              className="w-full border border-gray-200 p-2.5 rounded-sm text-xs font-medium bg-gray-50/30 focus:border-gray-900 transition-all outline-none"
              name="description"
              rows="3"
              value={form.description}
              onChange={handleChange}
              placeholder="Description"
            />
          </div>

          {/* Admin Remark */}
          <div className="space-y-1">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
              Internal Admin Remark
            </label>
            <input
              className="w-full border border-gray-200 p-2.5 rounded-sm text-[11px] italic font-medium bg-yellow-50/50 border-yellow-100 focus:border-yellow-400 transition-all outline-none"
              name="remark"
              value={form.remark}
              onChange={handleChange}
              placeholder="e.g. Needs restock soon"
            />
          </div>

          {/* FOOTER ACTIONS */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
            <button
              onClick={() => setOpenEdit(false)}
              className="px-6 py-2.5 text-[10px] font-bold text-gray-400 uppercase tracking-widest hover:text-gray-900 transition-colors"
            >
              Discard
            </button>
            <button
              onClick={handleUpdate}
              className="px-10 py-2.5 bg-gray-900 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-sm hover:bg-black transition-all shadow-lg active:scale-95"
            >
              Update System Records
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Updatefields;

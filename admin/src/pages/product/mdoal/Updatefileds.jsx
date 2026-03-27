import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { productApi } from "../../../apis/product";

const Updatefields = ({ product, setOpenEdit, refresh }) => {
  const [form, setForm] = useState({
    name: product.name,
    description: product.description,
    category: product.category._id,
    categoryName: product.category.name,
    keywords: product.keywords,
    discount: product.discount,
    remark: product.remark || "",
    averageRating: product.averageRating || "",
    variants: product.variants || [], // ✅ IMPORTANT
  });

  // 🔥 Handle basic fields
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔥 Handle variant change
  const handleVariantChange = (index, field, value) => {
    const updatedVariants = [...form.variants];
    updatedVariants[index][field] = value;

    setForm({ ...form, variants: updatedVariants });
  };

  // 🔥 Add new variant
  const addVariant = () => {
    setForm({
      ...form,
      variants: [...form.variants, { size: "M", price: "", stock: "" }],
    });
  };

  // 🔥 Remove variant
  const removeVariant = (index) => {
    const updatedVariants = form.variants.filter((_, i) => i !== index);
    setForm({ ...form, variants: updatedVariants });
  };

  // 🔥 Submit
  const handleUpdate = async () => {
    try {
      const payload = {
        ...form,
        variants: JSON.stringify(form.variants), // ✅ backend needs string
      };

      const res = await productApi.updateFields(product._id, payload);

      if (res.success) {
        refresh();
        setOpenEdit(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
   <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
  <div className="bg-white w-full max-w-3xl overflow-hidden flex flex-col max-h-[90vh]">
    
    {/* HEADER - Sticky & Clean */}
    <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-white sticky top-0 z-10">
      <div>
        <h2 className="font-bold text-xl text-gray-800">Update Product</h2>
        <p className="text-xs text-gray-400">Modify product details and inventory variants</p>
      </div>
      <button 
        onClick={() => setOpenEdit(false)}
        className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
      >
        <FaTimes size={18} />
      </button>
    </div>

    {/* SCROLLABLE BODY */}
    <div className="p-6 overflow-y-auto space-y-6">
      
      {/* BASIC INFO SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-[10px] font-bold uppercase text-gray-400 ml-1">Product Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Product Name"
            className="w-full border border-gray-200 rounded-lg p-3 text-sm focus:ring-2 focus:ring-black/5 focus:border-black outline-none transition-all"
          />
        </div>

        <div className="space-y-1">
          <label className="text-[10px] font-bold uppercase text-gray-400 ml-1">Keywords</label>
          <input
            name="keywords"
            value={form.keywords}
            onChange={handleChange}
            placeholder="e.g. Cotton, Summer, Blue"
            className="w-full border border-gray-200 rounded-lg p-3 text-sm focus:ring-2 focus:ring-black/5 focus:border-black outline-none transition-all"
          />
        </div>

        <div className="space-y-1">
          <label className="text-[10px] font-bold uppercase text-gray-400 ml-1">Discount (%)</label>
          <input
            name="discount"
            value={form.discount}
            onChange={handleChange}
            placeholder="Discount %"
            className="w-full border border-gray-200 rounded-lg p-3 text-sm focus:ring-2 focus:ring-black/5 focus:border-black outline-none transition-all"
          />
        </div>

        <div className="space-y-1">
          <label className="text-[10px] font-bold uppercase text-gray-400 ml-1">Category (Read-only)</label>
          <input
            name="categoryName"
            value={form.categoryName}
            onChange={handleChange}
            className="w-full border border-gray-100 bg-gray-50 rounded-lg p-3 text-sm text-gray-500 cursor-not-allowed"
            disabled
          />
        </div>
      </div>

      {/* DESCRIPTION */}
      <div className="space-y-1">
        <label className="text-[10px] font-bold uppercase text-gray-400 ml-1">Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          rows={4}
          placeholder="Describe the product..."
          className="w-full border border-gray-200 rounded-lg p-3 text-sm focus:ring-2 focus:ring-black/5 focus:border-black outline-none transition-all resize-none"
        />
      </div>

      {/* 🔥 VARIANTS SECTION - Better Layout */}
      <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-gray-700 flex items-center gap-2 text-sm">
            <span className="w-2 h-2 bg-black rounded-full"></span> Variants & Pricing
          </h3>
        </div>

        <div className="space-y-3">
          {form.variants.map((variant, index) => (
            <div key={index} className="flex flex-wrap md:flex-nowrap gap-3 bg-white p-3 rounded-lg border border-gray-200 shadow-sm items-end">
              <div className="flex-1 min-w-[100px]">
                <label className="text-[9px] font-bold text-gray-400 uppercase">Size</label>
                <select
                  value={variant.size}
                  onChange={(e) => handleVariantChange(index, "size", e.target.value)}
                  className="w-full border-b border-gray-200 py-1 text-sm focus:border-black outline-none bg-transparent"
                >
                  <option>S</option>
                  <option>M</option>
                  <option>L</option>
                  <option>XL</option>
                  <option>XXL</option>
                  <option>Free Size</option>
                </select>
              </div>

              <div className="flex-1 min-w-[80px]">
                <label className="text-[9px] font-bold text-gray-400 uppercase">Price (₹)</label>
                <input
                  type="number"
                  value={variant.price}
                  onChange={(e) => handleVariantChange(index, "price", e.target.value)}
                  className="w-full border-b border-gray-200 py-1 text-sm focus:border-black outline-none"
                />
              </div>

              <div className="flex-1 min-w-[80px]">
                <label className="text-[9px] font-bold text-gray-400 uppercase">Stock</label>
                <input
                  type="number"
                  value={variant.stock}
                  onChange={(e) => handleVariantChange(index, "stock", e.target.value)}
                  className="w-full border-b border-gray-200 py-1 text-sm focus:border-black outline-none"
                />
              </div>

              <button
                onClick={() => removeVariant(index)}
                className="text-red-400 hover:text-red-600 p-2 text-xs font-bold uppercase transition-colors"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <button
          onClick={addVariant}
          className="mt-4 w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:text-black hover:border-black text-xs font-bold transition-all uppercase tracking-widest"
        >
          + Add New Variant
        </button>
      </div>

      {/* ADMIN SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-[10px] font-bold uppercase text-gray-400 ml-1">Admin Remark</label>
          <input
            name="remark"
            value={form.remark}
            onChange={handleChange}
            placeholder="Internal notes..."
            className="w-full border border-gray-200 rounded-lg p-3 text-sm focus:ring-2 focus:ring-black/5"
          />
        </div>
        <div className="space-y-1">
          <label className="text-[10px] font-bold uppercase text-gray-400 ml-1">Rating Display</label>
          <input
            name="averageRating"
            value={form.averageRating}
            onChange={handleChange}
            placeholder="4.5"
            className="w-full border border-gray-200 rounded-lg p-3 text-sm focus:ring-2 focus:ring-black/5"
          />
        </div>
      </div>
    </div>

    {/* FOOTER - Actions */}
    <div className="p-6 border-t border-gray-100 flex justify-end items-center gap-4 bg-gray-50/50">
      <button 
        onClick={() => setOpenEdit(false)}
        className="text-sm font-bold text-gray-500 hover:text-black transition-colors"
      >
        Discard Changes
      </button>
      <button
        onClick={handleUpdate}
        className="bg-black text-white px-8 py-3 text-sm font-bold shadow-lg shadow-black/10 hover:bg-gray-800 transition-all active:scale-95"
      >
        Update Product
      </button>
    </div>

  </div>
</div>
  );
};

export default Updatefields;

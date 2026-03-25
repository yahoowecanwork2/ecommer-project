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
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-3xl p-6 space-y-5 overflow-y-auto max-h-[90vh]">
        {/* HEADER */}
        <div className="flex justify-between items-center">
          <h2 className="font-bold text-lg">Update Product</h2>
          <button onClick={() => setOpenEdit(false)}>
            <FaTimes />
          </button>
        </div>

        {/* NAME */}
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Product Name"
          className="w-full border p-2"
        />

        {/* KEYWORDS */}
        <input
          name="keywords"
          value={form.keywords}
          onChange={handleChange}
          placeholder="Keywords"
          className="w-full border p-2"
        />

        {/* DISCOUNT */}
        <input
          name="discount"
          value={form.discount}
          onChange={handleChange}
          placeholder="Discount %"
          className="w-full border p-2"
        />

        {/* CATEGORY */}
        <input
          name="categoryName"
          value={form.categoryName}
          onChange={handleChange}
          className="w-full border p-2"
          disabled
        />

        {/* DESCRIPTION */}
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          className="w-full border p-2"
        />

        {/* 🔥 VARIANTS SECTION */}
        <div>
          <h3 className="font-bold mb-2">Variants</h3>

          {form.variants.map((variant, index) => (
            <div key={index} className="flex gap-2 mb-2 items-center">
              {/* SIZE */}
              <select
                value={variant.size}
                onChange={(e) =>
                  handleVariantChange(index, "size", e.target.value)
                }
                className="border p-2"
              >
                <option>S</option>
                <option>M</option>
                <option>L</option>
                <option>XL</option>
                <option>XXL</option>
                <option>Free Size</option>
              </select>

              {/* PRICE */}
              <input
                type="number"
                value={variant.price}
                onChange={(e) =>
                  handleVariantChange(index, "price", e.target.value)
                }
                placeholder="Price"
                className="border p-2 w-24"
              />

              {/* STOCK */}
              <input
                type="number"
                value={variant.stock}
                onChange={(e) =>
                  handleVariantChange(index, "stock", e.target.value)
                }
                placeholder="Stock"
                className="border p-2 w-24"
              />

              {/* REMOVE */}
              <button
                onClick={() => removeVariant(index)}
                className="text-red-600"
              >
                Remove
              </button>
            </div>
          ))}

          {/* ADD BUTTON */}
          <button
            onClick={addVariant}
            className="mt-2 px-3 py-1 bg-gray-800 text-white"
          >
            + Add Variant
          </button>
        </div>

        {/* REMARK */}
        <input
          name="remark"
          value={form.remark}
          onChange={handleChange}
          placeholder="Admin Remark"
          className="w-full border p-2"
        />

        {/* RATING */}
        <input
          name="averageRating"
          value={form.averageRating}
          onChange={handleChange}
          placeholder="Rating"
          className="w-full border p-2"
        />

        {/* BUTTONS */}
        <div className="flex justify-end gap-3">
          <button onClick={() => setOpenEdit(false)}>Cancel</button>
          <button
            onClick={handleUpdate}
            className="bg-black text-white px-4 py-2"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default Updatefields;

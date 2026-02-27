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
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-[600px] rounded-2xl shadow-xl p-6 relative">
        <button
          onClick={() => setOpenEdit(false)}
          className="absolute top-3 right-3 text-gray-600 hover:text-red-500"
        >
          <FaTimes />
        </button>

        <h2 className="text-xl font-bold mb-4">Edit Product</h2>

        <div className="grid grid-cols-2 gap-4">
          <input
            className="border p-2 rounded"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Name"
          />

          <input
            className="border p-2 rounded"
            name="price"
            value={form.price}
            onChange={handleChange}
            placeholder="Price"
          />

          <input
            className="border p-2 rounded"
            name="discount"
            value={form.discount}
            onChange={handleChange}
            placeholder="Discount"
          />

          <input
            className="border p-2 rounded"
            name="keywords"
            value={form.keywords}
            onChange={handleChange}
            placeholder="Keywords"
          />

          <input
            className="border p-2 rounded col-span-2"
            name="category"
            value={form.category}
            onChange={handleChange}
            placeholder="Category ID"
          />

          <textarea
            className="border p-2 rounded col-span-2"
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
          />

          <input
            className="border p-2 rounded"
            name="remark"
            value={form.remark}
            onChange={handleChange}
            placeholder="Remark"
          />

          <input
            className="border p-2 rounded"
            name="averageRating"
            value={form.averageRating}
            onChange={handleChange}
            placeholder="Rating"
          />
        </div>

        <button
          onClick={handleUpdate}
          className="mt-5 w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700"
        >
          Update Product
        </button>
      </div>
    </div>
  );
};

export default Updatefields;

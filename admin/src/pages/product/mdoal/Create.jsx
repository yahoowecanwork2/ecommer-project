import React, { useState, useEffect } from "react";
import { FaTimes, FaTrash } from "react-icons/fa";
import { productApi } from "../../../apis/product";

const Create = ({ setShowModal }) => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    stock: "",
    category: "",
    description: "",
    keywords: "",
    discount: "",
    available: "yes",
    insale: "no",
  });

  const [categories, setCategories] = useState([]);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState([]);

  // 🔹 get categories
  useEffect(() => {
    // const getCategories = async () => {
    //   const res = await api.get("/category/all");
    //   setCategories(res.data.categories);
    // };
    // getCategories();
  }, []);

  // 🔹 handle input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔹 handle images
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    if (files.length + images.length > 5) {
      alert("Maximum 5 images allowed");
      return;
    }

    setImages((prev) => [...prev, ...files]);

    const imgPreview = files.map((file) => URL.createObjectURL(file));
    setPreview((prev) => [...prev, ...imgPreview]);
  };

  // 🔹 delete image
  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
    setPreview(preview.filter((_, i) => i !== index));
  };

  // 🔹 submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (images.length < 4) {
      alert("Minimum 4 images required");
      return;
    }

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    images.forEach((img) => {
      data.append("images", img);
    });
    try {
      setLoading(true);
      const res = await productApi.create(data);

      console.log("create", res);

      alert("Product Created");
      setShowModal(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-lg p-6 rounded-xl shadow-lg relative">
        <button
          onClick={() => setShowModal(false)}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-600"
        >
          <FaTimes />
        </button>

        <h2 className="text-xl font-bold text-blue-700 mb-4">Create Product</h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />

          <textarea
            name="description"
            placeholder="Description"
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />

          <input
            type="text"
            name="keywords"
            placeholder="Keywords"
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <select
            name="category"
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>

          <div className="flex gap-2">
            <input
              type="number"
              name="price"
              placeholder="Price"
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
            <input
              type="number"
              name="stock"
              placeholder="Stock"
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>

          <input
            type="number"
            name="discount"
            placeholder="Discount"
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            className="w-full border p-2 rounded"
          />

          {/* Preview */}
          <div className="grid grid-cols-4 gap-2 mt-2">
            {preview.map((img, index) => (
              <div key={index} className="relative">
                <img
                  src={img}
                  alt=""
                  className="h-20 w-20 object-cover rounded"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full text-xs"
                >
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>

          <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            Save Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default Create;

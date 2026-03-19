import React, { useState, useEffect } from "react";
import { FaTimes, FaTrash } from "react-icons/fa";
import { productApi } from "../../../apis/product";
import { categoriesApi } from "../../../apis/categories";
// From Material Design (md)
import { MdCloudUpload } from "react-icons/md";

const Create = ({ setShowModal }) => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    stock: "",
    category: "",
    description: "",
    discount: "",
    available: "yes",
    insale: "no",
  });

  const [categories, setCategories] = useState([]);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState([]);
  const [keywords, setKeywords] = useState([]);
  const [keywordInput, setKeywordInput] = useState("");
  const handleAddKeyword = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();

      const value = keywordInput.trim().toLowerCase();
      if (value && !keywords.includes(value)) {
        setKeywords([...keywords, value]);
      }

      setKeywordInput("");
    }
  };

  const removeKeyword = (index) => {
    setKeywords(keywords.filter((_, i) => i !== index));
  };
  // get categories
  const getCategories = async () => {
    try {
      const res = await categoriesApi.getByName();
      console.log("categries", res);

      if (res.success) {
        setCategories(res.categoriesNames);
      } else {
        alert(res.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCategories();
  }, []);

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

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
    setPreview(preview.filter((_, i) => i !== index));
  };

  //  submit form
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
    data.append("keywords", keywords.join(","));
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
    <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="bg-white w-full max-w-2xl border border-gray-200 rounded-sm shadow-2xl relative overflow-hidden animate-in fade-in zoom-in duration-200">
        {/* MODAL HEADER */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100 bg-gray-50/50">
          <div>
            <h3 className="text-sm font-black text-gray-900 uppercase tracking-[0.2em]">
              Inventory Entry
            </h3>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">
              New Product Manifest
            </p>
          </div>
          <button
            onClick={() => setShowModal(false)}
            className="text-gray-400 hover:text-red-600 transition-colors p-1"
          >
            <FaTimes size={16} />
          </button>
        </div>

        {/* FORM BODY */}
        <form
          onSubmit={handleSubmit}
          className="p-6 space-y-5 max-h-[80vh] overflow-y-auto custom-scrollbar"
        >
          {/* Product Name & Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                Product Label
              </label>
              <input
                type="text"
                name="name"
                placeholder="e.g. Premium Wireless Headphones"
                onChange={handleChange}
                className="w-full border border-gray-200 p-2.5 rounded-sm text-xs font-bold bg-gray-50/30 focus:border-gray-900 focus:bg-white transition-all outline-none"
                required
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                Classification
              </label>
              <select
                name="category"
                onChange={handleChange}
                className="w-full border border-gray-200 p-2.5 rounded-sm text-xs font-bold bg-gray-50/30 focus:border-gray-900 transition-all outline-none"
                required
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
              Description
            </label>
            <textarea
              name="description"
              placeholder="Technical specifications and value proposition..."
              onChange={handleChange}
              rows="3"
              className="w-full border resize-none border-gray-200 p-2.5 rounded-sm text-xs font-medium bg-gray-50/30 focus:border-gray-900 transition-all outline-none"
              required
            />
          </div>
          {/* Keywords */}
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
              Keywords (SEO Tags)
            </label>

            <div className="border border-gray-200 rounded-sm p-2 flex flex-wrap gap-2 bg-gray-50/30 focus-within:border-gray-900">
              {keywords.map((key, index) => (
                <span
                  key={index}
                  className="flex items-center gap-1 bg-gray-900 text-white text-[10px] px-2 py-1 rounded"
                >
                  {key}
                  <button type="button" onClick={() => removeKeyword(index)}>
                    <FaTimes size={10} />
                  </button>
                </span>
              ))}

              <input
                type="text"
                value={keywordInput}
                onChange={(e) => setKeywordInput(e.target.value)}
                onKeyDown={handleAddKeyword}
                placeholder="Type and press Enter..."
                className="flex-1 bg-transparent outline-none text-xs"
              />
            </div>
          </div>
          {/* Financials & Inventory */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest text-blue-600">
                Base Price (₹)
              </label>
              <input
                type="number"
                name="price"
                placeholder="0.00"
                onChange={handleChange}
                className="w-full border border-gray-200 p-2.5 rounded-sm text-xs font-black bg-gray-50/30 focus:border-blue-600 transition-all outline-none"
                required
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                Stock Units
              </label>
              <input
                type="number"
                name="stock"
                placeholder="Qty"
                onChange={handleChange}
                className="w-full border border-gray-200 p-2.5 rounded-sm text-xs font-black bg-gray-50/30 focus:border-gray-900 transition-all outline-none"
                required
              />
            </div>
            <div className="space-y-1 col-span-2 md:col-span-1">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest text-green-600">
                Discount (%)
              </label>
              <input
                type="number"
                name="discount"
                placeholder="0"
                onChange={handleChange}
                className="w-full border border-gray-200 p-2.5 rounded-sm text-xs font-black bg-gray-50/30 focus:border-green-600 transition-all outline-none"
              />
            </div>
          </div>

          {/* Media Upload */}
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
              Product Gallery
            </label>
            <div className="border-2 border-dashed border-gray-200 rounded-sm p-4 hover:border-gray-400 transition-colors text-center bg-gray-50/50">
              <input
                type="file"
                id="product-images"
                multiple
                accept=".jpeg,.png"
                onChange={handleImageChange}
                className="hidden"
              />
              <label
                htmlFor="product-images"
                className="cursor-pointer flex flex-col items-center"
              >
                <MdCloudUpload className="text-2xl text-gray-400 mb-1" />
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-tighter">
                  Upload (.jpeg, .png only)
                </span>
              </label>
            </div>

            {/* Image Previews */}
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-3 mt-4">
              {preview?.map((img, index) => (
                <div key={index} className="flex flex-col gap-1 group">
                  <div className="relative aspect-square border border-gray-100 rounded-sm overflow-hidden">
                    <img
                      src={img}
                      alt=""
                      className="h-full w-full object-cover transition-transform group-hover:scale-110"
                    />

                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute inset-0 bg-red-600/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <FaTrash size={12} />
                    </button>
                  </div>

                  {/* 🏷️ File name */}
                  <p className="text-[10px] text-gray-500 text-center">
                    {images[index]?.name}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* FOOTER ACTIONS */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="px-6 py-2.5 text-[10px] font-bold text-gray-400 uppercase tracking-widest hover:text-gray-900 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-10 py-2.5 bg-gray-900 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-sm hover:bg-black transition-all shadow-lg active:scale-95"
            >
              Save Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Create;

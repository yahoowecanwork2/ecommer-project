import React, { useState, useEffect } from "react";
import { FaTimes, FaTrash } from "react-icons/fa";
import { MdCloudUpload } from "react-icons/md";
import { productApi } from "../../../apis/product";
import { categoriesApi } from "../../../apis/categories";

const Create = ({ setShowModal }) => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    discount: "",
    available: "yes",
    insale: "no",
  });

  const [categories, setCategories] = useState([]);
  const [variants, setVariants] = useState([
    { size: "M", price: "", stock: "" },
  ]);

  const [images, setImages] = useState([]);
  const [preview, setPreview] = useState([]);

  const [keywords, setKeywords] = useState([]);
  const [keywordInput, setKeywordInput] = useState("");

  const [loading, setLoading] = useState(false);

  // ✅ GET CATEGORIES
  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await categoriesApi.getByName();
        if (res.success) {
          setCategories(res.categoriesNames);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getCategories();
  }, []);

  // ✅ FORM CHANGE
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ VARIANTS
  const handleVariantChange = (index, field, value) => {
    const updated = [...variants];
    updated[index][field] = value;
    setVariants(updated);
  };

  const addVariant = () => {
    setVariants([...variants, { size: "M", price: "", stock: "" }]);
  };

  const removeVariant = (index) => {
    setVariants(variants.filter((_, i) => i !== index));
  };

  // ✅ KEYWORDS
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

  // ✅ IMAGES
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    if (files.length + images.length > 5) {
      alert("Max 5 images allowed");
      return;
    }

    setImages((prev) => [...prev, ...files]);

    const previews = files.map((file) => URL.createObjectURL(file));
    setPreview((prev) => [...prev, ...previews]);
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
    setPreview(preview.filter((_, i) => i !== index));
  };

  // ✅ SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();

    // basic fields
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    // keywords
    data.append("keywords", keywords.join(","));

    // variants
    const formattedVariants = variants.map((v) => ({
      size: v.size,
      price: Number(v.price),
      stock: Number(v.stock),
    }));

    data.append("variants", JSON.stringify(formattedVariants));

    // images
    images.forEach((img) => {
      data.append("images", img);
    });

    try {
      setLoading(true);
      const res = await productApi.create(data);
      console.log(res);

      alert("Product Created ✅");
      setShowModal(false);
    } catch (err) {
      console.log(err);
      alert("Error creating product");
    } finally {
      setLoading(false);
    }
  };

  return (
   <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
  <div className="bg-white w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
    
    {/* HEADER - Clean and Simple */}
    <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
      <h2 className="text-xl font-semibold text-gray-800">Create New Product</h2>
      <button 
        onClick={() => setShowModal(false)}
        className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-500"
      >
        <FaTimes size={18} />
      </button>
    </div>

    {/* FORM BODY - Better Spacing */}
    <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-6">
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* NAME */}
        <div className="col-span-1 md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
          <input
            type="text"
            name="name"
            placeholder="e.g. Premium Cotton T-Shirt"
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
            required
          />
        </div>

        {/* CATEGORY */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <select
            name="category"
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-black outline-none bg-white"
            required
          >
            <option value="">Select Category</option>
            {categories.map((c) => (
              <option key={c._id} value={c._id}>{c.name}</option>
            ))}
          </select>
        </div>

        {/* DISCOUNT */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Discount (%)</label>
          <input
            type="number"
            name="discount"
            placeholder="0"
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-black outline-none"
          />
        </div>
      </div>

      {/* VARIANTS SECTION - Grouped look */}
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
        <h4 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-3">Variants</h4>
        <div className="space-y-3">
          {variants.map((v, i) => (
            <div key={i} className="flex flex-wrap md:flex-nowrap gap-3 items-end bg-white p-3 rounded-md shadow-sm border border-gray-100">
              <div className="flex-1 min-w-[100px]">
                <label className="text-[10px] uppercase font-bold text-gray-400">Size</label>
                <select
                  value={v.size}
                  onChange={(e) => handleVariantChange(i, "size", e.target.value)}
                  className="w-full border-b border-gray-200 py-1 outline-none focus:border-black"
                >
                  <option>S</option><option>M</option><option>L</option>
                  <option>XL</option><option>XXL</option><option>Free Size</option>
                </select>
              </div>

              <div className="flex-1 min-w-[100px]">
                <label className="text-[10px] uppercase font-bold text-gray-400">Price</label>
                <input
                  type="number"
                  placeholder="0.00"
                  value={v.price}
                  onChange={(e) => handleVariantChange(i, "price", e.target.value)}
                  className="w-full border-b border-gray-200 py-1 outline-none focus:border-black"
                />
              </div>

              <div className="flex-1 min-w-[100px]">
                <label className="text-[10px] uppercase font-bold text-gray-400">Stock</label>
                <input
                  type="number"
                  placeholder="Qty"
                  value={v.stock}
                  onChange={(e) => handleVariantChange(i, "stock", e.target.value)}
                  className="w-full border-b border-gray-200 py-1 outline-none focus:border-black"
                />
              </div>

              {variants.length > 1 && (
                <button 
                  type="button"
                  onClick={() => removeVariant(i)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-md transition-colors"
                >
                  <FaTrash size={14} />
                </button>
              )}
            </div>
          ))}
        </div>
        <button 
          type="button" 
          onClick={addVariant}
          className="mt-3 text-sm font-medium text-blue-600 hover:text-blue-800 flex items-center gap-1"
        >
          + Add another variant
        </button>
      </div>

      {/* DESCRIPTION */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea
          name="description"
          rows="3"
          placeholder="Describe your product..."
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-black outline-none"
          required
        />
      </div>

      {/* KEYWORDS */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Keywords</label>
        <input
          type="text"
          value={keywordInput}
          onChange={(e) => setKeywordInput(e.target.value)}
          onKeyDown={handleAddKeyword}
          placeholder="Press Enter to add"
          className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-black outline-none"
        />
        <div className="flex gap-2 mt-2 flex-wrap">
          {keywords.map((k, i) => (
            <span key={i} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium border border-gray-200 flex items-center gap-2">
              {k}
              <button onClick={() => removeKeyword(i)} className="hover:text-red-500">
                <FaTimes size={10} />
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* IMAGES UPLOAD */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Product Images</label>
        <div className="grid grid-cols-4 gap-4">
          <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition-colors h-24">
            <MdCloudUpload size={24} className="text-gray-400" />
            <span className="text-[10px] text-gray-500 mt-1 font-medium">Upload</span>
            <input type="file" multiple hidden onChange={handleImageChange} />
          </label>

          {preview.map((img, i) => (
            <div key={i} className="relative group h-24">
              <img src={img} className="w-full h-full object-cover rounded-lg border border-gray-200" />
              <button
                type="button"
                onClick={() => removeImage(i)}
                className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <FaTrash size={10} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* FOOTER / SUBMIT */}
      <div className="pt-4 border-t border-gray-100 flex gap-3">
        <button
          type="button"
          onClick={() => setShowModal(false)}
          className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-all"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="flex-[2] bg-black text-white px-4 py-2.5 font-medium hover:bg-gray-800 transition-all disabled:bg-gray-400"
        >
          {loading ? "Processing..." : "Create Product"}
        </button>
      </div>
    </form>
  </div>
</div>
  );
};

export default Create;

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
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-2xl p-6 rounded shadow-lg overflow-y-auto max-h-[90vh]">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-bold">Create Product</h2>
          <button onClick={() => setShowModal(false)}>
            <FaTimes />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* NAME */}
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            onChange={handleChange}
            className="w-full border p-2"
            required
          />

          {/* CATEGORY */}
          <select
            name="category"
            onChange={handleChange}
            className="w-full border p-2"
            required
          >
            <option value="">Select Category</option>
            {categories.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>

          {/* VARIANTS */}
          <div>
            <h4 className="font-semibold">Variants</h4>

            {variants.map((v, i) => (
              <div key={i} className="flex gap-2 mb-2">
                <select
                  value={v.size}
                  onChange={(e) =>
                    handleVariantChange(i, "size", e.target.value)
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

                <input
                  type="number"
                  placeholder="Price"
                  value={v.price}
                  onChange={(e) =>
                    handleVariantChange(i, "price", e.target.value)
                  }
                  className="border p-2"
                />

                <input
                  type="number"
                  placeholder="Stock"
                  value={v.stock}
                  onChange={(e) =>
                    handleVariantChange(i, "stock", e.target.value)
                  }
                  className="border p-2"
                />

                {variants.length > 1 && (
                  <button onClick={() => removeVariant(i)}>
                    <FaTrash />
                  </button>
                )}
              </div>
            ))}

            <button type="button" onClick={addVariant}>
              + Add Variant
            </button>
          </div>

          {/* DESCRIPTION */}
          <textarea
            name="description"
            placeholder="Description"
            onChange={handleChange}
            className="w-full border p-2"
            required
          />

          {/* KEYWORDS */}
          <div>
            <input
              type="text"
              value={keywordInput}
              onChange={(e) => setKeywordInput(e.target.value)}
              onKeyDown={handleAddKeyword}
              placeholder="Enter keywords"
              className="border p-2 w-full"
            />
            <div className="flex gap-2 mt-2 flex-wrap">
              {keywords.map((k, i) => (
                <span key={i} className="bg-black text-white px-2 py-1 text-xs">
                  {k}
                  <button onClick={() => removeKeyword(i)}>
                    <FaTimes />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* DISCOUNT */}
          <input
            type="number"
            name="discount"
            placeholder="Discount"
            onChange={handleChange}
            className="w-full border p-2"
          />

          {/* IMAGES */}
          <div>
            <label className="flex flex-col items-center border p-4 cursor-pointer">
              <MdCloudUpload size={25} />
              Upload Images
              <input type="file" multiple hidden onChange={handleImageChange} />
            </label>

            <div className="flex gap-2 mt-2">
              {preview.map((img, i) => (
                <div key={i} className="relative">
                  <img src={img} className="w-16 h-16 object-cover" />
                  <button
                    type="button"
                    onClick={() => removeImage(i)}
                    className="absolute top-0 right-0 bg-red-500 text-white"
                  >
                    <FaTrash size={10} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={loading}
            className="bg-black text-white w-full p-2"
          >
            {loading ? "Creating..." : "Create Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Create;

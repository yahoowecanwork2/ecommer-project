import React, { useState, useEffect } from "react";
import { FaTimes, FaTrash, FaPlus, FaCloudUploadAlt } from "react-icons/fa";
import { productApi } from "../../../apis/product";
import { categoriesApi } from "../../../apis/categories";

const Create = ({ setShowModal }) => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    discount: "",
    insale: "no",
  });

  const [categories, setCategories] = useState([]);

  const [variants, setVariants] = useState([
    { size: "XXL", price: "", stock: "" },
  ]);

  const [imageGroups, setImageGroups] = useState([
    { main: null, subImages: [] },
  ]);

  const [keywords, setKeywords] = useState([]);
  const [keywordInput, setKeywordInput] = useState("");

  const [loading, setLoading] = useState(false);

  // ✅ GET CATEGORIES
  useEffect(() => {
    const getCategories = async () => {
      const res = await categoriesApi.getByName();
      if (res.success) setCategories(res.categoriesNames);
    };
    getCategories();
  }, []);

  // ✅ FORM CHANGE
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ VARIANTS
  const handleVariantChange = (i, field, value) => {
    const updated = [...variants];
    updated[i][field] = value;
    setVariants(updated);
  };

  const addVariant = () => {
    setVariants([...variants, { size: "XXL", price: "", stock: "" }]);
  };

  const removeVariant = (i) => {
    setVariants(variants.filter((_, index) => index !== i));
  };

  // ✅ KEYWORDS
  const handleAddKeyword = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const val = keywordInput.trim().toLowerCase();
      if (val && !keywords.includes(val)) {
        setKeywords([...keywords, val]);
      }
      setKeywordInput("");
    }
  };

  const removeKeyword = (i) => {
    setKeywords(keywords.filter((_, index) => index !== i));
  };

  // ✅ IMAGE HANDLERS

  // MAIN IMAGE
  const handleMainImage = (i, file) => {
    const updated = [...imageGroups];
    updated[i].main = file;
    setImageGroups(updated);
  };

  // SUB IMAGES (🔥 MAX 3)
  const handleSubImages = (i, files) => {
    const updated = [...imageGroups];

    const existing = updated[i].subImages.length;
    const incoming = Array.from(files);

    if (existing + incoming.length > 3) {
      alert("Max 3 sub images allowed per main image ❌");
      return;
    }

    updated[i].subImages = [...updated[i].subImages, ...incoming];
    setImageGroups(updated);
  };

  const removeSubImage = (groupIndex, subIndex) => {
    const updated = [...imageGroups];
    updated[groupIndex].subImages = updated[groupIndex].subImages.filter(
      (_, i) => i !== subIndex,
    );
    setImageGroups(updated);
  };

  const addImageGroup = () => {
    setImageGroups([...imageGroups, { main: null, subImages: [] }]);
  };

  const removeImageGroup = (i) => {
    setImageGroups(imageGroups.filter((_, index) => index !== i));
  };

  // ✅ TOTAL IMAGE COUNT (MIN 4)
  const getTotalImages = () => {
    let count = 0;
    imageGroups.forEach((group) => {
      if (group.main) count += 1;
      count += group.subImages.length;
    });
    return count;
  };

  // ✅ SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🔥 MIN 4 IMAGES VALIDATION
    const totalImages = getTotalImages();
    if (totalImages < 4) {
      alert("Minimum 4 images required ❌");
      return;
    }

    const data = new FormData();

    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    data.append("keywords", keywords.join(","));
    data.append("variants", JSON.stringify(variants));

    // ✅ IMAGE STRUCTURE
    const imagesPayload = imageGroups.map((group, gIndex) => ({
      main: { url: "", index: gIndex },
      subImages: group.subImages.map((_, sIndex) => ({
        url: "",
        index: sIndex,
      })),
    }));

    data.append("images", JSON.stringify(imagesPayload));

    // ✅ FILE ORDER (VERY IMPORTANT)
    imageGroups.forEach((group) => {
      if (group.main) data.append("images", group.main);

      group.subImages.forEach((file) => {
        data.append("images", file);
      });
    });

    try {
      setLoading(true);
      await productApi.create(data);
      alert("Product Created ✅");
      setShowModal(false);
    } catch (err) {
      console.log(err);
      alert("Error creating product ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="bg-white w-full max-w-3xl rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[95vh]">
        {/* HEADER */}
        <div className="flex justify-between items-center px-6 py-4 border-b bg-gray-50">
          <h2 className="font-bold text-xl text-gray-800">
            Create New Product
          </h2>
          <button
            onClick={() => setShowModal(false)}
            className="p-2 hover:bg-gray-200 rounded-full transition-colors"
          >
            <FaTimes className="text-gray-600" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-6">
          {/* BASIC INFO */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-700">
                Product Name
              </label>
              <input
                name="name"
                placeholder="Ex: Premium Cotton T-Shirt"
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                required
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-700">
                Category
              </label>
              <select
                name="category"
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                required
              >
                <option value="">Select Category</option>
                {categories.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-semibold text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              placeholder="Tell us about your product..."
              onChange={handleChange}
              rows="3"
              className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
          </div>

          {/* VARIANTS SECTION */}
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-bold text-gray-700">Variants & Pricing</h4>
              <button
                type="button"
                onClick={addVariant}
                className="flex items-center gap-1 text-sm bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <FaPlus size={12} /> Add Variant
              </button>
            </div>

            <div className="space-y-3">
              {variants.map((v, i) => (
                <div
                  key={i}
                  className="flex flex-wrap md:flex-nowrap gap-3 items-end bg-white p-3 rounded-lg shadow-sm border border-gray-100"
                >
                  <div className="flex-1 min-w-[100px]">
                    <label className="text-[10px] uppercase font-bold text-gray-500">
                      Size
                    </label>
                    <select
                      value={v.size}
                      onChange={(e) =>
                        handleVariantChange(i, "size", e.target.value)
                      }
                      className="w-full border-b-2 border-gray-200 py-1 outline-none focus:border-blue-500"
                    >
                      <option>XXL</option>
                      <option>XL</option>
                      <option>L</option>
                      <option>M</option>
                      <option>s</option>
                      <option>Free Size</option>
                    </select>
                  </div>
                  <div className="flex-1 min-w-[100px]">
                    <label className="text-[10px] uppercase font-bold text-gray-500">
                      Price
                    </label>
                    <input
                      type="number"
                      placeholder="0.00"
                      onChange={(e) =>
                        handleVariantChange(i, "price", e.target.value)
                      }
                      className="w-full border-b-2 border-gray-200 py-1 outline-none focus:border-blue-500"
                    />
                  </div>
                  <div className="flex-1 min-w-[100px]">
                    <label className="text-[10px] uppercase font-bold text-gray-500">
                      Stock
                    </label>
                    <input
                      type="number"
                      placeholder="Qty"
                      onChange={(e) =>
                        handleVariantChange(i, "stock", e.target.value)
                      }
                      className="w-full border-b-2 border-gray-200 py-1 outline-none focus:border-blue-500"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeVariant(i)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* KEYWORDS */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">
              Keywords (Press Enter or Comma)
            </label>
            <input
              placeholder="trending, summer, cotton..."
              value={keywordInput}
              onChange={(e) => setKeywordInput(e.target.value)}
              onKeyDown={handleAddKeyword}
              className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
            <div className="flex gap-2 flex-wrap mt-2">
              {keywords.map((k, i) => (
                <span
                  key={i}
                  className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium border border-blue-100 flex items-center gap-2"
                >
                  {k}{" "}
                  <FaTimes
                    className="cursor-pointer hover:text-red-500"
                    onClick={() => removeKeyword(i)}
                  />
                </span>
              ))}
            </div>
          </div>

          {/* IMAGES SECTION */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-bold text-gray-700">Product Images</h4>
                <p className="text-xs text-gray-500">
                  Min 4 total images required
                </p>
              </div>
              <button
                type="button"
                onClick={addImageGroup}
                className="text-sm text-blue-600 font-semibold hover:underline flex items-center gap-1"
              >
                <FaPlus size={10} /> Add Image Group
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {imageGroups.map((g, i) => (
                <div
                  key={i}
                  className="relative border-2 border-dashed border-gray-200 p-4 rounded-xl hover:border-blue-300 transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => removeImageGroup(i)}
                    className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
                  >
                    <FaTimes />
                  </button>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Main Image Upload */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-400 uppercase">
                        Main Image
                      </label>
                      <label className="flex flex-col items-center justify-center h-24 border-2 border-gray-100 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-all">
                        <FaCloudUploadAlt className="text-gray-400 text-xl" />
                        <span className="text-[10px] text-gray-500 mt-1">
                          {g.main
                            ? g.main.name.substring(0, 15) + "..."
                            : "Upload Main"}
                        </span>
                        <input
                          type="file"
                          className="hidden"
                          onChange={(e) =>
                            handleMainImage(i, e.target.files[0])
                          }
                        />
                      </label>
                    </div>

                    {/* Sub Images Upload */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-400 uppercase">
                        Sub Images (Max 3)
                      </label>
                      <label className="flex flex-col items-center justify-center h-24 border-2 border-gray-100 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-all">
                        <FaPlus className="text-gray-400 text-lg" />
                        <span className="text-[10px] text-gray-500 mt-1">
                          Add Sub Images
                        </span>
                        <input
                          type="file"
                          multiple
                          className="hidden"
                          onChange={(e) => handleSubImages(i, e.target.files)}
                        />
                      </label>
                    </div>
                  </div>

                  {/* Sub Image Tags */}
                  {g.subImages.length > 0 && (
                    <div className="flex gap-2 flex-wrap mt-3">
                      {g.subImages.map((img, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded text-[10px] text-gray-600"
                        >
                          {img.name.substring(0, 10)}...
                          <FaTimes
                            className="cursor-pointer hover:text-red-500"
                            onClick={() => removeSubImage(i, idx)}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* SUBMIT BUTTON */}
          <div className="pt-4 border-t sticky bottom-0 bg-white">
            <button
              disabled={loading}
              className={`w-full py-3 rounded-xl font-bold text-white transition-all shadow-lg ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-black hover:bg-gray-800 active:scale-[0.98]"
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Creating Product...
                </span>
              ) : (
                "Create Product"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Create;

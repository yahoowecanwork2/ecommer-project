import React, { useState } from "react";
import { categoriesApi } from "../../../apis/categories";
import { FaTimes, FaImage, FaTag } from "react-icons/fa";

const CreateCategories = ({ setOpen }) => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await categoriesApi.create({ name, image });

      if (res.success) {
        alert("Category created successfully");
        setOpen(false);
      } else {
        alert(res.message);
      }
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/40 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-lg bg-white border border-gray-200 rounded-sm shadow-2xl animate-in fade-in zoom-in duration-200">
        {/* MODAL HEADER */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100 bg-gray-50/50">
          <div>
            <h3 className="text-sm font-black text-gray-900 uppercase tracking-[0.2em]">
              Create Category
            </h3>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">
              Organization Asset
            </p>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="text-gray-400 hover:text-gray-900 transition-colors p-1"
          >
            <FaTimes size={14} />
          </button>
        </div>

        {/* FORM BODY */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Name Field */}
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.15em]">
              Category Descriptor
            </label>
            <div className="flex items-center gap-3 border border-gray-200 rounded-sm px-3 py-2.5 bg-gray-50/30 focus-within:border-gray-900 transition-all">
              <FaTag className="text-gray-400 text-xs" />
              <input
                type="text"
                placeholder="e.g. ELECTRONICS"
                className="w-full outline-none bg-transparent text-[11px] font-bold text-gray-900 placeholder:text-gray-300 uppercase tracking-wider"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Image Field */}
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.15em]">
              Source Image URL
            </label>
            <div className="flex items-center gap-3 border border-gray-200 rounded-sm px-3 py-2.5 bg-gray-50/30 focus-within:border-gray-900 transition-all">
              <FaImage className="text-gray-400 text-xs" />
              <input
                type="text"
                placeholder="https://cloud.assets.com/img.jpg"
                className="w-full outline-none bg-transparent text-[11px] font-medium text-gray-600 placeholder:text-gray-300"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex justify-end gap-2 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="px-6 py-2.5 rounded-sm text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-gray-900 transition-all"
            >
              Discard
            </button>

            <button
              type="submit"
              className="px-8 py-2.5 rounded-sm bg-gray-900 text-white text-[10px] font-black uppercase tracking-[0.2em] hover:bg-gray-800 shadow-lg transition-all active:scale-[0.98]"
            >
              Confirm Entry
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCategories;

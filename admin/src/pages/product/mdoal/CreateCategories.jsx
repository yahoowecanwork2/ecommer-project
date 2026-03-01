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
    <div
      className="fixed inset-0 z-50
    flex items-center justify-center
    bg-slate-900/40 backdrop-blur-sm"
    >
      <div
        className="   relative w-[92vw] sm:w-[70vw] lg:w-[40vw]
      rounded-2xl border border-slate-200
      bg-white shadow-xl
      p-6 border-[#160059]/20"
      >
        <div className="flex justify-between items-center mb-5">
          <h3 className="text-xl font-bold text-[#160059]">Create Category</h3>
          <button
            onClick={() => setOpen(false)}
            className="text-[#160059] hover:opacity-70"
          >
            <FaTimes />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1">
            <label className="text-sm font-semibold text-[#160059]">
              Category Name
            </label>
            <div className="flex items-center gap-2 border border-[#160059]/20 rounded-xl px-3 py-2 bg-white">
              <FaTag className="text-[#160059]" />
              <input
                type="text"
                placeholder="Enter category name"
                className="w-full outline-none bg-transparent text-sm"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-semibold text-[#160059]">
              Image URL
            </label>
            <div className="flex items-center gap-2 border border-[#160059]/20 rounded-xl px-3 py-2 bg-white">
              <FaImage className="text-[#160059]" />
              <input
                type="text"
                placeholder="Enter image url"
                className="w-full outline-none bg-transparent text-sm"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
            </div>
          </div>

          {/* BUTTONS */}
          <div className="flex justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="px-4 py-2 rounded-lg border border-[#160059] text-[#160059] hover:bg-[#160059]/10 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-[#160059] text-white shadow hover:opacity-90 transition"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCategories;

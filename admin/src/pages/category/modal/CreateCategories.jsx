import React, { useState } from "react";
import { FaTimes, FaImage, FaTag } from "react-icons/fa";
import { categoriesApi } from "../../../apis/categories";

const CreateCategories = ({ setOpen }) => {
  const [name, setName] = useState("");
  const [images, setImages] = useState([]);
  const [preview, setPreview] = useState([]);

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
    setImages((prev) => prev.filter((_, i) => i !== index));
    setPreview((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name) {
      alert("Category name is required");
      return;
    }

    if (images.length === 0) {
      alert("Please select at least 1 image");
      return;
    }

    const data = new FormData();
    data.append("name", name);

    images.forEach((img) => {
      data.append("images", img);
    });

    try {
      const res = await categoriesApi.create(data);
      (console.log("create categories"), res);

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
      <div className="relative w-full max-w-lg bg-white border border-gray-200 rounded-sm shadow-2xl">
        {/* HEADER */}
        <div className="flex justify-between items-center px-6 py-4 border-b bg-gray-50">
          <div>
            <h3 className="text-sm font-black uppercase tracking-wider">
              Create Category
            </h3>
          </div>
          <button onClick={() => setOpen(false)}>
            <FaTimes size={14} />
          </button>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* NAME */}
          <div>
            <label className="text-xs font-bold uppercase text-gray-400">
              Category Name
            </label>
            <div className="flex items-center gap-2 border px-3 py-2">
              <FaTag />
              <input
                type="text"
                placeholder="ELECTRONICS"
                className="w-full outline-none"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>

          {/* IMAGE UPLOAD */}
          <div>
            <label className="text-xs font-bold uppercase text-gray-400">
              Upload Images
            </label>

            {/* file input 🔥 */}
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              className="mt-2"
            />

            {/* preview */}
            <div className="flex gap-2 flex-wrap mt-3">
              {preview.map((img, i) => (
                <div key={i} className="relative">
                  <img src={img} className="w-20 h-20 object-cover rounded" />
                  <button
                    type="button"
                    onClick={() => removeImage(i)}
                    className="absolute top-0 right-0 bg-black text-white text-xs px-1"
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* BUTTONS */}
          <div className="flex justify-end gap-2">
            <button type="button" onClick={() => setOpen(false)}>
              Cancel
            </button>
            <button type="submit" className="bg-black text-white px-4 py-2">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCategories;

import React, { useState } from "react";
import { FaTimes, FaImage, FaTag } from "react-icons/fa";
import { categoriesApi } from "../../../apis/categories";
import { MdCloudUpload } from "react-icons/md";

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
 <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/20 backdrop-blur-[2px] p-4">
  {/* MODAL CONTAINER - Minimal & Professional */}
  <div className="relative w-full max-w-md bg-white border border-gray-100 overflow-hidden">
    
    {/* HEADER - Very Clean */}
    <div className="flex justify-between items-center px-6 py-5 border-b border-gray-50">
      <div>
        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
          Create Category
        </h3>
        <p className="text-[11px] text-gray-400 mt-0.5 font-medium">Add a new organization level to your store</p>
      </div>
      <button 
        onClick={() => setOpen(false)}
        className="text-gray-400 hover:text-gray-900 transition-colors p-1"
      >
        <FaTimes size={16} />
      </button>
    </div>

    {/* FORM CONTENT */}
    <form onSubmit={handleSubmit} className="p-6 space-y-6">
      
      {/* NAME INPUT SECTION */}
      <div className="space-y-1.5">
        <label className="text-[11px] font-bold uppercase tracking-widest text-gray-500 ml-0.5">
          Category Name
        </label>
        <div className="flex items-center gap-3 border border-gray-200 rounded-md px-3.5 py-2.5 bg-gray-50/50 focus-within:bg-white focus-within:ring-2 focus-within:ring-gray-900/5 focus-within:border-gray-900 transition-all">
          <FaTag className="text-gray-400" size={12} />
          <input
            type="text"
            placeholder="e.g. Electronics"
            className="w-full outline-none bg-transparent text-sm font-medium text-gray-900 placeholder:text-gray-300"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
      </div>

      {/* IMAGE UPLOAD SECTION */}
      <div className="space-y-2">
        <label className="text-[11px] font-bold uppercase tracking-widest text-gray-500 ml-0.5">
          Cover Image
        </label>
        
        {/* REFINED UPLOAD BOX */}
        <label className="group flex flex-col items-center justify-center w-full h-32 border border-dashed border-gray-200 rounded-md cursor-pointer hover:bg-gray-50 transition-all">
          <div className="flex flex-col items-center justify-center py-4">
            <MdCloudUpload size={24} className="text-gray-300 group-hover:text-gray-400 transition-colors" />
            <p className="text-[11px] text-gray-400 mt-2 font-medium">Click to select images</p>
          </div>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </label>

        {/* PREVIEW GRID - Soft & Organized */}
        {preview.length > 0 && (
          <div className="flex gap-3 mt-4 flex-wrap">
            {preview.map((img, i) => (
              <div key={i} className="relative w-16 h-16 rounded-md border border-gray-100 overflow-hidden group shadow-sm">
                <img src={img} className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => removeImage(i)}
                  className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white"
                >
                  <FaTimes size={10} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* FOOTER BUTTONS - Balanced */}
      <div className="flex items-center gap-3 pt-4 border-t border-gray-50">
        <button 
          type="button" 
          onClick={() => setOpen(false)}
          className="flex-1 px-4 py-2.5 text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-gray-900 transition-colors"
        >
          Cancel
        </button>
        <button 
          type="submit" 
          className="flex-[1.5] bg-gray-900 text-white py-2.5 text-xs font-bold uppercase tracking-widest hover:bg-black transition-all shadow-sm active:scale-[0.98]"
        >
          Create Category
        </button>
      </div>
    </form>
  </div>
</div>
  );
};

export default CreateCategories;

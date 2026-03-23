import React, { useState } from "react";
import { FaTimes, FaTag } from "react-icons/fa";
import { categoriesApi } from "../../../apis/categories";

const UpdateCategory = ({ setOpen, category, refresh }) => {
  const [name, setName] = useState(category.name);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await categoriesApi.update({ name }, category._id);
      console.log("update categories", res);

      if (res.success) {
        alert("Updated Successfully");
        refresh();
        setOpen(false);
      }
    } catch (error) {
      alert("Update failed", error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-md bg-white p-8">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-xl font-black uppercase">Update Category</h3>
          <button onClick={() => setOpen(false)}>
            <FaTimes />
          </button>
        </div>

        <form onSubmit={handleUpdate} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase">New Name</label>
            <div className="flex items-center gap-3 border-b-2 border-black py-2">
              <FaTag className="text-gray-400" />
              <input
                type="text"
                className="w-full outline-none font-medium"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white py-3 font-bold uppercase tracking-widest hover:bg-gray-900"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateCategory;

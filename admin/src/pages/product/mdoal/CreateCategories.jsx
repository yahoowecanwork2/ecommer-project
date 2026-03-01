import React, { useState } from "react";
import { categoriesApi } from "../../../apis/categories";

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
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-[400px] p-6 rounded-xl shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Create Category</h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Category name"
            className="w-full border px-3 py-2 rounded-lg"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Image URL"
            className="w-full border px-3 py-2 rounded-lg"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="px-4 py-2 border rounded-lg"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg"
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

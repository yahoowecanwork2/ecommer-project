import React, { useState } from "react";
import { categoriesApi } from "../../../apis/categories";
import toast from "react-hot-toast";

const CreateCategories = ({ closemodal, fetchcategory }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    // category: "",
    // phoneno: "",
    // location: "",
    // description: "",
    images: null,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const data = new FormData();

    data.append("name", formData.name);
    data.append("images", formData.image); // backend .array("images", 20)

    const res = await categoriesApi.create(data);

    toast.success(res?.message);
    fetchcategory();
    closemodal();
  } catch (error) {
    console.log(error);
    console.log(error.response?.data);
  }
};

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex justify-center items-center p-4">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-4">
          <h2 className="text-xl font-semibold">Create Category</h2>

          <button className="border px-2" onClick={closemodal}>
            X
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 mx-4 my-3 ">
          <div>
            <label className="text-sm font-medium text-gray-600">
              Category
            </label>

            <input
              type="text"
              name="name"
              placeholder="Enter category name "
              value={formData.name}
              onChange={handleChange}
              className="w-full mt-2 border rounded-xl px-4 py-3 outline-none focus:border-[#DA0037]"
              required
            />
          </div>
          {/* <div>
            <label className="text-sm font-medium text-gray-600">
              Category name
            </label>

            <input
              type="text"
              name="category"
              placeholder="Enter category like kurti , saree , suit..."
              value={formData.category}
              onChange={handleChange}
              className="w-full mt-2 border rounded-xl px-4 py-3 outline-none focus:border-[#DA0037]"
              required
            />
          </div> */}
          {/* <div>
            <label className="text-sm font-medium text-gray-600">
              Phone Number
            </label>

            <input
              type="text"
              name="phoneno"
              placeholder="Enter you contact no."
              value={formData.phoneno}
              onChange={handleChange}
              className="w-full mt-2 border rounded-xl px-4 py-3 outline-none focus:border-[#DA0037]"
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600">Address</label>

            <input
              type="text"
              name="location"
              placeholder="Enter your address"
              value={formData.location}
              onChange={handleChange}
              className="w-full mt-2 border rounded-xl px-4 py-3 outline-none focus:border-[#DA0037]"
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600">
              Description
            </label>

            <input
              type="text"
              name="description"
              placeholder="Enter description of the product"
              value={formData.description}
              onChange={handleChange}
              className="w-full mt-2 border rounded-xl px-4 py-3 outline-none focus:border-[#DA0037]"
              required
            />
          </div> */}

          <div>
            <input
  type="file"
  accept="image/*"
  name="images"
  onChange={(e) => {
    console.log("Selected File:", e.target.files[0]);

    setFormData({
      ...formData,
      image: e.target.files[0],
    });
  }}
  required
/>
          </div>

          <button
            type="submit"
            className="w-full bg-[#006EFF]  transition-all duration-300 text-white py-3 rounded-xl font-medium"
          >
            {loading ? "Creating..." : "Create category"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateCategories;

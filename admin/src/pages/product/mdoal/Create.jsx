import React from "react";
import { FaTimes } from "react-icons/fa";

const Create = ({ setShowModal }) => {
  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-lg relative">
        <button
          onClick={() => setShowModal(false)}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-600"
        >
          <FaTimes />
        </button>

        <h2 className="text-xl font-bold text-blue-700 mb-4">Create Product</h2>

        <div className="space-y-3">
          <input
            type="text"
            placeholder="Product Name"
            className="w-full border p-2 rounded"
          />
          <input
            type="number"
            placeholder="Price"
            className="w-full border p-2 rounded"
          />
          <input
            type="number"
            placeholder="Stock"
            className="w-full border p-2 rounded"
          />
          <input type="file" className="w-full border p-2 rounded" />

          <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            Save Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default Create;

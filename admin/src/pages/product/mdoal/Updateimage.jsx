import React, { useState } from "react";
import { FaTimes, FaUpload } from "react-icons/fa";
import { productApi } from "../../../apis/product";

const Updateimage = ({ product, setOpenImage, refresh }) => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [newImage, setNewImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImageSelect = (index) => {
    setSelectedIndex(index);
  };

  const handleNewImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setNewImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleUpdate = async () => {
    if (selectedIndex === null || !newImage) {
      alert("Select image and upload new image first");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("images", newImage);

      const replacedImages = [
        {
          index: selectedIndex,
          removedImageUrl: product.image[selectedIndex].url,
        },
      ];

      formData.append("replacedImages", JSON.stringify(replacedImages));

      const res = await productApi.updateImages(product._id, formData);
      console.log("image", res);

      alert("Image updated successfully");
      refresh();
      setOpenImage(false);
    } catch (error) {
      console.log(error);
      alert("Failed to update image");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-xl rounded-2xl p-6 space-y-4 relative">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold">Update Product Image</h2>
          <button onClick={() => setOpenImage(false)}>
            <FaTimes />
          </button>
        </div>

        <div>
          <p className="text-sm font-medium mb-2">Select image to replace:</p>
          <div className="flex gap-3 overflow-x-auto">
            {product?.image?.map((img, i) => (
              <img
                key={i}
                src={img.url}
                onClick={() => handleImageSelect(i)}
                className={`w-20 h-20 object-cover rounded-lg cursor-pointer border-2
                ${selectedIndex === i ? "border-blue-600" : "border-gray-200"}`}
              />
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Upload new image:
          </label>
          <input type="file" onChange={handleNewImage} />
        </div>

        {preview && (
          <div>
            <p className="text-sm font-medium mb-1">Preview:</p>
            <img
              src={preview}
              className="w-full h-48 object-contain border rounded-xl"
            />
          </div>
        )}

        <div className="flex justify-end gap-3 pt-3">
          <button
            onClick={() => setOpenImage(false)}
            className="px-4 py-2 bg-gray-200 rounded-lg"
          >
            Cancel
          </button>

          <button
            onClick={handleUpdate}
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2 disabled:opacity-60"
          >
            <FaUpload /> {loading ? "Updating..." : "Update"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Updateimage;

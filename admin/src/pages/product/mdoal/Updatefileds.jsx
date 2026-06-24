import React, { useEffect, useState } from "react";
import { productApi } from "../../../apis/product";
import { categoriesApi } from "../../../apis/categories";
import { useNavigate } from "react-router-dom";

const Updatefileds = ({ product, closemodal, fetchProduct }) => {
  const [categories, setcategories] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    keywords: "",
    discount: "",
    insale: "no",
    variants: [],
  });

  const addVariant = () => {
    setFormData((prev) => ({
      ...prev,
      variants: [
        ...prev.variants,
        {
          color: "",
          size: "",
          price: "",
          stock: "",
        },
      ],
    }));
  };

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        description: product.description,
        category: product.category?._id,
        keywords: product.keywords,
        discount: product.discount,
        insale: product.insale,
        variants: product.variants || [],
      });
    }
  }, [product]);

  const fetchcategory = async () => {
    try {
      const res = await categoriesApi.get();
      console.log("data is", res);

      setcategories(res.categories);
    } catch (error) {
      console.log("error is", error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const data = {
        name: formData.name,
        category: formData.category,
        description: formData.description,
        keywords: formData.keywords,
        discount: formData.discount,
        insale: formData.insale,
        variants: JSON.stringify(formData.variants),
      };

      const res = await productApi.updateFields(product._id, data);

      if (res.success) {
        fetchProduct();
        closemodal();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchcategory();
  }, []);
  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-3xl rounded-xl p-5 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-semibold">Update Product</h2>

          <button onClick={closemodal}>X</button>
        </div>

        <form onSubmit={handleUpdate} className="space-y-4">
          <input
            type="text"
            placeholder="Product Name"
            value={formData.name}
            onChange={(e) =>
              setFormData({
                ...formData,
                name: e.target.value,
              })
            }
            className="w-full border p-3 rounded"
          />

          <select
            value={formData.category}
            onChange={(e) =>
              setFormData({
                ...formData,
                category: e.target.value,
              })
            }
            className="w-full border p-3 rounded"
          >
            <option value="">Select Category</option>

            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>

          <textarea
            value={formData.description}
            onChange={(e) =>
              setFormData({
                ...formData,
                description: e.target.value,
              })
            }
            className="w-full border p-3 rounded"
          />

          <input
            type="text"
            placeholder="Keywords"
            value={formData.keywords}
            onChange={(e) =>
              setFormData({
                ...formData,
                keywords: e.target.value,
              })
            }
            className="w-full border p-3 rounded"
          />

          <input
            type="number"
            placeholder="Discount"
            value={formData.discount}
            onChange={(e) =>
              setFormData({
                ...formData,
                discount: e.target.value,
              })
            }
            className="w-full border p-3 rounded"
          />

          <select
            value={formData.insale}
            onChange={(e) =>
              setFormData({
                ...formData,
                insale: e.target.value,
              })
            }
          >
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>

          <h3 className="font-semibold">Variants</h3>

          {formData.variants.map((variant, index) => (
            <div key={index} className="flex gap-2">
              <input
                value={variant.color}
                placeholder="Color"
                className="border p-2"
                onChange={(e) => {
                  const updated = [...formData.variants];

                  updated[index].color = e.target.value;

                  setFormData({
                    ...formData,
                    variants: updated,
                  });
                }}
              />

              <input
                value={variant.size}
                placeholder="Size"
                className="border p-2"
                onChange={(e) => {
                  const updated = [...formData.variants];

                  updated[index].size = e.target.value;

                  setFormData({
                    ...formData,
                    variants: updated,
                  });
                }}
              />

              <input
                value={variant.price}
                placeholder="Price"
                className="border p-2"
                onChange={(e) => {
                  const updated = [...formData.variants];

                  updated[index].price = e.target.value;

                  setFormData({
                    ...formData,
                    variants: updated,
                  });
                }}
              />

              <input
                value={variant.stock}
                placeholder="Stock"
                className="border p-2"
                onChange={(e) => {
                  const updated = [...formData.variants];

                  updated[index].stock = e.target.value;

                  setFormData({
                    ...formData,
                    variants: updated,
                  });
                }}
              />
            </div>
          ))}

          <button
            type="button"
            onClick={addVariant}
            className="bg-blue-500 text-white px-3 py-2 rounded"
          >
            Add Variant
          </button>

          <button
            type="submit"
            className="w-full bg-green-500 text-white py-3 rounded"
          >
            Update Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default Updatefileds;

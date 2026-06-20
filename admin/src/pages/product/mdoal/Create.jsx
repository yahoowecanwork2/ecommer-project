import React, { useEffect, useState } from "react";
import { productApi } from "../../../apis/product";
import { categoriesApi } from "../../../apis/categories";

const Create = ({ closemodal, fetchproduct }) => {
  const [loading, setLoading] = useState(false);
  const [categories, setcategories] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    keywords: "",
    discount: "",
    insale: "no",
    imageGroups: [
      {
        main: null,
        subImages: [],
      },
    ],

    variants: [
      {
        color: "",
        size: "",
        price: "",
        stock: "",
      },
    ],
  });

  const fetchcategory = async () => {
    try {
      const res = await categoriesApi.get();
      console.log("data is", res);

      setcategories(res.categories);
    } catch (error) {
      console.log("error is", error);
    }
  };

  useEffect(() => {
    fetchcategory();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();

    data.append("name", formData.name);
    data.append("category", formData.category);
    data.append("description", formData.description);
    data.append("keywords", formData.keywords);
    data.append("discount", formData.discount);
    data.append("insale", formData.insale);

    data.append("variants", JSON.stringify(formData.variants));

    // Backend ke liye metadata
    data.append(
      "imageGroups",
      JSON.stringify([
        {
          main: {},
          subImages: formData.imageGroups[0].subImages.map(() => ({})),
        },
      ]),
    );

    // Main image
    data.append("images", formData.imageGroups[0].main);

    // Sub images
    formData.imageGroups[0].subImages.forEach((file) => {
      data.append("images", file);
    });

    const res = await productApi.create(data);
    if(res.success){
      fetchproduct()
      closemodal()
    }
    console.log(res);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

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

  return (
    <div className="fixed inset-0 z-50 min-h-screen overflow-y-auto bg-black/40 flex justify-center items-center p-4">
      <div className="bg-white w-full max-w-3xl mt-60 rounded-3xl shadow-2xl overflow-y-auto ">
        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-4">
          <h2 className="text-xl font-semibold">Create Product</h2>

          <button className="border px-2" onClick={closemodal}>
            X
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 mx-4 my-3 ">
          <div>
            <label className="text-sm font-medium text-gray-600">
              Product Name
            </label>

            <input
              type="text"
              name="name"
              placeholder="Enter product name "
              value={formData.name}
              onChange={handleChange}
              className="w-full mt-2 border rounded-xl px-4 py-3 outline-none focus:border-[#DA0037]"
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600">
              Category name
            </label>

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full mt-2 border rounded-xl px-4 py-3"
              required
            >
              <option value="">Select Category</option>

              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
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
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600">
              Discount
            </label>

            <input
              type="text"
              name="discount"
              placeholder="Enter Discount of product"
              value={formData.discount}
              onChange={handleChange}
              className="w-full mt-2 border rounded-xl px-4 py-3 outline-none focus:border-[#DA0037]"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600">
              Keywords
            </label>

            <input
              type="text"
              name="keywords"
              placeholder="Enter keywords"
              value={formData.keywords}
              onChange={handleChange}
              className="w-full mt-2 border rounded-xl px-4 py-3 outline-none focus:border-[#DA0037]"
              required
            />
          </div>

          <div className="">
            <label className="text-sm font-medium text-gray-600 pr-2 ">
              Sale :
            </label>

            <select
              name="insale"
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
          </div>

          <div>
            <input
              type="file"
              onChange={(e) => {
                const updated = [...formData.imageGroups];

                updated[0].main = e.target.files[0];

                setFormData({
                  ...formData,
                  imageGroups: updated,
                });
              }}
            />

            <input
              type="file"
              multiple
              onChange={(e) => {
                const updated = [...formData.imageGroups];

                updated[0].subImages = [...e.target.files];

                setFormData({
                  ...formData,
                  imageGroups: updated,
                });
              }}
            />
          </div>

          <div className="flex flex-col gap-3">
            <label className="text-md font-medium text-gray-600">
              Variants
            </label>

            {formData.variants.map((variant, index) => (
              <div key={index} className="flex overflow-x-hidden gap-2 ">
                <input
                  placeholder="Color"
                  value={variant.color}
                  className="border px-3 w-1/4 "
                  onChange={(e) => {
                    const updated = [...formData.variants];
                    updated[index].color = e.target.value;

                    setFormData({
                      ...formData,
                      variants: updated,
                    });
                  }}
                />

                <select
                  value={variant.size}
                  onChange={(e) => {
                    const updated = [...formData.variants];
                    updated[index].size = e.target.value;

                    setFormData({
                      ...formData,
                      variants: updated,
                    });
                  }}
                >
                  <option value="">Select Size</option>
                  <option value="S">S</option>
                  <option value="M">M</option>
                  <option value="L">L</option>
                  <option value="XL">XL</option>
                  <option value="XXL">XXL</option>
                  <option value="Free Size">Free Size</option>
                </select>

                <input
                  placeholder="Price"
                  type="number"
                  value={variant.price}
                  className="border px-3 w-1/4 "
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
                  placeholder="Stock"
                  type="number"
                  value={variant.stock}
                  className="border px-3 w-1/4"
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
              className="border bg-[#006EFF] text-white font-semibold px-2 py-2 rounded-lg w-1/3 flex justify-center "
              onClick={addVariant}
            >
              Add Variant
            </button>
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

export default Create;

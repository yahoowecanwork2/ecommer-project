import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { productApi } from "../../apis/product";
import Layout from "../../componets/common/Layout";
import { FaArrowLeft, FaShoppingCart, FaTag } from "react-icons/fa";
import { MdInventory, MdCategory } from "react-icons/md";
import { GiTakeMyMoney } from "react-icons/gi";

const Productdetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [activeImg, setActiveImg] = useState("");

  const getSingleProduct = async () => {
    try {
      const res = await productApi.getSingle(id);
      setProduct(res.product);
      setActiveImg(res.product.image[0]?.url);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id) getSingleProduct();
  }, [id]);

  if (!product)
    return (
      <Layout>
        <div className="p-10 text-center text-lg font-semibold">
          Loading product...
        </div>
      </Layout>
    );

  return (
    <Layout>
      <div className="p-8 bg-gradient-to-br from-gray-100 to-gray-200 min-h-screen">
        <button
          onClick={() => navigate("/product")}
          className="flex items-center gap-2 mb-6 text-sm font-semibold text-blue-600 hover:text-blue-800"
        >
          <FaArrowLeft /> Back to Products
        </button>

        <div className="max-w-6xl mx-auto bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <div className="border rounded-2xl overflow-hidden mb-4 shadow">
              <img
                src={activeImg}
                alt={product.name}
                className="w-full h-[420px] object-cover hover:scale-105 transition duration-500"
              />
            </div>

            <div className="flex gap-3">
              {product.image.map((img, i) => (
                <img
                  key={i}
                  src={img.url}
                  alt=""
                  onClick={() => setActiveImg(img.url)}
                  className={`w-20 h-20 object-cover rounded-xl cursor-pointer border-2 
                  ${
                    activeImg === img.url
                      ? "border-blue-500 scale-105"
                      : "border-gray-200"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="space-y-5">
            <h2 className="text-4xl font-extrabold text-gray-800 tracking-wide">
              {product.name}
            </h2>

            <div className="flex items-center gap-3 text-gray-600">
              <MdCategory className="text-xl text-blue-600" />
              <span className="font-medium">{product.category.name}</span>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-3xl font-bold text-blue-600 flex items-center gap-1">
                <GiTakeMyMoney /> ₹{product.price}
              </span>

              {product.discount > 0 && (
                <span className="flex items-center gap-1 text-sm bg-green-100 text-green-700 px-3 py-1 rounded-full">
                  <FaTag /> {product.discount}% OFF
                </span>
              )}
            </div>

            <p className="text-gray-700 leading-relaxed text-lg">
              {product.description}
            </p>

            <div className="flex gap-6 text-sm">
              <span className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-xl">
                <MdInventory className="text-blue-600" />
                Stock: {product.stock}
              </span>

              <span
                className={`px-4 py-2 rounded-xl font-semibold
                ${
                  product.available === "yes"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {product.available === "yes" ? "Available" : "Out of Stock"}
              </span>
            </div>

            <div className="flex gap-4 mt-6">
              <button className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition shadow-lg">
                <FaShoppingCart /> Add to Cart
              </button>

              <button className="flex items-center gap-2 border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-xl hover:bg-blue-50 transition">
                <GiTakeMyMoney /> Buy Now
              </button>
            </div>

            <div className="pt-4 border-t text-sm text-gray-500 space-y-1">
              <p>
                <b>Keywords:</b> {product.keywords}
              </p>
              <p>
                <b>Product ID:</b> {product.uniqueId}
              </p>
              <p>
                <b>Slug:</b> {product.slug}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Productdetail;

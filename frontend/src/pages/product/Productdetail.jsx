import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { productApi } from "../../apis/product";
import { FaHeart, FaArrowLeft, FaShoppingCart, FaCheck } from "react-icons/fa";
import HeaderHome from "../common/Header";

const Productdetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [activeImg, setActiveImg] = useState("");

  const getSingleProduct = async () => {
    try {
      const res = await productApi.getSingle(slug);
      setProduct(res.product);
      setActiveImg(res.product.image[0]?.url);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (slug) getSingleProduct();
  }, [slug]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        Loading product...
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-white">
      <HeaderHome />

      <div className="bg-gradient-to-br from-[#160059]/5 to-gray-100 px-6 py-10">
        <div className="mb-6">
          <button
            onClick={() => navigate("/product")}
            className="flex items-center gap-2 bg-[#160059] text-white px-4 py-2 rounded-lg shadow hover:opacity-90 transition"
          >
            <FaArrowLeft /> Back to Products
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <div className="flex flex-col items-center">
            <div className="relative w-full bg-white rounded-xl p-6 shadow-md">
              <span className="absolute top-4 left-4 bg-[#160059] text-white text-sm px-3 py-1 rounded-full shadow">
                {product?.discount}% OFF
              </span>

              <img
                src={activeImg}
                alt={product.name}
                className="mx-auto w-full h-[420px] object-contain transition-transform duration-300 hover:scale-105"
              />
            </div>

            <div className="flex gap-4 mt-6">
              {product?.image.map((img) => (
                <div
                  key={img._id}
                  onClick={() => setActiveImg(img.url)}
                  className={`p-1 rounded-lg cursor-pointer transition-all ${
                    activeImg === img.url
                      ? "bg-[#160059]"
                      : "bg-gray-200 hover:bg-[#160059]/40"
                  }`}
                >
                  <img
                    src={img.url}
                    alt=""
                    className="w-20 h-20 object-cover rounded bg-white"
                  />
                </div>
              ))}
            </div>
          </div>

          <div>
            <h1 className="text-4xl font-bold text-gray-800">
              {product?.name}
            </h1>

            <p className="mt-2 text-gray-500">{product?.keywords}</p>

            <p className="mt-5 text-gray-700 leading-relaxed">
              {product?.description}
            </p>

            <div className="mt-6 flex items-center gap-4">
              <span className="text-4xl font-bold text-[#160059]">
                ₹{product?.price}
              </span>
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                {product?.stock > 0 ? "In Stock" : "Out of Stock"}
              </span>
            </div>

            <ul className="mt-6 space-y-2 text-gray-600">
              <li className="flex items-center gap-2">
                <FaCheck className="text-[#160059]" /> Premium Quality
              </li>
              <li className="flex items-center gap-2">
                <FaCheck className="text-[#160059]" /> Fast Delivery
              </li>
              <li className="flex items-center gap-2">
                <FaCheck className="text-[#160059]" /> Easy Return Policy
              </li>
            </ul>

            <div className="flex gap-5 mt-10">
              <button className="flex items-center gap-2 bg-[#160059] text-white px-8 py-4 rounded-xl shadow hover:scale-105 transition">
                <FaShoppingCart /> Add to Cart
              </button>

              <button className="flex items-center gap-2 border-2 border-[#160059] text-[#160059] px-8 py-4 rounded-xl hover:bg-[#160059] hover:text-white transition">
                <FaHeart /> Wishlist
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Productdetail;

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { productApi } from "../../apis/product";
import { FaHeart, FaArrowLeft, FaShoppingCart, FaCheck } from "react-icons/fa";
import HeaderHome from "../common/Header";
import Header from "../common/Header";

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
      <Header />

<div className="bg-[#faf7f2] px-6 py-10 mt-12">
  <div className="max-w-7xl mx-auto">

    {/* Back Button */}
    <div className="mb-6">
      <button
        onClick={() => navigate("/product")}
        className="flex items-center gap-2 bg-black text-white px-4 py-2 hover:bg-gray-800 transition"
      >
        <FaArrowLeft /> Back to Products
      </button>
    </div>


    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">

      {/* IMAGE SECTION */}
      <div className="flex flex-col items-center">

        <div className="relative w-full bg-white border border-gray-200 p-6">

          {product?.discount > 0 && (
            <span className="absolute top-4 left-4 bg-black text-white text-xs px-2 py-1">
              {product?.discount}% OFF
            </span>
          )}

          <img
            src={activeImg}
            alt={product?.name}
            className="mx-auto w-full h-[420px] object-contain transition-transform duration-300 hover:scale-105"
          />

        </div>


        {/* THUMBNAILS */}
        <div className="flex gap-4 mt-6">

          {product?.image.map((img) => (
            <div
              key={img._id}
              onClick={() => setActiveImg(img.url)}
              className={`cursor-pointer border p-1 transition ${
                activeImg === img.url
                  ? "border-black"
                  : "border-gray-200 hover:border-black"
              }`}
            >
              <img
                src={img.url}
                alt=""
                className="w-20 h-20 object-cover"
              />
            </div>
          ))}

        </div>

      </div>


      {/* PRODUCT INFO */}
      <div>

        <h1 className="text-3xl font-semibold text-gray-900">
          {product?.name}
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          {product?.keywords}
        </p>

        <p className="mt-6 text-gray-700 leading-relaxed">
          {product?.description}
        </p>


        {/* PRICE */}
        <div className="mt-6 flex items-center gap-4">

          <span className="text-3xl font-bold text-gray-900">
            ₹{product?.price}
          </span>

          <span className="text-xs px-2 py-1 bg-green-100 text-green-700">
            {product?.stock > 0 ? "In Stock" : "Out of Stock"}
          </span>

        </div>


        {/* FEATURES */}
        <ul className="mt-6 space-y-2 text-gray-600 text-sm">
          <li className="flex items-center gap-2">
            <FaCheck className="text-black text-xs" /> Premium Quality
          </li>

          <li className="flex items-center gap-2">
            <FaCheck className="text-black text-xs" /> Fast Delivery
          </li>

          <li className="flex items-center gap-2">
            <FaCheck className="text-black text-xs" /> Easy Return Policy
          </li>
        </ul>


        {/* ACTIONS */}
        <div className="flex gap-4 mt-10">

          <button className="flex items-center gap-2 bg-black text-white px-8 py-3 hover:bg-gray-800 transition">
            <FaShoppingCart /> Add to Cart
          </button>

          <button className="flex items-center gap-2 border border-black text-black px-8 py-3 hover:bg-black hover:text-white transition">
            <FaHeart /> Wishlist
          </button>

        </div>

      </div>

    </div>
  </div>
</div>
    </div>
  );
};

export default Productdetail;

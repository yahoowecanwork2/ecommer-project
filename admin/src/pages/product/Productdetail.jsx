import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { productApi } from "../../apis/product";
import Layout from "../../componets/common/Layout";
import {
  FaArrowLeft,
  FaEdit,
  FaTag,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import { MdInventory, MdCategory } from "react-icons/md";
import { GiTakeMyMoney } from "react-icons/gi";
import Updatefileds from "./mdoal/Updatefileds";
import Update from "./mdoal/Update";
import Updaterefund from "./mdoal/Updaterefund";

const Productdetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [activeImg, setActiveImg] = useState("");
  const [openEdit, setOpenEdit] = useState(false);
  const [openStock, setOpenStock] = useState(false);
  const [openRefund, setOpenRefund] = useState(false);
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-8">
        {/* Top bar */}
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => navigate("/product")}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold"
          >
            <FaArrowLeft /> Back
          </button>

          <button
            onClick={() => setOpenEdit(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-xl shadow hover:bg-blue-700 transition"
          >
            <FaEdit /> Edit Product
          </button>
        </div>

        {/* Main Card */}
        <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-xl p-8 grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Left - Images */}
          <div>
            <div className="border rounded-2xl overflow-hidden shadow-md">
              <img
                src={activeImg}
                alt={product.name}
                className="w-full h-[420px] object-cover hover:scale-105 transition duration-500"
              />
            </div>

            <div className="flex gap-3 mt-4">
              {product?.image?.map((img, i) => (
                <img
                  key={i}
                  src={img.url}
                  alt=""
                  onClick={() => setActiveImg(img.url)}
                  className={`w-20 h-20 object-cover rounded-xl cursor-pointer border-2 transition
                  ${
                    activeImg === img.url
                      ? "border-blue-500 scale-105"
                      : "border-gray-200 hover:border-blue-300"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Right - Info */}
          <div className="space-y-5">
            <h2 className="text-4xl font-bold text-gray-800">
              {product?.name}
            </h2>

            <div className="flex items-center gap-2 text-gray-600">
              <MdCategory className="text-blue-600 text-xl" />
              <span className="font-medium">{product?.category?.name}</span>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-3xl font-extrabold text-blue-600 flex items-center gap-1">
                <GiTakeMyMoney /> ₹{product?.price}
              </span>

              {product?.discount > 0 && (
                <span className="flex items-center gap-1 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                  <FaTag /> {product?.discount}% OFF
                </span>
              )}
            </div>

            <p className="text-gray-700 leading-relaxed">
              {product?.description}
            </p>

            {/* Status Boxes */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center justify-between bg-blue-50 px-4 py-3 rounded-xl">
                <div className="flex items-center gap-2">
                  <MdInventory className="text-blue-600 text-xl" />
                  <span>Stock: {product?.stock}</span>
                </div>

                <button
                  onClick={() => setOpenStock(true)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <FaEdit />
                </button>
              </div>

              <div
                className={`flex items-center gap-2 px-4 py-3 rounded-xl font-semibold
                ${
                  product?.available === "yes"
                    ? "bg-green-50 text-green-700"
                    : "bg-red-50 text-red-700"
                }`}
              >
                {product?.available === "yes" ? (
                  <FaCheckCircle />
                ) : (
                  <FaTimesCircle />
                )}
                {product?.available === "yes" ? "Available" : "Out of Stock"}
              </div>

              <div className="flex items-center justify-between bg-purple-50 text-purple-700 px-4 py-3 rounded-xl font-semibold">
                <span>Refund: {product?.refund}%</span>

                <button
                  onClick={() => setOpenRefund(true)}
                  className="text-purple-700 hover:text-purple-900"
                >
                  <FaEdit />
                </button>
              </div>
            </div>

            {/* Keywords */}
            <div className="pt-4 border-t text-sm text-gray-500">
              <b>Keywords:</b> {product?.keywords}
            </div>
          </div>
        </div>

        {openEdit && (
          <Updatefileds
            product={product}
            setOpenEdit={setOpenEdit}
            refresh={getSingleProduct}
          />
        )}
        {openStock && (
          <Update
            product={product}
            setOpenStock={setOpenStock}
            refresh={getSingleProduct}
          />
        )}
        {openRefund && (
          <Updaterefund
            product={product}
            setOpenRefund={setOpenRefund}
            refresh={getSingleProduct}
          />
        )}
      </div>
    </Layout>
  );
};

export default Productdetail;

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
  FaTrash,
  FaImage,
} from "react-icons/fa";

import { MdInventory, MdCategory } from "react-icons/md";
import { GiTakeMyMoney } from "react-icons/gi";
import Updatefileds from "./mdoal/Updatefileds";
import Update from "./mdoal/Update";
import Updaterefund from "./mdoal/Updaterefund";
import Updateimage from "./mdoal/Updateimage";

const Productdetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [activeImg, setActiveImg] = useState("");
  const [openEdit, setOpenEdit] = useState(false);
  const [openStock, setOpenStock] = useState(false);
  const [openRefund, setOpenRefund] = useState(false);
  const [openImage, setOpenImage] = useState(false);

  const getSingleProduct = async () => {
    try {
      const res = await productApi.getSingle(id);
      setProduct(res.product);
      setActiveImg(res.product.image[0]?.url);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;
    try {
      await productApi.delete(product._id);
      alert("Product deleted successfully");
      navigate("/product");
    } catch (error) {
      console.log(error);
      alert("Failed to delete product");
    }
  };

  useEffect(() => {
    if (id) getSingleProduct();
  }, [id]);

  if (!product)
    return (
      <Layout>
        <div className="p-10 text-center text-lg font-semibold animate-pulse text-[#160059]">
          Loading product...
        </div>
      </Layout>
    );

  return (
    <Layout>
      <div className="min-h-screen bg-white p-6">
        {/* Top bar */}
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => navigate("/product")}
            className="flex items-center gap-2 text-[#160059] font-medium hover:underline"
          >
            <FaArrowLeft /> Back
          </button>

          <div className="flex gap-3">
            <button
              onClick={() => setOpenEdit(true)}
              className="flex items-center gap-2 bg-[#160059] text-white px-5 py-2 rounded-lg shadow hover:opacity-90"
            >
              <FaEdit /> Edit
            </button>

            <button
              onClick={handleDelete}
              className="flex items-center gap-2 border border-[#160059] text-[#160059] px-5 py-2 rounded-lg hover:bg-[#160059]/10"
            >
              <FaTrash /> Delete
            </button>
          </div>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Image Section */}
          <div className="bg-white border rounded-xl shadow-sm p-4 relative">
            <button
              onClick={() => setOpenImage(true)}
              className="absolute top-3 right-3 bg-[#160059] text-white p-2 rounded-md"
            >
              <FaImage />
            </button>

            <img
              src={activeImg}
              alt={product.name}
              className="w-full h-[380px] object-contain"
            />

            <div className="flex gap-3 mt-4 overflow-x-auto">
              {product?.image?.map((img, i) => (
                <img
                  key={i}
                  src={img.url}
                  onClick={() => setActiveImg(img.url)}
                  className={`w-20 h-20 object-cover rounded-md cursor-pointer border
                  ${
                    activeImg === img.url
                      ? "border-[#160059]"
                      : "border-gray-200"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Details Section */}
          <div className="bg-white border rounded-xl shadow-sm p-6 space-y-5 text-[#160059]">
            <h2 className="text-2xl font-bold">{product?.name}</h2>

            <div className="flex items-center gap-2 text-gray-600">
              <MdCategory className="text-[#160059]" />{" "}
              {product?.category?.name}
            </div>

            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold flex items-center gap-1">
                <GiTakeMyMoney /> ₹{product?.price}
              </span>

              {product?.discount > 0 && (
                <span className="flex items-center gap-1 bg-[#160059]/10 text-[#160059] px-3 py-1 rounded-full text-sm">
                  <FaTag /> {product?.discount}% OFF
                </span>
              )}
            </div>

            <p className="text-gray-600 text-sm leading-relaxed">
              {product?.description}
            </p>

            {/* Stock */}
            <div className="flex justify-between items-center bg-gray-50 px-4 py-3 rounded-lg border">
              <div className="flex items-center gap-2">
                <MdInventory className="text-[#160059]" />
                <span>Stock: {product?.stock}</span>
              </div>
              <button
                onClick={() => setOpenStock(true)}
                className="p-2 border border-[#160059] text-[#160059] rounded-md hover:bg-[#160059]/10"
              >
                <FaEdit />
              </button>
            </div>

            {/* Availability */}
            <div
              className={`flex items-center gap-2 px-4 py-3 rounded-lg border
              ${
                product?.available === "yes"
                  ? "bg-green-50 text-green-700 border-green-200"
                  : "bg-red-50 text-red-700 border-red-200"
              }`}
            >
              {product?.available === "yes" ? (
                <FaCheckCircle />
              ) : (
                <FaTimesCircle />
              )}
              {product?.available === "yes" ? "Available" : "Out of Stock"}
            </div>

            {/* Refund */}
            <div className="flex justify-between items-center bg-gray-50 px-4 py-3 rounded-lg border">
              <span>Refund: {product?.refund}%</span>
              <button
                onClick={() => setOpenRefund(true)}
                className="p-2 border border-[#160059] text-[#160059] rounded-md hover:bg-[#160059]/10"
              >
                <FaEdit />
              </button>
            </div>

            <div className="pt-3 border-t text-xs text-gray-500">
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
        {openImage && (
          <Updateimage
            product={product}
            setOpenImage={setOpenImage}
            refresh={getSingleProduct}
          />
        )}
      </div>
    </Layout>
  );
};

export default Productdetail;

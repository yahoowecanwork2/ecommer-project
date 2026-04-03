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
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [activeImg, setActiveImg] = useState("");
  const [activeGroup, setActiveGroup] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);
  const [openStock, setOpenStock] = useState(false);
  const [openRefund, setOpenRefund] = useState(false);
  const [openImage, setOpenImage] = useState(false);

  // ✅ Fetch product
  const getSingleProduct = async () => {
    try {
      const res = await productApi.getSingle(id);
      console.log("single", res);

      setProduct(res.product);

      // ✅ default first group select
      const firstGroup = res.product.images[0];
      setActiveGroup(firstGroup);

      // ✅ default image = main image
      setActiveImg(firstGroup?.main?.url);

      setSelectedVariant(res.product.variants[0]);
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
        <div className="h-[80vh] flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-gray-200 border-t-black rounded-full animate-spin"></div>
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400">
              Loading Product...
            </p>
          </div>
        </div>
      </Layout>
    );

  return (
    <Layout>
      <div className="max-w-[1400px] mx-auto p-4 lg:p-8 bg-white min-h-screen">
        {/* --- HEADER BAR --- */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 pb-6 border-b border-gray-100">
          <button
            onClick={() => navigate("/product")}
            className="group flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-black transition-all"
          >
            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />{" "}
            Back to Inventory
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={handleDelete}
              className="flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-red-500 bg-red-50 hover:bg-red-100 rounded-lg transition-all"
            >
              <FaTrash size={12} /> DELETE PRODUCT
            </button>
            <button
              onClick={() => setOpenEdit(true)}
              className="flex items-center gap-2 px-6 py-2.5 text-xs font-bold bg-black text-white hover:bg-zinc-800 rounded-lg shadow-lg shadow-gray-200 transition-all"
            >
              <FaEdit size={12} /> EDIT DETAILS
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-12">
          {/* --- LEFT: VISUALS (Sticky) --- */}
          <div className="lg:col-span-5 space-y-6">
            <div className="sticky top-10 space-y-4">
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 group">
                <img
                  src={activeImg}
                  className="w-full h-full object-contain mix-blend-multiply p-4"
                  alt="Main view"
                />
                <button
                  onClick={() => setOpenImage(true)}
                  className="absolute bottom-4 right-4 p-3 bg-white shadow-xl rounded-xl hover:scale-110 transition-transform"
                >
                  <FaImage className="text-gray-800" />
                </button>
              </div>

              {/* Variant Groups (Main Images) */}
              <div className="space-y-2">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
                  Style Groups
                </p>
                <div className="flex gap-3 overflow-x-auto py-2 no-scrollbar">
                  {product?.images?.map((group, i) => (
                    <div
                      key={i}
                      onClick={() => {
                        setActiveGroup(group);
                        setActiveImg(group.main.url);
                      }}
                      className={`relative min-w-[70px] h-[70px] rounded-xl border-2 cursor-pointer transition-all p-1 bg-white ${
                        activeGroup?._id === group._id
                          ? "border-black scale-105 shadow-md"
                          : "border-gray-100 opacity-60"
                      }`}
                    >
                      <img
                        src={group.main.url}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Sub Images */}
              {activeGroup?.subImages?.length > 0 && (
                <div className="flex gap-2 overflow-x-auto pt-2">
                  {activeGroup?.subImages?.map((img, i) => (
                    <img
                      key={i}
                      src={img.url}
                      onClick={() => setActiveImg(img.url)}
                      className={`w-14 h-14 rounded-lg border cursor-pointer object-cover transition-all hover:opacity-100 ${
                        activeImg === img.url
                          ? "border-black opacity-100"
                          : "border-transparent opacity-40"
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* --- RIGHT: CONTENT --- */}
          <div className="lg:col-span-7">
            <div className="max-w-2xl space-y-8">
              {/* Product Identity */}
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-100 rounded-full text-[10px] font-bold text-zinc-600 uppercase">
                  <MdCategory /> {product?.category?.name}
                </div>
                <h1 className="text-4xl font-black text-gray-900 leading-tight">
                  {product.name}
                </h1>
                <div className="flex items-baseline gap-4">
                  <span className="text-4xl font-medium text-gray-900">
                    ₹{selectedVariant?.price?.toLocaleString()}
                  </span>
                  {product?.discount > 0 && (
                    <span className="text-sm font-bold text-green-600">
                      ({product.discount}% OFF)
                    </span>
                  )}
                </div>
              </div>

              {/* Variant Selector */}
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-500">
                    Available Sizes
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  {product.variants.map((variant) => (
                    <button
                      key={variant._id}
                      onClick={() => setSelectedVariant(variant)}
                      disabled={variant.stock === 0}
                      className={`px-6 py-3 text-sm font-bold border-2 rounded-xl transition-all ${
                        selectedVariant?._id === variant._id
                          ? "bg-black text-white border-black"
                          : "bg-white text-gray-700 border-gray-100 hover:border-gray-300"
                      } ${variant.stock === 0 ? "opacity-30 cursor-not-allowed bg-gray-50 border-dashed" : ""}`}
                    >
                      {variant.size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Status Cards */}
              <div className="grid sm:grid-cols-2 gap-4 pt-4">
                <div className="p-5 rounded-2xl border border-gray-100 bg-gray-50/50 flex justify-between items-start">
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-gray-400 uppercase">
                      Inventory Status
                    </p>
                    <div className="flex items-center gap-2">
                      <MdInventory className="text-gray-400" />
                      <span className="text-xl font-bold">
                        {selectedVariant?.stock} Units
                      </span>
                    </div>
                    <div
                      className={`text-[10px] font-bold flex items-center gap-1 mt-1 ${selectedVariant?.stock > 0 ? "text-green-600" : "text-red-600"}`}
                    >
                      {selectedVariant?.stock > 0 ? (
                        <>
                          <FaCheckCircle /> READY TO SHIP
                        </>
                      ) : (
                        <>
                          <FaTimesCircle /> OUT OF STOCK
                        </>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => setOpenStock(true)}
                    className="p-2 hover:bg-white rounded-lg transition-colors"
                  >
                    <FaEdit className="text-gray-400 hover:text-black" />
                  </button>
                </div>

                <div className="p-5 rounded-2xl border border-gray-100 bg-gray-50/50 flex justify-between items-start">
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-gray-400 uppercase">
                      Returns Policy
                    </p>
                    <div className="flex items-center gap-2">
                      <GiTakeMyMoney className="text-gray-400" size={20} />
                      <span className="text-xl font-bold">
                        {product.refund}% Refund
                      </span>
                    </div>
                    <p className="text-[10px] text-gray-500 font-medium">
                      Eligible for return within 7 days
                    </p>
                  </div>
                  <button
                    onClick={() => setOpenRefund(true)}
                    className="text-[10px] font-black underline underline-offset-4 hover:text-blue-600"
                  >
                    CHANGE
                  </button>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-3 border-t border-gray-100 pt-8">
                <p className="text-xs font-bold uppercase tracking-widest text-gray-500">
                  About this product
                </p>
                <p className="text-gray-600 leading-relaxed font-medium">
                  {product.description}
                </p>
              </div>

              {/* Keywords Tagging */}
              <div className="pt-4">
                <div className="flex flex-wrap gap-2">
                  {product.keywords?.split(",").map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-zinc-50 border border-zinc-100 text-zinc-500 rounded text-xs font-medium"
                    >
                      #{tag.trim()}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- MODALS --- */}
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

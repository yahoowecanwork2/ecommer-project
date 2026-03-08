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

  // --- Logic remains identical ---
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
        <div className="p-10 text-center text-[11px] font-bold uppercase tracking-[0.2em] animate-pulse text-gray-400">
          Syncing product data...
        </div>
      </Layout>
    );

  return (
    <Layout>
      <div className="space-y-6">
        {/* TOP TOOLBAR */}
        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
          <button
            onClick={() => navigate("/product")}
            className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-gray-400 hover:text-gray-900 transition-colors"
          >
            <FaArrowLeft size={10} /> Back to Inventory
          </button>

          <div className="flex gap-2">
            <button
              onClick={handleDelete}
              className="px-4 py-2 text-[11px] font-bold uppercase tracking-widest border border-red-100 text-red-600 rounded-sm hover:bg-red-600 hover:text-white transition-all"
            >
              <FaTrash className="inline mr-2" /> Delete
            </button>
            <button
              onClick={() => setOpenEdit(true)}
              className="px-4 py-2 text-[11px] font-bold uppercase tracking-widest bg-gray-900 text-white rounded-sm hover:bg-gray-800 transition-all shadow-sm"
            >
              <FaEdit className="inline mr-2" /> Edit Details
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* LEFT: IMAGE GALLERY (4 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white border border-gray-200 rounded-sm p-4 relative group">
              <button
                onClick={() => setOpenImage(true)}
                className="absolute top-4 right-4 bg-white/90 backdrop-blur border border-gray-200 text-gray-900 p-2 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity z-10"
              >
                <FaImage />
              </button>

              <div className="aspect-square bg-gray-50 flex items-center justify-center overflow-hidden">
                <img
                  src={activeImg}
                  alt={product.name}
                  className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500 hover:scale-105"
                />
              </div>
            </div>

            <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar">
              {product?.image?.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(img.url)}
                  className={`relative w-20 h-20 flex-shrink-0 border transition-all rounded-sm overflow-hidden bg-gray-50 ${
                    activeImg === img.url ? "border-gray-900 ring-1 ring-gray-900" : "border-gray-200"
                  }`}
                >
                  <img src={img.url} className="w-full h-full object-cover mix-blend-multiply" />
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT: DATA SECTION (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Primary Info */}
            <div className="bg-white border border-gray-200 rounded-sm p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                 <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] flex items-center gap-1">
                  <MdCategory /> {product?.category?.name}
                </span>
              </div>
              <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight mb-4">
                {product?.name}
              </h2>
              
              <div className="flex items-baseline gap-4 mb-6">
                <span className="text-3xl font-black text-gray-900 flex items-center gap-1">
                  <span className="text-lg font-bold mt-1">₹</span>{product?.price}
                </span>
                {product?.discount > 0 && (
                  <span className="text-[10px] font-bold bg-green-500 text-white px-2 py-1 rounded-sm uppercase tracking-widest">
                    <FaTag className="inline mr-1" /> {product?.discount}% OFF
                  </span>
                )}
              </div>

              <p className="text-xs text-gray-500 font-medium leading-relaxed max-w-2xl border-t border-gray-50 pt-4 italic">
                {product?.description}
              </p>
            </div>

            {/* Inventory & Status Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Stock Tile */}
              <div className="bg-white border border-gray-200 rounded-sm p-4 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Current Stock</p>
                  <p className="text-lg font-black text-gray-900 flex items-center gap-2">
                    <MdInventory className="text-gray-300" /> {product?.stock}
                  </p>
                </div>
                <button
                  onClick={() => setOpenStock(true)}
                  className="p-2 text-gray-400 hover:text-gray-900 transition-colors"
                >
                  <FaEdit size={14} />
                </button>
              </div>

              {/* Status Tile */}
              <div className={`border rounded-sm p-4 flex items-center gap-3 ${
                product?.available === "yes" ? "bg-green-50 border-green-100 text-green-700" : "bg-red-50 border-red-100 text-red-700"
              }`}>
                {product?.available === "yes" ? <FaCheckCircle size={20} /> : <FaTimesCircle size={20} />}
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest opacity-70 mb-0.5">Availability</p>
                  <p className="text-xs font-black uppercase tracking-tight">
                    {product?.available === "yes" ? "Available" : "Out of Stock"}
                  </p>
                </div>
              </div>

              {/* Refund Policy */}
              <div className="bg-white border border-gray-200 rounded-sm p-4 flex items-center justify-between col-span-1 md:col-span-2">
                <div className="flex items-center gap-4">
                  <div className="bg-gray-50 p-2 rounded-sm"><GiTakeMyMoney size={20} className="text-gray-400" /></div>
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Refund Policy</p>
                    <p className="text-xs font-black text-gray-900 uppercase">{product?.refund}% Money Back Guarantee</p>
                  </div>
                </div>
                <button
                  onClick={() => setOpenRefund(true)}
                  className="p-2 text-gray-400 hover:text-gray-900 transition-colors"
                >
                  <FaEdit size={14} />
                </button>
              </div>
            </div>

            {/* Metadata Footer */}
            <div className="bg-gray-50 border border-gray-100 rounded-sm p-4">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Search Keywords</p>
              <div className="flex flex-wrap gap-2 text-[11px] text-gray-600 font-medium">
                {product?.keywords || "No keywords defined"}
              </div>
            </div>
          </div>
        </div>

        {/* MODAL COMPONENTS */}
        {openEdit && (
          <Updatefileds product={product} setOpenEdit={setOpenEdit} refresh={getSingleProduct} />
        )}
        {openStock && (
          <Update product={product} setOpenStock={setOpenStock} refresh={getSingleProduct} />
        )}
        {openRefund && (
          <Updaterefund product={product} setOpenRefund={setOpenRefund} refresh={getSingleProduct} />
        )}
        {openImage && (
          <Updateimage product={product} setOpenImage={setOpenImage} refresh={getSingleProduct} />
        )}
      </div>
    </Layout>
  );
};

export default Productdetail;
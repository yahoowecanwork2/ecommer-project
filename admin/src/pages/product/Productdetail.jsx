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
  const [selectedVariant, setSelectedVariant] = useState(null);

  const [openEdit, setOpenEdit] = useState(false);
  const [openStock, setOpenStock] = useState(false);
  const [openRefund, setOpenRefund] = useState(false);
  const [openImage, setOpenImage] = useState(false);

  // ✅ Fetch product
  const getSingleProduct = async () => {
    try {
      const res = await productApi.getSingle(id);

      setProduct(res.product);
      setActiveImg(res.product.image[0]?.url);

      // ✅ Default variant select
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
        <div className="p-10 text-center text-[11px] font-bold uppercase tracking-[0.2em] animate-pulse text-gray-400">
          Syncing product data...
        </div>
      </Layout>
    );

  return (
   <Layout>
  <div className="max-w-7xl mx-auto space-y-8 p-4 md:p-6 bg-white min-h-screen">
    {/* TOP BAR - Cleaner spacing and subtle border */}
    <div className="flex items-center justify-between border-b border-gray-100 pb-6">
      <button
        onClick={() => navigate("/product")}
        className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-black transition-colors"
      >
        <FaArrowLeft size={12} /> Back to Products
      </button>

      <div className="flex gap-3">
        <button
          onClick={handleDelete}
          className="flex items-center gap-2 px-4 py-2 text-xs font-semibold border border-red-100 text-red-600 hover:bg-red-50 rounded transition-all"
        >
          <FaTrash /> Delete
        </button>

        <button
          onClick={() => setOpenEdit(true)}
          className="flex items-center gap-2 px-6 py-2 text-xs font-semibold bg-black text-white hover:bg-gray-800 rounded shadow-sm transition-all"
        >
          <FaEdit /> Edit Details
        </button>
      </div>
    </div>

    <div className="grid lg:grid-cols-12 gap-10">
      {/* LEFT IMAGES - Improved Gallery Style */}
      <div className="lg:col-span-5 space-y-4">
        <div className="border border-gray-100 rounded-xl overflow-hidden bg-gray-50 relative group">
          <button
            onClick={() => setOpenImage(true)}
            className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <FaImage className="text-gray-700" />
          </button>

          <img
            src={activeImg}
            className="w-full h-[450px] object-contain mix-blend-multiply"
            alt={product.name}
          />
        </div>

        <div className="flex gap-3 overflow-x-auto pb-2">
          {product.image.map((img, i) => (
            <img
              key={i}
              src={img.url}
              onClick={() => setActiveImg(img.url)}
              className={`w-20 h-20 rounded-lg border-2 cursor-pointer object-cover transition-all ${
                activeImg === img.url ? "border-black scale-95" : "border-transparent hover:border-gray-200"
              }`}
            />
          ))}
        </div>
      </div>

      {/* RIGHT SECTION - Content Clarity */}
      <div className="lg:col-span-7 space-y-8">
        {/* PRODUCT INFO */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 rounded text-[10px] uppercase tracking-wider font-bold text-gray-600">
            <MdCategory /> {product.category?.name}
          </div>

          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">{product.name}</h2>

          <div className="flex items-center gap-4">
            <div className="text-3xl font-light text-gray-900">
              ₹{selectedVariant?.price?.toLocaleString()}
            </div>
            {product.discount > 0 && (
              <span className="text-xs font-bold bg-green-100 text-green-700 px-2 py-1 rounded">
                {product.discount}% OFF
              </span>
            )}
          </div>

          {/* SIZE SELECTOR - More tactile feel */}
          <div className="pt-4">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Select Size</p>
            <div className="flex flex-wrap gap-2">
              {product.variants.map((variant) => (
                <button
                  key={variant._id}
                  onClick={() => setSelectedVariant(variant)}
                  disabled={variant.stock === 0}
                  className={`min-w-[50px] px-4 py-2 text-sm font-medium border rounded-md transition-all ${
                    selectedVariant?._id === variant._id
                      ? "bg-black text-white border-black"
                      : "bg-white text-gray-700 border-gray-200 hover:border-black"
                  } ${
                    variant.stock === 0
                      ? "opacity-30 cursor-not-allowed bg-gray-50"
                      : ""
                  }`}
                >
                  {variant.size}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-gray-50">
            <p className="text-sm leading-relaxed text-gray-500 italic">
              {product.description}
            </p>
          </div>
        </div>

        {/* METRICS GRID - Better alignment and icons */}
        <div className="grid md:grid-cols-2 gap-4">
          {/* STOCK */}
          <div className="group border border-gray-100 p-5 rounded-xl flex justify-between items-center hover:bg-gray-50 transition-colors">
            <div>
              <p className="text-[10px] uppercase font-bold text-gray-400 mb-1">Stock Level</p>
              <p className="text-xl font-bold flex items-center gap-2">
                <MdInventory className="text-gray-400" /> {selectedVariant?.stock}
              </p>
            </div>
            <button 
              onClick={() => setOpenStock(true)}
              className="p-2 text-gray-300 hover:text-black transition-colors"
            >
              <FaEdit size={14} />
            </button>
          </div>

          {/* AVAILABILITY */}
          <div className={`border p-5 rounded-xl flex items-center gap-3 font-semibold ${
            selectedVariant?.stock > 0 ? "bg-green-50/50 border-green-100 text-green-700" : "bg-red-50/50 border-red-100 text-red-700"
          }`}>
            {selectedVariant?.stock > 0 ? (
              <FaCheckCircle />
            ) : (
              <FaTimesCircle />
            )}
            <span>{selectedVariant?.stock > 0 ? "In Stock" : "Out of Stock"}</span>
          </div>

          {/* REFUND - Accentuated Box */}
          <div className="border border-gray-100 p-5 col-span-2 rounded-xl flex justify-between items-center bg-gray-50/30">
            <div className="flex gap-3 items-center">
              <div className="p-2 bg-white rounded-lg shadow-sm">
                <GiTakeMyMoney className="text-gray-700" size={20} />
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-gray-400">Refund Policy</p>
                <p className="font-semibold text-gray-800">{product.refund}% Refund Eligible</p>
              </div>
            </div>
            <button 
              onClick={() => setOpenRefund(true)}
              className="text-xs font-bold text-black underline underline-offset-4 hover:text-gray-600"
            >
              Edit Policy
            </button>
          </div>
        </div>

        {/* KEYWORDS - Modern Tag Style */}
        <div className="bg-gray-50 p-5 rounded-xl border border-gray-100">
          <p className="text-[10px] uppercase font-bold text-gray-400 mb-2 tracking-widest">Metadata Keywords</p>
          <div className="text-sm text-gray-600 font-medium">
            {product.keywords}
          </div>
        </div>
      </div>
    </div>

    {/* MODALS - Unchanged functionality */}
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

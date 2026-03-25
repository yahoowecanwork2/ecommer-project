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
      <div className="space-y-6">
        {/* TOP BAR */}
        <div className="flex items-center justify-between border-b pb-4">
          <button
            onClick={() => navigate("/product")}
            className="flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-black"
          >
            <FaArrowLeft size={10} /> Back
          </button>

          <div className="flex gap-2">
            <button
              onClick={handleDelete}
              className="px-4 py-2 text-xs border text-red-600"
            >
              <FaTrash /> Delete
            </button>

            <button
              onClick={() => setOpenEdit(true)}
              className="px-4 py-2 text-xs bg-black text-white"
            >
              <FaEdit /> Edit
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">
          {/* LEFT IMAGES */}
          <div className="lg:col-span-5 space-y-4">
            <div className="border p-4 relative">
              <button
                onClick={() => setOpenImage(true)}
                className="absolute top-2 right-2"
              >
                <FaImage />
              </button>

              <img
                src={activeImg}
                className="w-full h-[400px] object-contain"
              />
            </div>

            <div className="flex gap-2">
              {product.image.map((img, i) => (
                <img
                  key={i}
                  src={img.url}
                  onClick={() => setActiveImg(img.url)}
                  className={`w-20 h-20 border cursor-pointer ${
                    activeImg === img.url ? "border-black" : ""
                  }`}
                />
              ))}
            </div>
          </div>

          {/* RIGHT SECTION */}
          <div className="lg:col-span-7 space-y-6">
            {/* PRODUCT INFO */}
            <div className="border p-6">
              <p className="text-xs text-gray-400 flex items-center gap-1">
                <MdCategory /> {product.category?.name}
              </p>

              <h2 className="text-2xl font-bold">{product.name}</h2>

              {/* ✅ PRICE */}
              <div className="text-2xl font-bold mt-2">
                ₹ {selectedVariant?.price}
              </div>

              {/* DISCOUNT */}
              {product.discount > 0 && (
                <span className="text-xs bg-green-500 text-white px-2 py-1">
                  {product.discount}% OFF
                </span>
              )}

              {/* ✅ SIZE SELECTOR */}
              <div className="mt-4">
                <p className="text-xs font-bold mb-2">Select Size</p>

                <div className="flex gap-2">
                  {product.variants.map((variant) => (
                    <button
                      key={variant._id}
                      onClick={() => setSelectedVariant(variant)}
                      disabled={variant.stock === 0}
                      className={`px-3 py-1 border ${
                        selectedVariant?._id === variant._id
                          ? "bg-black text-white"
                          : ""
                      } ${
                        variant.stock === 0
                          ? "opacity-40 cursor-not-allowed"
                          : ""
                      }`}
                    >
                      {variant.size}
                    </button>
                  ))}
                </div>
              </div>

              {/* DESCRIPTION */}
              <p className="text-sm text-gray-500 mt-4">
                {product.description}
              </p>
            </div>

            {/* STOCK + STATUS */}
            <div className="grid md:grid-cols-2 gap-4">
              {/* STOCK */}
              <div className="border p-4 flex justify-between">
                <div>
                  <p className="text-xs text-gray-400">Stock</p>
                  <p className="text-lg font-bold flex items-center gap-2">
                    <MdInventory /> {selectedVariant?.stock}
                  </p>
                </div>

                <button onClick={() => setOpenStock(true)}>
                  <FaEdit />
                </button>
              </div>

              {/* AVAILABILITY */}
              <div className="border p-4 flex items-center gap-2">
                {selectedVariant?.stock > 0 ? (
                  <>
                    <FaCheckCircle className="text-green-600" />
                    <span>Available</span>
                  </>
                ) : (
                  <>
                    <FaTimesCircle className="text-red-600" />
                    <span>Out of Stock</span>
                  </>
                )}
              </div>

              {/* REFUND */}
              <div className="border p-4 col-span-2 flex justify-between">
                <div className="flex gap-2 items-center">
                  <GiTakeMyMoney />
                  <span>{product.refund}% Refund</span>
                </div>

                <button onClick={() => setOpenRefund(true)}>
                  <FaEdit />
                </button>
              </div>
            </div>

            {/* KEYWORDS */}
            <div className="border p-4">
              <p className="text-xs text-gray-400">Keywords</p>
              <p>{product.keywords}</p>
            </div>
          </div>
        </div>

        {/* MODALS */}
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

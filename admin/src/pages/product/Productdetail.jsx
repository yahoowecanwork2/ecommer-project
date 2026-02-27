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
  // single
  const getSingleProduct = async () => {
    try {
      const res = await productApi.getSingle(id);
      console.log(res)
      setProduct(res.product);
      setActiveImg(res.product.image[0]?.url);
    } catch (error) {
      console.log(error);
    }
  };
  // delete
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
        <div className="p-10 text-center text-lg font-semibold animate-pulse">
          Loading product...
        </div>
      </Layout>
    );

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 p-6">
        {/* Top bar */}
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => navigate("/product")}
            className="flex items-center gap-2 text-gray-600 hover:text-blue-600 font-medium"
          >
            <FaArrowLeft /> Back
          </button>

          <div className="flex gap-3">
            <button
              onClick={() => setOpenEdit(true)}
              className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-xl shadow hover:bg-blue-700 transition"
            >
              <FaEdit /> Edit
            </button>

            <button
              onClick={handleDelete}
              className="flex items-center gap-2 bg-red-600 text-white px-5 py-2 rounded-xl shadow hover:bg-red-700 transition"
            >
              <FaTrash /> Delete
            </button>
          </div>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow p-5">
            <img
              src={activeImg}
              alt={product.name}
              className="w-full h-[400px] object-contain rounded-xl"
            />

            <div className="flex gap-3 mt-4 overflow-x-auto">
              {product?.image?.map((img, i) => (
                <img
                  key={i}
                  src={img.url}
                  alt=""
                  onClick={() => setActiveImg(img.url)}
                  className={`w-20 h-20 object-cover rounded-lg cursor-pointer border
                  ${
                    activeImg === img.url
                      ? "border-blue-600"
                      : "border-gray-200 hover:border-blue-400"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow p-6 space-y-4">
            <h2 className="text-2xl font-bold">{product?.name}</h2>

            <div className="flex items-center gap-2 text-gray-500">
              <MdCategory /> {product?.category?.name}
            </div>

            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-blue-600 flex items-center gap-1">
                <GiTakeMyMoney /> ₹{product?.price}
              </span>

              {product?.discount > 0 && (
                <span className="flex items-center gap-1 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                  <FaTag /> {product?.discount}% OFF
                </span>
              )}
            </div>

            <p className="text-gray-600 text-sm">{product?.description}</p>

            {/* Stock */}
            <div className="flex justify-between items-center bg-gray-100 px-4 py-3 rounded-xl">
              <div className="flex items-center gap-2">
                <MdInventory />
                <span>Stock: {product?.stock}</span>
              </div>
              <button
                onClick={() => setOpenStock(true)}
                className="p-2 bg-white rounded-lg shadow hover:bg-blue-50"
              >
                <FaEdit />
              </button>
            </div>

            {/* Availability */}
            <div
              className={`flex items-center gap-2 px-4 py-3 rounded-xl
              ${
                product?.available === "yes"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
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
            <div className="flex justify-between items-center bg-purple-100 text-purple-700 px-4 py-3 rounded-xl">
              <span>Refund: {product?.refund}%</span>
              <button
                onClick={() => setOpenRefund(true)}
                className="p-2 bg-white rounded-lg shadow hover:bg-purple-200"
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
      </div>
    </Layout>
  );
};

export default Productdetail;

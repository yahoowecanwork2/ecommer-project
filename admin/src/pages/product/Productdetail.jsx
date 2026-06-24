import React, { useEffect, useState } from "react";
import Layout from "../../componets/common/Layout";
import { productApi } from "../../apis/product";
import { useLocation, useNavigate, useNavigation, useParams } from "react-router-dom";
import { FaRegCalendarAlt, FaShieldAlt, FaTags } from "react-icons/fa";
import { IoArrowBack } from "react-icons/io5";
import Updatefileds from "./mdoal/Updatefileds";

const Productdetail = () => {
  const [product, setproduct] = useState([]);
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState([]);
  const[open , setopen] = useState(false);

  const { id } = useParams();

  const getProduct = async () => {
    try {
      const res = await productApi.getSingle(id);
      console.log(res);
      setproduct(res.product);
    } catch (error) {
      console.log("Error is", error);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await productApi.delete(product._id);

      toast.success(res?.message);
      fetchproduct();
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete category");
    }
  };

  

  useEffect(() => {
    getProduct();
  }, []);

  useEffect(() => {
    if (product?.images?.length > 0) {
      setSelectedImage(product.images[0].main.url);
    }
  }, [product]);

  return (
    <Layout>
      <div className="flex flex-col ">
        {/* Heading */}
        <div className="flex   ">
          <div className="flex  justify-start w-[5%] items-center ">
            <IoArrowBack
            onClick={()=> navigate(-1)}
            size={26} />
          </div>

          <div className="w-[95%] flex justify-between" >
            <div className="flex flex-col justify-start items-start  mb-5 ">
              <h1 className="text-2xl font-bold text-[#111111] uppercase ">
                Product Detail
              </h1>
              <p className="text-sm text-gray-500 mt-1 font-medium ">
                Manage and monitor product information{" "}
              </p>
            </div>

            <div className=" ">
              <button 
              onClick={handleDelete}
              className="border px-2 py-1 mx-5 cursor-pointer bg-red-500 text-white  ">
                Delete
              </button>
              <button 
              onClick={()=> setopen(true)}
              className="border px-2 py-1 mx-5 cursor-pointer bg-[#006EFF] text-white ">
                Update
              </button>
            </div>
            {open && <Updatefileds product={product} fetchproduct={getProduct} closemodal={()=> setopen(false)} />}
          </div>
        </div>

        {/* Data */}

        <div className="flex gap-5 ">
          {/* Image section */}
          <div className="flex gap-5 w-1/2 ">
            {/* Left Thumbnail Images */}
            <div className="flex flex-col gap-3">
              {/* Main Image Thumbnail */}

              {/* Sub Images */}
              {product?.images?.[0]?.subImages?.map((img, index) => (
                <img
                  key={index}
                  src={img.url}
                  alt="sub images"
                  className="w-20 h-24  rounded cursor-pointer object-cover"
                  onClick={() => setSelectedImage(img.url)}
                />
              ))}

              <img
                src={product?.images?.[0]?.main?.url}
                alt="mainimage"
                className="w-20 h-24  rounded cursor-pointer object-cover"
                onClick={() => setSelectedImage(product.images[0].main.url)}
              />
            </div>

            {/* Main Large Image */}
            <div className="w-[500px]">
              <img
                src={selectedImage}
                alt=""
                className="w-full h-[650px] rounded-lg object-contain "
              />
            </div>
          </div>

          {/* Numerical data */}
          <div className="w-1/2 flex flex-col gap-3 ">
            <div>
              <h1 className="text-lg font-bold">{product?.name}</h1>
            </div>

            <div className="flex gap-10 ">
              <div>
                {/* <h1> ₹{product?.price}</h1> */}
                <h1 className="text-2xl font-bold"> ₹9000</h1>
                {/* <h1 className="text-xl font-bold"> ₹{product?.variants?.[0].price}</h1> */}
              </div>
              <div className=" px-2 py-1 ">
                {product?.discount > 0 ? (
                  <h1 className="bg-green-200 text-green-500 px-2 py-1 font-bold rounded-lg">
                    {product?.discount}% off
                  </h1>
                ) : (
                  <h1 className="bg-red-400 text-red-600 px-1 py-1 rounded-md font-bold ">
                    {product?.discount}% off
                  </h1>
                )}
              </div>
            </div>

            <div>
              {product?.insale === "yes" ? (
                <span className="bg-green-200 text-green-500 px-2 py-1 rounded-lg font-bold ">
                  In Sale
                </span>
              ) : (
                <span className="bg-red-400 text-red-600 ">No Sale</span>
              )}
            </div>

            <div className="grid grid-cols-3 gap-4 border-y border-gray-400 my-3 py-6">
              {/* Category */}
              <div className="flex items-center gap-3">
                <FaTags className="text-2xl text-gray-600" />

                <div>
                  <p className="text-sm text-gray-500">Category</p>

                  <p className="font-medium">{product?.category?.name}</p>
                </div>
              </div>

              {/* Refund */}
              <div className="flex items-center gap-3">
                <FaShieldAlt className="text-2xl text-gray-600" />

                <div>
                  <p className="text-sm text-gray-500">Refund</p>

                  <p className="font-medium">
                    {product?.refund ? "Yes" : "No"}
                  </p>
                </div>
              </div>

              {/* Updated */}
              <div className="flex items-center gap-3">
                <FaRegCalendarAlt className="text-2xl text-gray-600" />

                <div>
                  <p className="text-sm text-gray-500">Updated On</p>

                  <p className="font-medium">
                    {new Date(product?.updatedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <h1 className="text-lg font-bold">Description</h1>
              <p className="text-gray-500 text-sm ">{product?.description}</p>
            </div>

            <div className="flex flex-col gap-2">
              <h1 className="text-lg font-bold">Keywords</h1>
              <p className="text-gray-500 text-sm ">{product?.keywords}</p>
            </div>

            <div className="mt-6">
              <h2 className="text-lg font-bold mb-3">Available Variants</h2>

              <table className="w-full border border-gray-200">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2">Size</th>
                    <th className="border p-3">Price</th>
                    <th className="border p-3">Stock</th>
                  </tr>
                </thead>

                <tbody>
                  {product?.variants?.map((item) => (
                    <tr key={item._id}>
                      <td className="border p-3 text-center">{item.size}</td>

                      <td className="border p-3 text-center">₹{item.price}</td>

                      <td className="border p-3 text-center">{item.stock}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Productdetail;

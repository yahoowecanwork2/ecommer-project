import React, { useEffect, useState } from "react";
import {
  FaMobileAlt,
  FaTshirt,
  FaLaptop,
  FaHeadphones,
  FaShoePrints,
} from "react-icons/fa";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

import Cards from "./components/Cards";
import HeaderHome from "../common/Header";
import { productApi } from "../../apis/product";

// const categories = [
//   { name: "Mobiles", icon: <FaMobileAlt /> },
//   { name: "Clothes", icon: <FaTshirt /> },
//   { name: "Laptops", icon: <FaLaptop /> },
//   { name: "Headphones", icon: <FaHeadphones /> },
//   { name: "Shoes", icon: <FaShoePrints /> },
//   { name: "More", icon: <FaTshirt /> },
// ];

const Product = () => {
  
  const [products, setProducts] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  const limit = 8;
  const categoryIcons = {
    mobiles: <FaMobileAlt />,
    clothes: <FaTshirt />,
    laptops: <FaLaptop />,
    headphones: <FaHeadphones />,
    shoes: <FaShoePrints />,
    books: <FaTshirt />,
  };
  const getProducts = async () => {
    try {
      setLoading(true);

      const res = await productApi.get(startIndex, limit);
      console.log("all-products", res);

      setLoading(false);

      setProducts(res.products);
    } catch (error) {
      setLoading(false);
      console.log("Error fetching products", error);
    }
  };
  const fetchCategories = async () => {
    try {
      const res = await productApi.getCategories();
      console.log("categories", res);

      setCategories(res.categories);
    } catch (error) {
      console.log("Category fetch error", error);
    }
  };
  useEffect(() => {
    getProducts();
    fetchCategories();
  }, [startIndex]);
  const renderCards = (arr) =>
    arr.length > 0 &&
    arr.map((item) => <Cards key={`${item._id}`} item={item} />);
  return (
    <div className="w-full bg-white min-h-screen">
      <HeaderHome />

      <div className="px-10 py-20 mt-8">
        <div className="flex gap-3 w-1/2 mb-10">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full p-3 rounded-xl border border-[#160059] focus:ring-2 focus:ring-[#160059] outline-none"
          />
          <button className="bg-[#160059] text-white px-6 rounded-xl hover:bg-[#2a1380] transition">
            Search
          </button>
        </div>

        <div className="mb-10">
          <h3 className="text-xl font-semibold text-[#160059] mb-4">
            Categories
          </h3>

          {/* <div className="flex gap-6 overflow-x-auto pb-2">
            {categories?.map((cat) => (
              <div
                key={cat._id}
                className="flex flex-col items-center cursor-pointer group"
              >
                <div className="w-16 h-16 bg-[#160059]/10 text-[#160059] rounded-full flex items-center justify-center text-xl shadow-md group-hover:bg-[#160059] group-hover:text-white transition">
                  {categoryIcons[cat?.slug?.toLowerCase()] || <FaTshirt />}{" "}
                </div>
                <p className="text-sm mt-2 text-gray-700">{cat.name}</p>
              </div>
            ))}
          </div> */}
          <div className="flex gap-6 overflow-x-auto pb-2">
            {categories?.map((cat) => {
              const key = cat?.slug?.toLowerCase();

              return (
                <div
                  key={cat._id}
                  className="flex flex-col items-center cursor-pointer group"
                >
                  <div className="w-16 h-16 bg-[#160059]/10 text-[#160059] rounded-full flex items-center justify-center text-2xl shadow-md group-hover:bg-[#160059] group-hover:text-white transition">
                    {categoryIcons[key] || <FaTshirt />}
                  </div>
                  <p className="text-sm mt-2 text-gray-700">{cat.name}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-[#160059] mb-4">
            Products
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {renderCards(products, "all")}
          </div>
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              disabled={startIndex === 0}
              onClick={() => setStartIndex((prev) => Math.max(prev - limit, 0))}
              className="p-2 rounded-full bg-white shadow hover:bg-blue-100 text-blue-600 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              <MdKeyboardArrowLeft size={26} />
            </button>

            <span className="px-4 py-1 rounded-full bg-blue-100 text-blue-700 font-semibold">
              Page {startIndex / limit + 1}
            </span>

            <button
              disabled={products.length < limit}
              onClick={() => setStartIndex((prev) => prev + limit)}
              className="p-2 rounded-full bg-white shadow hover:bg-blue-100 text-blue-600 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              <MdKeyboardArrowRight size={26} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;

import React, { useEffect, useState } from "react";
import {
  FaMobileAlt,
  FaTshirt,
  FaLaptop,
  FaHeadphones,
  FaShoePrints,
} from "react-icons/fa";
import Cards from "./components/Cards";
import HeaderHome from "../common/Headerhome";
import { productApi } from "../../apis/product";

const categories = [
  { name: "Mobiles", icon: <FaMobileAlt /> },
  { name: "Clothes", icon: <FaTshirt /> },
  { name: "Laptops", icon: <FaLaptop /> },
  { name: "Headphones", icon: <FaHeadphones /> },
  { name: "Shoes", icon: <FaShoePrints /> },
  { name: "More", icon: <FaTshirt /> },
];

const Product = () => {
  const [products, setProducts] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const limit = 8;
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

  useEffect(() => {
    getProducts();
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

          <div className="flex gap-6 overflow-x-auto pb-2">
            {categories.map((cat, index) => (
              <div
                key={index}
                className="flex flex-col items-center cursor-pointer group"
              >
                <div className="w-16 h-16 bg-[#160059]/10 text-[#160059] rounded-full flex items-center justify-center text-xl shadow-md group-hover:bg-[#160059] group-hover:text-white transition">
                  {cat.icon}
                </div>
                <p className="text-sm mt-2 text-gray-700">{cat.name}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-[#160059] mb-4">
            Products
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {renderCards(products, "all")}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;

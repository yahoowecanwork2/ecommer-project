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
import { productApi } from "../../apis/product";
import Header from "../common/Header";
import Footer from "../common/Footer";

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
  const [activeCategory, setActiveCategory] = useState(null);

  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState(null);
  const [filterByCat, setFilterByCat] = useState([]);
  const [name, setName] = useState("");
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
      setFilterByCat([]);
      setSearch(null);
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
  // search
  const handleSearch = async () => {
    try {
      setProducts([]);
      setFilterByCat([]);

      const res = await productApi.filterByName(name);
      console.log("search", res);

      if (res.success) {
        setSearch([res.product]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // filter by categories
  const handleCategoryFilter = async (categoryId) => {
    try {
      setLoading(true);
      setSearch(null);
      setProducts([]);
      setActiveCategory(categoryId);

      const res = await productApi.filterByCategories(categoryId, 0, limit);
      console.log("filterbycategories", res);

      if (res.success) {
        setFilterByCat(res.products);
      }

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    getProducts();
    fetchCategories();
  }, [startIndex]);
  const renderCards = (arr) =>
    arr?.length > 0 &&
    arr?.map((item) => <Cards key={`${item._id}`} item={item} />);
  const noProductFound =
    !loading &&
    products?.length === 0 &&
    (!search || search?.length === 0) &&
    filterByCat?.length === 0;
  return (
    <div className="w-full bg-white min-h-screen font-google">
      <Header />

      <div className="bg-[#faf7f2] min-h-screen font-google pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-3 max-w-xl mb-12">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Search products..."
              className="w-full px-5 py-3 rounded-full border border-gray-300 focus:outline-none focus:border-gray-900 text-sm"
            />
            <button
              onClick={handleSearch}
              className="px-6 py-3 bg-black text-white rounded-full text-sm font-medium hover:bg-gray-800 transition"
            >
              Search
            </button>
          </div>

          <div className="mb-14">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">
              Shop by Category
            </h3>

            <div className="flex gap-8 overflow-x-auto pb-2">
              {categories?.map((cat) => {
                const key = cat?.slug?.toLowerCase();

                return (
                  <div
                    key={cat._id}
                    onClick={() => handleCategoryFilter(cat._id)}
                    className={`flex flex-col items-center cursor-pointer min-w-[70px]`}
                  >
                    <div
                      className={`w-16 h-16 rounded-full border flex items-center justify-center text-xl shadow-sm transition
    ${
      activeCategory === cat._id
        ? "bg-black text-white border-black"
        : "bg-white border-gray-200 hover:bg-black hover:text-white"
    }`}
                    >
                      {categoryIcons[key] || <FaTshirt />}
                    </div>

                    <p
                      className={`text-sm mt-3 ${
                        activeCategory === cat._id
                          ? "text-black font-semibold"
                          : "text-gray-700"
                      }`}
                    >
                      {cat.name}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex justify-between items-center mb-8">
            <h3 className="text-2xl font-semibold text-gray-900">
              All Products
              <span className="text-gray-400 text-sm ml-2">
                ({products?.length})
              </span>
            </h3>

            <select className="border border-gray-300 rounded-lg px-4 py-2 text-sm bg-white">
              <option>Sort: Recommended</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Newest</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {renderCards(products)}
            {renderCards(search)}
            {renderCards(filterByCat)}
          </div>

          {noProductFound && (
            <div className="flex flex-col items-center justify-center mt-16 text-center">
              <h2 className="text-2xl font-semibold text-gray-700">
                No Product Found
              </h2>
              <p className="text-gray-500 mt-2">
                Try searching with another keyword or category.
              </p>
            </div>
          )}

          <div className="flex justify-center items-center gap-6 mt-12">
            <button
              disabled={startIndex === 0}
              onClick={() => setStartIndex((prev) => Math.max(prev - limit, 0))}
              className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-900 hover:text-white transition disabled:opacity-30"
            >
              <MdKeyboardArrowLeft size={22} />
            </button>

            <span className="text-sm text-gray-600 font-medium">
              Page {startIndex / limit + 1}
            </span>

            <button
              disabled={products.length < limit}
              onClick={() => setStartIndex((prev) => prev + limit)}
              className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-900 hover:text-white transition disabled:opacity-30"
            >
              <MdKeyboardArrowRight size={22} />
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Product;

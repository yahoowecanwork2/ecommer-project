import React, { useEffect, useState } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import {
  IoSearchOutline,
  IoFilterOutline,
  IoCloseOutline,
  IoChevronDownOutline,
  IoAppsOutline,
} from "react-icons/io5";

import Cards from "./components/Cards";
import { productApi } from "../../apis/product";
import Header from "../common/Header";
import Footer from "../common/Footer";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const [sortOption, setSortOption] = useState("recommended");
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState(null);
  const [filterByCat, setFilterByCat] = useState([]);
  const [name, setName] = useState("");
  const limit = 12;

  const getProducts = async () => {
    try {
      setLoading(true);
      setActiveCategory(null);
      setFilterByCat([]);
      setSearch(null);
      const res = await productApi.get(startIndex, limit);
      setProducts(res.products);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("Error fetching products", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await productApi.getCategories();
      setCategories(res.categories);
    } catch (error) {
      console.log("Category fetch error", error);
    }
  };

  const handleSearch = async () => {
    try {
      setProducts([]);
      setFilterByCat([]);
      const res = await productApi.filterByName(name);
      if (res.success) {
        setSearch([res.product]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCategoryFilter = async (categoryId) => {
    try {
      setLoading(true);
      setSearch(null);
      setProducts([]);
      setActiveCategory(categoryId);
      const res = await productApi.filterByCategories(categoryId, 0, limit);
      if (res.success) {
        setFilterByCat(res.products);
      }
      setLoading(false);
      setIsFilterOpen(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
    fetchCategories();
  }, [startIndex]);
  const getActiveData = () => {
    if (search && search.length > 0) return search;
    if (filterByCat && filterByCat.length > 0) return filterByCat;
    return products;
  };
  const cleanPrice = (price) => {
    return Number(String(price).replace(/[^0-9]/g, ""));
  };
  const getSortedProducts = (arr) => {
    if (!arr) return [];

    let sorted = [...arr];

    if (sortOption === "low") {
      sorted.sort((a, b) => cleanPrice(a.price) - cleanPrice(b.price));
    }

    if (sortOption === "high") {
      sorted.sort((a, b) => cleanPrice(b.price) - cleanPrice(a.price));
    }

    if (sortOption === "newest") {
      sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    return sorted;
  };

  const finalProducts = getSortedProducts(getActiveData());

  const noProductFound =
    !loading &&
    products?.length === 0 &&
    (!search || search?.length === 0) &&
    filterByCat?.length === 0;

  return (
    <div className="w-full bg-white min-h-screen font-google text-[#2D1B2D] overflow-x-hidden">
      <Header />

      {/* --- HERO SECTION (Removed border-b) --- */}
      <section className="pt-32 lg:pt-48 pb-10">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="space-y-2">
            <h1 className="text-4xl lg:text-7xl font-serif italic tracking-tighter text-[#2D1B2D]">
              Selects<span className="text-[#D16B92]">.</span>
            </h1>
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400 opacity-60">
              Essential Edit 2026
            </p>
          </div>

          <div className="w-full max-w-sm relative">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Search archive..."
              className="w-full bg-[#FCF8F9] px-5 py-3.5 rounded-full focus:outline-none focus:ring-1 focus:ring-[#D16B92] text-[11px] transition-all"
            />
            <button
              onClick={handleSearch}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#D16B92] hover:scale-110 transition-transform"
            >
              <IoSearchOutline size={18} />
            </button>
          </div>
        </div>
      </section>

      <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row overflow-hidden">
        {/* --- DESKTOP SIDEBAR (Removed border-r) --- */}
        <aside className="hidden lg:block w-72 px-10 py-16 sticky top-32 h-fit">
          <div className="space-y-10">
            <div className="flex items-center gap-3 mb-6">
              <IoAppsOutline className="text-[#D16B92]" />
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em]">
                Categories
              </h4>
            </div>
            <nav className="flex flex-col">
              <button
                onClick={getProducts}
                className={`py-3.5 text-left text-[11px] font-bold uppercase tracking-widest border-b border-transparent transition-all ${!activeCategory ? "text-[#D16B92] border-b-[#D16B92]" : "text-gray-300 hover:text-[#D16B92]"}`}
              >
                Show All
              </button>
              {categories?.map((cat) => (
                <button
                  key={cat._id}
                  onClick={() => handleCategoryFilter(cat._id)}
                  className={`py-3.5 text-left text-[11px] font-bold uppercase tracking-widest border-b border-transparent transition-all ${activeCategory === cat._id ? "text-[#D16B92] border-b-[#D16B92]" : "text-gray-300 hover:text-[#D16B92]"}`}
                >
                  {cat.name}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* --- MAIN GRID AREA (No Borders) --- */}
        <main className="flex-1 w-full overflow-hidden">
          <div className="flex justify-between items-center px-4 lg:px-10 py-4 mb-4">
            <span className="text-[9px] font-bold uppercase tracking-widest text-gray-400">
              Inventory: {products?.length || 0} Pieces
            </span>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="text-[9px] font-black uppercase tracking-widest text-[#D16B92] outline-none border-none bg-transparent cursor-pointer"
            >
              <option value="recommended">Sort: Default</option>
              <option value="low">Price: Low to High</option>
              <option value="high">Price: High to Low</option>
              <option value="newest">Newest Arrivals</option>
            </select>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-0 w-full overflow-hidden">
            {/* {renderCards(products)}
            {renderCards(search)}
            {renderCards(filterByCat)} */}
            {finalProducts?.map((item) => (
              <Cards key={item._id} item={item} />
            ))}
          </div>

          {noProductFound && (
            <div className="py-40 text-center italic font-serif text-gray-200">
              <p className="text-lg">No treasures found...</p>
            </div>
          )}

          {/* --- PAGINATION --- */}
          <div className="flex justify-between items-center px-6 lg:px-12 py-16">
            <button
              disabled={startIndex === 0}
              onClick={() => {
                setStartIndex((prev) => Math.max(prev - limit, 0));
                window.scrollTo(0, 0);
              }}
              className="text-[10px] font-black uppercase tracking-[0.3em] disabled:opacity-20 flex items-center gap-1 hover:text-[#D16B92] transition-colors"
            >
              <MdKeyboardArrowLeft size={18} /> Prev
            </button>

            <div className="hidden sm:flex gap-10 text-[10px] font-serif italic text-gray-300">
              <span className="text-[#D16B92] border-b border-[#D16B92]">
                01
              </span>
              <span className="hover:text-[#D16B92] transition-colors cursor-pointer">
                02
              </span>
            </div>

            <button
              disabled={products.length < limit}
              onClick={() => {
                setStartIndex((prev) => prev + limit);
                window.scrollTo(0, 0);
              }}
              className="text-[10px] font-black uppercase tracking-[0.3em] disabled:opacity-20 flex items-center gap-1 hover:text-[#D16B92] transition-colors"
            >
              Next <MdKeyboardArrowRight size={18} />
            </button>
          </div>
        </main>
      </div>

      {isFilterOpen && (
        <div className="fixed inset-0 z-[110] bg-[#2D1B2D]/30 backdrop-blur-sm lg:hidden transition-all duration-500">
          <div className="absolute bottom-0 w-full bg-[#FFFBFB] rounded-t-[3rem] p-8 space-y-8 shadow-[0_-20px_40px_-15px_rgba(0,0,0,0.1)] animate-in slide-in-from-bottom duration-500">
            <div className="flex justify-between items-center border-b border-pink-50 pb-4">
              <div className="space-y-1">
                <h4 className="text-[12px] font-black uppercase tracking-widest text-[#2D1B2D]">
                  Filter
                </h4>
                <p className="text-[8px] font-bold text-[#D16B92] uppercase tracking-[0.2em]">
                  Select your muse
                </p>
              </div>
              <button
                onClick={() => setIsFilterOpen(false)}
                className="w-10 h-10 flex items-center justify-center bg-white border border-pink-50 rounded-full text-[#D16B92]"
              >
                <IoCloseOutline size={22} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto no-scrollbar pb-6">
              <button
                onClick={getProducts}
                className={`py-5 text-[10px] font-bold uppercase tracking-widest rounded-2xl transition-all shadow-sm ${!activeCategory ? "bg-[#D16B92] text-white border-none scale-95" : "bg-white text-gray-400 border border-pink-50"}`}
              >
                All Collection
              </button>
              {categories?.map((cat) => (
                <button
                  key={cat._id}
                  onClick={() => handleCategoryFilter(cat._id)}
                  className={`py-5 text-[10px] font-bold uppercase tracking-widest rounded-2xl transition-all shadow-sm ${activeCategory === cat._id ? "bg-[#D16B92] text-white border-none scale-95" : "bg-white text-gray-400 border border-pink-50"}`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* --- FLOATING FILTER (MOBILE) --- */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] lg:hidden">
        <button
          onClick={() => setIsFilterOpen(true)}
          className="bg-gradient-to-r from-[#D16B92] to-[#E8A5C0] text-white px-8 py-4 rounded-full shadow-[0_10px_30px_-10px_rgba(209,107,146,0.5)] flex items-center gap-2 text-[10px] font-black uppercase tracking-widest active:scale-95 transition-all"
        >
          <IoFilterOutline size={16} /> Refine Edit
        </button>
      </div>

      <Footer />
    </div>
  );
};

export default Product;

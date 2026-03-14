import React, { useEffect, useState } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { IoSearchOutline, IoFilterOutline, IoCloseOutline, IoChevronDownOutline, IoAppsOutline } from "react-icons/io5";

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

  const getSortedProducts = (arr) => {
    if (!arr) return [];
    let sorted = [...arr];
    if (sortOption === "low") sorted.sort((a, b) => a.price - b.price);
    if (sortOption === "high") sorted.sort((a, b) => b.price - a.price);
    if (sortOption === "newest") sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return sorted;
  };

  const renderCards = (arr) =>
    getSortedProducts(arr)?.map((item) => <Cards key={item._id} item={item} />);

  const noProductFound =
    !loading &&
    products?.length === 0 &&
    (!search || search?.length === 0) &&
    filterByCat?.length === 0;

  return (
    <div className="w-full bg-white min-h-screen font-google text-[#2D1B2D] overflow-x-hidden">
      <Header />

      {/* --- SHARP HERO SECTION --- */}
      <section className="pt-32 lg:pt-48 pb-10 border-b border-gray-50">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="space-y-2">
            <h1 className="text-4xl lg:text-7xl font-serif italic tracking-tighter text-[#2D1B2D]">
              Selects<span className="text-[#7A4431]">.</span>
            </h1>
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400">Essential Edit 2026</p>
          </div>
          
          <div className="w-full max-w-sm relative">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Search archive..."
              className="w-full bg-[#F9F9F9] px-5 py-3.5 rounded-full focus:outline-none focus:ring-1 focus:ring-[#7A4431] text-[11px] transition-all"
            />
            <button onClick={handleSearch} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#7A4431]">
              <IoSearchOutline size={18} />
            </button>
          </div>
        </div>
      </section>

      <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row overflow-hidden">
        
        {/* --- DESKTOP SIDEBAR (ATELIER STYLE) --- */}
        <aside className="hidden lg:block w-72 px-10 py-16 sticky top-32 h-fit border-r border-gray-50">
          <div className="space-y-10">
            <div className="flex items-center gap-3 mb-6">
               <IoAppsOutline className="text-[#7A4431]" />
               <h4 className="text-[10px] font-black uppercase tracking-[0.3em]">Categories</h4>
            </div>
            <nav className="flex flex-col">
              <button 
                onClick={getProducts}
                className={`py-3.5 text-left text-[11px] font-bold uppercase tracking-widest border-b transition-all ${!activeCategory ? "text-[#7A4431] border-[#7A4431]" : "text-gray-300 border-gray-50 hover:text-[#7A4431]"}`}
              >
                Show All
              </button>
              {categories?.map((cat) => (
                <button 
                  key={cat._id}
                  onClick={() => handleCategoryFilter(cat._id)}
                  className={`py-3.5 text-left text-[11px] font-bold uppercase tracking-widest border-b transition-all ${activeCategory === cat._id ? "text-[#7A4431] border-[#7A4431]" : "text-gray-300 border-gray-50 hover:text-[#7A4431]"}`}
                >
                  {cat.name}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* --- MAIN GRID AREA (GAP-0) --- */}
        <main className="flex-1 w-full overflow-hidden">
          <div className="flex justify-between items-center px-4 lg:px-10 py-4 border-b border-gray-50">
             <span className="text-[9px] font-bold uppercase tracking-widest text-gray-400">Inventory: {products?.length || 0} Pieces</span>
             <select
               value={sortOption}
               onChange={(e) => setSortOption(e.target.value)}
               className="text-[9px] font-black uppercase tracking-widest text-[#7A4431] outline-none border-none bg-transparent cursor-pointer"
             >
               <option value="recommended">Sort: Default</option>
               <option value="low">Price: Low to High</option>
               <option value="high">Price: High to Low</option>
               <option value="newest">Newest Arrivals</option>
             </select>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-0 w-full overflow-hidden border-b border-gray-50">
             {renderCards(products)}
             {renderCards(search)}
             {renderCards(filterByCat)}
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
                onClick={() => { setStartIndex(prev => Math.max(prev - limit, 0)); window.scrollTo(0, 0); }}
                className="text-[10px] font-black uppercase tracking-[0.3em] disabled:opacity-20 flex items-center gap-1"
             >
                <MdKeyboardArrowLeft size={18}/> Prev
             </button>
             
             <div className="hidden sm:flex gap-10 text-[10px] font-serif italic text-gray-300">
                <span className="text-[#7A4431] border-b border-[#7A4431]">01</span>
                <span>02</span>
             </div>

             <button
                disabled={products.length < limit}
                onClick={() => { setStartIndex(prev => prev + limit); window.scrollTo(0, 0); }}
                className="text-[10px] font-black uppercase tracking-[0.3em] disabled:opacity-20 flex items-center gap-1"
             >
                Next <MdKeyboardArrowRight size={18}/>
             </button>
          </div>
        </main>
      </div>

      {/* --- FLOATING FILTER (MOBILE) --- */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] lg:hidden">
         <button 
           onClick={() => setIsFilterOpen(true)}
           className="bg-[#2D1B2D] text-white px-8 py-4 rounded-full shadow-2xl flex items-center gap-2 text-[10px] font-black uppercase tracking-widest"
         >
            <IoFilterOutline size={14} /> Filters
         </button>
      </div>

      {/* --- MOBILE FILTER DRAWER --- */}
      {isFilterOpen && (
         <div className="fixed inset-0 z-[110] bg-black/30 backdrop-blur-sm lg:hidden transition-all duration-500">
            <div className="absolute bottom-0 w-full bg-white rounded-t-[2.5rem] p-6 space-y-6 shadow-2xl animate-in slide-in-from-bottom duration-500">
               <div className="flex justify-between items-center">
                  <h4 className="text-[11px] font-black uppercase tracking-widest text-[#7A4431]">Refine selection</h4>
                  <button onClick={() => setIsFilterOpen(false)} className="w-8 h-8 flex items-center justify-center bg-gray-50 rounded-full">
                     <IoCloseOutline size={18} />
                  </button>
               </div>
               
               <div className="grid grid-cols-2 gap-2 max-h-[50vh] overflow-y-auto no-scrollbar">
                  <button onClick={getProducts} className={`py-4 text-[10px] font-bold uppercase tracking-widest border transition-all ${!activeCategory ? "bg-[#7A4431] text-white border-[#7A4431]" : "bg-white text-gray-400 border-gray-100"}`}>All</button>
                  {categories?.map((cat) => (
                    <button key={cat._id} onClick={() => handleCategoryFilter(cat._id)} className={`py-4 text-[10px] font-bold uppercase tracking-widest border transition-all ${activeCategory === cat._id ? "bg-[#7A4431] text-white border-[#7A4431]" : "bg-white text-gray-400 border-gray-100"}`}>
                      {cat.name}
                    </button>
                  ))}
               </div>
            </div>
         </div>
      )}

      <Footer />
    </div>
  );
};

export default Product;
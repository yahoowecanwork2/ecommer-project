import React, { useEffect, useState } from "react";
import Layout from "../../componets/common/Layout";
import {
  MdAddCircle,
  MdSearch,
  MdInventory,
  MdCheckCircle,
  MdCancel,
  MdCategory,
  MdFilterList,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
} from "react-icons/md";
import Cards from "./components/Cards";
import Create from "./mdoal/Create";
import { productApi } from "../../apis/product";
import { categoriesApi } from "../../apis/categories";
import CreateCategories from "./mdoal/CreateCategories";
import { motion } from "framer-motion";
import { Lock, AlertCircle, ArrowRight, ShieldCheck } from "lucide-react"; // Using Lucide as a standard
import { useNavigate } from "react-router-dom";

const Product = () => {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [filterByCategories, setFilterByCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [stats, setStats] = useState({
    totalProducts: 0,
    availableProducts: 0,
    outOfStockProducts: 0,
  });
  const [createCategories, setCreateCategories] = useState(false);
  const [page, setPage] = useState(1);
  const limit = 4;
  const navigate = useNavigate();

  // --- Logic remains identical ---
  const handleChange = async (e) => {
    const value = e.target.value;
    setSelectedCategory(value);
    setPage(1);
    try {
      if (value === "") {
        fetchProducts();
      } else {
        setProducts([]);
        setLoading(true);
        const res = await productApi.filterByCategories(value, 1, limit);
        setFilterByCategories(res.products);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  // stats
  const fetchStats = async () => {
    try {
      const res = await productApi.getStats();
      console.log("stats", res);

      setStats(res);
    } catch (error) {
      console.log(error);
    }
  };
  const getCategories = async () => {
    try {
      const res = await categoriesApi.getByName();
      if (res.success) {
        setCategories(res.categoriesNames);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProducts = async () => {
    try {
      setFilterByCategories([]);
      setLoading(true);
      const startIndex = (page - 1) * limit;
      const res = await productApi.get(startIndex, limit);
      setProducts(res.products);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts(page);
    getCategories();
  }, [page]);
  useEffect(() => {
    fetchStats();
  }, []);
  const renderCards = (arr) =>
    arr.length > 0 &&
    arr.map((item) => <Cards key={`${item._id}`} item={item} />);

  return (
    <Layout>
      <div className="space-y-6">

        {/* HEADER SECTION */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900 tracking-tight">
              Product Inventory
            </h2>
            <p className="text-[11px] text-gray-500 font-medium uppercase tracking-widest mt-1">
              Manage stock, pricing, and categories
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setCreateCategories(true)}
              className="bg-gray-100 text-gray-900 px-4 py-2 rounded-sm text-[11px] font-bold uppercase tracking-widest border border-gray-200 hover:bg-gray-200 transition-all flex items-center gap-2"
            >
              <MdCategory className="text-sm" /> Categories
            </button>
            <button
              onClick={() => setShowModal(true)}
              className="bg-gray-900 text-white px-4 py-2 rounded-sm text-[11px] font-bold uppercase tracking-widest hover:bg-gray-800 transition-all shadow-sm flex items-center gap-2"
            >
              <MdAddCircle className="text-sm" /> Add Product
            </button>
          </div>
        </div>

        {/* COMPACT STATS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-gray-200 border border-gray-200 rounded-sm overflow-hidden shadow-sm">
          <StatTile
            icon={<MdInventory />}
            label="Total Inventory"
            value={stats.totalProducts}
            color="text-gray-900"
          />
          <StatTile
            icon={<MdCheckCircle />}
            label="Available Units"
            value={stats.availableProducts}
            color="text-green-600"
          />
          <StatTile
            icon={<MdCancel />}
            label="Out of Stock"
            value={stats.outOfStockProducts}
            color="text-red-600"
          />
        </div>

        {/* REFINED FILTER BAR */}
        <div className="bg-white border border-gray-200 rounded-sm p-4 shadow-sm flex flex-col lg:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
            {/* Search */}
            <div className="relative w-full sm:w-64">
              <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 text-xs border border-gray-200 rounded-sm bg-gray-50 focus:bg-white focus:ring-1 focus:ring-gray-900 outline-none transition-all"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {/* Category Select */}
            <div className="relative w-full sm:w-48">
              <MdCategory className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none" />
              <select
                onChange={handleChange}
                value={selectedCategory}
                className="w-full pl-9 pr-4 py-2 text-xs border border-gray-200 rounded-sm bg-gray-50 appearance-none focus:bg-white outline-none font-bold text-gray-700"
              >
                <option value="">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Filter Actions */}
          <div className="flex bg-gray-100 p-1 rounded-sm gap-1 w-full sm:w-auto overflow-x-auto">
            <FilterOption
              active={true}
              icon={<MdFilterList />}
              label="All"
              onClick={fetchProducts}
            />
            <FilterOption
              active={false}
              icon={<MdFilterList />}
              label="Available"
            />
            <FilterOption
              active={false}
              icon={<MdFilterList />}
              label="Low Stock"
            />
          </div>
        </div>

        {/* PRODUCTS GRID */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-pulse">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-64 bg-gray-100 rounded-sm border border-gray-200"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {renderCards(products)}
            {renderCards(filterByCategories)}
          </div>
        )}

        {/* PROFESSIONAL PAGINATION */}
        <div className="flex justify-between items-center pt-6 border-t border-gray-100">
          <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
            Page {page} of Data
          </span>
          <div className="flex items-center gap-2">
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="px-4 py-2 text-[10px] font-bold uppercase tracking-widest border border-gray-200 rounded-sm hover:bg-gray-900 hover:text-white transition-all disabled:opacity-30"
            >
              <MdKeyboardArrowLeft size={16} className="inline mr-1" /> Prev
            </button>
            <button
              onClick={() => setPage(page + 1)}
              className="px-4 py-2 text-[10px] font-bold uppercase tracking-widest bg-gray-900 text-white rounded-sm hover:bg-gray-800 transition-all shadow-sm"
            >
              Next <MdKeyboardArrowRight size={16} className="inline ml-1" />
            </button>
          </div>
        </div>

        {showModal && <Create setShowModal={setShowModal} />}
        {createCategories && <CreateCategories setOpen={setCreateCategories} />}
      </div>
    </Layout>
  );
};

// --- Sub-components ---

const StatTile = ({ icon, label, value, color }) => (
  <div className="bg-white p-5 flex items-center gap-4 group">
    <div
      className={`${color} bg-gray-50 p-3 rounded-sm group-hover:scale-110 transition-transform`}
    >
      {React.cloneElement(icon, { size: 24 })}
    </div>
    <div>
      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1">
        {label}
      </p>
      <h3 className="text-xl font-black text-gray-900 leading-none">{value}</h3>
    </div>
  </div>
);

const FilterOption = ({ icon, label, onClick, active }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest transition-all rounded-sm whitespace-nowrap ${
      active
        ? "bg-white text-gray-900 shadow-sm"
        : "text-gray-500 hover:text-gray-900"
    }`}
  >
    {icon} {label}
  </button>
);

export default Product;

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

const dummyProducts = [
  {
    _id: "1",
    name: "iPhone 15",
    price: 75000,
    stock: 10,
    available: true,
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569",
  },
  {
    _id: "2",
    name: "Samsung S24",
    price: 65000,
    stock: 0,
    available: false,
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf",
  },
  {
    _id: "3",
    name: "Macbook Air",
    price: 95000,
    stock: 5,
    available: true,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
  },
];

const Product = () => {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [filterByCategories, setFilterByCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [createCategories, setCreateCategories] = useState(false);
  const [page, setPage] = useState(1);
  const limit = 4;

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

  const renderCards = (arr) =>
    arr.length > 0 &&
    arr.map((item) => <Cards key={`${item._id}`} item={item} />);

  return (
    <Layout>
      <div className="p-6 bg-white min-h-screen space-y-6">
        {/* HEADER */}
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold text-[#160059]">Products</h2>

          <div className="flex gap-3">
            <button
              onClick={() => setShowModal(true)}
              className="bg-[#160059] text-white px-5 py-2 rounded-xl 
              flex items-center gap-2 shadow hover:bg-[#1f007a] transition"
            >
              <MdAddCircle className="text-xl" /> Create
            </button>

            <button
              onClick={() => setCreateCategories(true)}
              className="bg-[#160059]/10 text-[#160059] px-5 py-2 rounded-xl 
              flex items-center gap-2 border border-[#160059] 
              hover:bg-[#160059]/20 transition"
            >
              <MdCategory className="text-xl" /> Create Categories
            </button>
          </div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/80 backdrop-blur-xl border border-gray-200 p-4 rounded-2xl shadow flex items-center gap-3">
            <MdInventory className="text-3xl text-[#160059]" />
            <div>
              <p className="text-gray-500 text-sm">Total Products</p>
              <h3 className="text-xl font-bold">{dummyProducts?.length}</h3>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-xl border border-gray-200 p-4 rounded-2xl shadow flex items-center gap-3">
            <MdCheckCircle className="text-3xl text-[#160059]" />
            <div>
              <p className="text-gray-500 text-sm">Available</p>
              <h3 className="text-xl font-bold">
                {dummyProducts?.filter((p) => p.available).length}
              </h3>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-xl border border-gray-200 p-4 rounded-2xl shadow flex items-center gap-3">
            <MdCancel className="text-3xl text-[#160059]" />
            <div>
              <p className="text-gray-500 text-sm">Out of Stock</p>
              <h3 className="text-xl font-bold">
                {dummyProducts?.filter((p) => !p.available).length}
              </h3>
            </div>
          </div>
        </div>

        {/* FILTER BAR */}
        <div className="bg-white/80 backdrop-blur-xl border border-gray-200 px-5 py-3 rounded-2xl shadow flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2 border rounded-xl px-3 py-2 bg-white">
            <MdCategory className="text-[#160059] text-xl" />
            <select
              name="category"
              onChange={handleChange}
              className="border-none outline-none bg-transparent text-[#160059]"
              required
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center border rounded-xl overflow-hidden bg-white">
            <span className="px-3 text-[#160059]">
              <MdSearch className="text-xl" />
            </span>
            <input
              type="text"
              placeholder="Search product..."
              className="px-3 py-2 outline-none text-sm bg-transparent"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2 ml-auto">
            <button
              onClick={fetchProducts}
              className="flex items-center gap-1 px-4 py-2 rounded-xl 
              bg-[#160059] text-white text-sm font-semibold hover:bg-[#1f007a] transition"
            >
              <MdFilterList /> All
            </button>

            <button
              className="flex items-center gap-1 px-4 py-2 rounded-xl 
              bg-[#160059] text-white text-sm font-semibold hover:bg-[#1f007a] transition"
            >
              <MdFilterList /> Available
            </button>

            <button
              className="flex items-center gap-1 px-4 py-2 rounded-xl 
              bg-[#160059] text-white text-sm font-semibold hover:bg-[#1f007a] transition"
            >
              <MdFilterList /> Other
            </button>
          </div>
        </div>

        {/* CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {renderCards(products)}
          {renderCards(filterByCategories)}
        </div>

        {/* PAGINATION */}
        <div className="flex justify-center items-center gap-4 mt-8">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="p-2 rounded-full bg-white/80 backdrop-blur border shadow 
            hover:bg-[#160059]/10 text-[#160059] disabled:opacity-40 transition"
          >
            <MdKeyboardArrowLeft size={26} />
          </button>

          <span className="px-4 py-1 rounded-full bg-[#160059]/10 text-[#160059] font-semibold">
            {page}
          </span>

          <button
            onClick={() => setPage(page + 1)}
            className="p-2 rounded-full bg-white/80 backdrop-blur border shadow 
            hover:bg-[#160059]/10 text-[#160059] transition"
          >
            <MdKeyboardArrowRight size={26} />
          </button>
        </div>

        {showModal && <Create setShowModal={setShowModal} />}
        {createCategories && <CreateCategories setOpen={setCreateCategories} />}
      </div>
    </Layout>
  );
};

export default Product;

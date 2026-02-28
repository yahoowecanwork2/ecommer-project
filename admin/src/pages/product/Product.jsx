import React, { useEffect, useState } from "react";
import Layout from "../../componets/common/Layout";
import {
  MdAddCircle,
  MdSearch,
  MdInventory,
  MdCheckCircle,
  MdCancel,
} from "react-icons/md";
import { MdCategory, MdFilterList } from "react-icons/md";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import Cards from "./components/Cards";
import Create from "./mdoal/Create";
import { productApi } from "../../apis/product";
import { categoriesApi } from "../../apis/categories";

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
  // get categories
  const getCategories = async () => {
    try {
      const res = await categoriesApi.getByName();
      console.log("categries", res);

      if (res.success) {
        setCategories(res.categoriesNames);
      } else {
        alert(res.message);
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
      console.log("products", res);

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
      <div className="p-6 bg-slate-100 min-h-screen space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold text-blue-700">Products</h2>
          <button
            onClick={() => setShowModal(true)}
            className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-2 rounded-xl flex items-center gap-2 shadow hover:scale-105 transition"
          >
            <MdAddCircle className="text-xl" /> Create
          </button>
        </div>

        {/* STATS ROW */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-2xl shadow flex items-center gap-3">
            <MdInventory className="text-3xl text-blue-600" />
            <div>
              <p className="text-gray-500 text-sm">Total Products</p>
              <h3 className="text-xl font-bold">{dummyProducts?.length}</h3>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl shadow flex items-center gap-3">
            <MdCheckCircle className="text-3xl text-green-600" />
            <div>
              <p className="text-gray-500 text-sm">Available</p>
              <h3 className="text-xl font-bold">
                {dummyProducts?.filter((p) => p.available).length}
              </h3>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl shadow flex items-center gap-3">
            <MdCancel className="text-3xl text-red-600" />
            <div>
              <p className="text-gray-500 text-sm">Out of Stock</p>
              <h3 className="text-xl font-bold">
                {dummyProducts?.filter((p) => !p.available).length}
              </h3>
            </div>
          </div>
        </div>

        <div className="bg-white px-5 py-3 rounded-2xl shadow flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2 border rounded-xl px-3 py-2 bg-slate-50">
            <MdCategory className="text-blue-600 text-xl" />
            <select
              name="category"
              onChange={handleChange}
              className="w-full border p-2 rounded"
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

          {/* Search */}
          <div className="flex items-center border rounded-xl overflow-hidden bg-slate-50">
            <span className="px-3 text-blue-600">
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
              className="flex items-center gap-1 px-4 py-2 rounded-xl bg-blue-100 text-blue-700 text-sm font-semibold hover:bg-blue-200 transition"
            >
              <MdFilterList /> All
            </button>

            <button className="flex items-center gap-1 px-4 py-2 rounded-xl bg-green-100 text-green-700 text-sm font-semibold hover:bg-green-200 transition">
              <MdFilterList /> Available
            </button>

            <button className="flex items-center gap-1 px-4 py-2 rounded-xl bg-red-100 text-red-700 text-sm font-semibold hover:bg-red-200 transition">
              <MdFilterList /> Other
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {renderCards(products, "all")}
          {renderCards(filterByCategories, "filterbycategories")}
        </div>
        <div className="flex justify-center items-center gap-4 mt-8">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="p-2 rounded-full bg-white shadow hover:bg-blue-100 text-blue-600 disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            <MdKeyboardArrowLeft size={26} />
          </button>

          <span className="px-4 py-1 rounded-full bg-blue-100 text-blue-700 font-semibold">
            {page}
          </span>

          <button
            onClick={() => setPage(page + 1)}
            className="p-2 rounded-full bg-white shadow hover:bg-blue-100 text-blue-600 transition"
          >
            <MdKeyboardArrowRight size={26} />
          </button>
        </div>
        {showModal && <Create setShowModal={setShowModal} />}
      </div>
    </Layout>
  );
};

export default Product;

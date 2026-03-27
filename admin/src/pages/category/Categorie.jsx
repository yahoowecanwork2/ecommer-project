import React, { useState, useEffect } from "react";
import Layout from "../../componets/common/Layout";
import { FaPlus, FaEdit, FaTrashAlt } from "react-icons/fa";
import { categoriesApi } from "../../apis/categories";
import CreateCategories from "./modal/CreateCategories";
import UpdateCategory from "./modal/Update";

const Categorie = () => {
  const [categories, setCategories] = useState([]);
  const [openCreate, setOpenCreate] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Fetch Categories
  const getAllCategories = async () => {
    try {
      const res = await categoriesApi.get();
      console.log("all categories", res);

      if (res.success) {
        setCategories(res.categories);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  // Delete Category
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        const res = await categoriesApi.delete(id);
        alert(res.message);
        getAllCategories();
      } catch (error) {
        alert("Delete failed", error);
      }
    }
  };

  return (
    <Layout>
      <div className="p-6 bg-white min-h-screen">
        <div className="flex justify-between items-center mb-10 border-b border-black pb-4">
          <h1 className="text-3xl font-black tracking-tighter uppercase">
            Categories
          </h1>
          <button
            onClick={() => setOpenCreate(true)}
            className="flex items-center gap-2 bg-black text-white px-4 py-2 hover:bg-gray-800 transition-all duration-300 text-sm font-bold tracking-widest uppercase"
          >
            <FaPlus size={12} /> Create
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories?.map((cat) => (
            <div
              key={cat?._id}
              className="group relative border border-gray-200 overflow-hidden bg-white hover:border-black transition-all duration-500 shadow-sm hover:shadow-xl"
            >
              <div className="aspect-square bg-gray-100 overflow-hidden">
                <div className="aspect-square bg-gray-100 overflow-hidden">
                  {cat?.image && cat?.image?.length > 0 ? (
                    <img
                      src={cat.image[0].url}
                      alt={cat.name}
                      className="w-full h-full object-cover transition-all duration-700 transform group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300">
                      No Image
                    </div>
                  )}
                </div>
              </div>

              <div className="p-4 flex justify-between items-center">
                <h3 className="font-bold text-lg uppercase tracking-tight">
                  {cat?.name}
                </h3>
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setSelectedCategory(cat);
                      setOpenUpdate(true);
                    }}
                    className="text-gray-400 hover:text-black transition-colors"
                  >
                    <FaEdit size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(cat._id)}
                    className="text-gray-400 hover:text-red-600 transition-colors"
                  >
                    <FaTrashAlt size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {openCreate && (
          <CreateCategories
            setOpen={setOpenCreate}
            refresh={getAllCategories}
          />
        )}
        {openUpdate && (
          <UpdateCategory
            setOpen={setOpenUpdate}
            category={selectedCategory}
            refresh={getAllCategories}
          />
        )}
      </div>
    </Layout>
  );
};

export default Categorie;

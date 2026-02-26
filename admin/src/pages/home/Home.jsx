import React, { useState } from "react";
import Layout from "../../componets/common/Layout";
import CreateCategories from "./modal/createCategories";

const Home = () => {
  const [open, setOpen] = useState(false);

  return (
    <Layout>
      <div className="p-6">
        {/* Top bar */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Categories</h2>
          <button
            onClick={() => setOpen(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            + Create Category
          </button>
        </div>

        {/* Modal */}
        {open && <CreateCategories setOpen={setOpen} />}
      </div>
    </Layout>
  );
};

export default Home;

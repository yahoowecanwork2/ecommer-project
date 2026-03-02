import React, { useEffect, useState } from "react";
import Layout from "../../componets/common/Layout";
import { userApi } from "../../apis/user";
import { FaUsers } from "react-icons/fa";
import UserCard from "./component/Card";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({});

  const fetchUsers = async () => {
    setLoading(true);
    const res = await userApi.all(`?page=${page}&limit=8`);
    console.log("all user", res);

    try {
      setUsers(res.data);
      setPagination(res.pagination);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page]);

  return (
    <Layout>
      <div className="min-h-screen bg-white p-6">
        <div className="flex items-center gap-3 mb-6">
          <FaUsers className="text-[#160059] text-2xl" />
          <h2 className="text-2xl font-bold text-[#160059]">
            Users Management
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {users?.map((user) => (
            <UserCard key={user._id} user={user} />
          ))}
        </div>
      </div>

      <div className="flex justify-center items-center gap-6 mt-8">
        <button
          disabled={!pagination.hasPrevPage}
          onClick={() => setPage(page - 1)}
          className="w-10 h-10 flex items-center justify-center rounded-full 
               bg-[#160059]/10 text-[#160059] 
               hover:bg-[#160059] hover:text-white 
               transition disabled:opacity-40"
        >
          <FaChevronLeft />
        </button>

        <span className="text-[#160059] font-semibold text-sm">
          {pagination.currentPage} / {pagination.totalPages}
        </span>

        <button
          disabled={!pagination.hasNextPage}
          onClick={() => setPage(page + 1)}
          className="w-10 h-10 flex items-center justify-center rounded-full 
               bg-[#160059]/10 text-[#160059] 
               hover:bg-[#160059] hover:text-white 
               transition disabled:opacity-40"
        >
          <FaChevronRight />
        </button>
      </div>
    </Layout>
  );
};

export default Users;

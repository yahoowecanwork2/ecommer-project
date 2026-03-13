import React, { useEffect, useState } from "react";
import Layout from "../../componets/common/Layout";
import { userApi } from "../../apis/user";
import UserCard from "./component/Card";
import {
  FaUsers,
  FaSearch,
  FaChevronLeft,
  FaChevronRight,
  FaUserCircle,
  FaEnvelope,
  FaPhone,
  FaArrowRight,
} from "react-icons/fa";

const UserSkeleton = () => (
  <tr className="animate-pulse border-b border-gray-100 last:border-0">
    <td className="px-6 py-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gray-200 rounded-sm" />
        <div className="space-y-2">
          <div className="h-3 w-24 bg-gray-200 rounded-sm" />
          <div className="h-2 w-16 bg-gray-100 rounded-sm" />
        </div>
      </div>
    </td>
    <td className="px-6 py-4">
      <div className="space-y-2">
        <div className="h-3 w-32 bg-gray-100 rounded-sm" />
        <div className="h-3 w-24 bg-gray-100 rounded-sm" />
      </div>
    </td>
    <td className="px-6 py-4">
      <div className="h-5 w-16 bg-gray-100 rounded-sm" />
    </td>
    <td className="px-6 py-4 text-right">
      <div className="h-4 w-4 bg-gray-100 rounded-sm ml-auto" />
    </td>
  </tr>
);

const Users = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({});
  const [searchQuery, setSearchQuery] = useState("");

  // Mock Fetching Logic (Replace with your actual API call)
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      // await userApi.getUsers(page)...
      setTimeout(() => {
        setLoading(false);
      }, 1500); // Simulated delay
    };
    loadData();
  }, [page]);

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

const searchUser = async (q) => {
  try {
    setLoading(true);

    const res = await userApi.searchUser(q);

    if (res.status === 404) {
      return; // user not found
    }

    console.log(res.data);

  } catch (error) {
    console.error("User search failed:", error);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    searchUser(searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    fetchUsers();
  }, [page]);

  return (
    <Layout>
      <div className="space-y-6">
        {/* HEADER SECTION */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <FaUsers className="text-gray-900 text-lg" />
              <h2 className="text-lg font-bold text-gray-900 tracking-tight">
                User Management
              </h2>
            </div>
            <p className="text-[11px] text-gray-500 font-medium uppercase tracking-wider flex items-center gap-2">
              Total Users:{" "}
              {loading ? (
                <span className="w-8 h-3 bg-gray-100 animate-pulse rounded-sm" />
              ) : (
                pagination.totalUsers
              )}
            </p>
          </div>

          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2 text-xs border border-gray-200 rounded-sm w-full sm:w-64 bg-gray-50 focus:bg-white focus:ring-1 focus:ring-gray-900 outline-none transition-all"
            />
          </div>
        </div>

        {/* DATA TABLE */}
        <div className="border border-gray-200 rounded-sm bg-white overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-[10px] uppercase tracking-[0.15em] font-bold text-gray-400">
                  <th className="px-6 py-4">User Details</th>
                  <th className="px-6 py-4">Contact Info</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loading
                  ? [...Array(6)].map((_, i) => <UserSkeleton key={i} />)
                  : users?.map((user) => (
                      <UserCard key={user._id} user={user} />
                    ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* PAGINATION */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
            Page {pagination.currentPage} of {pagination.totalPages}
          </span>
          <div className="flex items-center gap-2">
            <button
              disabled={loading || page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="px-4 py-2 text-[10px] font-bold uppercase tracking-widest border border-gray-200 rounded-sm hover:bg-gray-900 hover:text-white transition-all disabled:opacity-30"
            >
              <FaChevronLeft className="inline mr-1" /> Previous
            </button>
            <button
              disabled={loading || page === pagination.totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="px-4 py-2 text-[10px] font-bold uppercase tracking-widest bg-gray-900 text-white rounded-sm hover:bg-gray-800 transition-all disabled:opacity-30"
            >
              Next <FaChevronRight className="inline ml-1" />
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Users;

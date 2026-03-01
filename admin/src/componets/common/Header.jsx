import { FaUserCircle } from "react-icons/fa";

const Header = () => {
  return (
    <div
      className="h-[100px] bg-white/70 backdrop-blur-xl border-b border-gray-200 
    flex items-center justify-between px-6 shadow-sm"
    >
      <h1 className="text-2xl font-bold text-[#160059]">Admin Dashboard</h1>

      <div className="flex items-center gap-3 text-[#160059]">
        <FaUserCircle className="text-3xl" />
        <span className="font-semibold">Admin</span>
      </div>
    </div>
  );
};

export default Header;

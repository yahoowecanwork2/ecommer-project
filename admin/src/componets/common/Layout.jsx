import { Link, useLocation } from "react-router-dom";
import Header from "./Header";
import { IoLogOutOutline } from "react-icons/io5";
import { MdDashboard } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { FaBoxOpen } from "react-icons/fa";
import { BsCartCheckFill } from "react-icons/bs";

const Layout = ({ children }) => {
  const location = useLocation();

  const paths = [
    { id: 1, name: "Dashboard", path: "/dashboard", icon: MdDashboard },
    { id: 2, name: "User", path: "/user", icon: FaUsers },
    { id: 3, name: "My Orders", path: "/order", icon: BsCartCheckFill },
    { id: 4, name: "Product", path: "/product", icon: FaBoxOpen },
  ];

  return (
    <div className="w-full min-h-screen flex bg-white">
      {/* SIDEBAR */}
      <aside className="w-[230px] bg-white/70 backdrop-blur-xl border-r border-gray-200 flex flex-col shadow-lg">
        {/* Logo */}
        <div className="h-[100px] flex items-center justify-center border-b border-gray-200">
          <h1 className="text-2xl font-bold text-[#160059]">Admin</h1>
        </div>

        <div className="p-3 flex-1 flex flex-col justify-between">
          {/* MENU */}
          <nav className="space-y-2">
            {paths.map((menu) => {
              const isActive = location.pathname === menu.path;
              const Icon = menu.icon;

              return (
                <Link
                  key={menu.id}
                  to={menu.path}
                  className={`flex items-center gap-4 px-5 py-3 rounded-xl text-base font-semibold transition
                  ${
                    isActive
                      ? "bg-[#160059] text-white shadow-md"
                      : "bg-white/60 text-[#160059] hover:bg-[#160059]/10"
                  }`}
                >
                  <Icon className="text-xl" />
                  {menu.name}
                </Link>
              );
            })}
          </nav>

          {/* LOGOUT */}
          <button
            className="mt-6 w-full flex items-center gap-3 px-4 py-2 rounded-xl 
          bg-[#160059] text-white hover:bg-[#1f007a] transition shadow-md"
          >
            <IoLogOutOutline />
            Logout
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <main className="flex-1 flex flex-col bg-white">
        <Header />

        <section className="flex-1 p-5 bg-white">
          <div
            className="bg-white/70 backdrop-blur-xl border border-gray-200 
          min-h-full rounded-2xl p-4 shadow-lg"
          >
            {children}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Layout;

import { Link, useLocation } from "react-router-dom";
import Header from "./Header";
import { IoLogOutOutline } from "react-icons/io5";
import { MdDashboard } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { FaBoxOpen, FaTags, FaTicketAlt, FaBullhorn } from "react-icons/fa";
import { BsCartCheckFill } from "react-icons/bs";

const Layout = ({ children }) => {
  const location = useLocation();

  const paths = [
    {
      id: 1,
      name: "Dashboard",
      path: "/dashboard",

      icon: MdDashboard,
    },
    { id: 2, name: "User", path: "/user", icon: FaUsers },
    { id: 3, name: "My Orders", path: "/order", icon: BsCartCheckFill },
    { id: 4, name: "Product", path: "/product", icon: FaBoxOpen },
  ];

  return (
    <div className="w-full min-h-screen flex bg-[#f5f7fb]">
      {/* SIDEBAR */}
      <aside className="w-[230px] bg-white flex flex-col">
        {/* LOGO */}
        <div className="h-[100px] flex items-center justify-center">
          <h1>Admin</h1>
        </div>

        <div className="p-3 flex-1">
          <nav className="space-y-2">
            {paths.map((menu) => {
              const isActive = location.pathname === menu.path;
              const Icon = menu.icon;

              return (
                <Link
                  key={menu.id}
                  to={menu.path}
                  className={`flex items-center gap-4 px-5 py-3 rounded-md text-base font-semibold ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-blue-100"
                  }`}
                >
                  <Icon className="text-xl" />
                  {menu.name}
                </Link>
              );
            })}
          </nav>

          {/* LOGOUT */}
          <button className="mt-6 w-full flex items-center gap-3 px-4 py-2 rounded-md bg-blue-600 text-white">
            <IoLogOutOutline />
            Logout
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <main className="flex-1 flex flex-col">
        <Header />

        <section className="flex-1 p-5">
          <div className="bg-white min-h-full rounded-md p-4">{children}</div>
        </section>
      </main>
    </div>
  );
};

export default Layout;

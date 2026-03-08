import {
  FaUserCircle,
  FaEnvelope,
  FaPhone,
  FaArrowRight,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const UserCard = ({ user }) => {
  const navigate = useNavigate();
  return (
    <tr
      onClick={() => navigate(`/user-detail/${user._id}`)}
      className="group cursor-pointer hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0"
    >
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          {user?.image ? (
            <img
              src={user.image}
              alt=""
              className="w-10 h-10 rounded-sm object-cover border border-gray-100"
            />
          ) : (
            <div className="w-10 h-10 bg-gray-50 rounded-sm flex items-center justify-center border border-gray-100">
              <FaUserCircle className="text-gray-300 text-2xl" />
            </div>
          )}
          <div>
            <p className="text-sm font-bold text-gray-900 leading-none mb-1 group-hover:text-blue-600 transition-colors">
              {user?.name || "No Name"}
            </p>
            <p className="text-[10px] text-gray-400 font-medium uppercase tracking-tighter">
              ID: {user._id?.slice(-6)}
            </p>
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="space-y-1">
          <p className="flex items-center gap-2 text-xs text-gray-600">
            <FaEnvelope className="text-gray-400 text-[10px]" /> {user?.email}
          </p>
          <p className="flex items-center gap-2 text-xs text-gray-600">
            <FaPhone className="text-gray-400 text-[10px]" />{" "}
            {user?.phoneno || "N/A"}
          </p>
        </div>
      </td>
      <td className="px-6 py-4 text-xs">
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-sm bg-green-50 border border-green-100 text-[10px] font-bold uppercase tracking-tight text-green-700">
          <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
          Active
        </span>
      </td>
      <td className="px-6 py-4 text-right">
        <FaArrowRight
          size={12}
          className="text-gray-300 group-hover:text-gray-900 inline-block transition-transform group-hover:translate-x-1"
        />
      </td>
    </tr>
  );
};

export default UserCard;

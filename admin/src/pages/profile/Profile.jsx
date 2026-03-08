import React from "react";
import Layout from "../../componets/common/Layout";
import { 
  MdEmail, 
  MdPhone, 
  MdLocationOn, 
  MdVerified, 
  MdSecurity, 
  MdEdit,
  MdCameraAlt,
  MdBusinessCenter
} from "react-icons/md";
import { FaUserShield, FaCalendarAlt } from "react-icons/fa";

const Profile = () => {
  // Hardcoded Admin Data
  const admin = {
    name: "Vikram Singh",
    role: "Super Admin",
    email: "vikram.admin@yourstore.com",
    phone: "+91 98765 43210",
    joined: "January 2024",
    location: "Mumbai, Maharashtra",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Vikram",
  };

  return (
    <Layout>
      <div className="space-y-6">
        
        {/* HEADER / COVER SECTION */}
        <div className="relative h-32 bg-gray-900 rounded-sm overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
        </div>

        {/* PROFILE HEADER CARD */}
        <div className="relative px-6 -mt-16 pb-6 border-b border-gray-100">
          <div className="flex flex-col md:flex-row items-end gap-6">
            <div className="relative group">
              <div className="w-32 h-32 rounded-sm border-4 border-white bg-gray-50 overflow-hidden shadow-md">
                <img src={admin.avatar} alt="Profile" className="w-full h-full object-cover" />
              </div>
              <button className="absolute bottom-2 right-2 p-2 bg-gray-900 text-white rounded-sm opacity-0 group-hover:opacity-100 transition-opacity">
                <MdCameraAlt size={14} />
              </button>
            </div>

            <div className="flex-1 pb-2">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-black text-gray-900 uppercase tracking-tight">{admin.name}</h1>
                <MdVerified className="text-blue-500" />
              </div>
              <div className="flex flex-wrap gap-4 mt-1">
                <span className="flex items-center gap-1 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  <MdBusinessCenter /> {admin.role}
                </span>
                <span className="flex items-center gap-1 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  <FaCalendarAlt /> Member since {admin.joined}
                </span>
              </div>
            </div>

            <div className="flex gap-2">
              <button className="px-6 py-2 bg-gray-900 text-white text-[10px] font-bold uppercase tracking-widest rounded-sm hover:bg-gray-800 transition-all flex items-center gap-2">
                <MdEdit size={14} /> Edit Profile
              </button>
            </div>
          </div>
        </div>

        {/* DETAILS GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* LEFT: INFO LIST (2 cols) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white border border-gray-200 rounded-sm p-6 shadow-sm">
              <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-6">Personal Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                    <MdEmail /> Email Address
                  </p>
                  <p className="text-sm font-bold text-gray-900">{admin.email}</p>
                </div>
                
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                    <MdPhone /> Contact Number
                  </p>
                  <p className="text-sm font-bold text-gray-900">{admin.phone}</p>
                </div>

                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                    <MdLocationOn /> Location
                  </p>
                  <p className="text-sm font-bold text-gray-900">{admin.location}</p>
                </div>

                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                    <FaUserShield /> Identity Status
                  </p>
                  <p className="text-sm font-black text-green-600 uppercase italic">Verified KYC</p>
                </div>
              </div>
            </div>

            {/* SECURITY LOGS SECTION */}
            {/* <div className="bg-gray-50 border border-gray-100 rounded-sm p-6">
               <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Account Security</h3>
               <div className="flex items-center justify-between py-3 border-b border-gray-200">
                  <div className="flex items-center gap-3">
                    <MdSecurity className="text-gray-400" />
                    <span className="text-[11px] font-bold text-gray-700 uppercase tracking-tight">Two-Factor Authentication</span>
                  </div>
                  <span className="text-[9px] font-black text-green-600 uppercase bg-green-50 px-2 py-0.5 border border-green-100 rounded-sm">Enabled</span>
               </div>
               <div className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-3">
                    <MdSecurity className="text-gray-400" />
                    <span className="text-[11px] font-bold text-gray-700 uppercase tracking-tight">Last Password Change</span>
                  </div>
                  <span className="text-[11px] text-gray-400 font-medium">14 days ago</span>
               </div>
            </div> */}
          </div>

          {/* RIGHT: ACTIVITY SNAPSHOT (1 col) */}
          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-sm p-6 shadow-sm">
              <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-6">Activity Snapshot</h3>
              
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <span className="text-[11px] font-bold text-gray-500 uppercase">Products Added</span>
                  <span className="text-xl font-black text-gray-900">421</span>
                </div>
                <div className="flex justify-between items-center border-t border-gray-50 pt-4">
                  <span className="text-[11px] font-bold text-gray-500 uppercase">Orders Processed</span>
                  <span className="text-xl font-black text-gray-900">1.2k</span>
                </div>
                <div className="flex justify-between items-center border-t border-gray-50 pt-4">
                  <span className="text-[11px] font-bold text-gray-500 uppercase">Tickets Resolved</span>
                  <span className="text-xl font-black text-gray-900">89</span>
                </div>
              </div>

              <button className="mt-8 w-full py-3 bg-gray-50 text-gray-900 text-[10px] font-bold uppercase tracking-widest border border-gray-100 hover:bg-gray-100 transition-all rounded-sm">
                View Activity Log
              </button>
            </div>
          </div>

        </div>
      </div>
    </Layout>
  );
};

export default Profile;
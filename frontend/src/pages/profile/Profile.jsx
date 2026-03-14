import React, { useState } from "react";
import { 
  IoPersonOutline, 
  IoMailOutline, 
  IoCallOutline, 
  IoLocationOutline, 
  IoCalendarOutline,
  IoCreateOutline,
  IoCameraOutline,
  IoFingerPrintOutline,
  IoLogOutOutline
} from "react-icons/io5";
import Header from "../common/Header";
import Footer from "../common/Footer";

const Profile = () => {
  // Static Data - Link with your Auth state
  const [user] = useState({
    name: "Ananya Deshmukh",
    email: "ananya.d@naviclothing.com",
    phone: "+91 90000 12345",
    gender: "Female",
    dob: "14 Oct 1998",
    address: "B-12, Ivory Towers, Golf Course Road, Gurgaon, HR",
    secondaryAddress: "Plot 4, Heritage Lane, Jaipur, RJ",
    memberSince: "May 2024",
  });

  return (
    <div className="w-full bg-[#FCFBF9] min-h-screen font-google text-[#2D1B2D]">
      <Header />

      <main className="max-w-[1100px] mx-auto px-6 pt-36 lg:pt-52 pb-24">
        
        {/* --- LUXE HEADER SECTION --- */}
        <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-10 mb-16 px-4">
          <div className="flex flex-col md:flex-row items-center gap-10">
            {/* Minimalist Profile Picture */}
            <div className="relative group">
              <div className="w-28 h-28 md:w-36 md:h-36 rounded-full border border-[#D16B92]/20 p-1.5 bg-white shadow-sm transition-transform duration-700 group-hover:rotate-6">
                <div className="w-full h-full rounded-full bg-[#FAF9F6] flex items-center justify-center overflow-hidden border border-dashed border-[#D16B92]/30">
                  <IoPersonOutline className="text-4xl text-[#D16B92]/20" />
                </div>
              </div>
              <button className="absolute bottom-1 right-1 bg-[#2D1B2D] text-white p-2.5 rounded-full shadow-xl hover:bg-[#D16B92] transition-colors">
                <IoCameraOutline size={16} />
              </button>
            </div>

            <div className="text-center md:text-left space-y-2">
              <p className="text-[10px] font-black uppercase tracking-[0.5em] text-[#D16B92] mb-2">Member Archive</p>
              <h1 className="text-5xl lg:text-7xl font-serif italic tracking-tighter text-[#2D1B2D] leading-none">
                {user.name}
              </h1>
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-300 pt-2">
                Since <span className="text-gray-400">{user.memberSince}</span>
              </p>
            </div>
          </div>

          <button className="flex items-center gap-3 border-b border-[#2D1B2D] pb-1 text-[10px] font-black uppercase tracking-[0.3em] hover:text-[#D16B92] hover:border-[#D16B92] transition-all">
             <IoCreateOutline size={16} /> Edit Identity
          </button>
        </div>

        {/* --- UNIFIED IDENTITY CARD --- */}
        <div className="bg-white shadow-[0_40px_100px_-20px_rgba(0,0,0,0.03)] border border-gray-100 rounded-[10px] overflow-hidden">
          
          {/* Header Bar */}
          <div className="px-10 py-8 bg-[#FAF9F6] border-b border-gray-50 flex items-center gap-4">
             <IoFingerPrintOutline className="text-[#D16B92]" size={20} />
             <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-[#2D1B2D]">Personal Portfolio</h3>
          </div>

          {/* Details Layout */}
          <div className="divide-y divide-gray-50">
            
            {/* Row 1: Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
               <div className="px-10 py-12 space-y-3 group hover:bg-[#FCFBF9] transition-colors">
                  <p className="text-[9px] font-bold text-gray-300 uppercase tracking-widest">Full Name</p>
                  <p className="text-lg font-serif italic text-[#2D1B2D]">{user.name}</p>
               </div>
               <div className="px-10 py-12 space-y-3 md:border-l border-gray-50 group hover:bg-[#FCFBF9] transition-colors">
                  <p className="text-[9px] font-bold text-gray-300 uppercase tracking-widest">Email Address</p>
                  <p className="text-[15px] font-medium text-[#2D1B2D]">{user.email}</p>
               </div>
               <div className="px-10 py-12 space-y-3 lg:border-l border-gray-50 group hover:bg-[#FCFBF9] transition-colors">
                  <p className="text-[9px] font-bold text-gray-300 uppercase tracking-widest">Contact Phone</p>
                  <p className="text-[15px] font-medium text-[#2D1B2D]">{user.phone}</p>
               </div>
            </div>

            {/* Row 2: Demographics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
               <div className="px-10 py-12 space-y-3 group hover:bg-[#FCFBF9] transition-colors">
                  <p className="text-[9px] font-bold text-gray-300 uppercase tracking-widest">Birth Date</p>
                  <p className="text-lg font-serif italic text-[#2D1B2D]">{user.dob}</p>
               </div>
               <div className="px-10 py-12 space-y-3 md:border-l border-gray-50 group hover:bg-[#FCFBF9] transition-colors">
                  <p className="text-[9px] font-bold text-gray-300 uppercase tracking-widest">Gender Orientation</p>
                  <p className="text-lg font-serif italic text-[#2D1B2D]">{user.gender}</p>
               </div>
               <div className="px-10 py-12 flex items-center lg:border-l border-gray-50">
                  <div className="px-4 py-2 bg-[#FDFBF9] border border-pink-50 rounded-full flex items-center gap-3">
                     <div className="w-2 h-2 rounded-full bg-[#D16B92] animate-pulse"></div>
                     <span className="text-[9px] font-black uppercase tracking-widest text-[#D16B92]">Verified Muse</span>
                  </div>
               </div>
            </div>

            {/* Row 3: Primary Address */}
            <div className="grid grid-cols-1 lg:grid-cols-12 items-start">
               <div className="lg:col-span-12 px-10 py-14 space-y-4 group hover:bg-[#FCFBF9] transition-colors">
                  <div className="flex items-center gap-3">
                    <IoLocationOutline className="text-[#D16B92]" size={18} />
                    <p className="text-[9px] font-bold text-gray-300 uppercase tracking-widest">Primary Shipping Studio</p>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed font-light italic max-w-2xl">
                    {user.address}
                  </p>
               </div>
            </div>

            {/* Row 4: Secondary Address */}
            <div className="grid grid-cols-1 lg:grid-cols-12 items-start">
               <div className="lg:col-span-12 px-10 py-14 space-y-4 group hover:bg-[#FCFBF9] transition-colors opacity-60 hover:opacity-100">
                  <div className="flex items-center gap-3">
                    <IoLocationOutline className="text-gray-300" size={18} />
                    <p className="text-[9px] font-bold text-gray-300 uppercase tracking-widest">Secondary Destination</p>
                  </div>
                  <p className="text-sm text-gray-400 leading-relaxed font-light italic max-w-2xl">
                    {user.secondaryAddress}
                  </p>
               </div>
            </div>

          </div>

          {/* Action Footer */}
          <div className="px-10 py-12 flex flex-col md:flex-row justify-between items-center gap-8 bg-[#FAF9F6]">
             <p className="text-[10px] text-gray-300 font-bold uppercase tracking-[0.3em] italic">
               *Your data is part of the Navi heritage.
             </p>
             <button className="group relative bg-[#2D1B2D] text-white px-12 py-5 text-[10px] font-black uppercase tracking-[0.4em] overflow-hidden transition-all">
                <span className="relative z-10">Save Preferences</span>
                <div className="absolute inset-0 bg-[#D16B92] translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
             </button>
          </div>
        </div>

        {/* --- LOGOUT BUTTON --- */}
        <div className="mt-12 flex justify-center lg:justify-start">
           <button className="flex items-center gap-3 text-gray-300 hover:text-red-400 transition-colors px-4 py-2 group">
              <IoLogOutOutline className="text-xl group-hover:-translate-x-1 transition-transform" />
              <span className="text-[10px] font-black uppercase tracking-widest">Terminate Session</span>
           </button>
        </div>

      </main>

      <Footer />
    </div>
  );
};

export default Profile;
import React from 'react';
import Bedroom from "../../img/Bedroom.jpg";
import kitchen from "../../img/kitchen.jpg";

import Meetingroom from "../../img/Meetingroom.jpg";
// import Workspace from "../../img/Workspace.jpg";
import LivingRoom from "../../img/LivingRoom.jpg";

export const CategorySection = () => {
  return (
    <section className="max-w-7xl  mx-auto py-8 px-4 md:px-6">

        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            Explore by Category
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 ">
          
               {/* sideBar */}

            <div className="lg: col-span-1 flex flex-col h-full">
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full border border-gray-200 p-3 rounded-lg mb-8" />

                  <ul className="space-y-5 text-gray-700">
                     <li className="hover:text-teal-700 cursor-pointer">Bedroom</li>
                     <li className="hover:text-teal-700 cursor-pointer">Dining Room</li>
                     <li className="hover:text-teal-700 cursor-pointer">Meeting Room</li>
                     <li className="hover:text-teal-700 cursor-pointer">Workspace</li>
                     <li className="hover:text-teal-700 cursor-pointer">Living Room</li>
                     <li className="hover:text-teal-700 cursor-pointer">Kitchen</li>
                  </ul>

                   
                   <button className="mt-8 bg-teal-700 text-white px-5 py-3 rounded-lg ">
                        All Categories 
                  </button>
            </div>

           
                   <div className="col-span-3">
                     <div className="grid grid-cols-2 gap-6">

                          <div className="relative">
                        <img src={Bedroom} className="w-full h-60 object-cover rounded-xl"/>
                    </div>
                      

                     <div >
                        <img src={kitchen} className="w-full h-60 object-cover rounded-xl"/>
                    </div>

                
                      <div >
                        <img src={LivingRoom} className="w-full h-60 object-cover rounded-xl"/>
                    </div>

                
                    <div >
                        <img src={Meetingroom} className="w-full h-60 object-cover rounded-xl"/>
                    </div>
             


            

                    {/* <div >
                        <img src={Workspace} className="w-full h-60 object-cover rounded-xl"/>
                    </div> */}

                    </div>

                   </div>
               
           
        </div>

        

    </section>
  )
}

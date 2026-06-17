import { MdShoppingCart } from "react-icons/md";
import { FaHeart } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";

export default function Header(){
  return (
    <nav className="sticky top-0 bg-transparent backdrop-blur-md text-black py-4">
      <div className="container mx-auto flex items-center justify-between ">


        <div>
          
        </div>


        <ul className="flex justify-center gap-10 text-lg font-medium">

          <li>
            <a href="#" className="hover:text-gray-200">
              Home
            </a>
          </li>


           <li>
            <a href="#" className="hover:text-gray-200">
              Product
            </a>
          </li>


           <li>
            <a href="#" className="hover:text-gray-200">
              Categories
            </a>
          </li>


           <li>
            <a href="#" className="hover:text-gray-200">
             About
            </a>
          </li>


           <li>
            <a href="#" className="hover:text-gray-200">
              Contact Us
            </a>
          </li>

        </ul>

        <div className="flex justify-end items-center gap-10 text-2xl">

          <MdShoppingCart className="cursor-pointer hover:scale-110 transition"/>
          <FaHeart className="cursor-pointer hover:scale-110 transition"/>
          <FaRegUserCircle className="cursor-pointer hover:scale-110 transition"/>
        </div>
      </div>
    </nav>
  )
}
